from fastapi import APIRouter, HTTPException, status

from app.core.dependencies import ActiveUser, DbSession
from app.core.recaptcha import verify_recaptcha
from app.modules.auth.schemas import MessageResponse
from app.modules.subscriber import service
from app.modules.subscriber.schemas import SubscribeRequest, SubscriberResource

router = APIRouter(tags=["subscribers"])


# ─── Public ───────────────────────────────────────────────
@router.post("/subscribe", response_model=dict, status_code=status.HTTP_201_CREATED)
async def subscribe(payload: SubscribeRequest, db: DbSession):
    if not await verify_recaptcha(payload.recaptcha_token):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="reCAPTCHA verification failed.")

    subscriber, is_new = await service.subscribe(db, payload.email)
    if is_new:
        return {"message": "Subscribed successfully!", "subscriber": SubscriberResource.from_model(subscriber)}
    return {"message": "You are already subscribed.", "subscriber": SubscriberResource.from_model(subscriber)}


# ─── Admin ────────────────────────────────────────────────
@router.get("/admin/subscribers", response_model=dict)
async def admin_index(db: DbSession, user: ActiveUser):
    subscribers = await service.list_all(db)
    return {"data": [SubscriberResource.from_model(s) for s in subscribers]}


@router.delete("/admin/subscribers/{subscriber_id}", response_model=MessageResponse)
async def destroy(subscriber_id: int, db: DbSession, user: ActiveUser) -> MessageResponse:
    subscriber = await service.get_by_id(db, subscriber_id)
    if subscriber is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Subscriber not found.")
    await db.delete(subscriber)
    return MessageResponse(message="Subscriber deleted successfully.")
