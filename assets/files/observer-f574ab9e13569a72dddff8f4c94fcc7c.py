"""
Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements. See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
(the "License"); you may not use this file except in compliance with
the License. You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
"""

import json
import sys

import dbus

UNIT = "ambari-hello-store.service"


def observe(request_id):
    bus = dbus.SystemBus()
    manager = dbus.Interface(
        bus.get_object("org.freedesktop.systemd1", "/org/freedesktop/systemd1"),
        "org.freedesktop.systemd1.Manager")
    path = manager.LoadUnit(UNIT)
    properties = dbus.Interface(
        bus.get_object("org.freedesktop.systemd1", path),
        "org.freedesktop.DBus.Properties")
    unit = properties.GetAll("org.freedesktop.systemd1.Unit")
    service = properties.GetAll("org.freedesktop.systemd1.Service")
    return {
        "schema_version": 1, "request_id": request_id, "unit": str(unit["Id"]),
        "load_state": str(unit["LoadState"]), "active_state": str(unit["ActiveState"]),
        "sub_state": str(unit["SubState"]), "main_pid": int(service["MainPID"]),
    }


if __name__ == "__main__":
    print(json.dumps(observe(sys.argv[1])))
