from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import Goal, GoalCompletion
from app.schemas import GoalCreate, GoalOut

router = APIRouter(prefix="/goals", tags=["goals"])


@router.post("", response_model=GoalOut)
def create_goal(user_id: str, payload: GoalCreate, db: Session = Depends(get_db)):
    goal = Goal(user_id=user_id, title=payload.title)
    db.add(goal)
    db.commit()
    db.refresh(goal)
    return goal


@router.get("/{user_id}", response_model=list[GoalOut])
def list_goals(user_id: str, db: Session = Depends(get_db)):
    return db.query(Goal).filter(Goal.user_id == user_id).all()


@router.post("/{goal_id}/complete")
def complete_goal(goal_id: str, db: Session = Depends(get_db)):
    completion = GoalCompletion(goal_id=goal_id)
    db.add(completion)
    db.commit()
    return {"status": "ok"}
