import secrets

from slugify import slugify
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.enums import ContentStatus
from app.modules.blog.models import Blog


async def _slug_exists(db: AsyncSession, slug: str, exclude_id: int | None = None) -> bool:
    stmt = select(Blog.id).where(Blog.slug == slug)
    if exclude_id is not None:
        stmt = stmt.where(Blog.id != exclude_id)
    result = await db.execute(stmt)
    return result.first() is not None


async def unique_slug(db: AsyncSession, title: str, exclude_id: int | None = None) -> str:
    """Generate a unique slug, appending a short random suffix on collision.

    Matches BlogController slug handling.
    """
    base = slugify(title)
    if await _slug_exists(db, base, exclude_id):
        return f"{base}-{secrets.token_hex(3)[:5]}"
    return base


async def list_published(db: AsyncSession, per_page: int = 15, page: int = 1) -> list[Blog]:
    """Approved + published, newest first (public listing)."""
    now = func.now()
    stmt = (
        select(Blog)
        .where(Blog.status == ContentStatus.APPROVED)
        .where(Blog.published_at.is_not(None))
        .where(Blog.published_at <= now)
        .order_by(Blog.published_at.desc())
        .limit(per_page)
        .offset((page - 1) * per_page)
    )
    result = await db.execute(stmt)
    return list(result.scalars().all())


async def get_by_slug(db: AsyncSession, slug: str) -> Blog | None:
    result = await db.execute(select(Blog).where(Blog.slug == slug))
    return result.scalar_one_or_none()


async def get_by_id(db: AsyncSession, blog_id: int) -> Blog | None:
    return await db.get(Blog, blog_id)
