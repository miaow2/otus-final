from django.db.models.signals import post_save
from django.dispatch import receiver
from django_celery_results.models import TaskResult

from .models import Job


@receiver(post_save, sender=TaskResult, dispatch_uid="connect_task_and_job")
def update_task_on_job(sender, instance, created, **kwargs):
    if created:
        job = Job.objects.get(task_uuid=instance.task_id)
        job.task = instance
        job.save()
