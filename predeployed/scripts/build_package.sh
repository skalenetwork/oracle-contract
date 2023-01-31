#!/usr/bin/env bash

set -e

cd "$(dirname "$0")/.."
./scripts/generate_package_version.py > version.txt
ARTIFACTS_DIR="src/oracle_predeployed/artifacts/"
find ../artifacts/ -wholename "*/Oracle.sol/Oracle.json" -exec cp -v '{}' "$ARTIFACTS_DIR" \;
find ../artifacts/ -wholename "*/OracleUpgradeable.sol/OracleUpgradeable.json" -exec cp -v '{}' "$ARTIFACTS_DIR" \;
python3 -m build
