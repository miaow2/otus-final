from django.contrib.auth.models import User
from django_celery_results.models import TaskResult
from rest_framework.serializers import ModelSerializer

from jobs.models import Departament, Group

__all__ = [
    "NestedDepartamentSerializer",
    "NestedGroupSerializer",
    "NestedTaskResultSerializer",
    "NestedUserSerializer",
]


class NestedDepartamentSerializer(ModelSerializer):
    class Meta:
        model = Departament
        fields = ["id", "name"]


class NestedGroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = ["id", "name"]


class NestedUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class NestedTaskResultSerializer(ModelSerializer):
    class Meta:
        model = TaskResult
        fields = ["id", "task_id", "status", "date_done", "result"]
