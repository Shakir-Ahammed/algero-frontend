# Algero Backend (FastAPI)

Python FastAPI backend, migrated from the original Laravel app. Module/feature based.

## Layout

```
app/
  core/        config, security (JWT), enums, dependencies, recaptcha
  db/          SQLAlchemy base, session, portable JSON types, model registry
  modules/
    auth/      register / login / logout / me (JWT)
    blog/      public list/show + admin CRUD
  api.py       aggregates module routers under /api
  main.py      FastAPI app factory + CORS + lifespan
alembic/       database migrations
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

## Migrations (Alembic)

```bash
alembic revision --autogenerate -m "init"
alembic upgrade head
```

## Auth

JWT bearer tokens replace Laravel Sanctum. `POST /api/login` returns a `token`;
send it as `Authorization: Bearer <token>` on protected routes.

## API parity

Public + admin paths mirror the Laravel routes (`/api/blogs`, `/api/login`, ...).
Blog responses match the old `BlogResource` shape (`read`, `date`, `views`, ...).
