import uuid
from pathlib import Path

from fastapi import APIRouter, File, HTTPException, UploadFile, status

from app.core.config import settings
from app.core.dependencies import ActiveUser, DbSession, SuperAdmin
from app.modules.admin import service
from app.modules.admin.schemas import DashboardStats, UserResource
from app.modules.auth.models import User
from app.modules.auth.schemas import MessageResponse
from app.modules.blog.models import Blog
from app.modules.project.models import Project
from app.modules.team_member.models import TeamMember

router = APIRouter(tags=["admin"])


# ─── Dashboard ────────────────────────────────────────────
@router.get("/admin/dashboard", response_model=DashboardStats)
async def dashboard(db: DbSession, user: SuperAdmin):
    stats = await service.get_dashboard_stats(db)
    return DashboardStats(**stats)


@router.get("/admin/approvals", response_model=dict)
async def approvals(db: DbSession, user: SuperAdmin):
    pending = await service.get_pending_items(db)
    from app.modules.blog.schemas import BlogResource
    from app.modules.project.schemas import ProjectResource
    from app.modules.team_member.schemas import TeamMemberResource

    return {
        "blogs": [BlogResource.from_model(b) for b in pending["blogs"]],
        "team_members": [TeamMemberResource.from_model(m) for m in pending["team_members"]],
        "projects": [ProjectResource.from_model(p) for p in pending["projects"]],
    }


@router.post("/admin/approve/{content_type}/{content_id}", response_model=MessageResponse)
async def approve_content(
    content_type: str, content_id: int, db: DbSession, user: SuperAdmin
) -> MessageResponse:
    model_map = {
        "blogs": Blog,
        "team-members": TeamMember,
        "projects": Project,
    }
    model = model_map.get(content_type)
    if model is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid content type.")

    item = await db.get(model, content_id)
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Content not found.")

    item.status = "approved"
    await db.flush()
    return MessageResponse(message=f"{content_type} approved successfully.")


@router.post("/admin/reject/{content_type}/{content_id}", response_model=MessageResponse)
async def reject_content(
    content_type: str, content_id: int, db: DbSession, user: SuperAdmin
) -> MessageResponse:
    model_map = {
        "blogs": Blog,
        "team-members": TeamMember,
        "projects": Project,
    }
    model = model_map.get(content_type)
    if model is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid content type.")

    item = await db.get(model, content_id)
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Content not found.")

    item.status = "rejected"
    await db.flush()
    return MessageResponse(message=f"{content_type} rejected successfully.")


# ─── User Management ──────────────────────────────────────
@router.get("/admin/users", response_model=dict)
async def users_list(db: DbSession, user: SuperAdmin):
    users = await service.list_users(db)
    return {"data": [UserResource.from_model(u) for u in users]}


@router.post("/admin/users/{user_id}/activate", response_model=MessageResponse)
async def activate_user(user_id: int, db: DbSession, user: SuperAdmin) -> MessageResponse:
    target = await db.get(User, user_id)
    if target is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
    target.is_active = True
    await db.flush()
    return MessageResponse(message="User activated successfully.")


@router.post("/admin/users/{user_id}/deactivate", response_model=MessageResponse)
async def deactivate_user(user_id: int, db: DbSession, user: SuperAdmin) -> MessageResponse:
    target = await db.get(User, user_id)
    if target is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
    target.is_active = False
    await db.flush()
    return MessageResponse(message="User deactivated successfully.")


# ─── Image Upload ─────────────────────────────────────────
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB


@router.post("/admin/upload-image", response_model=dict)
async def upload_image(
    file: UploadFile = File(...),
    user: ActiveUser = None,
):
    ext = Path(file.filename).suffix.lower() if file.filename else ""
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File type {ext} not allowed. Accepted: {', '.join(sorted(ALLOWED_EXTENSIONS))}",
        )

    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File size exceeds 5MB limit.",
        )

    upload_dir = Path("uploads")
    upload_dir.mkdir(exist_ok=True)

    filename = f"{uuid.uuid4().hex}{ext}"
    filepath = upload_dir / filename
    filepath.write_bytes(content)

    url = f"/uploads/{filename}"
    return {"url": url, "filename": filename}
