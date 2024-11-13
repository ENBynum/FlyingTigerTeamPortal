from fastapi import APIRouter, HTTPException, status
from fastapi.params import Depends

from models import Profile
from utils.JSONResponseWithTokens import JSONResponseWithTokens
from middleware.authenticated import authenticated
from utils.raven_database.databases import PortalDB


router = APIRouter()

@router.get('/', status_code=status.HTTP_200_OK)
def authenticate(dodid: str = Depends(authenticated)):
    if dodid is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not Authenticated")

    with PortalDB().store().open_session() as portal_session:
        profile = portal_session.load(f'Profiles/{dodid}', Profile)
        if profile is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not Authenticated")
        
        return JSONResponseWithTokens(dodid=profile.dodid, content={'dodid': profile.dodid, 'unit_level': profile.unit_level})