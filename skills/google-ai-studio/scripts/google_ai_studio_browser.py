#!/usr/bin/env python3
from __future__ import annotations

import json
import subprocess
from pathlib import Path

import click

BASE = Path(__file__).resolve().parent
HELPER = BASE / "google_ai_studio_browser.js"


class HelperError(RuntimeError):
    pass


def run_helper(payload: dict, timeout: int = 120) -> dict:
    proc = subprocess.run(["node", str(HELPER), json.dumps(payload)], text=True, capture_output=True, timeout=timeout, cwd=str(BASE))
    raw = (proc.stdout or "").strip() or (proc.stderr or "").strip()
    if not raw:
        raise HelperError("helper returned no output")
    data = json.loads(raw)
    if not data.get("ok"):
        raise HelperError(data.get("error") or "helper failed")
    return data


@click.group(context_settings={"help_option_names": ["-h", "--help"]})
def cli() -> None:
    """Browser-backed CLI harness for Google AI Studio."""


@cli.command("list-tabs")
@click.option("--cdp-url", default="http://127.0.0.1:9222", show_default=True)
@click.option("--json", "json_output", is_flag=True)
def list_tabs(cdp_url: str, json_output: bool) -> None:
    data = run_helper({"action": "list-tabs", "cdpUrl": cdp_url})
    click.echo(json.dumps(data, indent=2) if json_output else json.dumps(data.get("tabs", []), indent=2))


@cli.command("auth-check")
@click.option("--cdp-url", default="http://127.0.0.1:9222", show_default=True)
@click.option("--json", "json_output", is_flag=True)
def auth_check(cdp_url: str, json_output: bool) -> None:
    data = run_helper({"action": "auth-check", "cdpUrl": cdp_url})
    click.echo(json.dumps(data, indent=2) if json_output else json.dumps({"authenticated": data.get("authenticated"), "url": data.get("url"), "title": data.get("title")}, indent=2))


@cli.command()
@click.option("--cdp-url", default="http://127.0.0.1:9222", show_default=True)
def open(cdp_url: str) -> None:
    data = run_helper({"action": "open", "cdpUrl": cdp_url})
    click.echo(json.dumps({"url": data.get("url"), "title": data.get("title")}, indent=2))


@cli.command()
@click.option("--cdp-url", default="http://127.0.0.1:9222", show_default=True)
@click.option("--json", "json_output", is_flag=True)
def status(cdp_url: str, json_output: bool) -> None:
    data = run_helper({"action": "status", "cdpUrl": cdp_url})
    click.echo(json.dumps(data, indent=2) if json_output else json.dumps({"authenticated": data.get("authenticated"), "url": data.get("url"), "title": data.get("title")}, indent=2))


if __name__ == "__main__":
    try:
        cli()
    except HelperError as e:
        raise SystemExit(str(e))
