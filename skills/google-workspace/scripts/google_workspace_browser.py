#!/usr/bin/env python3
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

import click

BASE = Path(__file__).resolve().parent
HELPER = BASE / "google_workspace_browser.js"


class HelperError(RuntimeError):
    pass


def run_helper(payload: dict, timeout: int = 120) -> dict:
    proc = subprocess.run(
        ["node", str(HELPER), json.dumps(payload)],
        text=True,
        capture_output=True,
        timeout=timeout,
        cwd=str(BASE),
    )
    raw = (proc.stdout or "").strip() or (proc.stderr or "").strip()
    if not raw:
        raise HelperError("helper returned no output")
    try:
        data = json.loads(raw)
    except json.JSONDecodeError as e:
        raise HelperError(f"invalid helper output: {raw[:400]}") from e
    if not data.get("ok"):
        raise HelperError(data.get("error") or "helper failed")
    return data


@click.group(context_settings={"help_option_names": ["-h", "--help"]})
def cli() -> None:
    """Browser-backed CLI harness for Google Workspace."""


@cli.command("list-tabs")
@click.option("--cdp-url", default="http://127.0.0.1:9222", show_default=True)
@click.option("--json", "json_output", is_flag=True, help="Emit raw JSON")
def list_tabs(cdp_url: str, json_output: bool) -> None:
    data = run_helper({"action": "list-tabs", "cdpUrl": cdp_url})
    click.echo(json.dumps(data, indent=2) if json_output else json.dumps(data.get("tabs", []), indent=2))


@cli.command("auth-check")
@click.option("--service", default="gmail", show_default=True, type=click.Choice(["gmail", "calendar", "drive", "docs", "sheets"]))
@click.option("--cdp-url", default="http://127.0.0.1:9222", show_default=True)
@click.option("--json", "json_output", is_flag=True, help="Emit raw JSON")
def auth_check(service: str, cdp_url: str, json_output: bool) -> None:
    data = run_helper({"action": "auth-check", "service": service, "cdpUrl": cdp_url})
    click.echo(json.dumps(data, indent=2) if json_output else json.dumps({"service": service, "authenticated": data.get("authenticated"), "url": data.get("url"), "title": data.get("title")}, indent=2))


@cli.command()
@click.option("--service", required=True, type=click.Choice(["gmail", "calendar", "drive", "docs", "sheets"]))
@click.option("--cdp-url", default="http://127.0.0.1:9222", show_default=True)
def open(service: str, cdp_url: str) -> None:
    data = run_helper({"action": "open", "service": service, "cdpUrl": cdp_url})
    click.echo(json.dumps({"service": service, "url": data.get("url"), "title": data.get("title")}, indent=2))


@cli.command()
@click.option("--service", required=True, type=click.Choice(["gmail", "calendar", "drive", "docs", "sheets"]))
@click.option("--cdp-url", default="http://127.0.0.1:9222", show_default=True)
@click.option("--json", "json_output", is_flag=True, help="Emit raw JSON")
def status(service: str, cdp_url: str, json_output: bool) -> None:
    data = run_helper({"action": "status", "service": service, "cdpUrl": cdp_url})
    click.echo(json.dumps(data, indent=2) if json_output else json.dumps({"service": service, "authenticated": data.get("authenticated"), "accountChooser": data.get("accountChooser"), "url": data.get("url"), "title": data.get("title")}, indent=2))


if __name__ == "__main__":
    try:
        cli()
    except HelperError as e:
        raise SystemExit(str(e))
