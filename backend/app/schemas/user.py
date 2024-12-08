from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    is_active: bool = True

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_superuser: bool = False
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class UserInDB(User):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: int = None

class FeedbackBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str

class FeedbackCreate(FeedbackBase):
    pass

class Feedback(FeedbackBase):
    id: int
    is_read: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True