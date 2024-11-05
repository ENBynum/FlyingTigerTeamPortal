from dotenv import load_dotenv
from fastapi import APIRouter, status
from models import Credential, Profile, RegisterRequest, SignInRequest
from starlette.responses import JSONResponse
from utils.JSONResponseWithTokens import JSONResponseWithTokens
from utils.raven_database.databases import AuthDB

load_dotenv()

auth_router = APIRouter()

@auth_router.post('/user', status_code=status.HTTP_201_CREATED)
def register(req: RegisterRequest):
    try:
        with AuthDB.store().open_session() as session:
            credential_query = session.query_collection(collection_name='Credentials', object_type=Credential).where_equals('dodid', req.dodid).or_else().where_equals('email', req.email)
            if credential_query.count() != 0:
                return JSONResponse(status_code=status.HTTP_409_CONFLICT, content={'message': 'DoD ID Associated w/ Existing User'})
            profile_query = session.query_collection(collection_name='Profiles', object_type=Profile).where_equals('dodid', req.dodid).or_else().where_equals('email', req.email).or_else().where_equals('phone', req.phone)
            if profile_query.count() != 0:
                return JSONResponse(status_code=status.HTTP_409_CONFLICT, content={'message': 'DoD ID Associated w/ Existing User'})

            session.store(Credential(**req.credentials()))
            session.store(Profile(**req.profile()))
            session.save_changes()

        return
    except Exception as error:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={'message': error})

@auth_router.post('/sign-in', status_code=status.HTTP_200_OK)
def sign_in(req: SignInRequest):
    try:
        with AuthDB.store().open_session() as session:
            if session.query_collection(collection_name='Credentials', object_type=Credential).where_equals('email', req.email).count() == 0:
                return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={'message': 'Invalid Credentials'})
            
            credentials = session.query_collection(collection_name='Credentials', object_type=Credential).where_equals('email', req.email).first()
            if not credentials.check_password(req.password):
                credentials.attempts += 1
                if credentials.attempts >= 3:
                    credentials.enabled = False
                    session.save_changes()
                    return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={'message': 'Sign In Attempts Exceeded'})
                session.save_changes()
                return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={'message': 'Invalid Credentials'})
            
            if not credentials.enabled:
                return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={'message': 'Account Disabled'})
            if credentials.attempts >= 3:
                return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={'message': 'Sign In Attempts Exceeded'})

            credentials.attempts = 0
            session.save_changes()

            profile = session.load(key_or_keys=f'Profiles/{credentials.dodid}', object_type=Profile)

            return JSONResponseWithTokens(dodid=credentials.dodid, content={'dodid': credentials.dodid, 'role': credentials.role, 'platoon': profile.platoon, 'squad': profile.squad})
    except Exception as error:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={'message': error})