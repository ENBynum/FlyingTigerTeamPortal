import os
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, Request, status
from fastapi.params import Depends
import jwt

from models.auth import Credential
from utils.raven_database.databases import AuthDB
from .profile import router as profile
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
        if credentials.role not in ['OIC', 'Officer', 'NCOIC', 'NCO', 'Soldier']:
            raise HTTPException(status.HTTP_401_UNAUTHORIZED, 'Not Authorized')


SoldierRouter = APIRouter(prefix='/api/soldier', tags=['protected', 'soldier'], dependencies=[Depends(authorize)])
SoldierRouter.include_router(profile)
SoldierRouter.include_router(training)

@SoldierRouter.get('/', status_code=status.HTTP_200_OK)
def test():
    return 'Soldier API - Test Sucessful'

__all__ = ['SoldierRouter']