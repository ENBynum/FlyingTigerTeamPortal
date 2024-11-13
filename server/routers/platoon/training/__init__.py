from fastapi import APIRouter
from .absence import router as absence


router = APIRouter(prefix='/training', tags=['training'])
router.include_router(absence)


__all__ = ['router']