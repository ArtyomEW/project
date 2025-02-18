from fastapi.templating import Jinja2Templates
from fastapi import APIRouter, Request


router = APIRouter(
    prefix="/templates", 
                   tags=["template"])
templates = Jinja2Templates(directory='frontend/templates')




@router.get("/")
async def get_template(request: Request):
    return templates.TemplateResponse(name="base.html", context={'request': request})
