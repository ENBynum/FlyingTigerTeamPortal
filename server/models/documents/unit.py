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
    
class ET(BaseModel):
    Id: Optional[str] = None
    start_date: datetime
    end_date: datetime

    def model_post_init(self, __context):
        if self.Id is None:
            self.Id = f'ETs/{self.start_date.strftime('%Y-%m-%d')}.{self.end_date.strftime('%Y-%m-%d')}'
        return super().model_post_init(__context)

    def doc(self):
        return {
            'Id': self.Id,
            'start_date': self.start_date.strftime('%Y-%m-%d'), 
            'end_date': self.end_date.strftime('%Y-%m-%d')
        }

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