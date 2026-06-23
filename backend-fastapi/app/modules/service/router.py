from fastapi import APIRouter, HTTPException, status

from app.core.dependencies import ActiveUser, DbSession
from app.modules.auth.schemas import MessageResponse
from app.modules.service import service as svc
from app.modules.service.models import Service
from app.modules.service.schemas import ServiceCreate, ServiceResource, ServiceUpdate

router = APIRouter(tags=["services"])


# ─── Public ───────────────────────────────────────────────
@router.get("/services", response_model=dict)
async def index(db: DbSession):
    services = await svc.list_active(db)
    return {"data": [ServiceResource.from_model(s) for s in services]}


@router.get("/services/{slug}", response_model=ServiceResource)
async def show(slug: str, db: DbSession) -> ServiceResource:
    service = await svc.get_by_slug(db, slug)
    if service is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found.")
    return ServiceResource.from_model(service)


# ─── Admin ────────────────────────────────────────────────
@router.get("/admin/services", response_model=dict)
async def admin_index(db: DbSession, user: ActiveUser):
    services = await svc.list_all(db)
    return {"data": [ServiceResource.from_model(s) for s in services]}


@router.post("/admin/services", response_model=ServiceResource, status_code=status.HTTP_201_CREATED)
async def store(payload: ServiceCreate, db: DbSession, user: ActiveUser) -> ServiceResource:
    slug = await svc.unique_slug(db, payload.title)
    service = Service(
        title=payload.title,
        slug=slug,
        description=payload.description,
        icon=payload.icon or "Layers",
        features=payload.features,
        sort_order=payload.sort_order,
        is_active=payload.is_active,
    )
    db.add(service)
    await db.flush()
    await db.refresh(service)
    return ServiceResource.from_model(service)


@router.put("/admin/services/{service_id}", response_model=ServiceResource)
async def update(service_id: int, payload: ServiceUpdate, db: DbSession, user: ActiveUser) -> ServiceResource:
    service = await svc.get_by_id(db, service_id)
    if service is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found.")

    data = payload.model_dump(exclude_unset=True)

    if "title" in data and data["title"] != service.title:
        service.slug = await svc.unique_slug(db, data["title"], exclude_id=service.id)

    for field, value in data.items():
        setattr(service, field, value)

    await db.flush()
    await db.refresh(service)
    return ServiceResource.from_model(service)


@router.delete("/admin/services/{service_id}", response_model=MessageResponse)
async def destroy(service_id: int, db: DbSession, user: ActiveUser) -> MessageResponse:
    service = await svc.get_by_id(db, service_id)
    if service is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found.")
    await db.delete(service)
    return MessageResponse(message="Service deleted successfully.")
