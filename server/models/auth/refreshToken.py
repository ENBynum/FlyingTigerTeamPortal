from typing import Optional

from pydantic import BaseModel


class RefreshToken(BaseModel):
    Id: Optional[str] = None
    dodid: str
    token: str
    expires: int|float
 
    def model_post_init(self, __context):
        if not self.Id:
            self.Id = f'RefreshTokens/{self.dodid}'
        return super().model_post_init(__context)