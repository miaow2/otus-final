import hvac

from celery import shared_task
from django.conf import settings
from nornir import InitNornir
from nornir.core.plugins.inventory import InventoryPluginRegister

from .nornir_dcbox import DCBoxInventory
import time

# запуск из папки где manage.py
# celery -A netwatcher worker --beat --scheduler django --loglevel=info


@shared_task
def get_devices(group):

    # vault = hvac.Client(url=settings.VAULT_ADDR, token=settings.VAULT_TOKEN)
    # dcbox_data = vault.secrets.kv.v2.read_secret_version(
    #     mount_point="techserver",
    #     path="dcbox",
    # )["data"]["data"]
    # login_data = vault.secrets.kv.v2.read_secret_version(
    #     mount_point="techserver",
    #     path="backup",
    # )["data"]["data"]

    filter_params = {
        "device_groups": group,
    }

    InventoryPluginRegister.register("DCBoxInventory", DCBoxInventory)
    nr = InitNornir(
        runner={"plugin": "threaded", "options": {"num_workers": 50}},
        logging={"enabled": False},
        inventory={
            "plugin": "DCBoxInventory",
            "options": {
                "nb_url": settings.DCBOX_URL,
                "nb_token": settings.DCBOX_TOKEN,
                "ssl_verify": False,
                "filter_parameters": filter_params,
            },
        },
    )
    # nr.inventory.defaults.username = login_data["default_username"]
    # nr.inventory.defaults.password = login_data["default_password"]
    result = {"hosts": list()}
    for d in nr.inventory.hosts:
        result["hosts"].append(d)

    return result