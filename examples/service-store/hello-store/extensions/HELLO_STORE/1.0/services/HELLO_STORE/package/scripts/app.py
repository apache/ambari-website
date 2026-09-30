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

import hashlib
import json
import os
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer

SERVICE = "HELLO_STORE"
PORT = 18181


def parse_content(raw):
    def unique(pairs):
        result = {}
        for key, value in pairs:
            if key in result:
                raise ValueError("Duplicate configuration key")
            result[key] = value
        return result

    data = json.loads(raw, object_pairs_hook=unique)
    if not isinstance(data, dict) or set(data) != {"message"}:
        raise ValueError("Configuration must contain only message")
    if not isinstance(data["message"], str) or not 1 <= len(data["message"]) <= 200:
        raise ValueError("Message must be a string of 1 through 200 characters")
    return data


def configuration_digest(data):
    raw = json.dumps(data, sort_keys=True, ensure_ascii=True).encode("ascii")
    return hashlib.sha256(raw).hexdigest()


def server(address, data):
    # The health response identifies the process and the configuration it loaded.
    class Handler(BaseHTTPRequestHandler):
        def do_GET(self):
            if self.path != "/health":
                self.send_error(404)
                return
            payload = json.dumps({
                "schema_version": 1, "service": SERVICE, "pid": os.getpid(),
                "configuration_sha256": configuration_digest(data),
                "message": data["message"],
            }).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)

        def log_message(self, format, *args):
            pass

    return HTTPServer(address, Handler)


if __name__ == "__main__":
    with open(sys.argv[1], encoding="utf-8") as source:
        data = parse_content(source.read())
    server(("0.0.0.0", PORT), data).serve_forever()
