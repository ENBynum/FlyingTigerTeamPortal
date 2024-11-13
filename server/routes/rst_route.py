from datetime import UTC, datetime
from typing import Literal
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from models.training import RSTRequest
from starlette.responses import JSONResponse
from utils.JSONResponseWithTokens import JSONResponseWithTokens
from middleware.authenticated import authenticated
from utils.raven_database.databases import PortalDB

load_dotenv()

rst_router = APIRouter(prefix='/api/rst')

RSTRouter = APIRouter(prefix='/api/rst')

class DecisionRequest(BaseModel):
    request_id: str
    decision: Literal['Approved', 'Denied']

@RSTRouter.post('/new', status_code=status.HTTP_201_CREATED)
def RST_New(req: RSTRequest, dodid: str = Depends(authenticated)):
    if not dodid:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, 'Not Authenticated')

    if not req.set_soldier_signature(dodid):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, 'Not Authorized')
    
    try:
        with PortalDB().store().open_session() as portal_session:
            portal_session.store(req)
            portal_session.save_changes()
    except:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, 'Failed to Submit RST Request')

    return JSONResponseWithTokens(dodid=dodid)

@RSTRouter.get(path='/soldier/dashboard', status_code=status.HTTP_200_OK)
def RST_Soldier_Dashboard(dodid: str = Depends(authenticated)):
    if not dodid:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, 'Not Authenticated')
    
    with PortalDB().store().open_session() as portal:
        requests = list(portal.query_collection('RSTRequests', RSTRequest).where_equals('dodid', dodid))
        if len(requests) != 0:
            requests.sort(key=lambda request: request.absence_dates[0].timestamp())
            requests = [request.doc() for request in requests]

        return JSONResponseWithTokens(dodid, {'requests': requests})

@rst_router.put('/supervisor-decision', status_code=status.HTTP_200_OK)
def supervisor_decision(req: DecisionRequest, dodid: str = Depends(authenticated)):
    if not dodid:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={'message': 'Not Authenticated'})
    
    try:
        with PortalDB.store().open_session() as portal_session:
            request = portal_session.load(req.request_id, RSTRequest)
            if request is None:
                return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={'message': 'Request Not Found'})
            
            if not request.set_supervisor_signature(req.decision, dodid):
                return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={'message': 'Not Authorized'})

            portal_session.save_changes()

        return JSONResponseWithTokens(dodid=dodid)
    except Exception as error:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={'message': error})

@rst_router.put('/commander-decision', status_code=status.HTTP_200_OK)
def commander_decision(req: DecisionRequest, dodid: str = Depends(authenticated)):
    if not dodid:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={'message': 'Not Authenticated'})
    
    try:
        with PortalDB.store().open_session() as portal_session:
            request = portal_session.load(req.request_id, RSTRequest)
            if request is None:
                return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={'message': 'Request Not Found'})
            
            if not request.set_commander_signature(req.decision, dodid):
                return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={'message': 'Not Authorized'})

            portal_session.save_changes()

        return JSONResponseWithTokens(dodid=dodid)
    except Exception as error:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={'message': error})