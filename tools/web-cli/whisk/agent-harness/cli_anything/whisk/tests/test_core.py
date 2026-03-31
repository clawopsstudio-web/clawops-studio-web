from __future__ import annotations

import json
from subprocess import CompletedProcess

import pytest

from cli_anything.whisk.core.helper import WhiskHelperError, pretty_result, run_helper


def test_pretty_result_minimal():
    text = pretty_result({"action": "status", "title": "Whisk", "url": "https://labs.google/fx/tools/whisk"})
    assert "action: status" in text
    assert "title: Whisk" in text


def test_run_helper_success(monkeypatch):
    def fake_run(*args, **kwargs):
        return CompletedProcess(args=args, returncode=0, stdout=json.dumps({"ok": True, "action": "status"}), stderr="")

    monkeypatch.setattr("cli_anything.whisk.core.helper.subprocess.run", fake_run)
    data = run_helper({"action": "status"})
    assert data["ok"] is True
    assert data["action"] == "status"


def test_run_helper_error_payload(monkeypatch):
    def fake_run(*args, **kwargs):
        return CompletedProcess(args=args, returncode=1, stdout=json.dumps({"ok": False, "error": "boom"}), stderr="")

    monkeypatch.setattr("cli_anything.whisk.core.helper.subprocess.run", fake_run)
    with pytest.raises(WhiskHelperError):
        run_helper({"action": "status"})
