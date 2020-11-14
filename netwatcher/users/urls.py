from django.urls import path

from .api import ChangeTokenAPI, LoginAPI, UserAPI


# class CoursesRootView(routers.APIRootView):
#     def get_view_name(self):
#         return "Courses"

app_name = "users-api"
urlpatterns = [
    path("user/", UserAPI.as_view()),
    path("login/", LoginAPI.as_view()),
    path("change-token/", ChangeTokenAPI.as_view()),
]
