from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.user import Feedback
from app.schemas.user import FeedbackCreate, Feedback as FeedbackSchema

class CRUDFeedback(CRUDBase[Feedback, FeedbackCreate, FeedbackSchema]):
    def mark_as_read(self, db: Session, *, feedback_id: int) -> Feedback:
        feedback = self.get(db, id=feedback_id)
        if feedback:
            feedback.is_read = True
            db.add(feedback)
            db.commit()
            db.refresh(feedback)
        return feedback

feedback = CRUDFeedback(Feedback)