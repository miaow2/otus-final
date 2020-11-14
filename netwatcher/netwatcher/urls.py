from django.conf.urls import include
from django.contrib import admin
from django.urls import path


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("users.urls")),
    path("api/", include("jobs.urls")),
    path("", include("frontend.urls")),
]
