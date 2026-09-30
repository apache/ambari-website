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

from resource_management.core.exceptions import Fail
from resource_management.libraries.script.script import Script

from app import parse_content
from health import health


class Check(Script):
    def service_check(self, env):
        config = self.get_config()
        hosts = config["clusterHostInfo"].get("hello_store_server_hosts", [])
        if not isinstance(hosts, list) or len(hosts) != 1 or not isinstance(hosts[0], str):
            raise Fail("Expected exactly one Hello Store host")
        expected = parse_content(config["configurations"]["hello-store-conf"]["content"])
        try:
            result = health(hosts[0], expected)
        except (OSError, ValueError) as error:
            raise Fail("Service check failed: " + str(error))
        self.put_structured_out({"host": hosts[0], "health": result})


if __name__ == "__main__":
    Check().execute()
