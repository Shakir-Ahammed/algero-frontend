"""Seed an initial super admin user.

Usage:
    python -m scripts.seed
"""

import asyncio
import os

from sqlalchemy import select

from app.core.enums import UserRole
from app.core.security import hash_password
from app.db.base import Base
from app.db.session import AsyncSessionLocal, engine
import app.db.models  # noqa: F401
from app.modules.auth.models import User

SUPER_ADMIN_EMAIL = os.getenv("SEED_ADMIN_EMAIL", "admin@algero.test")
SUPER_ADMIN_PASSWORD = os.getenv("SEED_ADMIN_PASSWORD", "password123")


async def main() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as db:
        existing = await db.execute(select(User).where(User.email == SUPER_ADMIN_EMAIL))
        if existing.scalar_one_or_none():
            print(f"Super admin {SUPER_ADMIN_EMAIL} already exists.")
            return

        user = User(
            name="Super Admin",
            email=SUPER_ADMIN_EMAIL,
            password=hash_password(SUPER_ADMIN_PASSWORD),
            role=UserRole.SUPER_ADMIN,
            is_active=True,
        )
        db.add(user)
        await db.commit()
        print(f"Created super admin: {SUPER_ADMIN_EMAIL} / {SUPER_ADMIN_PASSWORD}")

    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(main())
