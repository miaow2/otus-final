from rest_framework import serializers

from jobs.models import Departament, Group, Job
from .nested_serializers import (
    NestedDepartamentSerializer,
    NestedGroupSerializer,
    NestedTaskResultSerializer,
    NestedUserSerializer,
)


class DepartamentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Departament
        fields = ["id", "name", "groups_count"]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    departament = NestedDepartamentSerializer()

    class Meta:
        model = Group
        fields = ["id", "name", "departament"]


class JobSerializer(serializers.HyperlinkedModelSerializer):
    group = NestedGroupSerializer()
    user = NestedUserSerializer()
    task = NestedTaskResultSerializer()

    class Meta:
        model = Job
        fields = ["id", "created", "task_uuid", "group", "command", "user", "task"]
