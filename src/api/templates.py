from fastapi.templating import Jinja2Templates
from starlette.requests import Request
from fastapi import APIRouter

BASE_URL = "http://127.0.0.1:8000/"

router = APIRouter(prefix='/template', tags=['pages'])

# Монтируем папку с фронтенд статическими файлами

# Инициализация шаблонов Jinja2
templates = Jinja2Templates(directory="frontend/templates")

@router.get("/admin", summary="Main template for admin")
async def get_template_admin(request: Request):
    """Main template for admin"""
    return templates.TemplateResponse("admin/main_admin.html", {"request": request})


@router.get("/entity/{url:path}", summary="Template that returns entities")
async def get_template(request: Request, url: str):
    """Template that returns entities"""
    return templates.TemplateResponse("base.html", {"request": request, "url": f"{BASE_URL}{url}"})


@router.get("/admin_groups/{url:path}", summary="Template admin groups", name='admin_groups')
async def admin_groups(request: Request, url: str):
    """Template admin groups"""
    return templates.TemplateResponse("admin/add_entity.html", {"request": request, "url": f"{BASE_URL}{url}"})
 