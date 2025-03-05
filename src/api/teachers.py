from services.teachers import TeachersService
from fastapi import APIRouter, status
from api.dependencies import UOWDep
from uuid import UUID

router = APIRouter(prefix='/teachers', tags=['Teachers'])

@router.get('/{teachers_uuid}/groups/{group_uuid}/subjects', 
            summary="get subjects teachers that the group has", 
            status_code=status.HTTP_200_OK)
async def get_subjects_teachers_that_the_group_has(uow: UOWDep, group_uuid: UUID, teachers_uuid: UUID):
    """
    get subjects teachers that the group has
    """
    subjects_teachers_that_the_group_has = await TeachersService().receive_educational_items_from_the_group(
        uow, group_uuid, teachers_uuid)
    if not subjects_teachers_that_the_group_has:
        return {"has_next": False}
    return {"data": subjects_teachers_that_the_group_has, "has_next": True}
    

@router.get('/{teachers_uuid}/groups', 
            summary="get teacher groups", 
            status_code=status.HTTP_200_OK)
async def get_teacher_groups(uow: UOWDep, teachers_uuid: UUID):
    """
    get teacher groups
    """
    teacher_groups = await TeachersService().get_teacher_groups(uow, teachers_uuid)
    if not teacher_groups:
        return {"has_next": False}
    return {"data": teacher_groups, "has_next": True}



@router.get('/{teachers_uuid}/subjects', 
            summary="get teacher subjects", 
            status_code=status.HTTP_200_OK)
async def get_teacher_subjects(uow: UOWDep, teachers_uuid: UUID):
    """
    get teacher subjects
    """
    teacher_subjects = await TeachersService().get_teacher_subjects(uow, teachers_uuid)
    if not teacher_subjects:
        return {"has_next": False}
    return {"data": teacher_subjects, "has_next": True}
