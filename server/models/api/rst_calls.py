from typing import Literal

from pydantic import BaseModel


class DecisionRequest(BaseModel):
    request_id: str
    decision: Literal['Approved', 'Denied']
