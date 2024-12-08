from typing import List, Optional
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate
from slugify import slugify

class CRUDProduct(CRUDBase[Product, ProductCreate, ProductUpdate]):
    def create(self, db: Session, *, obj_in: ProductCreate) -> Product:
        slug = slugify(obj_in.name)
        db_obj = Product(
            name=obj_in.name,
            slug=slug,
            description=obj_in.description,
            price=obj_in.price,
            stock=obj_in.stock,
            category_id=obj_in.category_id,
            is_active=obj_in.is_active,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_by_category(
        self, db: Session, *, category_id: int, skip: int = 0, limit: int = 100
    ) -> List[Product]:
        return (
            db.query(self.model)
            .filter(Product.category_id == category_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_by_slug(self, db: Session, *, slug: str) -> Optional[Product]:
        return db.query(self.model).filter(Product.slug == slug).first()

product = CRUDProduct(Product)