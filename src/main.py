from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from starlette.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from core.exceptions import MyException
from starlette.requests import Request
from api.dependencies import limiter
from api.routers import all_routers
from fastapi import FastAPI
import uvicorn

app = FastAPI() 

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.mount("/static", StaticFiles(directory="frontend/static"), name="frontend_static")



@app.exception_handler(MyException)
async def item_not_found_exception_handler(request: Request, exc: MyException):
    return JSONResponse( 
        status_code=exc.status_code,
        content={"message": f"{exc.message}"})


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



for router in all_routers:
    app.include_router(router)

if __name__ == "__main__":
    uvicorn.run(app="main:app", reload=True)
