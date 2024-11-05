from datetime import UTC, datetime
from typing import Literal, Optional

from models.documents.user import Profile
from pydantic import BaseModel


class RSTRequest(BaseModel):
    Id: Optional[str] = None
    dodid: Optional[str] = None
    absence_dates: list[datetime, datetime]
    absence_periods: int
    absence_type: Literal['Excused/Absence Authorized', 'Excused/RST Authorized', 'Excused/ET Authorized', 'Exception of Unexcused Absence']
    absence_reason: str
    makeup_dates: list[datetime, datetime]
    makeup_location: str
    makeup_trainer: str
    makeup_uniform: Literal['ACU', 'PT', 'ASU']
    makeup_remarks: Optional[str] = None
    user_signature: Optional[str] = None
    user_signature_date: Optional[str] = None
    supervisor_recommendation: Optional[Literal['Approved', 'Denied']] = None
    supervisor_signature: Optional[str] = None
    supervisor_signature_date: Optional[str] = None
    commander_decision: Optional[Literal['Approved', 'Denied']] = None
    commander_signature: Optional[str] = None
    commander_signature_date: Optional[str] = None

    def doc(self):
        return {
            'Id': self.Id,
            'dodid': self.dodid,
            'absence_dates': [self.absence_dates[0].strftime('%m/%d/%Y'), self.absence_dates[1].strftime('%m/%d/%Y')],
            'absence_periods': self.absence_periods,
            'absence_type': self.absence_type,
            'absence_reason': self.absence_reason,
            'makeup_dates': [self.makeup_dates[0].strftime('%m/%d/%Y'), self.makeup_dates[1].strftime('%m/%d/%Y')],
            'makeup_location': self.makeup_location,
            'makeup_trainer': self.makeup_trainer,
            'makeup_uniform': self.makeup_uniform,
            'makeup_remarks': self.makeup_remarks,
            'user_signature': self.user_signature,
            'user_signature_date': self.user_signature_date,
            'supervisor_recommendation': self.supervisor_recommendation,
            'supervisor_signature': self.supervisor_signature,
            'supervisor_signature_date': self.supervisor_signature_date,
            'commander_decision': self.commander_decision,
            'commander_signature': self.commander_signature,
            'commander_signature_date': self.commander_signature_date
        }

    def set_user_signature(self, profile: Profile):
        if not self.Id and not self.dodid:
            self.Id = f'RSTRequests/{profile.dodid}.{self.absence_dates[0].strftime('%m%d%Y')}.{self.absence_dates[1].strftime('%m%d%Y')}'
            self.dodid = profile.dodid

        now = datetime.now(UTC)
        if profile.name.middle is not None and profile.name.middle != '':
            self.user_signature = 'Digitally Signed: ' + f'{profile.dodid}.{profile.name.first}.{profile.name.middle[0]}.{profile.name.last}.{now.timestamp()}'.upper()
        else:
            self.user_signature = 'Digitally Signed: ' + f'{profile.dodid}.{profile.name.first}.{profile.name.last}.{now.timestamp()}'.upper()
        self.user_signature_date = now.strftime('%m/%d/%Y')

    def set_supervisor_signature(self, recommendation: Literal['Approved', 'Denied'], profile: Profile):
        self.supervisor_recommendation = recommendation
        now = datetime.now(UTC).timestamp()
        if profile.name.middle is not None and profile.name.middle != '':
            self.supervisor_signature = 'Digitally Signed: ' + f'{profile.dodid}.{profile.name.first}.{profile.name.middle[0]}.{profile.name.last}.{now.timestamp()}'.upper()
        else:
            self.supervisor_signature = 'Digitally Signed: ' + f'{profile.dodid}.{profile.name.first}.{profile.name.last}.{now.timestamp()}'.upper()
        self.supervisor_signature_date = now.strftime('%m/%d/%Y')

    def set_commander_signature(self, decision: Literal['Approved', 'Denied'], profile: Profile):
        self.commander_decision = decision
        now = datetime.now(UTC).timestamp()
        if profile.name.middle is not None and profile.name.middle != '':
            self.commander_signature = 'Digitally Signed: ' + f'{profile.dodid}.{profile.name.first}.{profile.name.middle[0]}.{profile.name.last}.{now.timestamp()}'.upper()
        else:
            self.commander_signature = 'Digitally Signed: ' + f'{profile.dodid}.{profile.name.first}.{profile.name.last}.{now.timestamp()}'.upper()
        self.commander_signature_date = now.strftime('%m/%d/%Y')
