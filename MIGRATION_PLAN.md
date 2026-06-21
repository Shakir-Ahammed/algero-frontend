# Migration Plan: Laravel → FastAPI + React Admin

This document tracks the migration of the Algero project from a **Laravel (PHP) + Blade** backend
to a **Python FastAPI** backend, and the move of the **admin panel UI** from Blade views into the
**React frontend**.

- Working branch: `fast-api`
- Status legend: ⬜ Not started · 🟦 In progress · ✅ Done · ⏸️ Blocked

---

## Architecture decisions

| Topic | Decision |
|-------|----------|
| Backend framework | FastAPI (Python 3.12+) |
| Project layout | Module/feature based (`app/modules/<feature>/{router,models,schemas,service}.py`) |
| ORM | SQLAlchemy 2.0 (async) |
| DB migrations | Alembic |
| Database | PostgreSQL (SQLite fallback for local dev) |
| Auth | JWT (bearer tokens) replacing Laravel Sanctum |
| Validation | Pydantic v2 |
| Admin UI | React (in `frontend/`), replacing Blade views |
| API compatibility | Keep existing `/api/*` paths and JSON response shapes so the public frontend keeps working |

---

## Source inventory (Laravel)

**API controllers:** Auth, Blog, ContactLead, Project, Service, Subscriber, TeamMember
**Models:** User, Blog, ContactLead, Project, Service, Subscriber, TeamMember
**Admin (Blade) UI:** login, register, dashboard, layout + CRUD (blogs, team, services, projects,
subscribers, leads, users, approvals) + upload partials
**Cross-cutting:** Sanctum auth, role/approval workflow (super_admin/admin, active/pending,
content approval), reCAPTCHA service, image upload, 2 middlewares, 4 API resources.

---

## Phase 1 — FastAPI skeleton + vertical slice ✅

Goal: a runnable FastAPI app with config, DB, auth, and a complete **Blogs** + **Auth** + public
endpoints slice so we have a proven pattern to repeat.

- ✅ Backend project scaffolding (`backend-fastapi/`): requirements, pyproject, settings, app factory
- ✅ Database layer: SQLAlchemy 2.0 async base, session, engine, portable JSON list type
- ✅ Core: config, security (JWT via PyJWT, bcrypt hashing), dependencies (active user / super admin)
- ✅ Alembic setup (async env) — autogenerate + `upgrade head` verified (users + blogs tables)
- ✅ Models: User, Blog (+ enums for role/status)
- ✅ Auth module: register, login, logout, me (JWT bearer)
- ✅ Blog module: public list/show + admin CRUD (response shape parity with `BlogResource`)
- ✅ reCAPTCHA service port (`app/core/recaptcha.py`)
- ✅ App wiring + `/api` router mounting + CORS
- ✅ Local run verified: smoke test passes (login, me, blog CRUD, view increment, auth guard)

**Notes / decisions made during Phase 1:**
- Old Laravel `backend/` kept in place; new code lives in `backend-fastapi/` until parity is verified (Phase 4 removes Laravel).
- Switched JWT lib `python-jose` → **PyJWT** and `passlib` → **bcrypt** directly (better Python 3.13/3.14 support).
- Auth uses stateless **JWT bearer** tokens; logout is client-side token discard (no server token table).
- Run: `python -m scripts.seed` then `uvicorn app.main:app --reload`. Smoke test: `python -m scripts.smoke_test`.

## Phase 2 — Remaining backend modules ⬜

- ⬜ TeamMember module (+ approval workflow, social shape)
- ⬜ Service module
- ⬜ Project module (+ approval workflow, views)
- ⬜ Subscriber module
- ⬜ ContactLead module (+ reCAPTCHA)
- ⬜ Super-admin: approvals + user management endpoints
- ⬜ Image upload endpoint
- ⬜ Middlewares → FastAPI dependencies (active user, super admin)
- ⬜ Seed data scripts (admin, demo content)

## Phase 3 — React admin panel ⬜

- ⬜ Admin routing (`/admin/*`) + protected routes
- ⬜ Auth context + token storage + API client with auth
- ⬜ Admin layout (sidebar/nav) replacing `admin/layout.blade.php`
- ⬜ Login + register pages
- ⬜ Dashboard
- ⬜ CRUD pages: blogs, team, services, projects
- ⬜ Subscribers + leads views
- ⬜ Super-admin: approvals + users
- ⬜ Image upload component

## Phase 4 — Cutover & cleanup ⬜

- ⬜ Update docker-compose (replace Laravel service with FastAPI)
- ⬜ Update Dockerfiles + nginx
- ⬜ Env files / `.env.example`
- ⬜ Remove old Laravel `backend/` after parity verification
- ⬜ Update root + frontend READMEs

---

## Progress log

- 2026-06-21: Plan created. Scanned Laravel backend + React frontend. Began Phase 1.
- 2026-06-21: **Phase 1 complete.** FastAPI skeleton + Auth + Blog vertical slice built and
  verified (smoke test green, Alembic migration applies). Ready to start Phase 2 (remaining modules).
