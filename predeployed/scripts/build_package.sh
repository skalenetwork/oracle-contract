#!/usr/bin/env bash

set -e

cd "$(dirname "$0")/.."
./scripts/generate_package_version.py > version.txt
ARTIFACTS_DIR="src/oracle_predeployed/artifacts/"
cp -v "../artifacts/contracts/Oracle.sol/Oracle.json" "$ARTIFACTS_DIR"
cp -v "../artifacts/contracts/OracleUpgradeable.sol/OracleUpgradeable.json" "$ARTIFACTS_DIR"
python3 -m build
