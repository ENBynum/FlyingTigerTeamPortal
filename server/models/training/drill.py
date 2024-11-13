from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class Drill(BaseModel):
    Id: Optional[str] = None
    start_date: datetime
    end_date: datetime

    def model_post_init(self, __context):
        if self.Id is None:
            self.Id = f'Drills/{self.start_date.strftime('%Y-%m-%d')}.{self.end_date.strftime('%Y-%m-%d')}'
        return super().model_post_init(__context)

    def doc(self):
        return {
            'Id': self.Id,
            'start_date': self.start_date.strftime('%Y-%m-%d'), 
            'end_date': self.end_date.strftime('%Y-%m-%d')
        }