from fastapi import APIRouter
from app.api.api_v1.endpoints import products, categories, users, auth, feedback

api_router = APIRouter()

api_router.include_router(auth.router, tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(products.router, prefix="/products", tags=["products"])
api_router.include_router(categories.router, prefix="/categories", tags=["categories"])
api_router.include_router(feedback.router, prefix="/feedback", tags=["feedback"])