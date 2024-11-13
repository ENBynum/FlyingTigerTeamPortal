from typing import Optional

from pydantic import BaseModel


class BlacklistToken(BaseModel):
    Id: Optional[str] = None
    dodid: str
    token: str
    expires: int|float

    def model_post_init(self, __context):
        if not self.Id:
            self.Id = f'BlacklistTokens/{self.token}'
        return super().model_post_init(__context)