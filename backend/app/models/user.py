from sqlalchemy import Column, String, Boolean, Text
from .base import BaseModel

class User(BaseModel):
    __tablename__ = "users"

    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255))
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)

class Feedback(BaseModel):
    __tablename__ = "feedback"

    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(20))
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)