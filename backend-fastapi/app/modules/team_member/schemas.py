from pydantic import BaseModel, ConfigDict, Field


class TeamMemberBase(BaseModel):
    name: str = Field(max_length=150)
    role: str = Field(max_length=150)
    bio: str | None = None
    image: str | None = Field(default=None, max_length=500)
    social_linkedin: str | None = Field(default=None, max_length=300)
    social_twitter: str | None = Field(default=None, max_length=300)
    social_github: str | None = Field(default=None, max_length=300)
    sort_order: int = 0


class TeamMemberCreate(TeamMemberBase):
    pass


class TeamMemberUpdate(BaseModel):
    name: str | None = Field(default=None, max_length=150)
    role: str | None = Field(default=None, max_length=150)
    bio: str | None = None
    image: str | None = Field(default=None, max_length=500)
    social_linkedin: str | None = Field(default=None, max_length=300)
    social_twitter: str | None = Field(default=None, max_length=300)
    social_github: str | None = Field(default=None, max_length=300)
    sort_order: int | None = None


class SocialLinks(BaseModel):
    linkedin: str | None = None
    twitter: str | None = None
    github: str | None = None


class TeamMemberResource(BaseModel):
    """Mirrors Laravel App\\Http\\Resources\\TeamMemberResource output shape."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    role: str
    bio: str | None
    image: str | None
    social: SocialLinks | None
    sort_order: int
    created_at: str
    updated_at: str

    @classmethod
    def from_model(cls, member) -> "TeamMemberResource":
        social = None
        if member.social_linkedin or member.social_twitter or member.social_github:
            social = SocialLinks(
                linkedin=member.social_linkedin,
                twitter=member.social_twitter,
                github=member.social_github,
            )
        return cls(
            id=member.id,
            name=member.name,
            role=member.role,
            bio=member.bio,
            image=member.image,
            social=social,
            sort_order=member.sort_order,
            created_at=member.created_at.isoformat(),
            updated_at=member.updated_at.isoformat(),
        )
