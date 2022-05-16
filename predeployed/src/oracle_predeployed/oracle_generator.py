'''Module for generaration of Oracle predeployed smart contract'''

from os.path import dirname, join
from typing import Dict
from web3.auto import w3

from predeployed_generator import ContractGenerator


class OracleGenerator(ContractGenerator):
    '''Generates Oracle
    '''

    ARTIFACT_FILENAME = 'Oracle.json'

    # ---------- storage ----------
    # ----------Etherbase----------

    def __init__(self):
        generator = OracleGenerator.from_hardhat_artifact(join(
            dirname(__file__),
            'artifacts',
            self.ARTIFACT_FILENAME))
        super().__init__(bytecode=generator.bytecode, abi=generator.abi)

    @classmethod
    def generate_storage(cls, **kwargs) -> Dict[str, str]:
        '''Generate contract storage
        '''
        storage: Dict[str, str] = {}
        return storage
