#!/usr/bin/env python
from oracle_predeployed.oracle_upgradeable_generator import OracleUpgradeableGenerator
import json


def main():
    print(json.dumps(OracleUpgradeableGenerator().get_abi(), sort_keys=True, indent=4))


if __name__ == '__main__':
    main()
