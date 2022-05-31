import { promises as fs } from 'fs';
import { ethers, upgrades, network } from "hardhat";
import { Contract } from 'ethers';

import { getAbi, getContractKeyInAbiFile } from "@skalenetwork/upgrade-tools";

async function main() {

    let production = true;
    let upgradeable = true;

    if (process.env.PRODUCTION === "true") {
        production = true;
    } else if (process.env.PRODUCTION === "false") {
        production = false;
    }

    if (process.env.UPGRADEABLE === "true") {
        upgradeable = true;
    } else if (process.env.UPGRADEABLE === "false") {
        upgradeable = false;
    }

    let oracle: Contract;
    if (!production && !upgradeable) {
        console.log("Deploy Oracle Tester");
        oracle = await (await ethers.getContractFactory("OracleTester")).deploy();
        await oracle.deployTransaction.wait();
        console.log("Oracle Tester deployed at address", oracle.address);
    } else if (production && !upgradeable) {
        console.log("Deploy Oracle");
        oracle = await (await ethers.getContractFactory("Oracle")).deploy();
        await oracle.deployTransaction.wait();
        console.log("Oracle deployed at address", oracle.address);
    } else if (!production && upgradeable) {
        console.log("Deploy Oracle Upgradeable Tester");
        const oracleUpgradeableTesterFactory = await ethers.getContractFactory("OracleUpgradeableTester");
        oracle = (await upgrades.deployProxy(oracleUpgradeableTesterFactory));
        await oracle.deployTransaction.wait();
        console.log("Oracle deployed at address", oracle.address);
    } else {
        console.log("Deploy Oracle Upgradeable");
        const oracleUpgradeableFactory = await ethers.getContractFactory("OracleUpgradeable");
        oracle = (await upgrades.deployProxy(oracleUpgradeableFactory));
        await oracle.deployTransaction.wait();
        console.log("Oracle deployed at address", oracle.address);
    }

    console.log("Store ABIs");

    const outputObject: {[k: string]: unknown} = {};
    const contractKey = getContractKeyInAbiFile("Oracle");
    outputObject[contractKey + "_address"] = oracle.address;
    outputObject[contractKey + "_abi"] = getAbi(oracle.interface);

    await fs.writeFile(`data/oracle-${network.name}-abi.json`, JSON.stringify(outputObject, null, 4));

    console.log("Done");
}

if (require.main === module) {
    main()
        .then(() => process.exit(0))
        .catch(error => {
            console.error(error);
            process.exit(1);
        });
}
