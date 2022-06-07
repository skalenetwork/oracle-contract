'''Module for generation of Oracle predeployed smart contract'''

from os.path import dirname, join
from typing import Dict

from predeployed_generator.contract_generator import ContractGenerator


class OracleGenerator(ContractGenerator):
    '''Generates Oracle
    '''

    ARTIFACT_FILENAME = 'Oracle.json'

    # ---------- storage ----------
    # ---------- Oracle -----------

    def __init__(self):
        generator = OracleGenerator.from_hardhat_artifact(join(
            dirname(__file__),
            'artifacts',
            self.ARTIFACT_FILENAME))
        super().__init__(bytecode=generator.bytecode, abi=generator.abi)

    @classmethod
    def generate_storage(cls, **_) -> Dict[str, str]:
        '''Generate contract storage
        '''
        storage: Dict[str, str] = {}
        return storage
