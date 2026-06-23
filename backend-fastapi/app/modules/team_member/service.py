from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.enums import ContentStatus
from app.modules.team_member.models import TeamMember


async def list_approved(db: AsyncSession) -> list[TeamMember]:
    stmt = (
        select(TeamMember)
        .where(TeamMember.status == ContentStatus.APPROVED)
        .order_by(TeamMember.sort_order, TeamMember.name)
    )
    result = await db.execute(stmt)
    return list(result.scalars().all())


async def list_all(db: AsyncSession) -> list[TeamMember]:
    stmt = select(TeamMember).order_by(TeamMember.sort_order, TeamMember.name)
    result = await db.execute(stmt)
    return list(result.scalars().all())


async def get_by_id(db: AsyncSession, member_id: int) -> TeamMember | None:
    return await db.get(TeamMember, member_id)


async def reorder(db: AsyncSession, ordered_ids: list[int]) -> None:
    """Update sort_order to match the order of IDs in the list."""
    for idx, member_id in enumerate(ordered_ids):
        member = await db.get(TeamMember, member_id)
        if member:
            member.sort_order = idx
    await db.flush()
