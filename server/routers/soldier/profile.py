from fastapi import APIRouter, HTTPException, status
from fastapi.params import Depends
from models import Profile
from utils.JSONResponseWithTokens import JSONResponseWithTokens
from middleware.authenticated import authenticated
from utils.raven_database.databases import PortalDB

router = APIRouter(prefix='/profile')

@router.get('', status_code=status.HTTP_200_OK)
def profile(dodid: str = Depends(authenticated)):
    with PortalDB().store().open_session() as portal:
        profile = portal.load(f'Profiles/{dodid}', Profile)
        if not profile:
            raise HTTPException(status.HTTP_404_NOT_FOUND, 'Profile Not Found')

        return JSONResponseWithTokens(dodid, profile.doc())