from pydantic import BaseModel, ConfigDict

from app.core.enums import ContentStatus


class ApprovalRequest(BaseModel):
    model: str  # "blog" | "team_member" | "project"
    id: int
    action: ContentStatus  # "approved" | "rejected"


class UserResource(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: str
    role: str | None
    is_active: bool
    created_at: str

    @classmethod
    def from_model(cls, user) -> "UserResource":
        return cls(
            id=user.id,
            name=user.name,
            email=user.email,
            role=user.role,
            is_active=user.is_active,
            created_at=user.created_at.isoformat(),
        )


class DashboardStats(BaseModel):
    blogs: int
    team_members: int
    services: int
    projects: int
    subscribers: int
    leads: int
    pending_blogs: int
    pending_team_members: int
    pending_projects: int
    pending_users: int
