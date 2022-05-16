from web3.auto import w3
from predeployed_generator.openzeppelin.proxy_admin_generator import ProxyAdminGenerator

from oracle_predeployed import UpgradeableOracleUpgradeableGenerator, ORACLE_ADDRESS
from oracle_predeployed.oracle_upgradeable_generator import OracleUpgradeableGenerator
from .tools.test_solidity_project import TestSolidityProject


class TestUpgradeableOracleGenerator(TestSolidityProject):
    OWNER_ADDRESS = '0xd200000000000000000000000000000000000000'
    PROXY_ADMIN_ADDRESS = '0xd200000000000000000000000000000000000001'

    def get_oracle_abi(self):
        return self.get_abi('Oracle')

    def prepare_genesis(self):
        proxy_admin_generator = ProxyAdminGenerator()
        upgradeable_oracle_generator = UpgradeableOracleUpgradeableGenerator()

        return self.generate_genesis({
            **upgradeable_oracle_generator.generate_allocation(
                ORACLE_ADDRESS,
                proxy_admin_address=self.PROXY_ADMIN_ADDRESS),
            **proxy_admin_generator.generate_allocation(
                self.PROXY_ADMIN_ADDRESS,
                owner_address=self.OWNER_ADDRESS)
            })
    