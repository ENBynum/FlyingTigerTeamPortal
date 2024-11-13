from fastapi import APIRouter, HTTPException, status
from models import Profile
from models.auth import Credential
from pydantic import BaseModel
from utils.JSONResponseWithTokens import JSONResponseWithTokens
from utils.raven_database.databases import AuthDB, PortalDB

router = APIRouter()

class SignInRequest(BaseModel):
    email: str
    password: str

@router.post('/authentication', status_code=status.HTTP_200_OK)
def sign_in(req: SignInRequest):
    with AuthDB().store().open_session() as auth:
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
        
        if not credentials.enabled:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Account Disabled')
        if credentials.attempts >= 3:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Sign In Attempts Exceeded')

        credentials.attempts = 0
        auth.save_changes()

        with PortalDB().store().open_session() as portal:
            profile = portal.load(credentials.profile, Profile)
            return JSONResponseWithTokens(dodid=profile.dodid, content={'dodid': profile.dodid, 'unit_level': profile.unit_level})
