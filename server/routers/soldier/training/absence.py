from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, status
from models.training.absence import RSTRequest
from utils.JSONResponseWithTokens import JSONResponseWithTokens
from middleware.authenticated import authenticated
from utils.raven_database.databases import PortalDB

load_dotenv()

router = APIRouter(prefix='/absence')

            
@router.get('', status_code=status.HTTP_200_OK)
def absence_all(dodid: str = Depends(authenticated)):
    with PortalDB().store().open_session() as portal:
        requests = list(portal.query_collection('RSTRequests', RSTRequest).where_equals('dodid', dodid))
        if len(requests) != 0:
            requests.sort(key=lambda request: request.absence_dates[0].timestamp())
            requests = [request.doc() for request in requests]

        return JSONResponseWithTokens(dodid, {'requests': requests})

@router.get('/{collection}/{requestID}', status_code=status.HTTP_200_OK)
def absenceID(collection: str, requestID: str, dodid: str = Depends(authenticated)):
    with PortalDB().store().open_session() as portal:
        request = portal.load(f'{collection}/{requestID}', RSTRequest)
        if not request:
            raise HTTPException(status.HTTP_404_NOT_FOUND, 'RST Request Not Found')

        return JSONResponseWithTokens(dodid, {'request': request.doc()}) 

@router.post('', status_code=status.HTTP_202_ACCEPTED)
def absence(req: RSTRequest, dodid: str = Depends(authenticated)):
    if not req.set_soldier_signature(dodid):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, 'Not Authorized')
    
    with PortalDB().store().open_session() as portal:
        portal.store(req)
        portal.save_changes()

    return JSONResponseWithTokens(dodid)