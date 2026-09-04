from datetime import datetime, timedelta

from fastapi import APIRouter, Depends
from jose import jwt
from sqlalchemy.orm import Session

from app.database import get_db
from app.config import settings
from app.models.models import User
from app.schemas import UserCreate, UserOut, TokenOut

router = APIRouter(tags=["auth"])


def create_access_token(user_id: str) -> str:
    expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
    payload = {"sub": user_id, "exp": expire}
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)


@router.post("/signup", response_model=TokenOut)
def signup(payload: UserCreate, db: Session = Depends(get_db)):
    """
    Anonymous signup. No PII collected — user gets a random UUID.
    consent_status must be explicitly set from the onboarding screen.
    """
    user = User(consent_status=payload.consent_status, consent_updated_at=datetime.utcnow())
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(user.id)
    return TokenOut(access_token=token)


@router.get("/me", response_model=UserOut)
def get_me(db: Session = Depends(get_db)):
    # TODO: replace with real get_current_user dependency (decode JWT from header)
    user = db.query(User).first()
    return user
