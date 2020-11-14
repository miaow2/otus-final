from django.db import models
from django_celery_results.models import TaskResult


class Departament(models.Model):
    name = models.CharField(
        max_length=50,
        unique=True,
    )

    def __str__(self):
        return self.name

    @property
    def groups_count(self):
        return self.groups.count()


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


class Job(models.Model):
    task = models.OneToOneField(
        to=TaskResult,
        on_delete=models.CASCADE,
        related_name="job",
        blank=True,
        null=True,
    )
    task_uuid = models.CharField(
        max_length=50,
    )
    command = models.CharField(
        max_length=200,
    )
    created = models.DateTimeField(
        auto_now_add=True,
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

    class Meta:
        ordering = ["-created"]

    def __str__(self):
        return f"<Job: {self.task_uuid}>"

    def __repr__(self):
        return f"<Job: {self.task_uuid}>"
