from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.api import deps
import shutil
import os

router = APIRouter()

@router.get("/", response_model=List[schemas.Product])
def read_products(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    category_id: int = None,
) -> Any:
    if category_id:
        products = crud.product.get_by_category(
            db, category_id=category_id, skip=skip, limit=limit
        )
    else:
        products = crud.product.get_multi(db, skip=skip, limit=limit)
    return products

@router.post("/", response_model=schemas.Product)
def create_product(
    *,
    db: Session = Depends(deps.get_db),
    product_in: schemas.ProductCreate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    return crud.product.create(db=db, obj_in=product_in)

@router.get("/{slug}", response_model=schemas.Product)
def read_product(
    *,
    db: Session = Depends(deps.get_db),
    slug: str,
) -> Any:
    product = crud.product.get_by_slug(db=db, slug=slug)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.put("/{id}", response_model=schemas.Product)
def update_product(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    product_in: schemas.ProductUpdate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    product = crud.product.get(db=db, id=id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product = crud.product.update(db=db, db_obj=product, obj_in=product_in)
    return product

@router.delete("/{id}", response_model=schemas.Product)
def delete_product(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    product = crud.product.get(db=db, id=id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product = crud.product.remove(db=db, id=id)
    return product

@router.post("/{id}/image")
async def upload_product_image(
    *,
    id: int,
    file: UploadFile = File(...),
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    product = crud.product.get(db=db, id=id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    file_location = f"app/static/images/products/{id}_{file.filename}"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
    
    product.image_url = f"/static/images/products/{id}_{file.filename}"
    db.commit()
    
    return {"info": "File uploaded successfully"}