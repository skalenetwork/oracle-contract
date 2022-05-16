from web3.auto import w3

from oracle_predeployed import OracleGenerator, ORACLE_ADDRESS
from .tools.test_solidity_project import TestSolidityProject


class TestOracleGenerator(TestSolidityProject):
    OWNER_ADDRESS = '0xd200000000000000000000000000000000000000'
    IMA_ADDRESS = '0xd200000000000000000000000000000000000001'

    def get_oracle_abi(self):
        return self.get_abi('Oracle')

    def prepare_genesis(self):
        oracle_generator = OracleGenerator()

        return self.generate_genesis(oracle_generator.generate_allocation(ORACLE_ADDRESS))
    