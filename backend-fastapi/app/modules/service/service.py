import secrets

from slugify import slugify
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.service.models import Service


async def _slug_exists(db: AsyncSession, slug: str, exclude_id: int | None = None) -> bool:
    stmt = select(Service.id).where(Service.slug == slug)
    if exclude_id is not None:
        stmt = stmt.where(Service.id != exclude_id)
    result = await db.execute(stmt)
    return result.first() is not None


async def unique_slug(db: AsyncSession, title: str, exclude_id: int | None = None) -> str:
    base = slugify(title)
    if await _slug_exists(db, base, exclude_id):
        return f"{base}-{secrets.token_hex(3)[:5]}"
    return base


async def list_active(db: AsyncSession) -> list[Service]:
    stmt = (
        select(Service)
        .where(Service.is_active == True)  # noqa: E712
        .order_by(Service.sort_order, Service.id)
    )
    result = await db.execute(stmt)
    return list(result.scalars().all())


async def list_all(db: AsyncSession) -> list[Service]:
    stmt = select(Service).order_by(Service.sort_order, Service.id)
    result = await db.execute(stmt)
    return list(result.scalars().all())


async def get_by_slug(db: AsyncSession, slug: str) -> Service | None:
    result = await db.execute(select(Service).where(Service.slug == slug))
    return result.scalar_one_or_none()


async def get_by_id(db: AsyncSession, service_id: int) -> Service | None:
    return await db.get(Service, service_id)
