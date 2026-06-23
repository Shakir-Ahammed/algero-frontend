from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.enums import ContentStatus
from app.modules.auth.models import User
from app.modules.blog.models import Blog
from app.modules.contact_lead.models import ContactLead
from app.modules.project.models import Project
from app.modules.service.models import Service
from app.modules.subscriber.models import Subscriber
from app.modules.team_member.models import TeamMember


async def get_dashboard_stats(db: AsyncSession) -> dict:
    blogs = (await db.execute(select(func.count(Blog.id)))).scalar() or 0
    team_members = (await db.execute(select(func.count(TeamMember.id)))).scalar() or 0
    services = (await db.execute(select(func.count(Service.id)))).scalar() or 0
    projects = (await db.execute(select(func.count(Project.id)))).scalar() or 0
    subscribers = (await db.execute(select(func.count(Subscriber.id)))).scalar() or 0
    leads = (await db.execute(select(func.count(ContactLead.id)))).scalar() or 0

    pending_blogs = (
        await db.execute(
            select(func.count(Blog.id)).where(Blog.status == ContentStatus.PENDING)
        )
    ).scalar() or 0
    pending_team_members = (
        await db.execute(
            select(func.count(TeamMember.id)).where(TeamMember.status == ContentStatus.PENDING)
        )
    ).scalar() or 0
    pending_projects = (
        await db.execute(
            select(func.count(Project.id)).where(Project.status == ContentStatus.PENDING)
        )
    ).scalar() or 0
    pending_users = (
        await db.execute(
            select(func.count(User.id)).where(User.is_active == False)  # noqa: E712
        )
    ).scalar() or 0

    return {
        "blogs": blogs,
        "team_members": team_members,
        "services": services,
        "projects": projects,
        "subscribers": subscribers,
        "leads": leads,
        "pending_blogs": pending_blogs,
        "pending_team_members": pending_team_members,
        "pending_projects": pending_projects,
        "pending_users": pending_users,
    }


async def get_pending_items(db: AsyncSession) -> dict:
    blogs = (await db.execute(
        select(Blog).where(Blog.status == ContentStatus.PENDING).order_by(Blog.id.desc())
    )).scalars().all()

    team_members = (await db.execute(
        select(TeamMember).where(TeamMember.status == ContentStatus.PENDING).order_by(TeamMember.id.desc())
    )).scalars().all()

    projects = (await db.execute(
        select(Project).where(Project.status == ContentStatus.PENDING).order_by(Project.id.desc())
    )).scalars().all()

    return {
        "blogs": blogs,
        "team_members": team_members,
        "projects": projects,
    }


async def list_users(db: AsyncSession) -> list[User]:
    result = await db.execute(select(User).order_by(User.id))
    return list(result.scalars().all())
