from dotenv import load_dotenv
from fastapi import APIRouter, Depends, status
from models import (Credential, DecisionRequest, NewRSTRequest, Profile,
                    RSTRequest)
from starlette.responses import JSONResponse
from utils.JSONResponseWithTokens import JSONResponseWithTokens
from utils.middleware.authenticate import authenticated
from utils.raven_database.databases import RSTDB, AuthDB

load_dotenv()

rst_router = APIRouter()

@rst_router.post('/new', status_code=status.HTTP_201_CREATED)
def new_rst_request(req: NewRSTRequest, dodid: str = Depends(authenticated)):
    if not dodid:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={'message': 'Not Authenticated'})
    
    try:
        request = RSTRequest(**req.model_dump())
        with AuthDB.store().open_session() as session:
            user_profile = session.load(key_or_keys=f'Profiles/{dodid}', object_type=Profile)
            request.set_user_signature(profile=user_profile)
        with RSTDB.store().open_session() as session:
            session.store(request)
            session.save_changes()

        return JSONResponseWithTokens(dodid=dodid)
    except Exception as error:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={'message': error})

@rst_router.put('/supervisor-decision', status_code=status.HTTP_200_OK)
def supervisor_decision(req: DecisionRequest, dodid: str = Depends(authenticated)):
    if not dodid:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={'message': 'Not Authenticated'})
    
    try:
        with AuthDB.store().open_session() as auth_session:
            with RSTDB.store().open_session() as rst_session:
                supervisor_credentials = auth_session.load(key_or_keys=f'Credentials/{dodid}', object_type=Credential)
                if supervisor_credentials.role not in ['Acting Platoon Sergeant', 'Platoon Sergeant', 'Section Leader', 'Platoon Leader']:
                    return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={'message': 'Insufficient Privileges'})

                supervisor_profile = auth_session.load(key_or_keys=f'Profiles/{dodid}', object_type=Profile)
                rst_request = rst_session.load(key_or_keys=req.request_id, object_type=RSTRequest)
                soldier_profile = auth_session.load(key_or_keys=f'Profiles/{rst_request.dodid}', object_type=Profile)
                if supervisor_profile.platoon != soldier_profile.platoon:
                    return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={'message': 'Insufficient Privileges'})
                
                rst_request.set_supervisor_signature(recommendation=req.decision, profile=supervisor_profile)
                rst_session.save_changes()

        return JSONResponseWithTokens(dodid=dodid)
    except Exception as error:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={'message': error})

@rst_router.put('/commander-decision', status_code=status.HTTP_200_OK)
def commander_decision(req: DecisionRequest, dodid: str = Depends(authenticated)):
    if not dodid:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={'message': 'Not Authenticated'})
    
    try:
        with AuthDB.store().open_session() as auth_session:
            with RSTDB.store().open_session() as rst_session:
                commander_credentials = auth_session.load(key_or_keys=f'Credentials/{dodid}', object_type=Credential)
                if commander_credentials.role not in ['Acting Commander', 'Commander']:
                    return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={'message': 'Insufficient Privileges'})

                commander_profile = auth_session.load(key_or_keys=f'Profiles/{dodid}', object_type=Profile)
                rst_request = rst_session.load(key_or_keys=req.request_id, object_type=RSTRequest)
                rst_request.set_commander_signature(recommendation=req.decision, profile=commander_profile)
                rst_session.save_changes()

        return JSONResponseWithTokens(dodid=dodid)
    except Exception as error:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={'message': error})