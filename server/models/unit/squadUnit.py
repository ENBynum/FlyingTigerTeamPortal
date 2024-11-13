from typing import Optional

from pydantic import BaseModel


class SquadUnit(BaseModel):
    Id: Optional[str] = None
    name: str
    platoon: str
    soliders: list[str]

    def doc(self):
        return {
            'Id': self.Id,
            'name': self.name,
            'platoon': self.platoon,
            'soliders': self.soliders
        }