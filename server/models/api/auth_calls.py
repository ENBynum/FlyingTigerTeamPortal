import os

import bcrypt
from models.documents.user import Name
from pydantic import BaseModel


class RegisterRequest(BaseModel):
    dodid: str
    rank: str
    name: Name
    email: str
    phone: str
    platoon: str
    squad: str
    password: str

    def credentials(self):
        return {
            'dodid': self.dodid,
            'role': 'User',
            'email': self.email.lower(),
            'password': bcrypt.hashpw(
                (self.password + os.getenv('PASSWORD_PEPPER')).encode(),
                bcrypt.gensalt()).decode('utf-8'),
            'attempts': 0,
            'enabled': True
        }

    def profile(self):
        return {
            'dodid': self.dodid,
            'rank': self.rank.upper(),
            'name': self.name.to_doc(),
            'email': self.email.lower(),
            'phone': self.phone,
            'platoon': self.platoon,
            'squad': self.squad
        }
    
class SignInRequest(BaseModel):
    email: str
    password: str