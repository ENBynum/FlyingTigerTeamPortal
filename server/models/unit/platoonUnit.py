from typing import Optional

from pydantic import BaseModel


class PlatoonUnit(BaseModel):
    Id: Optional[str] = None
    name: str
    company: str
    squads: list[str]

    def doc(self):
        return {
            'Id': self.Id,
            'name': self.name,
            'company': self.company,
            'squads': self.squads
        }