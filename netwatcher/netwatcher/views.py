from django.shortcuts import render
from django.views.generic.base import View
from rest_framework import generics, permissions

from .serializers import UserSerializer


class IndexView(View):
    template_name = "index.html"

    def get(self, request):
        return render(request, self.template_name, {})


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):

        return self.request.user
