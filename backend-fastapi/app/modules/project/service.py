import secrets

from slugify import slugify
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.enums import ContentStatus
from app.modules.project.models import Project


async def _slug_exists(db: AsyncSession, slug: str, exclude_id: int | None = None) -> bool:
    stmt = select(Project.id).where(Project.slug == slug)
    if exclude_id is not None:
        stmt = stmt.where(Project.id != exclude_id)
    result = await db.execute(stmt)
    return result.first() is not None


async def unique_slug(db: AsyncSession, title: str, exclude_id: int | None = None) -> str:
    base = slugify(title)
    if await _slug_exists(db, base, exclude_id):
        return f"{base}-{secrets.token_hex(3)[:5]}"
    return base


async def list_public(db: AsyncSession) -> list[Project]:
    stmt = (
        select(Project)
        .where(Project.status == ContentStatus.APPROVED)
        .where(Project.is_active == True)  # noqa: E712
        .order_by(Project.is_featured.desc(), Project.sort_order, Project.id.desc())
    )
    result = await db.execute(stmt)
    return list(result.scalars().all())


async def list_all(db: AsyncSession) -> list[Project]:
    stmt = select(Project).order_by(Project.sort_order, Project.id.desc())
    result = await db.execute(stmt)
    return list(result.scalars().all())


async def get_by_slug(db: AsyncSession, slug: str) -> Project | None:
    result = await db.execute(
        select(Project).where(
            Project.slug == slug,
            Project.status == ContentStatus.APPROVED,
            Project.is_active == True,  # noqa: E712
        )
    )
    return result.scalar_one_or_none()


async def get_by_id(db: AsyncSession, project_id: int) -> Project | None:
    return await db.get(Project, project_id)
