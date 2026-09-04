from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.config import settings
from app.models.models import GameSession
from app.routers.risk import evaluate_risk

router = APIRouter(prefix="/games", tags=["games"])


@router.post("/steam/sync")
def sync_steam(user_id: str, steam_id: str, db: Session = Depends(get_db)):
    """
    Placeholder for Steam Web API call:
    GET https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/
        ?key={settings.steam_api_key}&steamid={steam_id}

    For hackathon: mock a session so the pipeline works end-to-end.
    """
    session = GameSession(
        user_id=user_id,
        source="steam",
        playtime_minutes=120,  # TODO: replace with real API response parsing
    )
    db.add(session)
    db.commit()

    evaluate_risk(user_id, db)

    return {"status": "synced", "playtime_minutes": session.playtime_minutes}


@router.get("/{user_id}")
def list_sessions(user_id: str, db: Session = Depends(get_db)):
    return db.query(GameSession).filter(GameSession.user_id == user_id).all()
