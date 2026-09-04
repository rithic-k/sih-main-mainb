"""
ML Engineer's integration point.

Keep the function signatures below stable — Backend Lead and Flutter devs are
building against them. Swap the mocked bodies for real model calls
(DistilBERT sentiment, Whisper transcription, SpeechBrain tone analysis)
without changing what callers pass in or expect back.
"""

from sqlalchemy.orm import Session

from app.models.models import NlpScore


def score_text_entry(entry_id: str, text: str, db: Session) -> NlpScore:
    """
    TODO(ML Engineer): replace with real DistilBERT sentiment/emotion scoring.
    Expected score range: 0 (low distress) - 100 (high distress).
    """
    mock_score = 30.0  # neutral placeholder
    mock_emotions = {"sentiment": "neutral", "emotions": []}

    score = NlpScore(
        entry_id=entry_id,
        text_sentiment_score=mock_score,
        emotion_labels=mock_emotions,
    )
    db.add(score)
    db.commit()
    return score


def transcribe_and_score_audio(entry_id: str, audio_path: str, db: Session) -> NlpScore:
    """
    TODO(ML Engineer): replace with real Whisper transcription +
    SpeechBrain/Wav2Vec2 tone analysis.
    """
    mock_transcript = "[transcript placeholder]"
    mock_text_score = 30.0
    mock_voice_score = 30.0

    # Update the parent JournalEntry's transcript field
    from app.models.models import JournalEntry
    entry = db.query(JournalEntry).filter(JournalEntry.id == entry_id).first()
    if entry:
        entry.transcript = mock_transcript
        db.commit()

    score = NlpScore(
        entry_id=entry_id,
        text_sentiment_score=mock_text_score,
        voice_tone_score=mock_voice_score,
        emotion_labels={"sentiment": "neutral", "emotions": []},
    )
    db.add(score)
    db.commit()
    return score
