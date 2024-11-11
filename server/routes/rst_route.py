from datetime import UTC, datetime
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, status
from models import DecisionRequest, RSTRequest
from starlette.responses import JSONResponse
from utils.JSONResponseWithTokens import JSONResponseWithTokens
from utils.middleware.authenticate import authenticated
from utils.raven_database.databases import PortalDB

load_dotenv()

rst_router = APIRouter(prefix='/api/rst')

@rst_router.get('/soldier/pending', status_code=status.HTTP_200_OK)
def pending_rst_requests(dodid: str = Depends(authenticated)):
    if not dodid:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={'message': 'Not Authenticated'})
    
    try:
        with PortalDB.store().open_session() as portal_session:
            rst_requests = list(portal_session.query(object_type=RSTRequest).where_equals('dodid', dodid).and_also().where_equals('commander_signature', None))
            requests = []
            for request in rst_requests:
                if request.absence_dates[0].timestamp() >= datetime.now(UTC).timestamp():
                    requests.append(request.doc())
            return JSONResponseWithTokens(dodid=dodid, content={'requests': requests})
    except Exception as error:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={'message': error})
    
@rst_router.get('/user/completed', status_code=status.HTTP_200_OK)
def completed_rst_requests(dodid: str = Depends(authenticated)):
    if not dodid:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={'message': 'Not Authenticated'})
    
    try:
        with PortalDB.store().open_session() as portal_session:
            rst_requests = list(portal_session.query(object_type=RSTRequest).where_equals('dodid', dodid).and_also().where_not_equals('commander_signature', None))
            requests = []
            for request in rst_requests:
                if request.absence_dates[0].strptime('%Y-%m-%d').timestamp() >= datetime.now(UTC).timestamp():
                    requests.append(request.doc())
            return JSONResponseWithTokens(dodid=dodid, content={'requests': requests})
    except Exception as error:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={'message': error})

@rst_router.get('/user/past', status_code=status.HTTP_200_OK)
def past_rst_requests(dodid: str = Depends(authenticated)):
    if not dodid:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={'message': 'Not Authenticated'})
    
    try:
        with PortalDB.store().open_session() as portal_session:
            rst_requests = list(portal_session.query(object_type=RSTRequest).where_equals('dodid', dodid))
            requests = []
            for request in rst_requests:
                if request.absence_dates[0].timestamp() < datetime.now(UTC).timestamp():
                    requests.append(request.doc())
            return JSONResponseWithTokens(dodid=dodid, content={'requests': requests})
    except Exception as error:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={'message': error})

@rst_router.post('/new', status_code=status.HTTP_201_CREATED)
def new_rst_request(req: RSTRequest, dodid: str = Depends(authenticated)):
    if not dodid:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, 'Not Authenticated')
    
    print(req)

    if not req.set_soldier_signature(dodid):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, 'Not Authorized')
    
    try:
        with PortalDB().store().open_session() as portal_session:
            portal_session.store(req)
            portal_session.save_changes()
    except:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, 'Failed to Submit RST Request')

    return JSONResponseWithTokens(dodid=dodid)

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