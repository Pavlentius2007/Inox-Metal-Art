from fastapi import APIRouter
from app.api.v1 import products, gallery, projects, materials, auth

api_router = APIRouter()

api_router.include_router(products.router, prefix="/products", tags=["products"])
api_router.include_router(gallery.router, prefix="/gallery", tags=["gallery"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(materials.router, prefix="/materials", tags=["materials"])
api_router.include_router(auth.router, tags=["auth"])
