from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.subscriber.models import Subscriber


async def get_by_email(db: AsyncSession, email: str) -> Subscriber | None:
    result = await db.execute(select(Subscriber).where(Subscriber.email == email))
    return result.scalar_one_or_none()


async def get_by_id(db: AsyncSession, subscriber_id: int) -> Subscriber | None:
    return await db.get(Subscriber, subscriber_id)


async def list_all(db: AsyncSession) -> list[Subscriber]:
    stmt = select(Subscriber).order_by(Subscriber.id.desc())
    result = await db.execute(stmt)
    return list(result.scalars().all())


async def subscribe(db: AsyncSession, email: str) -> tuple[Subscriber, bool]:
    """Subscribe an email. Returns (subscriber, is_new).

    If the email already exists and is inactive, reactivate it.
    """
    existing = await get_by_email(db, email)
    if existing:
        if existing.is_active:
            return existing, False
        existing.is_active = True
        existing.subscribed_at = datetime.now(timezone.utc)
        await db.flush()
        await db.refresh(existing)
        return existing, False

    subscriber = Subscriber(
        email=email,
        subscribed_at=datetime.now(timezone.utc),
        is_active=True,
    )
    db.add(subscriber)
    await db.flush()
    await db.refresh(subscriber)
    return subscriber, True
