from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, status
from models import Profile, CompanyUnit, PlatoonUnit, SquadUnit, Drill
from starlette.responses import JSONResponse
from utils.JSONResponseWithTokens import JSONResponseWithTokens
from utils.middleware.authenticate import authenticated
from utils.raven_database.databases import PortalDB

load_dotenv()

unit_router = APIRouter(prefix='/api/unit')

@unit_router.get('/training/dates', status_code=status.HTTP_200_OK)
def battle_assembies(dodid: str = Depends(authenticated)):
    if not dodid:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Not Authenticated')
    
    try:
        with PortalDB.store().open_session() as portal_session:
            user_profile = portal_session.load(key_or_keys=f'Profiles/{dodid}', object_type=Profile)
            company = portal_session.load(key_or_keys=user_profile.unit, object_type=CompanyUnit)
            drills = []
            for assembly in company.battle_assemblies:
                item = portal_session.load(key_or_keys=assembly, object_type=Drill)
                drills.append(item.doc())
            
            return JSONResponseWithTokens(dodid=dodid, content={'training': drills})
    except Exception as error:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=error)
    
@unit_router.get('/companies', status_code=status.HTTP_200_OK)
def companies():
    try:
        with PortalDB.store().open_session() as portal_session:
            companies = list(portal_session.query_collection('CompanyUnits', CompanyUnit))
            data = [company.doc() for company in companies]
            return JSONResponse(data)
    except Exception as error:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={'message': error})
    
@unit_router.get('/platoons/{collection}/{companyID}', status_code=status.HTTP_200_OK)
def platoons(collection: str, companyID: str):
    try:
        with PortalDB.store().open_session() as portal_session:
            company = portal_session.load(f'{collection}/{companyID}', CompanyUnit)
            data = []
            for platoon in company.platoons:
                platoon_data = portal_session.load(platoon, PlatoonUnit)
                data.append(platoon_data.doc())
            return JSONResponse(data)
    except Exception as error:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={'message': error})
    
@unit_router.get('/squads/{collection}/{platoonID}', status_code=status.HTTP_200_OK)
def squads(collection: str, platoonID: str):
    try:
        with PortalDB.store().open_session() as portal_session:
            platoon = portal_session.load(f'{collection}/{platoonID}', PlatoonUnit)
            data = []
            for squad in platoon.squads:
                squad_data = portal_session.load(squad, SquadUnit)
                data.append(squad_data.doc())
            return JSONResponse(data)
    except Exception as error:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={'message': error})