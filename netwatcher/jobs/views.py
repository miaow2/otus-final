from celery.result import AsyncResult
from django_celery_results.models import TaskResult
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
)
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from .filters import GroupFilterSet, JobFilterSet
from .serializers import DepartamentSerializer, GroupSerializer, JobSerializer
from jobs.models import Departament, Group, Job
from utils.tasks import get_devices


class DepartamentViewSet(ModelViewSet):
    queryset = Departament.objects.all()
    serializer_class = DepartamentSerializer


class GroupViewSet(ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    filterset_class = GroupFilterSet


class JobViewSet(DestroyModelMixin, ListModelMixin, RetrieveModelMixin, GenericViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    filterset_class = JobFilterSet


class CreateTaskAPI(CreateModelMixin, GenericAPIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):

        try:
            group = Group.objects.get(name=request.data["group"])
        except Group.DoesNotExist:
            response = {"group": f"Group {request.data['group']} does not exist."}
            return Response(response, status=status.HTTP_404_NOT_FOUND)

        task = get_devices.apply_async(
            args=(request.data["group"], request.data["command"])
        )
        Job.objects.create(
            task_uuid=task.task_id,
            group=group,
            user=request.user,
        )

        response = {
            "task_id": task.task_id,
        }

        return Response(response, status=status.HTTP_202_ACCEPTED)


class GetTaskAPI(RetrieveModelMixin, GenericAPIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, task_id, *args, **kwargs):

        task_result = AsyncResult(task_id)
        if type(task_result.result) not in ["str", "list", "dict"]:
            result = str(task_result.result)
        else:
            result = task_result.result

        response = {
            "task_id": task_result.task_id,
            "status": task_result.status,
            "result": result,
        }

        return Response(response, status=status.HTTP_200_OK)
