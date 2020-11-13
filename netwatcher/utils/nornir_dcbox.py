import copy
import os
from typing import Any, Dict, List, Optional, Union

from nornir.core.inventory import (
    Defaults,
    Groups,
    Host,
    Hosts,
    Inventory,
)

import requests


class DCBoxInventory:
    def __init__(
        self,
        nb_url: Optional[str] = None,
        nb_token: Optional[str] = None,
        ssl_verify: Union[bool, str] = True,
        flatten_custom_fields: bool = True,
        filter_parameters: Optional[Dict[str, Any]] = None,
        only_master_devices: Optional[bool] = True,
        show_variable: Optional[bool] = False,
        miss_cluster: Optional[bool] = False,
        **kwargs: Any,
    ) -> None:
        """
        DCBox plugin

        Arguments:
            nb_url: DCBox url, defaults to http://localhost:8080.
                You can also use env variable NB_URL
            nb_token: DCBox token. You can also use env variable NB_TOKEN
            ssl_verify: Enable/disable certificate validation or provide path to CA bundle file
            flatten_custom_fields: Whether to assign custom fields directly to the host or not
            filter_parameters: Key-value pairs to filter down hosts
            only_master_devices: if true loads only master of VC and stand alone devices
            show_variable: return local variables from devices
        """
        filter_parameters = filter_parameters or {}
        self.base_url = nb_url or os.environ.get("NB_URL", "http://localhost:8080")
        nb_token = nb_token or os.environ.get(
            "NB_TOKEN", "0123456789abcdef0123456789abcdef01234567"
        )

        self.flatten_custom_fields = flatten_custom_fields
        self.filter_parameters = filter_parameters
        self.only_master_devices = only_master_devices
        self.show_variable = show_variable
        self.miss_cluster = miss_cluster

        self.session = requests.Session()
        self.session.headers.update({"Authorization": f"Token {nb_token}"})
        self.session.verify = ssl_verify

        self.filter_parameters = copy.deepcopy(filter_parameters)
        if filter_parameters.get("status"):
            if "maintenance" in filter_parameters["status"]:
                if isinstance(filter_parameters["status"], str):
                    raise ValueError("Virual Machines don't have Maintenance status")
                elif isinstance(filter_parameters["status"], list):
                    idx = filter_parameters["status"].index("maintenance")
                    filter_parameters["status"].pop(idx)
                    self.vm_filter_parameters = filter_parameters
        else:
            self.vm_filter_parameters = filter_parameters

    def load(self) -> Inventory:

        # url for devices
        url_device = f"{self.base_url}/api/dcim/devices/?limit=0"
        nb_devices: List[Dict[str, Any]] = []
        nb_vms: List[Dict[str, Any]] = []

        while url_device:
            r = self.session.get(url_device, params=self.filter_parameters)

            if not r.status_code == 200:
                raise ValueError(
                    f"Failed to get devices from DCBox instance {self.base_url}"
                )

            resp = r.json()
            nb_devices.extend(resp.get("results"))

            url_device = resp.get("next")

        hosts = Hosts()
        groups = Groups()
        defaults = Defaults()

        # fetch devices inventory
        for device in nb_devices:
            serialized_device: Dict[Any, Any] = {}
            serialized_device["data"] = device

            # filter only devices not in VC or masters of VCs
            if self.only_master_devices:
                if (
                    device["virtual_chassis"]
                    and device["virtual_chassis"]["master"]["id"] != device["id"]
                ):
                    continue
            if self.miss_cluster:
                if device["cluster"]:
                    continue

            # Add value for IP address
            if device.get("primary_ip4", {}):
                serialized_device["hostname"] = device["primary_ip4"]["address"].split(
                    "/"
                )[0]

            if self.flatten_custom_fields:
                for cf, value in device["custom_fields"].items():
                    serialized_device["data"][cf] = value
                serialized_device["data"].pop("custom_fields")

            # Attempt to add 'platform' based of value in 'slug'
            if device["platform"]:
                serialized_device["platform"] = (
                    device["platform"]["netmiko_type"]
                    if device["platform"]["netmiko_type"]
                    else device["platform"]["slug"]
                )

            name = serialized_device["data"].get("name") or str(
                serialized_device["data"].get("id")
            )

            hosts[name] = Host(
                name=name,
                hostname=serialized_device.get("hostname"),
                port=serialized_device.get("port"),
                username=serialized_device.get("username"),
                password=serialized_device.get("password"),
                platform=serialized_device.get("platform"),
                data=serialized_device.get("data"),
                groups=serialized_device.get(
                    "groups"
                ),  # this is a hack, we will convert it later to the correct type
                defaults=defaults,
                connection_options=dict(),
            )

        return Inventory(hosts=hosts, groups=groups, defaults=defaults)
