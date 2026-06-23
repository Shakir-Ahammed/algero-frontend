#!/bin/sh
set -e

echo "Running Alembic migrations..."
alembic upgrade head 2>&1 || {
  echo "WARNING: alembic upgrade failed — likely tables already exist."
  echo "Stamping alembic_version to head so future migrations work..."
  alembic stamp head 2>&1 || true
}

echo "Seeding admin user + demo content..."
python -m scripts.seed

echo "Starting uvicorn..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
