from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment / .env."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        populate_by_name=True,
    )

    # App
    app_name: str = "Algero API"
    app_env: str = "local"
    debug: bool = True

    # Database
    database_url: str = "sqlite+aiosqlite:///./algero.db"

    # JWT
    jwt_secret: str = "change-me-in-production"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 10080  # 7 days

    # CORS (comma separated string in env CORS_ORIGINS; use `cors_origins` property)
    cors_origins_raw: str = Field(
        default="http://localhost:5173", alias="CORS_ORIGINS"
    )

    # reCAPTCHA
    recaptcha_secret: str = ""

    # Uploads
    upload_dir: str = "storage/uploads"
    public_base_url: str = "http://localhost:8000"

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.cors_origins_raw.split(",") if o.strip()]

    @property
    def is_local(self) -> bool:
        return self.app_env in {"local", "testing", "development"}


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
