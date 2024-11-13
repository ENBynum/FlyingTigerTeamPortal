import os
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, Request, status
from fastapi.params import Depends
import jwt

from models import Profile
from models.auth import Credential
from utils.raven_database.databases import AuthDB, PortalDB
from .training import router as training

load_dotenv()



def authorize(req: Request):
    access_token = req.cookies.get('accessToken')

    if not access_token:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, 'Not Authenticated')
    
    access_payload = jwt.decode(access_token, os.getenv('ACCESS_TOKEN_SECRET'), algorithms=os.getenv('ALGORITHM'))
    with AuthDB().store().open_session() as auth:
        credentials = auth.load(f'Credentials/{access_payload['dodid']}', Credential)
        if not credentials:
            raise HTTPException(status.HTTP_401_UNAUTHORIZED, 'Not Authenticated')
        if credentials.role not in ['OIC', 'Officer', 'NCOIC', 'NCO']:
            raise HTTPException(status.HTTP_401_UNAUTHORIZED, 'Not Authorized')
        
    with PortalDB().store().open_session() as portal:
        profile = portal.load(f'Profiles/{access_payload['dodid']}', Profile)
        if not profile.subunit.startswith('PlatoonUnits/'):
            raise HTTPException(status.HTTP_401_UNAUTHORIZED, 'Not Authorized')



PlatoonRouter = APIRouter(prefix='/api/platoon', tags=['protected', 'platoon'], dependencies=[Depends(authorize)])
PlatoonRouter.include_router(training)

@PlatoonRouter.get('/', status_code=status.HTTP_200_OK)
def test():
    return 'Platoon API - Test Sucessful'

__all__ = ['PlatoonRouter']