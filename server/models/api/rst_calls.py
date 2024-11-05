from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel


class NewRSTRequest(BaseModel):
    absence_dates: list[datetime, datetime]
    absence_periods: int
    absence_type: Literal['Excused/Absence Authorized', 'Excused/RST Authorized', 'Excused/ET Authorized', 'Exception of Unexcused Absence']
    absence_reason: str
    makeup_dates: list[datetime, datetime]
    makeup_location: str
    makeup_trainer: str
    makeup_uniform: Literal['ACU', 'PT', 'ASU']
    makeup_remarks: Optional[str]

class DecisionRequest(BaseModel):
    request_id: str
    decision: Literal['Approved', 'Denied']
