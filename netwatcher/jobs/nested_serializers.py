from django.contrib.auth.models import User
from django.core.exceptions import (
    FieldError,
    MultipleObjectsReturned,
    ObjectDoesNotExist,
)
from django_celery_results.models import TaskResult
from rest_framework.exceptions import ValidationError
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

    def to_internal_value(self, data):

        if data is None:
            return None

        if isinstance(data, dict):
            queryset = self.Meta.model.objects
            try:
                return queryset.get(**data)
            except ObjectDoesNotExist:
                raise ValidationError(
                    "Related object not found using the provided attributes: {}".format(
                        data
                    )
                )
            except MultipleObjectsReturned:
                raise ValidationError(
                    "Multiple objects match the provided attributes: {}".format(data)
                )
            except FieldError as e:
                raise ValidationError(e)

        if isinstance(data, int):
            pk = data
        else:
            try:
                pk = int(data)
            except (TypeError, ValueError):
                raise ValidationError(
                    "Related objects must be referenced by numeric ID or by dictionary of attributes. Received an "
                    "unrecognized value: {}".format(data)
                )

        queryset = self.Meta.model.objects
        try:
            return queryset.get(pk=int(data))
        except ObjectDoesNotExist:
            raise ValidationError(
                "Related object not found using the provided numeric ID: {}".format(pk)
            )


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
