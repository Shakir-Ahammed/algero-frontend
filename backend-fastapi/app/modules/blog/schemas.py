from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class BlogBase(BaseModel):
    title: str = Field(max_length=255)
    category: str = Field(max_length=100)
    excerpt: str | None = None
    content: str | None = None
    image: str | None = Field(default=None, max_length=500)
    images: list[str] = Field(default_factory=list)
    author: str | None = Field(default=None, max_length=150)
    read_time: str | None = Field(default=None, max_length=50)
    published_at: datetime | None = None


class BlogCreate(BlogBase):
    pass


class BlogUpdate(BaseModel):
    title: str | None = Field(default=None, max_length=255)
    category: str | None = Field(default=None, max_length=100)
    excerpt: str | None = None
    content: str | None = None
    image: str | None = Field(default=None, max_length=500)
    images: list[str] | None = None
    author: str | None = Field(default=None, max_length=150)
    read_time: str | None = Field(default=None, max_length=50)
    published_at: datetime | None = None


class BlogResource(BaseModel):
    """Mirrors Laravel App\\Http\\Resources\\BlogResource output shape."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    slug: str
    category: str
    excerpt: str | None
    content: str | None
    image: str | None
    images: list[str]
    author: str | None
    read: str | None
    views: int
    date: str | None
    published_at: str | None
    created_at: str
    updated_at: str

    @classmethod
    def from_model(cls, blog) -> "BlogResource":
        return cls(
            id=blog.id,
            title=blog.title,
            slug=blog.slug,
            category=blog.category,
            excerpt=blog.excerpt,
            content=blog.content,
            image=blog.image,
            images=blog.images or [],
            author=blog.author,
            read=blog.read_time,
            views=blog.views or 0,
            date=blog.published_at.strftime("%b %d, %Y") if blog.published_at else None,
            published_at=blog.published_at.isoformat() if blog.published_at else None,
            created_at=blog.created_at.isoformat(),
            updated_at=blog.updated_at.isoformat(),
        )
