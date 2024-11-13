from fastapi import APIRouter

from .authenticate import router as authenticate
from .authentication import router as sign_in
from .register import router as register

AuthRouter = APIRouter(prefix='/api/auth', tags=['auth'])
AuthRouter.include_router(authenticate)
AuthRouter.include_router(authentication)
AuthRouter.include_router(register)

__all__ = ['AuthRouter']