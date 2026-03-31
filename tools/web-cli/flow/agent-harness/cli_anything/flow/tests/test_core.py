from __future__ import annotations

import json
from subprocess import CompletedProcess

import pytest

from cli_anything.flow.core.helper import FlowHelperError, pretty_result, run_helper


def test_pretty_result():
    text = pretty_result({"action": "status", "title": "Flow"})
    assert "title: Flow" in text


def test_run_helper_error(monkeypatch):
    def fake_run(*args, **kwargs):
        return CompletedProcess(args=args, returncode=1, stdout=json.dumps({"ok": False, "error": "boom"}), stderr="")

    monkeypatch.setattr("cli_anything.flow.core.helper.subprocess.run", fake_run)
    with pytest.raises(FlowHelperError):
        run_helper({"action": "status"})
