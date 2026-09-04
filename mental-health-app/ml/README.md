# ML Pipeline (ML Engineer)

Build and validate models independently here first (notebooks/scripts), then
port the finalized logic into `backend/app/ml/pipeline.py` — keep the
function signatures there stable (`score_text_entry`, `transcribe_and_score_audio`)
so Backend Lead and Flutter devs don't need to change their calling code.

## Suggested order
1. `notebooks/01_text_sentiment.ipynb` — pretrained DistilBERT sentiment/emotion
   on a few sample journal entries (use Dreaddit/GoEmotions for reference,
   not full fine-tuning during hackathon).
2. `notebooks/02_voice_pipeline.ipynb` — Whisper transcription + SpeechBrain
   tone/prosody scoring.
3. `notebooks/03_fusion_model.ipynb` — combine text/voice/behavioral/goal
   scores into a single risk index. Keep it simple (logistic regression or
   weighted average) so it's explainable.
4. Port final scoring functions into `backend/app/ml/pipeline.py`, replacing
   the mocked bodies.

## Output contract
Whatever you build must ultimately return a **0–100 float** for each score
component (`text_sentiment_score`, `voice_tone_score`) — see
`/docs/api_contract.md` and `/docs/db_schema.md` for the exact fields the
rest of the team expects.
