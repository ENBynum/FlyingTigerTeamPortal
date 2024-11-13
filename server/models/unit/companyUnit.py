from typing import Optional

from pydantic import BaseModel


class CompanyUnit(BaseModel):
    Id: Optional[str] = None
    name: str
    platoons: list[str]
    battle_assemblies: list[str]

    def doc(self):
        return {
            'Id': self.Id,
            'name': self.name,
            'platoons': self.platoons,
            'battle_assemblies': self.battle_assemblies
        }