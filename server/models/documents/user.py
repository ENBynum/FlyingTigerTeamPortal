import os
from typing import Optional

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
    role: str
    email: str
    password: str
    attempts: int = 0
    enabled: bool = False

    def model_post_init(self, __context):
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
    platoon: str
    squad: str

    def model_post_init(self, __context):
        if self.Id is None:
            self.Id = f'Profiles/{self.dodid}'
        # if isinstance(self.name, Name):
        #     self.name = self.name.model_dump_json()
        return super().model_post_init(__context)