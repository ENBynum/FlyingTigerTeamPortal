import uvicorn
from fastapi import FastAPI
from routes.auth import auth_router
from routes.rst import rst_router
from starlette import status
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse

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

@app.get('/', status_code=status.HTTP_200_OK)
async def root():
    return JSONResponse(status_code=status.HTTP_200_OK, content={'message': 'Test Successful'})

app.include_router(auth_router, prefix='/api/auth')
app.include_router(rst_router, prefix='/api/rst-request')

if __name__ == '__main__':
    config = uvicorn.Config('main:app', host='10.0.0.252', port=5174, log_level='info', reload=True)
    server = uvicorn.Server(config)
    server.run()
