FROM python:3.12-slim AS base

WORKDIR /app

# System deps for asyncpg + bcrypt
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc libpq-dev && \
    rm -rf /var/lib/apt/lists/*

# Install Python deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY . .

# Make entrypoint executable
RUN chmod +x docker-entrypoint.sh

# Create uploads dir
RUN mkdir -p uploads

EXPOSE 8000

ENTRYPOINT ["./docker-entrypoint.sh"]
