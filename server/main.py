import os
from contextlib import asynccontextmanager

import uvicorn
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from fastapi import FastAPI
from routes.auth_route import auth_router
from routes.rst_route import rst_router
from routes.unit_route import unit_router
from starlette import status
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
from utils.crud import delete_exp_tokens

app = FastAPI()

origins = [
    'http://10.0.0.252:3000',
    'http://localhost'
]

app.add_middleware(
    middleware_class=CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

scheduler = BackgroundScheduler()
delete_exp_tokens_trigger = IntervalTrigger(minute=os.getenv('REFRESH_TOKEN_EXP'))
scheduler.add_job(delete_exp_tokens, delete_exp_tokens_trigger)
scheduler.start()

@app.get('/', status_code=status.HTTP_200_OK)
async def root():
    return JSONResponse(status_code=status.HTTP_200_OK, content={'message': 'Test Successful'})

app.include_router(auth_router, prefix='/api/auth')
app.include_router(rst_router, prefix='/api/rst-request')
app.include_router(unit_router, prefix='/api/unit')

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    scheduler.shutdown()

if __name__ == '__main__':
    uvicorn.run('main:app', host='10.0.0.252', port=5174, log_level='info', reload=True)