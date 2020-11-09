from django.contrib import admin

from .models import Departament, Group


@admin.register(Departament)
class DepartamentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
    )
    list_display_links = ("name",)


@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "departament",
    )
    list_display_links = ("name",)
