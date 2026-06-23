# Algero Backend (FastAPI)

Python FastAPI backend, migrated from the original Laravel app. Module/feature based.

## Layout

```
app/
  core/          config, security (JWT), enums, dependencies, recaptcha
  db/            SQLAlchemy base, session, portable JSON types, model registry
  modules/
    auth/        register / login / logout / me (JWT)
    blog/        public list/show + admin CRUD
    project/     public list/show + admin CRUD (+ approval workflow)
    team_member/ public list/show + admin CRUD (+ approval workflow)
    service/     public list/show + admin CRUD
    subscriber/  admin CRUD
    contact_lead/ admin CRUD (+ reCAPTCHA)
    admin/       dashboard stats, approvals, user management, image upload
  api.py         aggregates module routers under /api
  main.py        FastAPI app factory + CORS + lifespan + static file serving
alembic/         database migrations
scripts/seed.py  create an initial super admin
```

## Local setup

```bash
cd backend-fastapi
python -m venv .venv
.venv\Scripts\activate        # Windows PowerShell
pip install -r requirements.txt
copy .env.example .env         # then edit values

# create tables + a super admin
python -m scripts.seed

# run
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

## Docker

```bash
# From repo root (uses docker-compose.yml)
docker compose up --build
```

The backend runs Alembic migrations on startup, then serves on port 8000.

## Migrations (Alembic)

```bash
alembic revision --autogenerate -m "description"
alembic upgrade head
```

## Auth

JWT bearer tokens replace Laravel Sanctum. `POST /api/auth/login` returns a `token`;
send it as `Authorization: Bearer <token>` on protected routes.

## API parity

Public + admin paths mirror the Laravel routes (`/api/blogs`, `/api/auth/login`, ...).
Blog responses match the old `BlogResource` shape (`read`, `date`, `views`, ...).

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `sqlite+aiosqlite:///./algero.db` | Database connection string |
| `JWT_SECRET` | `change-me-in-production` | JWT signing secret |
| `JWT_ALGORITHM` | `HS256` | JWT algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `10080` | Token expiry (7 days) |
| `CORS_ORIGINS` | `http://localhost:5173,http://localhost:3000` | Allowed CORS origins |
| `RECAPTCHA_SECRET` | (empty) | Google reCAPTCHA v2 secret |
| `UPLOAD_DIR` | `storage/uploads` | Image upload directory |
| `PUBLIC_BASE_URL` | `http://localhost:8000` | Public URL for uploaded files |
