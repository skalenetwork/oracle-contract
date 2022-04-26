import { ethers } from "hardhat";
import { OracleTester } from "../../../typechain/OracleTester";

export async function deployOracle() {
    const factory = await ethers.getContractFactory("OracleTester");
    const instance = await factory.deploy() as OracleTester;
    return instance;
}
