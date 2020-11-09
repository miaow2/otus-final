from rest_framework import serializers

from jobs.models import Departament, Group, Result
from .nested_serializers import (
    NestedDepartamentSerializer,
    NestedGroupSerializer,
    NestedUserSerializer,
)


class DepartamentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Departament
        fields = ["id", "name"]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    departament = NestedDepartamentSerializer()

    class Meta:
        model = Group
        fields = ["id", "name", "departament"]


class ResultSerializer(serializers.HyperlinkedModelSerializer):
    group = NestedGroupSerializer()
    user = NestedUserSerializer()

    class Meta:
        model = Result
        fields = ["id", "created", "status", "group", "user", "data"]
