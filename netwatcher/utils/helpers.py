from .platforms import *


def route_devices(task, command: str, login_data: dict) -> None:
    """
    Запуск сбора бэкапа зависимости от платформы
    """
    platform_dict = {
        "juniper_junos": execute_juniper,
        #     "cisco_xr": platforms.backup_cisco_xr,
        #     "cisco_nxos": platforms.backup_cisco_nxos,
        #     "cisco_ios": platforms.backup_cisco_ios,
        #     "arista_eos": platforms.backup_arista,
        #     "eltex_esr": platforms.backup_eltex,
        #     "extreme_netiron": platforms.backup_brocade_netiron,
        #     "extreme_nos": platforms.backup_brocade_vdx,
        #     "ruckus_fastiron": platforms.backup_brocade_icx,
        #     "alcatel_sros": platforms.backup_alcatel,
        #     "netscaler": platforms.backup_citrix,
        #     "mellanox_ssh": platforms.backup_mellanox,
        #     "cisco_asa": platforms.backup_cisco_asa,
        #     "ruijie_os": platforms.backup_bulat_rgos,
        #     "checkpoint_gaia": platforms.backup_checkpoint,
        #     "fortinet": platforms.backup_fortinet_ssh,
        #     "huawei": platforms.backup_huawei,
        #     "huawei_vrpv8": platforms.backup_huawei,
        #     "hp_comware": platforms.backup_hp_comware,
        #     "hp_procurve": platforms.backup_hp_procurve,
        #     "dlink_ds": platforms.backup_dlink,
        #     "fx-os": platforms.backup_cisco_firepower,
        #     "virtualconnect": platforms.backup_hp_virtualconnect,
        #     "enos": platforms.backup_lenovo_blade_switch,
    }

    if platform_dict.get(task.host.platform):
        platform_dict.get(task.host.platform)(task, command, login_data)
    else:
        print(f"platform: does not find platform {task.host.platform} on {task.host}")
