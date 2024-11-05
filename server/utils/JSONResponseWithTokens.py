import os
from datetime import UTC, datetime, timedelta

import jwt
from dotenv import load_dotenv
from fastapi.responses import JSONResponse
from models import BlacklistToken, RefreshToken
from utils.raven_database.databases import AuthDB

load_dotenv()


def JSONResponseWithTokens(dodid: str, content: dict = {}) -> JSONResponse:
    access_exp = (datetime.now(UTC) + timedelta(minutes=int(os.getenv('ACCESS_TOKEN_EXP')))).timestamp()
    access_token = jwt.encode(
        {'dodid': dodid, 'expires': access_exp},
        os.getenv('ACCESS_TOKEN_SECRET'),
        os.getenv('ALGORITHM')
    )

    refresh_exp = (datetime.now(UTC) + timedelta(minutes=int(os.getenv('REFRESH_TOKEN_EXP')))).timestamp()
    refresh_token = jwt.encode(
        {'dodid': dodid, 'expires': refresh_exp},
        os.getenv('REFRESH_TOKEN_SECRET'),
        os.getenv('ALGORITHM')
    )

    with AuthDB.store().open_session() as session:
        saved_refresh_token = session.load(key_or_keys=f'RefreshTokens/{dodid}', object_type=RefreshToken)
        if saved_refresh_token is not None:
            saved_refresh_token.token = refresh_token
            saved_refresh_token.expires = refresh_exp            
        else: 
            session.store(RefreshToken(dodid=dodid, token=refresh_token, expires=refresh_exp))
        session.save_changes()

    res = JSONResponse(content=content)
    res.set_cookie(key='accessToken', value=access_token, samesite=None, httponly=True, domain='10.0.0.252', secure=False, path='/')
    res.set_cookie(key='refreshToken', value=refresh_token, samesite=None, httponly=True, domain='10.0.0.252', secure=False, path='/')
    return res