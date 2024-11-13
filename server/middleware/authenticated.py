import os
from datetime import UTC, datetime

from dotenv import load_dotenv
import jwt
from fastapi import Request
from models.auth import BlacklistToken, RefreshToken
from utils.raven_database.databases import AuthDB

load_dotenv()


def authenticated(req: Request):
    access_token = req.cookies.get('accessToken')
    refresh_token = req.cookies.get('refreshToken')

    if not access_token or not refresh_token:
        return
    
    try:
        with AuthDB.store().open_session() as session:
            blacklist_token = session.load(key_or_keys=f'BlacklistTokens/{access_token}', object_type=BlacklistToken)
            if blacklist_token is not None:
                return
            
        access_payload = jwt.decode(access_token, os.getenv('ACCESS_TOKEN_SECRET'), algorithms=os.getenv('ALGORITHM'))
        if datetime.now(UTC).timestamp() > float(access_payload['expires']):
            with AuthDB.store().open_session() as session:
                saved_refresh_token = session.load(key_or_keys=f'RefreshTokens/{access_payload["dodid"]}', object_type=RefreshToken)
                if not saved_refresh_token:
                    return
            
            refresh_payload = jwt.decode(refresh_token, os.getenv('REFRESH_TOKEN_SECRET'), algorithms=os.getenv('ALGORITHM'))
            if datetime.now(UTC).timestamp() > float(refresh_payload['expires']):
                return
            
            return refresh_payload['dodid']
        
        return access_payload['dodid']
    except Exception as error:
        print(error)