from django.conf.urls import include
from django.contrib import admin
from django.urls import path

from .views import IndexView

urlpatterns = [
    path("", IndexView.as_view()),
    path("api/", include("jobs.urls")),
    path("api/auth/", include("users.urls")),
    path("admin/", admin.site.urls),
]
