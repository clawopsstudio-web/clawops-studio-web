from setuptools import setup, find_namespace_packages

setup(
    name="cli-anything-whisk",
    version="0.1.0",
    description="Browser-backed CLI harness for Google Labs Whisk",
    packages=find_namespace_packages(include=["cli_anything.*"]),
    include_package_data=True,
    package_data={"cli_anything.whisk": ["utils/*.js"]},
    install_requires=["click>=8.0"],
    entry_points={
        "console_scripts": [
            "cli-anything-whisk=cli_anything.whisk.whisk_cli:cli",
        ]
    },
)
