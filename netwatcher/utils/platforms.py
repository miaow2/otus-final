from nornir.core.inventory import ConnectionOptions
from nornir_scrapli.tasks import send_command as scrapli_send_command


def execute_juniper(task, command: str, login_data: dict) -> None:
    """
    Работа с Juniper
    """
    task.host.connection_options["scrapli"] = ConnectionOptions(
        extras={
            "transport": "system",
            "ssh_config_file": True,
            "auth_strict_key": False,
        },
        platform="junos",
    )
    task.run(task=scrapli_send_command, command=command)
    task.host.close_connection("scrapli")
