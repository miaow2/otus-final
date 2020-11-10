from __future__ import absolute_import, unicode_literals
import os

from celery import Celery


BASE_REDIS_URL = os.environ.get("REDIS_URL", "redis://localhost:6379")

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "netwatcher.settings")

app = Celery("netwatcher")

app.config_from_object("django.conf:settings", namespace="CELERY")

app.autodiscover_tasks()

app.conf.broker_url = BASE_REDIS_URL
