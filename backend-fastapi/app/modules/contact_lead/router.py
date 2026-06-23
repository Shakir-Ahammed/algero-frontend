from fastapi import APIRouter, HTTPException, status

from app.core.dependencies import ActiveUser, DbSession
from app.core.enums import LeadStatus
from app.core.recaptcha import verify_recaptcha
from app.modules.auth.schemas import MessageResponse
from app.modules.contact_lead import service
from app.modules.contact_lead.models import ContactLead
from app.modules.contact_lead.schemas import (
    ContactLeadCreate,
    ContactLeadResource,
    ContactLeadUpdateStatus,
)

router = APIRouter(tags=["leads"])


# ─── Public ───────────────────────────────────────────────
@router.post("/contact", response_model=dict, status_code=status.HTTP_201_CREATED)
async def store(payload: ContactLeadCreate, db: DbSession):
    if not await verify_recaptcha(payload.recaptcha_token):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="reCAPTCHA verification failed.")

    lead = ContactLead(
        first_name=payload.first_name,
        last_name=payload.last_name,
        email=payload.email,
        message=payload.message,
        status=LeadStatus.NEW,
    )
    db.add(lead)
    await db.flush()
    await db.refresh(lead)
    return {"message": "Message sent successfully!", "lead": ContactLeadResource.from_model(lead)}


# ─── Admin ────────────────────────────────────────────────
@router.get("/admin/leads", response_model=dict)
async def admin_index(db: DbSession, user: ActiveUser):
    leads = await service.list_all(db)
    return {"data": [ContactLeadResource.from_model(l) for l in leads]}


@router.put("/admin/leads/{lead_id}/status", response_model=ContactLeadResource)
async def update_status(
    lead_id: int,
    payload: ContactLeadUpdateStatus,
    db: DbSession,
    user: ActiveUser,
) -> ContactLeadResource:
    lead = await service.get_by_id(db, lead_id)
    if lead is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found.")
    lead.status = payload.status
    await db.flush()
    await db.refresh(lead)
    return ContactLeadResource.from_model(lead)


@router.delete("/admin/leads/{lead_id}", response_model=MessageResponse)
async def destroy(lead_id: int, db: DbSession, user: ActiveUser) -> MessageResponse:
    lead = await service.get_by_id(db, lead_id)
    if lead is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found.")
    await db.delete(lead)
    return MessageResponse(message="Lead deleted successfully.")
