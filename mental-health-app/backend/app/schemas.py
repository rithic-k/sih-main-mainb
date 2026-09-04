from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel


# ---- Auth / Users ----
class UserCreate(BaseModel):
    consent_status: bool


class UserOut(BaseModel):
    id: str
    created_at: datetime
    consent_status: bool

    class Config:
        from_attributes = True


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ---- Journal ----
class JournalTextCreate(BaseModel):
    raw_content: str


class JournalEntryOut(BaseModel):
    id: str
    type: str
    raw_content: Optional[str] = None
    transcript: Optional[str] = None
    timestamp: datetime

    class Config:
        from_attributes = True


# ---- Goals ----
class GoalCreate(BaseModel):
    title: str


class GoalOut(BaseModel):
    id: str
    title: str
    created_at: datetime

    class Config:
        from_attributes = True


# ---- Risk ----
class RiskScoreOut(BaseModel):
    id: str
    fusion_risk_index: float
    trend: Optional[str] = None
    computed_at: datetime

    class Config:
        from_attributes = True


class RiskHistoryOut(BaseModel):
    user_id: str
    history: List[RiskScoreOut]
