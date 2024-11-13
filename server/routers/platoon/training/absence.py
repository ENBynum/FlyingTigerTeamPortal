from datetime import UTC, datetime
from typing import Literal
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from models import Profile
from models.training import RSTRequest
from starlette.responses import JSONResponse
from utils.JSONResponseWithTokens import JSONResponseWithTokens
from middleware.authenticated import authenticated
from utils.raven_database.databases import PortalDB

load_dotenv()

router = APIRouter(prefix='/absence')


@router.get('', status_code=status.HTTP_200_OK)
def requests(dodid: str = Depends(authenticated)):
    with PortalDB.store().open_session() as portal:
        profile = portal.load(f'Profiles/{dodid}', Profile)
        if not profile:
            raise HTTPException(status.HTTP_404_NOT_FOUND, detail='Not Authorized')
        
        requests = list(portal.query('RSTRequests', RSTRequest).where_equals('subunit', profile.subunit))
        if requests:
            requests.sort(key=lambda request: request['absence_dates'][0])
            requests = [request.doc() for request in requests]

    return JSONResponseWithTokens(dodid, {'requests': requests})

class Recommendation(BaseModel):
    request_id: str
    decision: Literal['Approved', 'Denied']

@router.put('/recommendation', status_code=status.HTTP_200_OK)
def recommendation(req: Recommendation, dodid: str = Depends(authenticated)):
    with PortalDB.store().open_session() as portal:
        request = portal.load(req.request_id, RSTRequest)
        if request is None:
            raise HTTPException(status.HTTP_404_NOT_FOUND, detail='Request Not Found')
        
        if not request.set_supervisor_signature(req.decision, dodid):
            raise HTTPException(status.HTTP_404_NOT_FOUND, detail='Not Authorized')

        portal.save_changes()

    return JSONResponseWithTokens(dodid)