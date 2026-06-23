from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.core.enums import LeadStatus


class ContactLeadBase(BaseModel):
    first_name: str = Field(max_length=150)
    last_name: str | None = Field(default=None, max_length=150)
    email: EmailStr
    message: str | None = None


class ContactLeadCreate(ContactLeadBase):
    recaptcha_token: str | None = None


class ContactLeadUpdateStatus(BaseModel):
    status: LeadStatus


class ContactLeadResource(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    first_name: str
    last_name: str | None
    email: str
    full_name: str
    message: str | None
    status: str
    created_at: str
    updated_at: str

    @classmethod
    def from_model(cls, lead) -> "ContactLeadResource":
        full_name = lead.first_name
        if lead.last_name:
            full_name = f"{lead.first_name} {lead.last_name}"
        return cls(
            id=lead.id,
            first_name=lead.first_name,
            last_name=lead.last_name,
            email=lead.email,
            full_name=full_name,
            message=lead.message,
            status=lead.status,
            created_at=lead.created_at.isoformat(),
            updated_at=lead.updated_at.isoformat(),
        )
