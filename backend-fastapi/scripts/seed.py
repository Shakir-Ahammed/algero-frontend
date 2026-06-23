"""Seed an initial super admin user + demo content.

Usage:
    python -m scripts.seed
"""

import asyncio
import os
from datetime import datetime, timezone

from sqlalchemy import select

from app.core.enums import ContentStatus, UserRole
from app.core.security import hash_password
from app.db.base import Base
from app.db.session import AsyncSessionLocal, engine
import app.db.models  # noqa: F401
from app.modules.auth.models import User
from app.modules.blog.models import Blog
from app.modules.contact_lead.models import ContactLead
from app.modules.project.models import Project
from app.modules.service.models import Service
from app.modules.subscriber.models import Subscriber
from app.modules.team_member.models import TeamMember

SUPER_ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", os.getenv("SEED_ADMIN_EMAIL", "admin@algero.test"))
SUPER_ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", os.getenv("SEED_ADMIN_PASSWORD", "password123"))
SEED_DEMO = os.getenv("SEED_DEMO", "true").lower() == "true"


async def main() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as db:
        # ── Super Admin ─────────────────────────────────
        existing = await db.execute(select(User).where(User.email == SUPER_ADMIN_EMAIL))
        if existing.scalar_one_or_none():
            print(f"Super admin {SUPER_ADMIN_EMAIL} already exists.")
        else:
            user = User(
                name="Super Admin",
                email=SUPER_ADMIN_EMAIL,
                password=hash_password(SUPER_ADMIN_PASSWORD),
                role=UserRole.SUPER_ADMIN,
                is_active=True,
            )
            db.add(user)
            await db.flush()
            print(f"Created super admin: {SUPER_ADMIN_EMAIL} / {SUPER_ADMIN_PASSWORD}")

        if not SEED_DEMO:
            await db.commit()
            await engine.dispose()
            return

        # ── Demo Admin ──────────────────────────────────
        existing_admin = await db.execute(select(User).where(User.email == "demo@algero.test"))
        if not existing_admin.scalar_one_or_none():
            admin = User(
                name="Demo Admin",
                email="demo@algero.test",
                password=hash_password(SUPER_ADMIN_PASSWORD),
                role=UserRole.ADMIN,
                is_active=True,
            )
            db.add(admin)
            await db.flush()
            print("Created demo admin: demo@algero.test")

        # ── Services ────────────────────────────────────
        existing_svc = await db.execute(select(Service).limit(1))
        if not existing_svc.scalar_one_or_none():
            services = [
                Service(title="Web Development", slug="web-development", description="Custom web applications built with modern technologies.", icon="Code", features=["React", "FastAPI", "PostgreSQL"], sort_order=1, is_active=True),
                Service(title="Mobile Apps", slug="mobile-apps", description="Native and cross-platform mobile applications.", icon="Smartphone", features=["React Native", "Flutter", "iOS", "Android"], sort_order=2, is_active=True),
                Service(title="UI/UX Design", slug="ui-ux-design", description="User-centered design that drives engagement.", icon="Palette", features=["Figma", "Prototyping", "User Research"], sort_order=3, is_active=True),
            ]
            db.add_all(services)
            await db.flush()
            print(f"Created {len(services)} demo services")

        # ── Team Members ────────────────────────────────
        existing_tm = await db.execute(select(TeamMember).limit(1))
        if not existing_tm.scalar_one_or_none():
            members = [
                TeamMember(name="Alice Johnson", role="Lead Developer", bio="Full-stack developer with 10+ years of experience.", social_linkedin="https://linkedin.com/in/alice", social_github="https://github.com/alice", sort_order=1, status=ContentStatus.APPROVED),
                TeamMember(name="Bob Smith", role="Designer", bio="Creative designer passionate about UX.", social_linkedin="https://linkedin.com/in/bob", sort_order=2, status=ContentStatus.APPROVED),
            ]
            db.add_all(members)
            await db.flush()
            print(f"Created {len(members)} demo team members")

        # ── Projects ────────────────────────────────────
        existing_proj = await db.execute(select(Project).limit(1))
        if not existing_proj.scalar_one_or_none():
            projects = [
                Project(title="Algero Platform", slug="algero-platform", category="Web Application", description="The main Algero platform.", tech=["FastAPI", "React", "PostgreSQL"], is_featured=True, is_active=True, status=ContentStatus.APPROVED),
                Project(title="Mobile Dashboard", slug="mobile-dashboard", category="Mobile App", description="Real-time analytics dashboard.", tech=["React Native", "Node.js"], is_featured=False, is_active=True, status=ContentStatus.APPROVED),
            ]
            db.add_all(projects)
            await db.flush()
            print(f"Created {len(projects)} demo projects")

        # ── Blogs ───────────────────────────────────────
        existing_blog = await db.execute(select(Blog).limit(1))
        if not existing_blog.scalar_one_or_none():
            blogs = [
                Blog(title="Welcome to Algero", slug="welcome-to-algero", category="General", excerpt="Introducing our new platform.", content="Full article content here.", author="Super Admin", read_time="3 min read", published_at=datetime.now(timezone.utc), status=ContentStatus.APPROVED, views=0),
            ]
            db.add_all(blogs)
            await db.flush()
            print(f"Created {len(blogs)} demo blogs")

        # ── Subscribers ─────────────────────────────────
        existing_sub = await db.execute(select(Subscriber).limit(1))
        if not existing_sub.scalar_one_or_none():
            subs = [
                Subscriber(email="subscriber1@example.com", subscribed_at=datetime.now(timezone.utc), is_active=True),
                Subscriber(email="subscriber2@example.com", subscribed_at=datetime.now(timezone.utc), is_active=True),
            ]
            db.add_all(subs)
            await db.flush()
            print(f"Created {len(subs)} demo subscribers")

        # ── Contact Leads ───────────────────────────────
        existing_lead = await db.execute(select(ContactLead).limit(1))
        if not existing_lead.scalar_one_or_none():
            leads = [
                ContactLead(first_name="John", last_name="Doe", email="john@example.com", message="Interested in your services.", status="new"),
            ]
            db.add_all(leads)
            await db.flush()
            print(f"Created {len(leads)} demo leads")

        await db.commit()
        print("Seed complete!")

    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(main())
