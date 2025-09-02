from fastapi import APIRouter
from app.api.v1 import products, projects, materials, auth, applications, telegram

api_router = APIRouter()

api_router.include_router(products.router, prefix="/products", tags=["products"])

api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(materials.router, prefix="/materials", tags=["materials"])
api_router.include_router(applications.router, prefix="/applications", tags=["applications"])
api_router.include_router(auth.router, tags=["auth"])
api_router.include_router(telegram.router, prefix="/telegram", tags=["telegram"])
