import uuid
from datetime import datetime

from sqlalchemy import (
    Column, String, DateTime, Float, Integer, Boolean, ForeignKey, Text, JSON
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.database import Base


def gen_uuid():
    return str(uuid.uuid4())


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=False), primary_key=True, default=gen_uuid)
    created_at = Column(DateTime, default=datetime.utcnow)
    consent_status = Column(Boolean, default=False)
    consent_updated_at = Column(DateTime, nullable=True)

    journal_entries = relationship("JournalEntry", back_populates="user")
    goals = relationship("Goal", back_populates="user")
    game_sessions = relationship("GameSession", back_populates="user")
    risk_scores = relationship("RiskScore", back_populates="user")


class JournalEntry(Base):
    __tablename__ = "journal_entries"

    id = Column(UUID(as_uuid=False), primary_key=True, default=gen_uuid)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id"))
    type = Column(String)  # "text" | "voice"
    raw_content = Column(Text, nullable=True)          # text entries
    audio_file_path = Column(String, nullable=True)    # voice entries
    transcript = Column(Text, nullable=True)            # whisper output
    timestamp = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="journal_entries")
    nlp_score = relationship("NlpScore", back_populates="entry", uselist=False)


class NlpScore(Base):
    __tablename__ = "nlp_scores"

    id = Column(UUID(as_uuid=False), primary_key=True, default=gen_uuid)
    entry_id = Column(UUID(as_uuid=False), ForeignKey("journal_entries.id"))
    text_sentiment_score = Column(Float, nullable=True)
    emotion_labels = Column(JSON, nullable=True)
    voice_tone_score = Column(Float, nullable=True)
    computed_at = Column(DateTime, default=datetime.utcnow)

    entry = relationship("JournalEntry", back_populates="nlp_score")


class GameSession(Base):
    __tablename__ = "game_sessions"

    id = Column(UUID(as_uuid=False), primary_key=True, default=gen_uuid)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id"))
    source = Column(String)  # "steam" | "play_games"
    playtime_minutes = Column(Integer, default=0)
    session_start = Column(DateTime, nullable=True)
    session_end = Column(DateTime, nullable=True)
    fetched_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="game_sessions")


class Goal(Base):
    __tablename__ = "goals"

    id = Column(UUID(as_uuid=False), primary_key=True, default=gen_uuid)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id"))
    title = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="goals")
    completions = relationship("GoalCompletion", back_populates="goal")


class GoalCompletion(Base):
    __tablename__ = "goal_completions"

    id = Column(UUID(as_uuid=False), primary_key=True, default=gen_uuid)
    goal_id = Column(UUID(as_uuid=False), ForeignKey("goals.id"))
    completed_at = Column(DateTime, default=datetime.utcnow)

    goal = relationship("Goal", back_populates="completions")


class RiskScore(Base):
    __tablename__ = "risk_scores"

    id = Column(UUID(as_uuid=False), primary_key=True, default=gen_uuid)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id"))
    text_score = Column(Float, nullable=True)
    voice_score = Column(Float, nullable=True)
    behavioral_score = Column(Float, nullable=True)
    goal_score = Column(Float, nullable=True)
    fusion_risk_index = Column(Float)
    trend = Column(String, nullable=True)  # "rising" | "stable" | "falling"
    computed_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="risk_scores")


class Escalation(Base):
    __tablename__ = "escalations"

    id = Column(UUID(as_uuid=False), primary_key=True, default=gen_uuid)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id"))
    risk_score_id = Column(UUID(as_uuid=False), ForeignKey("risk_scores.id"))
    tier = Column(String)  # "medium" | "high"
    action_taken = Column(String, nullable=True)  # "peer_opted_in" | "counselor_opted_in" | "dismissed"
    timestamp = Column(DateTime, default=datetime.utcnow)


class Counselor(Base):
    __tablename__ = "counselors"

    id = Column(UUID(as_uuid=False), primary_key=True, default=gen_uuid)
    name = Column(String)
    region = Column(String, nullable=True)
    contact_info = Column(String, nullable=True)
    current_caseload = Column(Integer, default=0)
