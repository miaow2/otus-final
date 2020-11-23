import hvac
import requests

from django.conf import settings
from django.shortcuts import get_object_or_404
from celery.result import AsyncResult
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

    def create(self, request, *args, **kwargs):
        vault = hvac.Client(url=settings.VAULT_ADDR, token=settings.VAULT_TOKEN)
        dcbox_data = vault.secrets.kv.v2.read_secret_version(
            mount_point="techserver",
            path="dcbox",
        )["data"]["data"]

        session = requests.Session()
        session.verify = False
        session.headers.update(
            {"Authorization": f"Token {dcbox_data['dcbox_8_token']}"}
        )

        url = f"{dcbox_data['dcbox_8_url']}/api/dcim/device-groups/?name={request.data['name']}"
        response = session.get(url)

        if not response.status_code == 200:
            return Response(
                {"device_group_error": "Failed to get group device from DCBox"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        elif response.json()["count"] == 0:
            return Response(
                {
                    "device_group_not_found": f"Device group {request.data['name']} not found in DCBox"
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        else:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            headers = self.get_success_headers(serializer.data)
            return Response(
                serializer.data, status=status.HTTP_201_CREATED, headers=headers
            )


class JobViewSet(DestroyModelMixin, ListModelMixin, RetrieveModelMixin, GenericViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    filterset_class = JobFilterSet


class CreateTaskAPI(CreateModelMixin, GenericAPIView):
    permission_classes = [IsAuthenticated]

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
            command=request.data["command"],
        )

        response = {
            "task_id": task.task_id,
        }

        return Response(response, status=status.HTTP_202_ACCEPTED)


class GetTaskAPI(RetrieveModelMixin, GenericAPIView):
    permission_classes = [IsAuthenticated]

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
