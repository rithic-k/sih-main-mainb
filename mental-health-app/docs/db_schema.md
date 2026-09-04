# Database Schema (v0.1)

Source of truth lives in code at `backend/app/models/models.py`. This doc is
a human-readable mirror — update both together.

```
users
  id (uuid, pk)
  created_at
  consent_status (bool)
  consent_updated_at

journal_entries
  id (uuid, pk)
  user_id (fk -> users.id)
  type              # "text" | "voice"
  raw_content       # text entries
  audio_file_path   # voice entries
  transcript        # whisper output
  timestamp

nlp_scores
  id (uuid, pk)
  entry_id (fk -> journal_entries.id)
  text_sentiment_score
  emotion_labels (json)
  voice_tone_score
  computed_at

game_sessions
  id (uuid, pk)
  user_id (fk -> users.id)
  source            # "steam" | "play_games"
  playtime_minutes
  session_start
  session_end
  fetched_at

goals
  id (uuid, pk)
  user_id (fk -> users.id)
  title
  created_at

goal_completions
  id (uuid, pk)
  goal_id (fk -> goals.id)
  completed_at

risk_scores
  id (uuid, pk)
  user_id (fk -> users.id)
  text_score
  voice_score
  behavioral_score
  goal_score
  fusion_risk_index
  trend             # "rising" | "stable" | "falling"
  computed_at

escalations
  id (uuid, pk)
  user_id (fk -> users.id)
  risk_score_id (fk -> risk_scores.id)
  tier              # "medium" | "high"
  action_taken      # "peer_opted_in" | "counselor_opted_in" | "dismissed"
  timestamp

counselors
  id (uuid, pk)
  name
  region
  contact_info
  current_caseload
```

## Notes
- No PII fields anywhere — `users.id` is a random UUID, nothing links to
  real name/email/phone.
- `nlp_scores`, `risk_scores` are append-only time series — never update in
  place, always insert a new row so trend logic has history to work with.
- Migrations: use Alembic (`alembic revision --autogenerate`) once schema
  stabilizes. For the first days, `Base.metadata.create_all()` in
  `main.py` is fine.
