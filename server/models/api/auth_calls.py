import os
from typing import Literal, Optional

import bcrypt
from models.documents.user import Name
from pydantic import BaseModel


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
    
class SignInRequest(BaseModel):
    email: str
    password: str