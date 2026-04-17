from __future__ import annotations

import json

import click

from .core.helper import FlowHelperError, pretty_result, run_helper


@click.group(context_settings={"help_option_names": ["-h", "--help"]})
def cli() -> None:
    """Browser-backed CLI harness for Google Labs Flow."""


@cli.command("auth-check")
@click.option("--cdp-url", default="http://127.0.0.1:9222", show_default=True)
@click.option("--json-output", is_flag=True)
def auth_check(cdp_url: str, json_output: bool) -> None:
    try:
        data = run_helper({"action": "auth-check", "cdpUrl": cdp_url})
    except FlowHelperError as e:
        raise click.ClickException(str(e))
    click.echo(json.dumps(data, indent=2) if json_output else pretty_result(data))


@cli.command()
@click.option("--cdp-url", default="http://127.0.0.1:9222", show_default=True)
@click.option("--json-output", is_flag=True)
def open(cdp_url: str, json_output: bool) -> None:
    try:
        data = run_helper({"action": "open", "cdpUrl": cdp_url})
    except FlowHelperError as e:
        raise click.ClickException(str(e))
    click.echo(json.dumps(data, indent=2) if json_output else pretty_result(data))


@cli.command()
@click.option("--cdp-url", default="http://127.0.0.1:9222", show_default=True)
@click.option("--json-output", is_flag=True)
def status(cdp_url: str, json_output: bool) -> None:
    try:
        data = run_helper({"action": "status", "cdpUrl": cdp_url})
    except FlowHelperError as e:
        raise click.ClickException(str(e))
    click.echo(json.dumps(data, indent=2) if json_output else pretty_result(data))


@cli.command()
@click.option("--cdp-url", default="http://127.0.0.1:9222", show_default=True)
@click.option("--json-output", is_flag=True)
def inspect(cdp_url: str, json_output: bool) -> None:
    try:
        data = run_helper({"action": "inspect", "cdpUrl": cdp_url})
    except FlowHelperError as e:
        raise click.ClickException(str(e))
    click.echo(json.dumps(data, indent=2) if json_output else pretty_result(data))


if __name__ == "__main__":
    cli()
