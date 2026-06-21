from fastapi import APIRouter

from app.modules.auth.router import router as auth_router
from app.modules.blog.router import router as blog_router

# Aggregated /api router. Mounted under "/api" in main.py to preserve
# the existing Laravel route paths consumed by the frontend.
api_router = APIRouter()
api_router.include_router(auth_router)
api_router.include_router(blog_router)
