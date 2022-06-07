import json
from os.path import join, dirname, normpath
from subprocess import run

from .test_predeployed import TestPredeployed

class TestSolidityProject(TestPredeployed):
    def get_abi(self, contract: str) -> list:
        with open(join(
                    self.get_artifacts_dir(),
                    f'contracts/{contract}.sol/',
                    f'{contract}.json')) as f:
            data = json.load(f)
            return data['abi']

    @staticmethod
    def get_artifacts_dir():
        return normpath(join(dirname(__file__), '../../../artifacts/'))
