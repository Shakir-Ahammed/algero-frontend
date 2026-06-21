"""Phase 1 smoke test: exercises auth + blog endpoints end to end."""

import asyncio

from fastapi.testclient import TestClient

from app.core.enums import UserRole
from app.core.security import hash_password
from app.db.base import Base
from app.db.session import AsyncSessionLocal, engine
import app.db.models  # noqa: F401
from app.main import app
from app.modules.auth.models import User


async def seed() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    async with AsyncSessionLocal() as db:
        db.add(
            User(
                name="Super Admin",
                email="admin@algero.dev",
                password=hash_password("password123"),
                role=UserRole.SUPER_ADMIN,
                is_active=True,
            )
        )
        await db.commit()


def run() -> None:
    asyncio.run(seed())
    with TestClient(app) as client:
        assert client.get("/health").json()["status"] == "ok"

        # login
        r = client.post("/api/login", json={"email": "admin@algero.dev", "password": "password123"})
        assert r.status_code == 200, r.text
        token = r.json()["token"]
        print("login OK, token len:", len(token))

        headers = {"Authorization": f"Bearer {token}"}

        # me
        r = client.get("/api/me", headers=headers)
        assert r.json()["user"]["role"] == "super_admin", r.text
        print("me OK")

        # create blog (super admin -> approved)
        r = client.post(
            "/api/blogs",
            headers=headers,
            json={"title": "Hello World", "category": "News", "published_at": "2026-06-21T00:00:00"},
        )
        assert r.status_code == 201, r.text
        body = r.json()
        assert body["slug"] == "hello-world", body
        assert body["read"] == "5 min read"
        print("create blog OK:", body["slug"], "| date:", body["date"])

        # public list
        r = client.get("/api/blogs")
        assert len(r.json()["data"]) == 1, r.text
        print("public list OK:", len(r.json()["data"]), "blog(s)")

        # public show increments views
        r = client.get("/api/blogs/hello-world")
        assert r.json()["views"] == 1, r.text
        print("show OK, views:", r.json()["views"])

        # update
        r = client.put("/api/blogs/1", headers=headers, json={"title": "Hello World Updated"})
        assert r.json()["slug"] == "hello-world-updated", r.text
        print("update OK:", r.json()["slug"])

        # delete
        r = client.delete("/api/blogs/1", headers=headers)
        assert r.status_code == 200, r.text
        print("delete OK")

        # unauthorized create
        r = client.post("/api/blogs", json={"title": "x", "category": "y"})
        assert r.status_code in (401, 403), r.text
        print(f"auth guard OK ({r.status_code} without token)")

    print("\nALL SMOKE TESTS PASSED")


if __name__ == "__main__":
    run()
