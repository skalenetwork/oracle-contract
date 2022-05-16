'''Main module of oracle-predeployed

Classes:
  - OracleGenerator

Values:
  - ORACLE_ADDRESS
'''

from .address import ORACLE_ADDRESS, ORACLE_IMPLEMENTATION_ADDRESS
from .oracle_generator import OracleGenerator
from .oracle_upgradeable_generator import OracleUpgradeableGenerator
