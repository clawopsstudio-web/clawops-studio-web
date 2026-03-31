from __future__ import annotations

import json
import subprocess
from pathlib import Path
from typing import Any, Dict


PACKAGE_DIR = Path(__file__).resolve().parents[1]
JS_HELPER = PACKAGE_DIR / "utils" / "whisk_browser.js"


class WhiskHelperError(RuntimeError):
    pass


def run_helper(payload: Dict[str, Any], timeout: int = 180) -> Dict[str, Any]:
    cmd = ["node", str(JS_HELPER), json.dumps(payload)]
    proc = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
    stdout = (proc.stdout or "").strip()
    stderr = (proc.stderr or "").strip()
    if not stdout:
        raise WhiskHelperError(stderr or f"helper failed with code {proc.returncode}")
    try:
        data = json.loads(stdout)
    except json.JSONDecodeError as e:
        raise WhiskHelperError(f"invalid helper JSON: {e}\nSTDOUT:\n{stdout}\nSTDERR:\n{stderr}") from e
    if not data.get("ok"):
        raise WhiskHelperError(data.get("error") or stderr or "helper returned error")
    return data


def pretty_result(data: Dict[str, Any]) -> str:
    lines = []
    for key in [
        "action",
        "authenticated",
        "title",
        "url",
        "promptVisible",
        "downloadCount",
        "animateCount",
        "resultImageCount",
        "uploadInputCount",
        "elapsedMs",
        "filePath",
        "uploadSlotIndex",
        "uploadErrorVisible",
        "screenshotPath",
        "downloadPath",
        "downloadMime",
        "exportedImageIndex",
        "exportedWidth",
        "exportedHeight",
        "suggestedFilename",
    ]:
        if key in data:
            lines.append(f"{key}: {data[key]}")
    if data.get("downloadError"):
        lines.append("downloadError: " + str(data["downloadError"]))
    if data.get("bodyPreview"):
        lines.append("bodyPreview: " + str(data["bodyPreview"])[:300].replace("\n", " | "))
    return "\n".join(lines)
