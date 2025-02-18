from services.students import StudentsService
from fastapi import APIRouter, status, Request
from api.dependencies import UOWDep, limiter
from uuid import UUID

router = APIRouter(
    prefix="/students",
    tags=["Students"],
)


@router.get("/{students_uuid}/groups/teachers/subjects",
            description="Get the student and his group, his academic subjects and his teachers.",
            status_code=status.HTTP_200_OK,
            summary="Get the student and his group, his academic subjects and his teachers",
            )
@limiter.limit("50/minute")
async def get_student_and_their_group(request: Request, uow: UOWDep, students_uuid: UUID):
    """
    Get the student and his group, his academic subjects and his teachers
    """
    students = await StudentsService().get_students_subjects_and_teachers(uow, students_uuid)
    return students


