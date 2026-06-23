from fastapi import APIRouter, HTTPException, status

from app.core.dependencies import ActiveUser, DbSession
from app.modules.auth.schemas import MessageResponse
from app.modules.project import service
from app.modules.project.models import Project
from app.modules.project.schemas import ProjectCreate, ProjectResource, ProjectUpdate

router = APIRouter(tags=["projects"])


# ─── Public ───────────────────────────────────────────────
@router.get("/projects", response_model=dict)
async def index(db: DbSession):
    projects = await service.list_public(db)
    return {"data": [ProjectResource.from_model(p) for p in projects]}


@router.get("/projects/{slug}", response_model=ProjectResource)
async def show(slug: str, db: DbSession) -> ProjectResource:
    project = await service.get_by_slug(db, slug)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found.")
    project.views = (project.views or 0) + 1
    await db.flush()
    await db.refresh(project)
    return ProjectResource.from_model(project)


# ─── Admin ────────────────────────────────────────────────
@router.get("/admin/projects", response_model=dict)
async def admin_index(db: DbSession, user: ActiveUser):
    projects = await service.list_all(db)
    return {"data": [ProjectResource.from_model(p) for p in projects]}


@router.post("/admin/projects", response_model=ProjectResource, status_code=status.HTTP_201_CREATED)
async def store(payload: ProjectCreate, db: DbSession, user: ActiveUser) -> ProjectResource:
    slug = await service.unique_slug(db, payload.title)
    project = Project(
        title=payload.title,
        slug=slug,
        category=payload.category,
        image=payload.image,
        images=payload.images,
        description=payload.description,
        content=payload.content,
        tech=payload.tech,
        client=payload.client,
        url=payload.url,
        github_url=payload.github_url,
        demo_url=payload.demo_url,
        is_featured=payload.is_featured,
        is_active=payload.is_active,
        sort_order=payload.sort_order,
        status="approved" if user.is_super_admin else "pending",
    )
    db.add(project)
    await db.flush()
    await db.refresh(project)
    return ProjectResource.from_model(project)


@router.put("/admin/projects/{project_id}", response_model=ProjectResource)
async def update(
    project_id: int, payload: ProjectUpdate, db: DbSession, user: ActiveUser
) -> ProjectResource:
    project = await service.get_by_id(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found.")

    data = payload.model_dump(exclude_unset=True)

    if "title" in data and data["title"] != project.title:
        project.slug = await service.unique_slug(db, data["title"], exclude_id=project.id)

    for field, value in data.items():
        setattr(project, field, value)

    if not user.is_super_admin:
        project.status = "pending"

    await db.flush()
    await db.refresh(project)
    return ProjectResource.from_model(project)


@router.delete("/admin/projects/{project_id}", response_model=MessageResponse)
async def destroy(project_id: int, db: DbSession, user: ActiveUser) -> MessageResponse:
    project = await service.get_by_id(db, project_id)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found.")
    await db.delete(project)
    return MessageResponse(message="Project deleted successfully.")
