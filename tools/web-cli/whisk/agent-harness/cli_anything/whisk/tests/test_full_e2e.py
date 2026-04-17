from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys

import pytest


def _resolve_cli(name: str):
    force = os.environ.get("CLI_ANYTHING_FORCE_INSTALLED", "").strip() == "1"
    path = shutil.which(name)
    if path:
        return [path]
    if force:
        raise RuntimeError(f"{name} not found in PATH. Install with: pip install -e .")
    module = "cli_anything.whisk.whisk_cli"
    return [sys.executable, "-m", module]


class TestWhiskCLI:
    CLI_BASE = _resolve_cli("cli-anything-whisk")

    @pytest.mark.skipif(os.environ.get("RUN_WHISK_E2E") != "1", reason="set RUN_WHISK_E2E=1 to run live browser E2E")
    def test_auth_check_json(self):
        result = subprocess.run(self.CLI_BASE + ["auth-check", "--json-output"], capture_output=True, text=True, check=True)
        data = json.loads(result.stdout)
        assert data["ok"] is True
        assert data["action"] == "auth-check"
