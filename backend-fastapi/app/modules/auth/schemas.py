from pydantic import BaseModel, ConfigDict, EmailStr, Field


class RegisterRequest(BaseModel):
    name: str = Field(max_length=255)
    email: EmailStr
    password: str = Field(min_length=8)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserPublic(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: EmailStr
    role: str | None = None


class RegisterResponse(BaseModel):
    message: str
    user: UserPublic


class LoginResponse(BaseModel):
    message: str
    token: str
    # Sanctum-style: bearer token returned to the SPA
    token_type: str = "Bearer"
    user: UserPublic


class MeResponse(BaseModel):
    user: UserPublic


class MessageResponse(BaseModel):
    message: str
