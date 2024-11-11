from typing import Literal, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

from utils import JSONResponseWithTokens
from utils.middleware.authenticate import authenticated

from ...server.models import Credential, Name, Profile
from ...server.utils.raven_database.databases import AuthDB, PortalDB


AuthRouter = APIRouter(prefix='/api/auth', tags=['auth'])

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

@AuthRouter.get('/', status_code=status.HTTP_200_OK)
def authenticate(dodid: str = Depends(authenticated)):
    if dodid is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not Authenticated")

    with PortalDB().store().open_session() as portal_session:
        profile = portal_session.load(f'Profiles/{dodid}', Profile)
        if profile is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not Authenticated")
        print(profile)
        return ClientAuth(**profile.model_dump())
    
class SignInRequest(BaseModel):
    email: str
    password: str

@AuthRouter.post('/sign-in', status_code=status.HTTP_200_OK)
def sign_in(req: SignInRequest):
    with AuthDB.store().open_session() as auth:
        credentials = list(auth.query_collection(collection_name='Credentials', object_type=Credential).where_equals('email', req.email))
        if len(credentials) == 0:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid Credentials')

        credentials = credentials[0]
        if not credentials.check_password(req.password):
            credentials.attempts += 1
            if credentials.attempts >= 3:
                credentials.enabled = False
                auth.save_changes()
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Sign In Attempts Exceeded')
            
            auth.save_changes()
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid Credentials')
        
            
        if auth.query_collection(collection_name='Credentials', object_type=Credential).where_equals('email', req.email).count() == 0:
            print('No User Found')
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid Credentials')
        
        if not credentials.enabled:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Account Disabled')
        if credentials.attempts >= 3:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Sign In Attempts Exceeded')

        credentials.attempts = 0
        auth.save_changes()

        with PortalDB.store().open_session() as portal:
            profile = portal.load(credentials.profile, Profile)
            return JSONResponseWithTokens(dodid=profile.dodid, content={'dodid': profile.dodid, 'unit_level': profile.unit_level})

class RegisterRequest(BaseModel):
    dodid: str
    rank: str
    name: Name
    email: str
    phone: str 
    company: str
    platoon: str
    squad: str
    password: str
    credentialID: Optional[str] = None
    profileID: Optional[str] = None
    unit_level: Optional[Literal['Company', 'Platoon', 'Squad', 'Soldier']] = None
    unit: Optional[str] = None
    subunit: Optional[str] = None

    def model_post_init(self, __context):
        self.credentialID = f'Credentials/{self.dodid}'
        self.profileID = f'Profiles/{self.dodid}'
        self.unit = self.company
        if self.platoon == 'Command':
            self.unit_level = 'Company'
            self.subunit = self.company
        else:
            self.unit_level = 'Soldier'
            self.subunit = self.squad

        return super().model_post_init(__context)

    def credentials(self):
        return {
            'Id': self.credentialID,
            'role': 'Soldier',
            'admin': False,
            'profile': self.profileID,
            'email': self.email.lower(),
            'password': bcrypt.hashpw(
                (self.password + os.getenv('PASSWORD_PEPPER')).encode(),
                bcrypt.gensalt()).decode('utf-8'),
            'attempts': 0,
            'enabled': True
        }

    def profile(self):
        return {
            'Id': self.profileID,
            'dodid': self.dodid,
            'rank': self.rank.upper(),
            'name': self.name.to_doc(),
            'email': self.email.lower(),
            'phone': self.phone,
            'unit_level': self.unit_level,
            'unit': self.unit,
            'subunit': self.subunit
        }

@AuthRouter.post('/register', status_code=status.HTTP_202_ACCEPTED)
def register(req: RegisterRequest):
    with AuthDB.store().open_session() as auth:
        if auth.load(f'Credentials/{req.dodid}', Credential) is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='DoD ID, Email Address, or Phone Number Associated w/ Existing User')
        credentials = list(auth.query_collection(collection_name='Credentials', object_type=Credential).where_equals('email', req.email))
        if len(credentials) != 0:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='DoD ID, Email Address, or Phone Number Associated w/ Existing User')
        with PortalDB.store().open_session() as portal:
            if portal.load(f'Profiles/{req.dodid}', Profile) is not None:
                raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='DoD ID, Email Address, or Phone Number Associated w/ Existing User')
            profile = list(portal.query_collection(collection_name='Profiles', object_type=Profile).where_equals('dodid', req.dodid).or_else().where_equals('email', req.email).or_else().where_equals('phone', req.phone))
            if len(profile) != 0:
                raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='DoD ID, Email Address, or Phone Number Associated w/ Existing User')

            auth.store(Credential(**req.credentials()))
            auth.save_changes()
            portal.store(Profile(**req.profile()))
            portal.save_changes()

    return