from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.enums import LeadStatus
from app.db.base import Base, TimestampMixin


class ContactLead(Base, TimestampMixin):
    __tablename__ = "contact_leads"

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(150), nullable=False)
    last_name: Mapped[str | None] = mapped_column(String(150), nullable=True)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    message: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(30), default=LeadStatus.NEW, nullable=False)
