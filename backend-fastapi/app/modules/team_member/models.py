from sqlalchemy import Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.enums import ContentStatus
from app.db.base import Base, TimestampMixin


class TeamMember(Base, TimestampMixin):
    __tablename__ = "team_members"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    role: Mapped[str] = mapped_column(String(150), nullable=False)
    bio: Mapped[str | None] = mapped_column(Text, nullable=True)
    image: Mapped[str | None] = mapped_column(String(500), nullable=True)
    social_linkedin: Mapped[str | None] = mapped_column(String(300), nullable=True)
    social_twitter: Mapped[str | None] = mapped_column(String(300), nullable=True)
    social_github: Mapped[str | None] = mapped_column(String(300), nullable=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    status: Mapped[str] = mapped_column(String(20), default=ContentStatus.PENDING, nullable=False)
