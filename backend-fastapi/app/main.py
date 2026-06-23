from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api import api_router
from app.core.config import settings
from app.db.base import Base
from app.db.session import engine

# Import the model registry so metadata is populated.
import app.db.models  # noqa: F401


@asynccontextmanager
async def lifespan(app: FastAPI):
    # For local/dev convenience, ensure tables exist. Production uses Alembic.
    if settings.is_local:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()


app = FastAPI(title=settings.app_name, debug=settings.debug, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

# Serve uploaded images
uploads_dir = Path("uploads")
uploads_dir.mkdir(exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(uploads_dir)), name="uploads")


@app.get("/health", tags=["meta"])
async def health() -> dict:
    return {"status": "ok", "app": settings.app_name}
