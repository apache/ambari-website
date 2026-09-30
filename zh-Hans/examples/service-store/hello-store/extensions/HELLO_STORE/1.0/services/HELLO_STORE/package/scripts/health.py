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

import http.client
import json

from app import PORT, SERVICE, configuration_digest


def health(host, config, expected_pid=None):
    connection = http.client.HTTPConnection(host, PORT, timeout=3)
    try:
        connection.request("GET", "/health")
        response = connection.getresponse()
        raw = response.read(4097)
        if response.status != 200 or len(raw) > 4096:
            raise ValueError("Missing or oversized health response")
        result = json.loads(raw)
        if not isinstance(result, dict) or type(result.get("schema_version")) is not int:
            raise ValueError("Invalid health schema")
        if result["schema_version"] != 1 or result.get("service") != SERVICE:
            raise ValueError("Health response belongs to another service")
        if type(result.get("pid")) is not int or result["pid"] <= 0:
            raise ValueError("Invalid process identity")
        if expected_pid is not None and result["pid"] != expected_pid:
            raise ValueError("Health process differs from the systemd main process")
        if (result.get("configuration_sha256") != configuration_digest(config)
                or result.get("message") != config["message"]):
            raise ValueError("Service has not loaded the expected configuration")
        return result
    finally:
        connection.close()
