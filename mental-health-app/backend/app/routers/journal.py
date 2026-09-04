from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import JournalEntry
from app.schemas import JournalTextCreate, JournalEntryOut
from app.ml.pipeline import score_text_entry, transcribe_and_score_audio
from app.routers.risk import evaluate_risk

router = APIRouter(prefix="/journal", tags=["journal"])


@router.post("/text", response_model=JournalEntryOut)
def create_text_entry(
    user_id: str,  # TODO: pull from auth dependency instead of query param
    payload: JournalTextCreate,
    db: Session = Depends(get_db),
):
    entry = JournalEntry(user_id=user_id, type="text", raw_content=payload.raw_content)
    db.add(entry)
    db.commit()
    db.refresh(entry)

    # Fire NLP scoring (sync for hackathon simplicity; move to background task/queue later)
    score_text_entry(entry.id, payload.raw_content, db)

    # Recompute fusion risk index for this user
    evaluate_risk(user_id, db)

    return entry


@router.post("/voice", response_model=JournalEntryOut)
def create_voice_entry(
    user_id: str,
    audio: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    entry = JournalEntry(user_id=user_id, type="voice", audio_file_path=f"/uploads/{audio.filename}")
    db.add(entry)
    db.commit()
    db.refresh(entry)

    # TODO: save audio file to disk/object storage before this call
    transcribe_and_score_audio(entry.id, entry.audio_file_path, db)

    evaluate_risk(user_id, db)

    return entry


@router.get("/{user_id}", response_model=list[JournalEntryOut])
def list_entries(user_id: str, db: Session = Depends(get_db)):
    return db.query(JournalEntry).filter(JournalEntry.user_id == user_id).all()
