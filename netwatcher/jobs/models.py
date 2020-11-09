from django.db import models

from .choises import RESULT_STATUS


class Departament(models.Model):
    name = models.CharField(
        max_length=50,
        unique=True,
    )

    def __str__(self):
        return self.name


class Group(models.Model):
    name = models.CharField(
        max_length=50,
        unique=True,
    )
    departament = models.ForeignKey(
        to="jobs.Departament",
        on_delete=models.CASCADE,
        related_name="groups",
    )

    def __str__(self):
        return self.name


class Result(models.Model):
    created = models.DateTimeField(
        auto_now_add=True,
    )
    status = models.CharField(
        max_length=50,
        choices=RESULT_STATUS,
    )
    group = models.ForeignKey(
        to="jobs.Group",
        on_delete=models.CASCADE,
        related_name="results",
    )
    user = models.ForeignKey(
        to="auth.User",
        on_delete=models.CASCADE,
        related_name="results",
    )
    data = models.JSONField(
        blank=True,
        null=True,
    )

    class Meta:
        ordering = ["-created"]
