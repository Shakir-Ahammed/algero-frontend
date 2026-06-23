from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.contact_lead.models import ContactLead


async def get_by_id(db: AsyncSession, lead_id: int) -> ContactLead | None:
    return await db.get(ContactLead, lead_id)


async def list_all(db: AsyncSession) -> list[ContactLead]:
    stmt = select(ContactLead).order_by(ContactLead.id.desc())
    result = await db.execute(stmt)
    return list(result.scalars().all())
