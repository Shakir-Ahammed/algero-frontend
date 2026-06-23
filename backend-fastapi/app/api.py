from fastapi import APIRouter

from app.modules.admin.router import router as admin_router
from app.modules.auth.router import router as auth_router
from app.modules.blog.router import router as blog_router
from app.modules.contact_lead.router import router as contact_lead_router
from app.modules.project.router import router as project_router
from app.modules.service.router import router as service_router
from app.modules.subscriber.router import router as subscriber_router
from app.modules.team_member.router import router as team_member_router

# Aggregated /api router. Mounted under "/api" in main.py to preserve
# the existing Laravel route paths consumed by the frontend.
api_router = APIRouter()
api_router.include_router(auth_router)
api_router.include_router(blog_router)
api_router.include_router(service_router)
api_router.include_router(team_member_router)
api_router.include_router(project_router)
api_router.include_router(subscriber_router)
api_router.include_router(contact_lead_router)
api_router.include_router(admin_router)
