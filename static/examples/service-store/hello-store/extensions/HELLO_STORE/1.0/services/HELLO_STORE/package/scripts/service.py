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
import subprocess
import time
import uuid
from pathlib import Path

from resource_management.core.exceptions import ComponentIsNotRunning, Fail
from resource_management.core.resources.system import Directory, File
from resource_management.libraries.script.script import Script

from app import parse_content
from health import health

ROOT = Path("/opt/ambari-hello-store")
CONFIG = Path("/etc/ambari-hello-store/hello.json")
UNIT = "ambari-hello-store.service"
UNIT_FILE = Path("/etc/systemd/system") / UNIT
MARKER = ROOT / ".ambari-tutorial-owner"
OWNER = "ambari-hello-store-v1\n"
UNIT_CONTENT = """[Unit]
Description=Ambari Hello Store tutorial
After=network.target

[Service]
Type=simple
DynamicUser=yes
ExecStart=/usr/bin/python3 /opt/ambari-hello-store/app.py /etc/ambari-hello-store/hello.json
Restart=no
NoNewPrivileges=yes
PrivateTmp=yes
ProtectSystem=strict
ProtectHome=yes

[Install]
WantedBy=multi-user.target
"""


def unit_state():
    request_id = str(uuid.uuid4())
    process = subprocess.run(
        ["/usr/bin/python3", str(Path(__file__).with_name("observer.py")), request_id],
        capture_output=True, timeout=15, check=False)
    if process.returncode != 0 or len(process.stdout) > 4096:
        raise Fail("Cannot obtain a bounded systemd observation")
    try:
        value = json.loads(process.stdout)
        if (not isinstance(value, dict) or type(value.get("schema_version")) is not int
                or value["schema_version"] != 1 or value.get("request_id") != request_id
                or value.get("unit") != UNIT or value.get("load_state") != "loaded"
                or type(value.get("main_pid")) is not int or value["main_pid"] < 0
                or not isinstance(value.get("active_state"), str)
                or not isinstance(value.get("sub_state"), str)):
            raise ValueError("Invalid systemd observation")
    except (ValueError, TypeError) as error:
        raise Fail(str(error))
    return value


def require_owner():
    if not MARKER.is_file() or MARKER.read_text(encoding="utf-8") != OWNER:
        raise Fail("Tutorial paths are not owned by this package")


class Service(Script):
    def install(self, env):
        occupied = ROOT.exists() or CONFIG.parent.exists() or UNIT_FILE.exists()
        if occupied:
            require_owner()
        self.install_packages(env)
        Directory(str(ROOT), owner="root", group="root", mode=0o755)
        File(str(MARKER), content=OWNER, owner="root", group="root", mode=0o644)
        source = Path(__file__).with_name("app.py").read_text(encoding="utf-8")
        File(str(ROOT / "app.py"), content=source, owner="root", group="root", mode=0o644)
        File(str(UNIT_FILE), content=UNIT_CONTENT, owner="root", group="root", mode=0o644)
        subprocess.run(["systemctl", "daemon-reload"], check=True, timeout=30)
        self.configure(env)
        self.put_structured_out({"systemd": unit_state()})

    def configure(self, env):
        require_owner()
        raw = self.get_config()["configurations"]["hello-store-conf"]["content"]
        parse_content(raw)
        Directory(str(CONFIG.parent), owner="root", group="root", mode=0o755)
        File(str(CONFIG), content=raw, owner="root", group="root", mode=0o644)

    def start(self, env):
        self.configure(env)
        config = parse_content(CONFIG.read_text(encoding="utf-8"))
        subprocess.run(["systemctl", "start", UNIT], check=True, timeout=30)
        last_error = None
        for _ in range(20):
            try:
                state = unit_state()
                if (state["active_state"] != "active" or state["sub_state"] != "running"
                        or state["main_pid"] <= 0):
                    raise ValueError("Unit is not running")
                result = health("127.0.0.1", config, state["main_pid"])
                self.put_structured_out({"systemd": state, "health": result})
                return
            except (OSError, ValueError) as error:
                last_error = error
                time.sleep(0.25)
        raise Fail("Start verification failed: " + str(last_error))

    def stop(self, env):
        require_owner()
        subprocess.run(["systemctl", "stop", UNIT], check=True, timeout=30)
        state = unit_state()
        if state["active_state"] != "inactive" or state["main_pid"] != 0:
            raise Fail("Unit did not reach the verified stopped state")
        self.put_structured_out({"systemd": state})

    def status(self, env):
        require_owner()
        state = unit_state()
        if state["active_state"] in {"inactive", "failed"} and state["main_pid"] == 0:
            raise ComponentIsNotRunning()
        if state["active_state"] != "active" or state["sub_state"] != "running":
            raise Fail("Unit state is unresolved or transitional")
        config = parse_content(CONFIG.read_text(encoding="utf-8"))
        try:
            health("127.0.0.1", config, state["main_pid"])
        except (OSError, ValueError) as error:
            raise Fail("Health verification failed: " + str(error))


if __name__ == "__main__":
    Service().execute()
