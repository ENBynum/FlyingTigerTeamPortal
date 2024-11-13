from contextlib import asynccontextmanager

import uvicorn
from routers import *
from dotenv import load_dotenv
from fastapi import FastAPI
from routes.rst_route import rst_router, RSTRouter
from routes.unit_route import unit_router
from starlette import status
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
from crud.handle_expired_tokens import TokenScheduler

load_dotenv()


# CRUD Configuration
@asynccontextmanager
async def lifespan(app: FastAPI):
    TokenScheduler.start()
    yield
    TokenScheduler.shutdown()


# App Cconfiguration
app = FastAPI(lifespan=lifespan)
app.add_middleware(
    middleware_class=CORSMiddleware,
    allow_origins=[
        'http://10.0.0.252:3000',
        'http://localhost',
        
    ],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


# Test Route
@app.get('/api', status_code=status.HTTP_200_OK)
async def root():
    return JSONResponse(status_code=status.HTTP_200_OK, content={'message': 'Test Successful'})


# App Routes
app.include_router(AuthRouter)
app.include_router(PlatoonRouter)
app.include_router(SoldierRouter)
app.include_router(rst_router)
app.include_router(unit_router)
app.include_router(RSTRouter)


# App Start
if __name__ == '__main__':
    uvicorn.run('main:app', host='10.0.0.252', port=5174, log_level='info', reload=True)