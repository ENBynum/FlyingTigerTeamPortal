from fastapi import APIRouter
from .drills import router as drills
from .absence import router as absence


router = APIRouter(prefix='/training', tags=['training'])
router.include_router(drills)
router.include_router(absence)


__all__ = ['router']