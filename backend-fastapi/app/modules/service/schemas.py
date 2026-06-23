from pydantic import BaseModel, ConfigDict, Field


class ServiceBase(BaseModel):
    title: str = Field(max_length=200)
    description: str
    icon: str | None = Field(default=None, max_length=100)
    features: list[str] = Field(default_factory=list)
    sort_order: int = 0
    is_active: bool = True


class ServiceCreate(ServiceBase):
    pass


class ServiceUpdate(BaseModel):
    title: str | None = Field(default=None, max_length=200)
    description: str | None = None
    icon: str | None = Field(default=None, max_length=100)
    features: list[str] | None = None
    sort_order: int | None = None
    is_active: bool | None = None


class ServiceResource(BaseModel):
    """Mirrors Laravel App\\Http\\Resources\\ServiceResource output shape."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    slug: str
    desc: str | None
    icon: str | None
    features: list[str] | None
    sort_order: int
    is_active: bool
    created_at: str
    updated_at: str

    @classmethod
    def from_model(cls, service) -> "ServiceResource":
        return cls(
            id=service.id,
            title=service.title,
            slug=service.slug,
            desc=service.description,
            icon=service.icon,
            features=service.features or [],
            sort_order=service.sort_order,
            is_active=service.is_active,
            created_at=service.created_at.isoformat(),
            updated_at=service.updated_at.isoformat(),
        )
