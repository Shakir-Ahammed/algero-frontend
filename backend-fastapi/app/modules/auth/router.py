from fastapi import APIRouter, HTTPException, status

from app.core.dependencies import CurrentUser, DbSession, get_user_by_email
from app.core.enums import UserRole
from app.core.security import create_access_token, hash_password, verify_password
from app.modules.auth.models import User
from app.modules.auth.schemas import (
    LoginRequest,
    LoginResponse,
    MeResponse,
    MessageResponse,
    RegisterRequest,
    RegisterResponse,
    UserPublic,
)

router = APIRouter(tags=["auth"])


@router.post("/register", response_model=RegisterResponse, status_code=status.HTTP_201_CREATED)
async def register(payload: RegisterRequest, db: DbSession) -> RegisterResponse:
    """Register a new admin user (inactive by default, pending approval)."""
    if await get_user_by_email(db, payload.email):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="The email has already been taken.",
        )

    user = User(
        name=payload.name,
        email=payload.email,
        password=hash_password(payload.password),
        role=UserRole.ADMIN,
        is_active=False,
    )
    db.add(user)
    await db.flush()
    await db.refresh(user)

    return RegisterResponse(
        message="Registration successful. Your account is pending activation by the Super Admin.",
        user=UserPublic.model_validate(user),
    )


@router.post("/login", response_model=LoginResponse)
async def login(payload: LoginRequest, db: DbSession) -> LoginResponse:
    """Authenticate and return a JWT (replaces the Sanctum token)."""
    user = await get_user_by_email(db, payload.email)
    if not user or not verify_password(payload.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="The provided credentials are incorrect.",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Your account is not yet activated. Please wait for Super Admin approval.",
        )

    token = create_access_token(user.id, extra={"role": user.role})
    return LoginResponse(
        message="Login successful.",
        token=token,
        user=UserPublic.model_validate(user),
    )


@router.post("/logout", response_model=MessageResponse)
async def logout(current_user: CurrentUser) -> MessageResponse:
    """Stateless JWT logout. The client discards the token.

    (Sanctum revoked the DB token; with JWT the token simply expires.)
    """
    return MessageResponse(message="Logged out successfully.")


@router.get("/me", response_model=MeResponse)
async def me(current_user: CurrentUser) -> MeResponse:
    return MeResponse(user=UserPublic.model_validate(current_user))
