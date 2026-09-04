from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import auth, journal, goals, games, risk

# Dev convenience: auto-create tables. Switch to Alembic migrations before
# anything resembling real data.
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Wellness Companion API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten before real deployment
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth")
app.include_router(journal.router)
app.include_router(goals.router)
app.include_router(games.router)
app.include_router(risk.router)


@app.get("/health")
def health():
    return {"status": "ok"}
