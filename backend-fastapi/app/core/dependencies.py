from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import decode_access_token
from app.db.session import get_db
from app.modules.auth.models import User

bearer_scheme = HTTPBearer(auto_error=True)


async def get_current_user(
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(bearer_scheme)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> User:
    """Resolve the authenticated user from a JWT bearer token (replaces Sanctum)."""
    payload = decode_access_token(credentials.credentials)
    if payload is None or "sub" not in payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token.",
        )

    user = await db.get(User, int(payload["sub"]))
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found."
        )
    return user


async def get_active_user(
    user: Annotated[User, Depends(get_current_user)],
) -> User:
    """Equivalent of EnsureUserIsActive middleware."""
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your account is not yet activated.",
        )
    return user


async def get_super_admin(
    user: Annotated[User, Depends(get_active_user)],
) -> User:
    """Equivalent of EnsureSuperAdmin middleware."""
    if not user.is_super_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Super admin access required.",
        )
    return user


CurrentUser = Annotated[User, Depends(get_current_user)]
ActiveUser = Annotated[User, Depends(get_active_user)]
SuperAdmin = Annotated[User, Depends(get_super_admin)]
DbSession = Annotated[AsyncSession, Depends(get_db)]

# re-export for routers
__all__ = [
    "get_current_user",
    "get_active_user",
    "get_super_admin",
    "CurrentUser",
    "ActiveUser",
    "SuperAdmin",
    "DbSession",
]


# small helper so we don't import select/User in every router
async def get_user_by_email(db: AsyncSession, email: str) -> User | None:
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()
