from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import (
    JournalEntry, NlpScore, GameSession, Goal, GoalCompletion,
    RiskScore, Escalation,
)
from app.schemas import RiskHistoryOut

router = APIRouter(prefix="/risk", tags=["risk"])

# Thresholds — tune during testing. Scale assumed 0 (low risk) - 100 (high risk).
MEDIUM_THRESHOLD = 40
HIGH_THRESHOLD = 70


def _latest_text_voice_scores(user_id: str, db: Session):
    latest_entry = (
        db.query(JournalEntry)
        .filter(JournalEntry.user_id == user_id)
        .order_by(JournalEntry.timestamp.desc())
        .first()
    )
    if not latest_entry or not latest_entry.nlp_score:
        return None, None
    return latest_entry.nlp_score.text_sentiment_score, latest_entry.nlp_score.voice_tone_score


def _behavioral_score(user_id: str, db: Session) -> float:
    sessions = db.query(GameSession).filter(GameSession.user_id == user_id).all()
    if not sessions:
        return 0.0
    # Placeholder heuristic: flag very low or very high playtime vs. a baseline.
    # Replace with real trend/variance model.
    avg_playtime = sum(s.playtime_minutes for s in sessions) / len(sessions)
    return min(avg_playtime / 10, 100.0)


def _goal_score(user_id: str, db: Session) -> float:
    goals = db.query(Goal).filter(Goal.user_id == user_id).all()
    if not goals:
        return 0.0
    total_completions = sum(
        db.query(GoalCompletion).filter(GoalCompletion.goal_id == g.id).count()
        for g in goals
    )
    # Higher completion = protective factor = lower contribution to risk
    return max(0.0, 50.0 - total_completions * 5)


def evaluate_risk(user_id: str, db: Session) -> RiskScore:
    """
    Single entry point for risk computation. Called after any journal, game,
    or goal event. Keep all fusion logic here — do not duplicate elsewhere.
    """
    text_score, voice_score = _latest_text_voice_scores(user_id, db)
    behavioral_score = _behavioral_score(user_id, db)
    goal_score = _goal_score(user_id, db)

    components = [s for s in [text_score, voice_score, behavioral_score, goal_score] if s is not None]
    fusion_risk_index = sum(components) / len(components) if components else 0.0

    # Trend vs. previous score
    prev = (
        db.query(RiskScore)
        .filter(RiskScore.user_id == user_id)
        .order_by(RiskScore.computed_at.desc())
        .first()
    )
    if prev is None:
        trend = "stable"
    elif fusion_risk_index > prev.fusion_risk_index + 5:
        trend = "rising"
    elif fusion_risk_index < prev.fusion_risk_index - 5:
        trend = "falling"
    else:
        trend = "stable"

    risk = RiskScore(
        user_id=user_id,
        text_score=text_score,
        voice_score=voice_score,
        behavioral_score=behavioral_score,
        goal_score=goal_score,
        fusion_risk_index=fusion_risk_index,
        trend=trend,
    )
    db.add(risk)
    db.commit()
    db.refresh(risk)

    _maybe_escalate(user_id, risk, db)

    return risk


def _maybe_escalate(user_id: str, risk: RiskScore, db: Session):
    tier = None
    if risk.fusion_risk_index >= HIGH_THRESHOLD:
        tier = "high"
    elif risk.fusion_risk_index >= MEDIUM_THRESHOLD:
        tier = "medium"

    if tier:
        escalation = Escalation(user_id=user_id, risk_score_id=risk.id, tier=tier)
        db.add(escalation)
        db.commit()
        # TODO: push notification / websocket event to app + counselor dashboard


@router.get("/{user_id}", response_model=RiskHistoryOut)
def get_risk_history(user_id: str, db: Session = Depends(get_db)):
    history = (
        db.query(RiskScore)
        .filter(RiskScore.user_id == user_id)
        .order_by(RiskScore.computed_at.asc())
        .all()
    )
    return RiskHistoryOut(user_id=user_id, history=history)
