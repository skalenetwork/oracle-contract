'''Module for generation of Oracle predeployed smart contract'''
from typing import Dict

from predeployed_generator.upgradeable_contract_generator import UpgradeableContractGenerator

from oracle_predeployed.oracle_generator import OracleGenerator


class OracleUpgradeableGenerator(OracleGenerator):
    '''Generates non upgradeable instance of OracleUpgradeable
    '''

    ARTIFACT_FILENAME = 'OracleUpgradeable.json'

    # --------------- storage ---------------
    # ------------ Initializable ------------
    # 0:    _initialized, _initializing
    # ---------- OracleUpgradeable ----------


    INITIALIZED_SLOT = 0

    @classmethod
    def generate_storage(cls, **kwargs) -> Dict[str, str]:
        '''Generate smart contract storage.
        '''

        storage = super().generate_storage(**kwargs)
        cls._write_uint256(storage, cls.INITIALIZED_SLOT, 1)
        return storage


class UpgradeableOracleUpgradeableGenerator(UpgradeableContractGenerator):
    '''Generates upgradeable instance of OracleUpgradeable
    '''

    def __init__(self):
        super().__init__(implementation_generator=OracleUpgradeableGenerator())
