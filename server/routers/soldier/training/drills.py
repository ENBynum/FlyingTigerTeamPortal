from dotenv import load_dotenv
from fastapi import APIRouter, Depends, status
from models import Profile
from models.unit import CompanyUnit
from models.training import Drill
from utils.JSONResponseWithTokens import JSONResponseWithTokens
from middleware.authenticated import authenticated
from utils.raven_database.databases import PortalDB

load_dotenv()

router = APIRouter()

@router.get('/drill', status_code=status.HTTP_200_OK)
def drills(dodid: str = Depends(authenticated)):
    with PortalDB().store().open_session() as portal:
        profile = portal.load(f'Profiles/{dodid}', Profile)
        company = portal.load(profile.unit, CompanyUnit)
        drills = sorted([portal.load(drill, Drill).doc() for drill in company.battle_assemblies], key=lambda drill: drill['start_date'])

        return JSONResponseWithTokens(dodid, {'training': drills})