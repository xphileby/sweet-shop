from typing import List, Optional
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.product import Category
from app.schemas.product import CategoryCreate, Category as CategorySchema
from slugify import slugify

class CRUDCategory(CRUDBase[Category, CategoryCreate, CategorySchema]):
    def create(self, db: Session, *, obj_in: CategoryCreate) -> Category:
        slug = slugify(obj_in.name)
        db_obj = Category(
            name=obj_in.name,
            slug=slug,
            description=obj_in.description,
            parent_id=obj_in.parent_id,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_by_slug(self, db: Session, *, slug: str) -> Optional[Category]:
        return db.query(self.model).filter(Category.slug == slug).first()

    def get_root_categories(self, db: Session) -> List[Category]:
        return db.query(self.model).filter(Category.parent_id.is_(None)).all()

category = CRUDCategory(Category)