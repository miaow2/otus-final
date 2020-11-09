from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.serializers import ModelSerializer, ValidationError

from jobs.models import Departament, Group, Result

__all__ = [
    "NestedDepartamentSerializer",
    "NestedGroupSerializer",
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
