from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class RefreshToken(BaseModel):
    Id: Optional[str] = None
    dodid: str
    token: str
    expires: datetime
 
    def model_post_init(self, __context):
        if not self.Id:
            self.Id = f'RefreshTokens/{self.dodid}'
        return super().model_post_init(__context)
    
class BlacklistToken(BaseModel):
    Id: Optional[str] = None
    dodid: str
    token: str
    expires: datetime

    def model_post_init(self, __context):
        if not self.Id:
            self.Id = f'BlacklistTokens/{self.token}'
        return super().model_post_init(__context)