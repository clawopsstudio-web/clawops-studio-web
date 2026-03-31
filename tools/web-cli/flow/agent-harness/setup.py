from setuptools import setup, find_namespace_packages

setup(
    name="cli-anything-flow",
    version="0.1.0",
    description="Browser-backed CLI harness for Google Labs Flow",
    packages=find_namespace_packages(include=["cli_anything.*"]),
    include_package_data=True,
    package_data={"cli_anything.flow": ["utils/*.js"]},
    install_requires=["click>=8.0"],
    entry_points={
        "console_scripts": [
            "cli-anything-flow=cli_anything.flow.flow_cli:cli",
        ]
    },
)
