from datetime import UTC, datetime
from typing import Literal, Optional

from models.documents.user import Credential, Profile
from pydantic import BaseModel
from models.documents.unit import CompanyUnit, PlatoonUnit
from utils.raven_database.databases import AuthDB, PortalDB


class RSTRequest(BaseModel):
    Id: Optional[str] = None
    dodid: Optional[str] = None
    unit: Optional[str] = None
    subunit: Optional[str] = None
    absence_dates: list[datetime, datetime]
    absence_periods: int
    absence_type: Literal['Excused/Absence Authorized', 'Excused/RST Authorized', 'Excused/ET Authorized', 'Exception of Unexcused Absence']
    absence_reason: str
    makeup_dates: list[datetime, datetime]
    makeup_location: str
    makeup_trainer: str
    makeup_uniform: Literal['ACU', 'PT', 'ASU']
    makeup_remarks: Optional[str] = None
    soldier_signature: Optional[str] = None
    soldier_signature_date: Optional[str] = None
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
            'absence_dates': [self.absence_dates[0].strftime('%Y-%m-%d'), self.absence_dates[1].strftime('%Y-%m-%d')],
            'absence_periods': self.absence_periods,
            'absence_type': self.absence_type,
            'absence_reason': self.absence_reason,
            'makeup_dates': [self.makeup_dates[0].strftime('%Y-%m-%d'), self.makeup_dates[1].strftime('%Y-%m-%d')],
            'makeup_location': self.makeup_location,
            'makeup_trainer': self.makeup_trainer,
            'makeup_uniform': self.makeup_uniform,
            'makeup_remarks': self.makeup_remarks,
            'soldier_signature': self.soldier_signature,
            'soldier_signature_date': self.soldier_signature_date,
            'supervisor_recommendation': self.supervisor_recommendation,
            'supervisor_signature': self.supervisor_signature,
            'supervisor_signature_date': self.supervisor_signature_date,
            'commander_decision': self.commander_decision,
            'commander_signature': self.commander_signature,
            'commander_signature_date': self.commander_signature_date
        }

    def set_soldier_signature(self, dodid: str) -> bool:
        with PortalDB().store().open_session() as portal_session:
            profile = portal_session.load(f'Profiles/{dodid}', Profile)
            if profile is None:
                return False
            
            if self.Id is None:
                self.Id = f'RSTRequests/{profile.dodid}.{self.absence_dates[0].strftime('%Y-%m-%d')}.{self.absence_dates[1].strftime('%Y-%m-%d')}'
            if self.dodid is None:
                self.dodid = dodid
            
            self.unit = profile.unit
            company = portal_session.load(profile.unit, CompanyUnit)
            for platoonID in company.platoons:
                if platoonID == profile.subunit:
                    self.subunit = profile.subunit
                else:
                    platoon = portal_session.load(platoonID, PlatoonUnit)
                    for squadID in platoon.squads:
                        if squadID == profile.subunit:
                            self.subunit = platoonID
            
            now = datetime.now(UTC)
            if profile.name.middle is not None and profile.name.middle != '':
                self.soldier_signature = 'Digitally Signed: ' + f'{profile.dodid}.{profile.name.first}.{profile.name.middle[0]}.{profile.name.last}.{now.timestamp()}'.upper()
            else:
                self.soldier_signature = 'Digitally Signed: ' + f'{profile.dodid}.{profile.name.first}.{profile.name.last}.{now.timestamp()}'.upper()
            self.soldier_signature_date = now.strftime('%Y-%m-%d')
            
            return True

    def set_supervisor_signature(self, recommendation: Literal['Approved', 'Denied'], dodid: str) -> bool:
        with AuthDB().store().open_session() as auth_sesson:
            credentials = auth_sesson.load(f'Credentials/{dodid}', Credential)
            if credentials is None:
                return False
            if credentials.role not in ['NCOIC', 'OIC'] and not credentials.admin:
                return False

            with PortalDB().store().open_session() as portal_session:
                profile = portal_session.load(f'Profiles/{dodid}', Profile)
                if profile is None:
                    return False
                if profile.subunit != self.subunit or profile.unit_level not in ['Company', 'Platoon']:
                    if not credentials.admin:
                        return False
                
                self.supervisor_recommendation = recommendation

                now = datetime.now(UTC).timestamp()
                if profile.name.middle is not None and profile.name.middle != '':
                    self.supervisor_signature = 'Digitally Signed: ' + f'{profile.dodid}.{profile.name.first}.{profile.name.middle[0]}.{profile.name.last}.{now.timestamp()}'.upper()
                else:
                    self.supervisor_signature = 'Digitally Signed: ' + f'{profile.dodid}.{profile.name.first}.{profile.name.last}.{now.timestamp()}'.upper()
                self.supervisor_signature_date = now.strftime('%Y-%m-%d')
                return True

    def set_commander_signature(self, decision: Literal['Approved', 'Denied'], dodid: str) -> bool:
        with AuthDB().store().open_session() as auth_sesson:
            credentials = auth_sesson.load(f'Credentials/{dodid}', Credential)
            if credentials is None:
                return False
            if credentials.role not in ['NCOIC', 'OIC'] and not credentials.admin:
                return False
            
            with PortalDB().store().open_session() as portal_session:
                profile = portal_session.load(f'Profiles/{dodid}', Profile)
                if profile is None:
                    return False
                if profile.unit != self.unit or profile.unit_level != 'Company':
                    if not credentials.admin:
                        return False
            
                self.commander_decision = decision

                now = datetime.now(UTC).timestamp()
                if profile.name.middle is not None and profile.name.middle != '':
                    self.commander_signature = 'Digitally Signed: ' + f'{profile.dodid}.{profile.name.first}.{profile.name.middle[0]}.{profile.name.last}.{now.timestamp()}'.upper()
                else:
                    self.commander_signature = 'Digitally Signed: ' + f'{profile.dodid}.{profile.name.first}.{profile.name.last}.{now.timestamp()}'.upper()
                self.commander_signature_date = now.strftime('%Y-%m-%d')
                return True
