import os
from typing import Literal, Optional
import bcrypt
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()


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