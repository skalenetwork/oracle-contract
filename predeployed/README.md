# oracle-predeployed

## Description

A tool for generating predeployed oracle smart contract

## Installation

```console
pip install oracle-predeployed
```

## Usage example

```python
from oracle_predeployed import  UpgradeableOracleUpgradeableGenerator, ORACLE_ADDRESS, ORACLE_IMPLEMENTATION_ADDRESS

OWNER_ADDRESS = '0xd200000000000000000000000000000000000000'
PROXY_ADMIN_ADDRESS = '0xd200000000000000000000000000000000000001'

oracle_generator = UpgradeableOracleUpgradeableGenerator()

genesis = {
    # genesis block parameters
    'alloc': {
        **oracle_generator.generate_allocation(
            contract_address=ORACLE_ADDRESS,
            implementation_address=ORACLE_IMPLEMENTATION_ADDRESS,
            schain_owner=OWNER_ADDRESS,
            proxy_admin_address=PROXY_ADMIN_ADDRESS
        )
    }
}

```