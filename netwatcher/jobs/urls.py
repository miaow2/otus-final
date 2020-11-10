from django.conf.urls import include
from django.urls import path
from rest_framework import routers

from .views import (
    CreateTaskAPI,
    GetTaskAPI,
    DepartamentViewSet,
    GroupViewSet,
    JobViewSet,
)


# class CoursesRootView(routers.APIRootView):
#     def get_view_name(self):
#         return "Courses"


router = routers.DefaultRouter()
# router.APIRootView = CoursesRootView
router.register("departaments", DepartamentViewSet)
router.register("groups", GroupViewSet)
router.register("jobs", JobViewSet)

# app_name = "courses-api"
urlpatterns = [
    path("", include(router.urls)),
    path("tasks/", CreateTaskAPI.as_view()),
    path("tasks/<slug:task_id>", GetTaskAPI.as_view()),
]
