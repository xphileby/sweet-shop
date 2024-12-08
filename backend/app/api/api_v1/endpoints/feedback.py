from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.api import deps

router = APIRouter()

@router.post("/", response_model=schemas.Feedback)
def create_feedback(
    *,
    db: Session = Depends(deps.get_db),
    feedback_in: schemas.FeedbackCreate,
) -> Any:
    return crud.feedback.create(db=db, obj_in=feedback_in)

@router.get("/", response_model=List[schemas.Feedback])
def read_feedback(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    feedback = crud.feedback.get_multi(db, skip=skip, limit=limit)
    return feedback

@router.put("/{id}/read", response_model=schemas.Feedback)
def mark_feedback_as_read(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    feedback = crud.feedback.mark_as_read(db=db, feedback_id=id)
    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found")
    return feedback