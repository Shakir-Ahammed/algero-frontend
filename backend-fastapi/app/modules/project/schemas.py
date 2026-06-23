from pydantic import BaseModel, ConfigDict, Field


class ProjectBase(BaseModel):
    title: str = Field(max_length=255)
    category: str = Field(max_length=100)
    image: str | None = Field(default=None, max_length=500)
    images: list[str] = Field(default_factory=list)
    description: str | None = None
    content: str | None = None
    tech: list[str] = Field(default_factory=list)
    client: str | None = Field(default=None, max_length=200)
    url: str | None = Field(default=None, max_length=500)
    github_url: str | None = Field(default=None, max_length=500)
    demo_url: str | None = Field(default=None, max_length=500)
    is_featured: bool = False
    is_active: bool = True
    sort_order: int = 0


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: str | None = Field(default=None, max_length=255)
    category: str | None = Field(default=None, max_length=100)
    image: str | None = Field(default=None, max_length=500)
    images: list[str] | None = None
    description: str | None = None
    content: str | None = None
    tech: list[str] | None = None
    client: str | None = Field(default=None, max_length=200)
    url: str | None = Field(default=None, max_length=500)
    github_url: str | None = Field(default=None, max_length=500)
    demo_url: str | None = Field(default=None, max_length=500)
    is_featured: bool | None = None
    is_active: bool | None = None
    sort_order: int | None = None


class ProjectResource(BaseModel):
    """Mirrors Laravel ProjectController raw JSON output shape."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    slug: str
    category: str
    image: str | None
    images: list[str]
    description: str | None
    content: str | None
    tech: list[str]
    client: str | None
    url: str | None
    github_url: str | None
    demo_url: str | None
    is_featured: bool
    is_active: bool
    sort_order: int
    status: str
    views: int
    created_at: str
    updated_at: str

    @classmethod
    def from_model(cls, project) -> "ProjectResource":
        return cls(
            id=project.id,
            title=project.title,
            slug=project.slug,
            category=project.category,
            image=project.image,
            images=project.images or [],
            description=project.description,
            content=project.content,
            tech=project.tech or [],
            client=project.client,
            url=project.url,
            github_url=project.github_url,
            demo_url=project.demo_url,
            is_featured=project.is_featured,
            is_active=project.is_active,
            sort_order=project.sort_order,
            status=project.status,
            views=project.views or 0,
            created_at=project.created_at.isoformat(),
            updated_at=project.updated_at.isoformat(),
        )
