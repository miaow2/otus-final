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

from .filters import GroupFilterSet, ResultFilterSet
from .serializers import DepartamentSerializer, GroupSerializer, ResultSerializer
from jobs.models import Departament, Group, Result
from utils.helpers import get_devices


class DepartamentViewSet(ModelViewSet):
    queryset = Departament.objects.all()
    serializer_class = DepartamentSerializer


class GroupViewSet(ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    filterset_class = GroupFilterSet


class ResultViewSet(
    DestroyModelMixin, ListModelMixin, RetrieveModelMixin, GenericViewSet
):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer
    filterset_class = ResultFilterSet


class CreateJobAPI(CreateModelMixin, GenericAPIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        print(request.data)
        get_devices(request.data["group"])
        # user = self.request.user
        # course = Course.objects.get(id=request.data["course_id"])
        # course.participants.remove(user)

        return Response({"status": "ok"}, status=200)