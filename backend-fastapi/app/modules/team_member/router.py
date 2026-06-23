from fastapi import APIRouter, HTTPException, status

from app.core.dependencies import ActiveUser, DbSession
from app.modules.auth.schemas import MessageResponse
from app.modules.team_member import service
from app.modules.team_member.models import TeamMember
from app.modules.team_member.schemas import (
    TeamMemberCreate,
    TeamMemberResource,
    TeamMemberUpdate,
)

router = APIRouter(tags=["team-members"])


# ─── Public ───────────────────────────────────────────────
@router.get("/team-members", response_model=dict)
async def index(db: DbSession):
    members = await service.list_approved(db)
    return {"data": [TeamMemberResource.from_model(m) for m in members]}


@router.get("/team-members/{member_id}", response_model=TeamMemberResource)
async def show(member_id: int, db: DbSession) -> TeamMemberResource:
    member = await service.get_by_id(db, member_id)
    if member is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Team member not found.")
    return TeamMemberResource.from_model(member)


# ─── Admin ────────────────────────────────────────────────
@router.get("/admin/team-members", response_model=dict)
async def admin_index(db: DbSession, user: ActiveUser):
    members = await service.list_all(db)
    return {"data": [TeamMemberResource.from_model(m) for m in members]}


@router.post("/admin/team-members", response_model=TeamMemberResource, status_code=status.HTTP_201_CREATED)
async def store(payload: TeamMemberCreate, db: DbSession, user: ActiveUser) -> TeamMemberResource:
    member = TeamMember(
        name=payload.name,
        role=payload.role,
        bio=payload.bio,
        image=payload.image,
        social_linkedin=payload.social_linkedin,
        social_twitter=payload.social_twitter,
        social_github=payload.social_github,
        sort_order=payload.sort_order,
        status="approved" if user.is_super_admin else "pending",
    )
    db.add(member)
    await db.flush()
    await db.refresh(member)
    return TeamMemberResource.from_model(member)


@router.put("/admin/team-members/{member_id}", response_model=TeamMemberResource)
async def update(
    member_id: int, payload: TeamMemberUpdate, db: DbSession, user: ActiveUser
) -> TeamMemberResource:
    member = await service.get_by_id(db, member_id)
    if member is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Team member not found.")

    data = payload.model_dump(exclude_unset=True)
    for field, value in data.items():
        setattr(member, field, value)

    if not user.is_super_admin:
        member.status = "pending"

    await db.flush()
    await db.refresh(member)
    return TeamMemberResource.from_model(member)


@router.delete("/admin/team-members/{member_id}", response_model=MessageResponse)
async def destroy(member_id: int, db: DbSession, user: ActiveUser) -> MessageResponse:
    member = await service.get_by_id(db, member_id)
    if member is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Team member not found.")
    await db.delete(member)
    return MessageResponse(message="Team member deleted successfully.")


@router.post("/admin/team-members/reorder", response_model=MessageResponse)
async def reorder_team_members(
    payload: list[int], db: DbSession, user: ActiveUser
) -> MessageResponse:
    await service.reorder(db, payload)
    return MessageResponse(message="Team members reordered successfully.")
