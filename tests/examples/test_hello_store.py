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

import importlib.util
import json
import os
from pathlib import Path
import sys
import tarfile
import threading
import types
import unittest
from unittest.mock import patch
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parents[2]
PACKAGE = ROOT / "static/examples/service-store/hello-store"
SCRIPTS = PACKAGE / "extensions/HELLO_STORE/1.0/services/HELLO_STORE/package/scripts"
sys.path.insert(0, str(SCRIPTS))

import app
import health


class PackageTest(unittest.TestCase):
    def test_download_matches_current_source(self):
        expected = {path.relative_to(PACKAGE).as_posix(): path.read_bytes()
                    for path in PACKAGE.rglob('*') if path.is_file()
                    and '__pycache__' not in path.parts and path.suffix != '.pyc'}
        archive = PACKAGE.parent / 'hello-store-1.0.0.0.tar.gz'
        with tarfile.open(archive, 'r:gz') as bundle:
            members = bundle.getmembers()
            self.assertTrue(all(member.isfile() for member in members))
            actual = {member.name.removeprefix('hello-store-1.0.0.0/'):
                      bundle.extractfile(member).read() for member in members}
        self.assertEqual(len(members), len(expected))
        self.assertEqual(actual, expected)

    def test_declared_scripts_and_configuration_are_present(self):
        service_dir = SCRIPTS.parent.parent
        descriptor = ElementTree.parse(service_dir / 'metainfo.xml')
        self.assertEqual(descriptor.findtext('.//service/name'), 'HELLO_STORE')
        for script in descriptor.findall('.//commandScript/script'):
            self.assertTrue((service_dir / 'package' / script.text).is_file())
        for config_type in descriptor.findall('.//configuration-dependencies/config-type'):
            config = ElementTree.parse(service_dir / 'configuration' / (config_type.text + '.xml'))
            self.assertEqual(config.findtext('.//property/name'), 'content')
            app.parse_content(config.findtext('.//property/value'))


class ApplicationTest(unittest.TestCase):
    def setUp(self):
        self.config = {"message": "Test message"}
        self.server = app.server(("127.0.0.1", 0), self.config)
        self.port = patch.object(health, "PORT", self.server.server_port)
        self.port.start()
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join()
        self.port.stop()

    def test_real_response_identifies_process_and_configuration(self):
        result = health.health("127.0.0.1", self.config, os.getpid())
        self.assertEqual(result["service"], "HELLO_STORE")
        self.assertEqual(result["configuration_sha256"], app.configuration_digest(self.config))
        self.assertEqual(result["message"], self.config["message"])

    def test_foreign_process_is_rejected(self):
        with self.assertRaises(ValueError):
            health.health("127.0.0.1", self.config, os.getpid() + 1)

    def test_unapplied_configuration_is_rejected(self):
        with self.assertRaises(ValueError):
            health.health("127.0.0.1", {"message": "Not applied"})

    def test_invalid_configuration_is_rejected(self):
        for value in ['[]', '{"message": 3}', '{"message": ""}',
                      '{"message": "one", "message": "two"}',
                      '{"message": "ok", "unknown": true}']:
            with self.subTest(value=value), self.assertRaises(ValueError):
                app.parse_content(value)


class ObservationTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Only the Agent library boundary is stubbed; receipt validation is real.
        names = [
            "resource_management", "resource_management.core",
            "resource_management.core.exceptions", "resource_management.core.resources",
            "resource_management.core.resources.system", "resource_management.libraries",
            "resource_management.libraries.script", "resource_management.libraries.script.script",
        ]
        modules = {name: types.ModuleType(name) for name in names}
        exceptions = modules["resource_management.core.exceptions"]
        exceptions.Fail = type("Fail", (Exception,), {})
        exceptions.ComponentIsNotRunning = type("ComponentIsNotRunning", (Exception,), {})
        modules["resource_management.core.resources.system"].Directory = object
        modules["resource_management.core.resources.system"].File = object
        modules["resource_management.libraries.script.script"].Script = object
        with patch.dict(sys.modules, modules):
            spec = importlib.util.spec_from_file_location("tutorial_service", SCRIPTS / "service.py")
            cls.service = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(cls.service)

    def observation(self, **changes):
        value = dict(schema_version=1, request_id="expected-request",
                     unit="ambari-hello-store.service", load_state="loaded",
                     active_state="active", sub_state="running", main_pid=123)
        value.update(changes)
        return value

    def consume(self, raw, code=0):
        result = types.SimpleNamespace(returncode=code, stdout=raw)
        with patch.object(self.service.uuid, "uuid4", return_value="expected-request"):
            with patch.object(self.service.subprocess, "run", return_value=result):
                return self.service.unit_state()

    def test_matching_observation(self):
        expected = self.observation()
        self.assertEqual(self.consume(json.dumps(expected).encode()), expected)

    def test_noise_missing_fields_foreign_identity_and_failed_process(self):
        invalid = [
            b"", b"service started successfully", b"{}", b"[]",
            json.dumps(self.observation(request_id="old-request")).encode(),
            json.dumps(self.observation(unit="another.service")).encode(),
            json.dumps(self.observation(main_pid=True)).encode(),
            json.dumps(self.observation(schema_version=True)).encode(),
            json.dumps(self.observation(load_state="not-found")).encode(),
        ]
        for raw in invalid:
            with self.subTest(raw=raw), self.assertRaises(self.service.Fail):
                self.consume(raw)
        with self.assertRaises(self.service.Fail):
            self.consume(json.dumps(self.observation()).encode(), code=1)


if __name__ == "__main__":
    unittest.main()
