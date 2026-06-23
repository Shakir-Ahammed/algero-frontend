from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class SubscribeRequest(BaseModel):
    email: EmailStr
    recaptcha_token: str | None = None


class SubscriberResource(BaseModel):
    """Mirrors Laravel App\\Http\\Resources\\SubscriberResource output shape."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    email: str
    is_active: bool
    subscribed_at: str | None
    created_at: str

    @classmethod
    def from_model(cls, sub) -> "SubscriberResource":
        return cls(
            id=sub.id,
            email=sub.email,
            is_active=sub.is_active,
            subscribed_at=sub.subscribed_at.isoformat() if sub.subscribed_at else None,
            created_at=sub.created_at.isoformat(),
        )
