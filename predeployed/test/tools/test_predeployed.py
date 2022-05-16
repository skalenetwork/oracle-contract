import json
import subprocess
import os
import random
import string


class GethInstance:    
    def __init__(self, geth):
        self.geth = geth
    def __enter__(self):
        return self.geth.pid
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.geth:
            self.geth.terminate()
            self.geth.communicate()
            assert self.geth.returncode == 0



class TestPredeployed:
    GENESIS_FILENAME = 'genesis.json'

    def generate_extradata(self):
        self.password = ''.join(random.choices(string.ascii_lowercase + string.digits, k=12))
        password_filename = os.path.join(self.datadir, 'base_genesis.json')
        with open(password_filename, 'w') as password_f:
            password_f.writelines([self.password])
        process = subprocess.run(['geth', 'account', 'new', '--datadir', self.datadir, '--password', password_filename])
        assert process.returncode == 0

        process = subprocess.Popen(['geth', 'account', 'list', '--datadir', self.datadir], stdout=subprocess.PIPE, universal_newlines=True)
        account0 = process.stdout.readline()
        address = account0.split()[2][1:-1]
        return '0x' + '00' * 32 + address + '00' * 65

    def generate_genesis(self, allocations: dict = {}):
        base_genesis_filename = os.path.join(os.path.dirname(__file__), 'base_genesis.json')
        with open(base_genesis_filename) as base_genesis_file:
            genesis = json.load(base_genesis_file)
            genesis['alloc'].update(allocations)
            genesis['extradata'] = self.generate_extradata()
            return genesis

    def run_geth(self, tmpdir, genesis):
        genesis_filename = os.path.join(tmpdir, TestPredeployed.GENESIS_FILENAME)
        with open(genesis_filename, 'w') as f:
            json.dump(genesis, f)

        # prepare geth
        process = subprocess.run(['geth', '--datadir', tmpdir, 'init', genesis_filename], capture_output=True)
        assert process.returncode == 0

        # run geth
        self.geth = subprocess.Popen(['geth', '--datadir', tmpdir, '--http'], stderr=subprocess.PIPE, universal_newlines=True)

        while True:
            assert self.geth.poll() is None
            output_line = self.geth.stderr.readline()
            if 'HTTP server started' in output_line:
                break

        return GethInstance(self.geth)

    def stop_geth(self):
        if self.geth:
            self.geth.terminate()
            self.geth.communicate()
            assert self.geth.returncode == 0
