from django.contrib.auth.models import User
from django.db.models import Q
import django_filters

from .models import Departament, Group, Job


class GroupFilterSet(django_filters.FilterSet):
    departament_id = django_filters.ModelMultipleChoiceFilter(
        queryset=Departament.objects.all(),
    )
    departament = django_filters.CharFilter(
        method="departament_search",
    )

    class Meta:
        model = Group
        fields = ["id", "name"]

    def departament_search(self, queryset, name, value):
        if not value.strip():
            return queryset
        return queryset.filter(Q(departament__name__icontains=value)).distinct()


class JobFilterSet(django_filters.FilterSet):
    group_id = django_filters.ModelMultipleChoiceFilter(
        queryset=Group.objects.all(),
    )
    group = django_filters.CharFilter(
        method="group_search",
    )
    user = django_filters.ModelMultipleChoiceFilter(
        queryset=User.objects.all(),
        field_name="user_username",
        to_field_name="username",
    )

    class Meta:
        model = Job
        fields = ["id"]

    def group_search(self, queryset, name, value):
        if not value.strip():
            return queryset
        return queryset.filter(Q(group__name__icontains=value)).distinct()
