import os
from typing import Literal, Optional

import bcrypt
from fastapi import APIRouter, HTTPException, status
from models.auth import Credential
from models import Name, Profile
from pydantic import BaseModel
from utils.raven_database.databases import AuthDB, PortalDB

router = APIRouter()

class RegisterRequest(BaseModel):
    dodid: str
    rank: str
    name: Name
    email: str
    phone: str 
    company: str
    platoon: str
    squad: str
    password: str
    credentialID: Optional[str] = None
    profileID: Optional[str] = None
    unit_level: Optional[Literal['Company', 'Platoon', 'Squad', 'Soldier']] = None
    unit: Optional[str] = None
    subunit: Optional[str] = None

    def model_post_init(self, __context):
        self.credentialID = f'Credentials/{self.dodid}'
        self.profileID = f'Profiles/{self.dodid}'
        self.unit = self.company
        if self.platoon == 'Command':
            self.unit_level = 'Company'
            self.subunit = self.company
        else:
            self.unit_level = 'Soldier'
            self.subunit = self.squad

        return super().model_post_init(__context)

    def credentials(self):
        return {
            'Id': self.credentialID,
            'role': 'Soldier',
            'admin': False,
            'profile': self.profileID,
            'email': self.email.lower(),
            'password': bcrypt.hashpw(
                (self.password + os.getenv('PASSWORD_PEPPER')).encode(),
                bcrypt.gensalt()).decode('utf-8'),
            'attempts': 0,
            'enabled': True
        }

    def profile(self):
        return {
            'Id': self.profileID,
            'dodid': self.dodid,
            'rank': self.rank.upper(),
            'name': self.name.to_doc(),
            'email': self.email.lower(),
            'phone': self.phone,
            'unit_level': self.unit_level,
            'unit': self.unit,
            'subunit': self.subunit
        }

@router.post('/register', status_code=status.HTTP_202_ACCEPTED)
def register(req: RegisterRequest):
    with AuthDB.store().open_session() as auth:
        if auth.load(f'Credentials/{req.dodid}', Credential) is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='DoD ID, Email Address, or Phone Number Associated w/ Existing User')
        credentials = list(auth.query_collection(collection_name='Credentials', object_type=Credential).where_equals('email', req.email))
        if not credentials:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='DoD ID, Email Address, or Phone Number Associated w/ Existing User')
        with PortalDB().store().open_session() as portal:
            if portal.load(f'Profiles/{req.dodid}', Profile) is not None:
                raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='DoD ID, Email Address, or Phone Number Associated w/ Existing User')
            profile = list(portal.query_collection(collection_name='Profiles', object_type=Profile).where_equals('dodid', req.dodid).or_else().where_equals('email', req.email).or_else().where_equals('phone', req.phone))
            if not profile:
                raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='DoD ID, Email Address, or Phone Number Associated w/ Existing User')

            auth.store(Credential(**req.credentials()))
            auth.save_changes()
            portal.store(Profile(**req.profile()))
            portal.save_changes()

    return