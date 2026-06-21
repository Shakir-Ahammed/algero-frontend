from fastapi import APIRouter, HTTPException, Query, status

from app.core.dependencies import ActiveUser, DbSession
from app.modules.auth.schemas import MessageResponse
from app.modules.blog import service
from app.modules.blog.models import Blog
from app.modules.blog.schemas import BlogCreate, BlogResource, BlogUpdate

router = APIRouter(tags=["blogs"])


# ─── Public ───────────────────────────────────────────────
@router.get("/blogs", response_model=dict)
async def index(db: DbSession, per_page: int = Query(15, ge=1, le=100), page: int = Query(1, ge=1)):
    blogs = await service.list_published(db, per_page=per_page, page=page)
    return {"data": [BlogResource.from_model(b) for b in blogs]}


@router.get("/blogs/{slug}", response_model=BlogResource)
async def show(slug: str, db: DbSession) -> BlogResource:
    blog = await service.get_by_slug(db, slug)
    if blog is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found.")
    blog.views = (blog.views or 0) + 1
    await db.flush()
    await db.refresh(blog)
    return BlogResource.from_model(blog)


# ─── Admin ────────────────────────────────────────────────
@router.post("/blogs", response_model=BlogResource, status_code=status.HTTP_201_CREATED)
async def store(payload: BlogCreate, db: DbSession, user: ActiveUser) -> BlogResource:
    slug = await service.unique_slug(db, payload.title)
    blog = Blog(
        title=payload.title,
        slug=slug,
        category=payload.category,
        excerpt=payload.excerpt,
        content=payload.content,
        image=payload.image,
        images=payload.images,
        author=payload.author,
        read_time=payload.read_time or "5 min read",
        published_at=payload.published_at,
        status="approved" if user.is_super_admin else "pending",
    )
    db.add(blog)
    await db.flush()
    await db.refresh(blog)
    return BlogResource.from_model(blog)


@router.put("/blogs/{blog_id}", response_model=BlogResource)
async def update(blog_id: int, payload: BlogUpdate, db: DbSession, user: ActiveUser) -> BlogResource:
    blog = await service.get_by_id(db, blog_id)
    if blog is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found.")

    data = payload.model_dump(exclude_unset=True)

    if "title" in data and data["title"] != blog.title:
        blog.slug = await service.unique_slug(db, data["title"], exclude_id=blog.id)

    for field, value in data.items():
        setattr(blog, field, value)

    if not user.is_super_admin:
        blog.status = "pending"

    await db.flush()
    await db.refresh(blog)
    return BlogResource.from_model(blog)


@router.delete("/blogs/{blog_id}", response_model=MessageResponse)
async def destroy(blog_id: int, db: DbSession, user: ActiveUser) -> MessageResponse:
    blog = await service.get_by_id(db, blog_id)
    if blog is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found.")
    await db.delete(blog)
    return MessageResponse(message="Blog deleted successfully.")
