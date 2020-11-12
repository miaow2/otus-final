from django.conf.urls import include
from django.urls import path
from rest_framework import routers

from .api import ChangeTokenAPI, LoginAPI, UserAPI


# class CoursesRootView(routers.APIRootView):
#     def get_view_name(self):
#         return "Courses"


# router = routers.DefaultRouter()
# router.APIRootView = CoursesRootView
# router.register("departaments", DepartamentViewSet)
# router.register("groups", GroupViewSet)
# router.register("jobs", JobViewSet)

# app_name = "courses-api"
urlpatterns = [
    # path("", include(router.urls)),
    path("user/", UserAPI.as_view()),
    path("login/", LoginAPI.as_view()),
    path("change-token/", ChangeTokenAPI.as_view()),
]
