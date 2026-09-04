-- SEERA PostgreSQL / Supabase Schema

-- 1. Users & Auth
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  age_tier TEXT DEFAULT 'adult',
  is_minor BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  bio TEXT,
  avatar TEXT,
  selected_hobbies JSONB DEFAULT '[]'::jsonb,
  streak_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Goals & Milestones
CREATE TABLE IF NOT EXISTS goals (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  state TEXT DEFAULT 'NOT_STARTED',
  target_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS goal_milestones (
  id TEXT PRIMARY KEY,
  goal_id TEXT REFERENCES goals(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ
);

-- 4. Game Sessions & Reflections
CREATE TABLE IF NOT EXISTS game_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  game_type TEXT NOT NULL,
  score INT DEFAULT 0,
  duration_seconds INT DEFAULT 0,
  difficulty TEXT,
  completed_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS game_reflections (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  game_session_id TEXT,
  game_type TEXT NOT NULL,
  q1_enjoyment INT,
  q2_challenge INT,
  q3_strategy INT,
  q4_focus INT,
  q5_mood_after INT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Journals & Voice Transcripts
CREATE TABLE IF NOT EXISTS journal_entries (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT NOT NULL,
  mood TEXT,
  is_voice BOOLEAN DEFAULT false,
  sentiment_score FLOAT,
  detected_topics JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Personal Baselines & Temporal Change Events
CREATE TABLE IF NOT EXISTS personal_baselines (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  avg_daily_sentiment FLOAT DEFAULT 0.0,
  avg_daily_journal_count FLOAT DEFAULT 0.0,
  avg_daily_game_time FLOAT DEFAULT 0.0,
  avg_reflection_score FLOAT DEFAULT 0.0,
  baseline_established_at TIMESTAMPTZ DEFAULT now(),
  last_updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS change_events (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  direction TEXT NOT NULL,
  magnitude_pct FLOAT NOT NULL,
  duration_days INT NOT NULL,
  sustained BOOLEAN DEFAULT false,
  explanation TEXT NOT NULL,
  status TEXT DEFAULT 'pending_review',
  detected_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Counsellor Reviews & Support Sessions
CREATE TABLE IF NOT EXISTS counsellor_notes (
  id TEXT PRIMARY KEY,
  counsellor_id TEXT REFERENCES users(id),
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  note_text TEXT NOT NULL,
  follow_up_recommended BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS support_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  counsellor_id TEXT REFERENCES users(id),
  scheduled_time TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'scheduled',
  meeting_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
