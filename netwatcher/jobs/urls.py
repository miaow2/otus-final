from django.urls import path
from rest_framework import routers

from .views import CreateJobAPI, DepartamentViewSet, GroupViewSet, ResultViewSet


# class CoursesRootView(routers.APIRootView):
#     def get_view_name(self):
#         return "Courses"


router = routers.DefaultRouter()
# router.APIRootView = CoursesRootView
router.register("departaments", DepartamentViewSet)
router.register("groups", GroupViewSet)
router.register("results", ResultViewSet)

# app_name = "courses-api"
urlpatterns = [
    path("jobs/create/", CreateJobAPI.as_view()),
] + router.urls
# urlpatterns = router.urls + custom_urls
