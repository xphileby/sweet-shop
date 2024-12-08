from typing import Optional, List
from pydantic import BaseModel, Field
from datetime import datetime

class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None
    parent_id: Optional[int] = None

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int
    slug: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float = Field(..., ge=0)
    stock: int = Field(..., ge=0)
    category_id: int
    is_active: bool = True

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    stock: Optional[int] = None
    category_id: Optional[int] = None
    is_active: Optional[bool] = None

class Product(ProductBase):
    id: int
    slug: str
    image_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    category: Category

    class Config:
        from_attributes = True