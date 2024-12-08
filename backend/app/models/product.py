from sqlalchemy import Column, String, Integer, Float, Text, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .base import BaseModel

class Category(BaseModel):
    __tablename__ = "categories"

    name = Column(String(100), nullable=False)
    slug = Column(String(100), unique=True, index=True)
    description = Column(Text)
    parent_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    
    products = relationship("Product", back_populates="category")
    parent = relationship("Category", remote_side=[BaseModel.id], backref="children")

class Product(BaseModel):
    __tablename__ = "products"

    name = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, index=True)
    description = Column(Text)
    price = Column(Float, nullable=False)
    stock = Column(Integer, default=0)
    image_url = Column(String(500))
    is_active = Column(Boolean, default=True)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)

    category = relationship("Category", back_populates="products")