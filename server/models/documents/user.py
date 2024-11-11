import os
from typing import Literal, Optional

import bcrypt
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()

class Name(BaseModel):
    full: str
    last: str
    first: str
    middle: Optional[str]

    def to_doc(self) -> dict:
        return {
            'full': self.full.title(),
            'last': self.last.title(),
            'first': self.first.title(),
            'middle': self.middle.title()
        }

class Credential(BaseModel):
    Id: Optional[str] = None
    dodid: str
    role: Literal['OIC', 'Officer', 'NCOIC', 'NCO', 'Soldier']
    admin: bool
    profile: str
    email: str
    password: str
    attempts: int = 0
    enabled: bool = False

    def model_post_init(self, __context):
        print(self.Id)
        if self.Id is None:
            self.Id = f'Credentials/{self.dodid}'
        return super().model_post_init(__context)

    def check_password(self, password: str) -> bool:
        return bcrypt.checkpw((password + os.getenv('PASSWORD_PEPPER')).encode('utf-8'), self.password.encode('utf-8'))

class Profile(BaseModel):
    Id: Optional[str] = None
    dodid: str
    rank: str
    name: Name
    email: str
    phone: str
    unit_level: Literal['Company', 'Platoon', 'Squad', 'Soldier']
    unit: str
    subunit: str

    def model_post_init(self, __context):
        if self.Id is None:
            self.Id = f'Profiles/{self.dodid}'
        return super().model_post_init(__context)
    
    def doc(self) -> dict:
        return {
            'Id': self.Id,
            'dodid': self.dodid,
            'rank': self.rank.upper(),
            'name': self.name.to_doc(),
            'email': self.email.lower(),
            'phone': self.phone,
            'unit_level': self.unit_level,
            'unit': self.unit,
            'subunit': self.subunit
        }