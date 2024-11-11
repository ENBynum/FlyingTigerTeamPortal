from typing import Literal

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, status
from fastapi.params import Depends
from models import Credential, Profile, RegisterRequest, SignInRequest
from models.documents.user import Name
from pydantic import BaseModel
from starlette.responses import JSONResponse
from utils.JSONResponseWithTokens import JSONResponseWithTokens
from utils.middleware.authenticate import authenticated
from utils.raven_database.databases import AuthDB, PortalDB

load_dotenv()

auth_router = APIRouter(prefix='/api/auth', tags=['auth'])

class ClientAuth(BaseModel):
    dodid: str
    rank: str
    name: Name
    email: str
    phone: str
    unit_level: Literal['Company', 'Platoon', 'Squad', 'Soldier']
    unit: str
    subunit: str

    def __repr__(self):
        return {'dodid': self.dodid, 'unit_level': self.unit_level}

@auth_router.get('/', status_code=status.HTTP_200_OK)
def authenticate(dodid: str = Depends(authenticated)):
    if dodid is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not Authenticated")

    with PortalDB().store().open_session() as portal_session:
        profile = portal_session.load(f'Profiles/{dodid}', Profile)
        if profile is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not Authenticated")
        
        return ClientAuth(**profile.doc())

@auth_router.post('/user', status_code=status.HTTP_201_CREATED)
def register(req: RegisterRequest):
    try:
        with AuthDB.store().open_session() as auth_session:
            if auth_session.load(f'Credentials/{req.dodid}', Credential) is not None:
                return JSONResponse(status_code=status.HTTP_409_CONFLICT, content={'message': 'DoD ID Associated w/ Existing User'})
            credential_query = auth_session.query_collection(collection_name='Credentials', object_type=Credential).where_equals('email', req.email)
            if credential_query.count() != 0:
                return JSONResponse(status_code=status.HTTP_409_CONFLICT, content={'message': 'DoD ID, Email Address, or Phone Number Associated w/ Existing User'})
            with PortalDB.store().open_session() as portal_session:
                if portal_session.load(f'Profiles/{req.dodid}', Profile) is not None:
                    return JSONResponse(status_code=status.HTTP_409_CONFLICT, content={'message': 'DoD ID Associated w/ Existing User'})
                profile_query = portal_session.query_collection(collection_name='Profiles', object_type=Profile).where_equals('dodid', req.dodid).or_else().where_equals('email', req.email).or_else().where_equals('phone', req.phone)
                if profile_query.count() != 0:
                    return JSONResponse(status_code=status.HTTP_409_CONFLICT, content={'message': 'DoD ID, Email Address, or Phone Number Associated w/ Existing User'})

                auth_session.store(Credential(**req.credentials()))
                auth_session.save_changes()
                portal_session.store(Profile(**req.profile()))
                portal_session.save_changes()

        return
    except Exception as error:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={'message': error})

@auth_router.post('/sign-in', status_code=status.HTTP_200_OK)
def sign_in(req: SignInRequest):
    with AuthDB.store().open_session() as auth_session:
        credentials = list(auth_session.query_collection(collection_name='Credentials', object_type=Credential).where_equals('email', req.email))
        if len(credentials) == 0:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid Credentials')
        if auth_session.query_collection(collection_name='Credentials', object_type=Credential).where_equals('email', req.email).count() == 0:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid Credentials')
        
        credentials = auth_session.query_collection(collection_name='Credentials', object_type=Credential).where_equals('email', req.email).first()
        if not credentials.check_password(req.password):
            credentials.attempts += 1
            if credentials.attempts >= 3:
                credentials.enabled = False
                auth_session.save_changes()
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Sign In Attempts Exceeded')
            auth_session.save_changes()
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid Credentials')
        
        if not credentials.enabled:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Account Disabled')
        if credentials.attempts >= 3:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Sign In Attempts Exceeded')

        credentials.attempts = 0
        auth_session.save_changes()

        with PortalDB.store().open_session() as portal_session:
            profile = portal_session.load(credentials.profile, Profile)
            return JSONResponseWithTokens(dodid=profile.dodid, content={'dodid': profile.dodid, 'unit_level': profile.unit_level})