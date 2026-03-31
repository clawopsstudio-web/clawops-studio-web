from __future__ import annotations

import json
from pathlib import Path

import click

from .core.helper import pretty_result, run_helper, WhiskHelperError


@click.group(context_settings={"help_option_names": ["-h", "--help"]}, invoke_without_command=False)
def cli() -> None:
    """Browser-backed CLI harness for Google Labs Whisk."""


@cli.command("auth-check")
@click.option("--cdp-url", default="http://127.0.0.1:9222", show_default=True)
@click.option("--json-output", "json_output", is_flag=True, help="Emit raw JSON")
def auth_check(cdp_url: str, json_output: bool) -> None:
    try:
        data = run_helper({"action": "auth-check", "cdpUrl": cdp_url})
    except WhiskHelperError as e:
        raise click.ClickException(str(e))
    click.echo(json.dumps(data, indent=2) if json_output else pretty_result(data))


@cli.command()
@click.option("--cdp-url", default="http://127.0.0.1:9222", show_default=True)
@click.option("--json-output", "json_output", is_flag=True, help="Emit raw JSON")
def open(cdp_url: str, json_output: bool) -> None:
    try:
        data = run_helper({"action": "open", "cdpUrl": cdp_url})
    except WhiskHelperError as e:
        raise click.ClickException(str(e))
    click.echo(json.dumps(data, indent=2) if json_output else pretty_result(data))


@cli.command()
@click.option("--cdp-url", default="http://127.0.0.1:9222", show_default=True)
@click.option("--json-output", "json_output", is_flag=True, help="Emit raw JSON")
def status(cdp_url: str, json_output: bool) -> None:
    try:
        data = run_helper({"action": "status", "cdpUrl": cdp_url})
    except WhiskHelperError as e:
        raise click.ClickException(str(e))
    click.echo(json.dumps(data, indent=2) if json_output else pretty_result(data))


@cli.command()
@click.option("--cdp-url", default="http://127.0.0.1:9222", show_default=True)
@click.option("--json-output", "json_output", is_flag=True, help="Emit raw JSON")
def inspect(cdp_url: str, json_output: bool) -> None:
    try:
        data = run_helper({"action": "inspect", "cdpUrl": cdp_url})
    except WhiskHelperError as e:
        raise click.ClickException(str(e))
    click.echo(json.dumps(data, indent=2) if json_output else pretty_result(data))


@cli.command()
@click.option("--prompt", required=True, help="Prompt to send to Whisk")
@click.option("--cdp-url", default="http://127.0.0.1:9222", show_default=True)
@click.option("--timeout-ms", default=90000, show_default=True, type=int)
@click.option("--screenshot", type=click.Path(path_type=Path), help="Save full-page screenshot after generation")
@click.option("--download", type=click.Path(path_type=Path), help="Download first generated output if available")
@click.option("--json-output", "json_output", is_flag=True, help="Emit raw JSON")
def generate(prompt: str, cdp_url: str, timeout_ms: int, screenshot: Path | None, download: Path | None, json_output: bool) -> None:
    payload = {
        "action": "generate",
        "cdpUrl": cdp_url,
        "prompt": prompt,
        "timeoutMs": timeout_ms,
    }
    if screenshot:
        payload["screenshotPath"] = str(screenshot)
    if download:
        payload["downloadPath"] = str(download)
    try:
        data = run_helper(payload, timeout=max(180, int(timeout_ms / 1000) + 60))
    except WhiskHelperError as e:
        raise click.ClickException(str(e))
    click.echo(json.dumps(data, indent=2) if json_output else pretty_result(data))


if __name__ == "__main__":
    cli()
