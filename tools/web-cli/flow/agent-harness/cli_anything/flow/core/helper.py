from __future__ import annotations

import json
import subprocess
from pathlib import Path
from typing import Any, Dict

PACKAGE_DIR = Path(__file__).resolve().parents[1]
JS_HELPER = PACKAGE_DIR / "utils" / "flow_browser.js"


class FlowHelperError(RuntimeError):
    pass


def run_helper(payload: Dict[str, Any], timeout: int = 120) -> Dict[str, Any]:
    proc = subprocess.run(["node", str(JS_HELPER), json.dumps(payload)], capture_output=True, text=True, timeout=timeout)
    stdout = (proc.stdout or "").strip()
    stderr = (proc.stderr or "").strip()
    if not stdout:
        raise FlowHelperError(stderr or f"helper failed with code {proc.returncode}")
    try:
        data = json.loads(stdout)
    except json.JSONDecodeError as e:
        raise FlowHelperError(f"invalid helper JSON: {e}\nSTDOUT:\n{stdout}\nSTDERR:\n{stderr}") from e
    if not data.get("ok"):
        raise FlowHelperError(data.get("error") or stderr or "helper returned error")
    return data


def pretty_result(data: Dict[str, Any]) -> str:
    lines = []
    for key in ["action", "authenticated", "title", "url", "hasNewProject"]:
        if key in data:
            lines.append(f"{key}: {data[key]}")
    if data.get("bodyPreview"):
        lines.append("bodyPreview: " + str(data["bodyPreview"])[:300].replace("\n", " | "))
    return "\n".join(lines)
