from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[schemas.Category])
def read_categories(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    categories = crud.category.get_multi(db, skip=skip, limit=limit)
    return categories

@router.get("/root", response_model=List[schemas.Category])
def read_root_categories(
    db: Session = Depends(deps.get_db),
) -> Any:
    categories = crud.category.get_root_categories(db)
    return categories

@router.post("/", response_model=schemas.Category)
def create_category(
    *,
    db: Session = Depends(deps.get_db),
    category_in: schemas.CategoryCreate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    return crud.category.create(db=db, obj_in=category_in)

@router.get("/{slug}", response_model=schemas.Category)
def read_category(
    *,
    db: Session = Depends(deps.get_db),
    slug: str,
) -> Any:
    category = crud.category.get_by_slug(db=db, slug=slug)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@router.delete("/{id}", response_model=schemas.Category)
def delete_category(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    category = crud.category.get(db=db, id=id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    category = crud.category.remove(db=db, id=id)
    return category