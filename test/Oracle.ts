// SPDX-License-Identifier: AGPL-3.0-only

/**
 * @license
 * SKALE Oracle demo
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * @file Oracle.ts
 * @copyright SKALE Labs 2022-Present
 */

import chaiAsPromised from "chai-as-promised";
import * as chai from "chai"
import { OracleTester, OracleUpgradeableTester } from "../typechain";

chai.should();
chai.use((chaiAsPromised));

import { ethers } from "hardhat";

async function deployOracle() {
    return await (await ethers.getContractFactory("OracleTester")).deploy() as OracleTester;
}

async function deployOracleUpgradeable() {
    const oracleUpgradeableTester = await (await ethers.getContractFactory("OracleUpgradeableTester")).deploy() as OracleUpgradeableTester;
    await oracleUpgradeableTester.initialize();
    return oracleUpgradeableTester;
}

function testOracle(deploy: () => Promise<OracleTester | OracleUpgradeableTester>) {
    let oracle: OracleTester | OracleUpgradeableTester;

    beforeEach(async () => {
        oracle = await deploy();
    })

    describe("Negative tests", () => {

        it("should impossible to send response with incorrect data", async () => {
            const cid = 1;
            const uri = "https://www.binance.com/api/v3/time";
            const encoding = "json";
            const ethApi = "eth_call";
            const ethApiNull = "";
            const params = "[{\"from\":\"0x0000000000000000000000000000000000000000\",\"to\":\"0xd53eC40571B36C99073dF1ca3c5b8D5cFeA22E66\",\"data\":\"0x70a0823100000000000000000000000093b603501aae5145c97314cf1abce76a3efd65fb\",\"gas\":\"0xfffff\"},\"latest\"]";
            const paramsNull = "";
            const jsps: string[] = ["/serverTime"];
            const jspsNull: string[] = [];
            const jspsMany: string[] = ["/serverTime", "/serverTime2", "/serverTime3"];
            const trims: number[] = [4];
            const trimsNull: number[] = [];
            const trimsMany: number[] = [1, 2, 3];
            const post = "wow_what_a_post_string";
            const postNull = "";
            const time = 1649253252000;
            const rslts: string[] = ["164925325"];
            const rsltsNull: string[] = [];
            const rsltsMany: string[] = ["164925325", "164928325", "164926325"];
            const sigs: {v: number, r: string, s: string}[] = [
                {
                    v: 0,
                    r: "0x0000000000000000000000000000000000000000000000000000000000000000",
                    s: "0x0000000000000000000000000000000000000000000000000000000000000000"
                },
                {
                    v: 0,
                    r: "0x0000000000000000000000000000000000000000000000000000000000000000",
                    s: "0x0000000000000000000000000000000000000000000000000000000000000000"
                },
                {
                    v: 0,
                    r: "0x0000000000000000000000000000000000000000000000000000000000000000",
                    s: "0x0000000000000000000000000000000000000000000000000000000000000000"
                },
                {
                    v: 0,
                    r: "0x0000000000000000000000000000000000000000000000000000000000000000",
                    s: "0x0000000000000000000000000000000000000000000000000000000000000000"
                },
            ];

            const oracleResponse = {
                cid,
                uri,
                encoding,
                ethApi: ethApiNull,
                params: paramsNull,
                jsps,
                trims,
                post,
                time,
                rslts: rsltsMany,
                sigs
            }

            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Incorrect number of results");
            oracleResponse.rslts = rsltsNull;
            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Incorrect number of results");
            oracleResponse.trims = trimsMany;
            oracleResponse.rslts = rslts;
            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Incorrect number of results");
            oracleResponse.rslts = rsltsNull;
            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Incorrect number of results");
            oracleResponse.rslts = rsltsMany;
            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Incorrect number of results");
            oracleResponse.trims = trimsNull;
            oracleResponse.rslts = rsltsNull;
            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Incorrect number of results");
            oracleResponse.rslts = rsltsMany;
            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Incorrect number of results");

            oracleResponse.jsps = jspsMany;
            oracleResponse.trims = trims;
            oracleResponse.rslts = rslts;
            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Incorrect number of results");
            oracleResponse.rslts = rsltsNull;
            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Incorrect number of results");
            oracleResponse.rslts = rsltsMany;
            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Incorrect number of results");
            oracleResponse.trims = trimsMany;
            oracleResponse.rslts = rslts;
            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Incorrect number of results");
            oracleResponse.rslts = rsltsNull;
            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Incorrect number of results");
            oracleResponse.trims = trimsNull;
            oracleResponse.rslts = rslts;
            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Incorrect number of results");
            oracleResponse.rslts = rsltsNull;
            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Incorrect number of results");

            oracleResponse.jsps = jspsNull;
            oracleResponse.trims = trims;
            oracleResponse.rslts = rslts;
            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Incorrect number of results");
            oracleResponse.rslts = rsltsNull;
            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Incorrect number of results");
            oracleResponse.rslts = rsltsMany;
            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Incorrect number of results");
            oracleResponse.trims = trimsNull;
            oracleResponse.rslts = rslts;
            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Incorrect number of results");
            oracleResponse.rslts = rsltsNull;
            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Incorrect number of results");
            oracleResponse.rslts = rsltsMany;
            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Incorrect number of results");
            oracleResponse.trims = trimsMany;
            oracleResponse.rslts = rslts;
            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Incorrect number of results");
            oracleResponse.rslts = rsltsNull;
            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Incorrect number of results");
            oracleResponse.rslts = rsltsMany;
            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Incorrect number of results");

            await oracle.setNumberOfNodes(3);

            oracleResponse.jsps = jsps;
            oracleResponse.trims = trimsNull;
            oracleResponse.rslts = rslts;
            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Invalid length of signatures");

            await oracle.setNumberOfNodes(5);

            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Invalid length of signatures");

            await oracle.setNumberOfNodes(4);

            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Verification is failed");

            const wallet1 = ethers.Wallet.createRandom();
            const wallet2 = ethers.Wallet.createRandom();
            const wallet3 = ethers.Wallet.createRandom();
            const wallet4 = ethers.Wallet.createRandom();

            await oracle.setNodeAddress(wallet1.address);
            await oracle.setNodeAddress(wallet2.address);
            await oracle.setNodeAddress(wallet3.address);
            await oracle.setNodeAddress(wallet4.address);

            const wallet11 = ethers.Wallet.createRandom();
            const wallet21 = ethers.Wallet.createRandom();
            const wallet31 = ethers.Wallet.createRandom();
            const wallet41 = ethers.Wallet.createRandom();

            const signingKey1 = new ethers.utils.SigningKey(wallet11.privateKey);
            const signingKey2 = new ethers.utils.SigningKey(wallet21.privateKey);
            const signingKey3 = new ethers.utils.SigningKey(wallet31.privateKey);
            const signingKey4 = new ethers.utils.SigningKey(wallet41.privateKey);

            const data = ethers.utils.id(await oracle.combineOracleResponse(oracleResponse));
            const digestHex = ethers.utils.hexlify(data);

            const signature1 = signingKey1.signDigest(digestHex);
            const signature2 = signingKey2.signDigest(digestHex);
            const signature3 = signingKey3.signDigest(digestHex);
            const signature4 = signingKey4.signDigest(digestHex);

            sigs[0] = {
                v: signature1.v,
                r: signature1.r,
                s: signature1.s,
            };
            sigs[1] = {
                v: signature2.v,
                r: signature2.r,
                s: signature2.s,
            };
            sigs[2] = {
                v: signature3.v,
                r: signature3.r,
                s: signature3.s,
            };
            sigs[3] = {
                v: signature4.v,
                r: signature4.r,
                s: signature4.s,
            };

            oracleResponse.sigs = sigs;

            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Verification is failed");
        });
    });

    describe("Manual example", () => {

        // Manual example response
        // {
        //     "cid":1234,
        //     "uri":"https://www.helloworld.com",
        //     "encoding":"json",
        //     "jsps":["/greetings"],
        //     "trims":[0],
        //     "time":1649253252000,
        //     "rslts":["Hello_World"],
        // }

        const dataToSign = "{\"cid\":1234,\"uri\":\"https://www.helloworld.com\",\"encoding\":\"json\",\"jsps\":[\"/greetings\"],\"trims\":[0],\"time\":1649253252000,\"rslts\":[\"Hello_World\"],";

        const cid = 1234;
        const uri = "https://www.helloworld.com";
        const encoding = "json";
        const ethApi = "";
        const params = "";
        const jsps: string[] = ["/greetings"];
        const trims: number[] = [0];
        const post = "";
        const time = 1649253252000;
        const rslts: string[] = ["Hello_World"];
        const sigs: {v: number, r: string, s: string}[] = [];

        it("should create a JSON string to sign", async () => {
            const oracleResponse = {
                cid,
                uri,
                encoding,
                ethApi,
                params,
                jsps,
                trims,
                post,
                time,
                rslts,
                sigs
            }

            const dataByContract = await oracle.combineOracleResponse(oracleResponse);

            dataByContract.should.be.equal(dataToSign);
        });

        it("should verify oracle response", async () => {

            const wallet1 = ethers.Wallet.createRandom();
            const wallet2 = ethers.Wallet.createRandom();
            const wallet3 = ethers.Wallet.createRandom();
            const wallet4 = ethers.Wallet.createRandom();

            await oracle.setNumberOfNodes(4);
            const numberOfNodes = await oracle.getNumberOfNodesInSchain();
            numberOfNodes.should.be.equal(4);

            const countOfTrust = await oracle.getTrustNumberOfNodes();
            countOfTrust.should.be.equal(2);

            await oracle.setNodeAddress(wallet1.address);
            await oracle.setNodeAddress(wallet2.address);
            await oracle.setNodeAddress(wallet3.address);
            await oracle.setNodeAddress(wallet4.address);

            const nodeAddress1 = await oracle.nodeAddresses(0);
            const nodeAddress2 = await oracle.nodeAddresses(1);
            const nodeAddress3 = await oracle.nodeAddresses(2);
            const nodeAddress4 = await oracle.nodeAddresses(3);

            nodeAddress1.should.be.equal(wallet1.address);
            nodeAddress2.should.be.equal(wallet2.address);
            nodeAddress3.should.be.equal(wallet3.address);
            nodeAddress4.should.be.equal(wallet4.address);

            const signingKey1 = new ethers.utils.SigningKey(wallet1.privateKey);
            const signingKey2 = new ethers.utils.SigningKey(wallet2.privateKey);
            const signingKey3 = new ethers.utils.SigningKey(wallet3.privateKey);
            const signingKey4 = new ethers.utils.SigningKey(wallet4.privateKey);

            const oracleResponse = {
                cid,
                uri,
                encoding,
                ethApi,
                params,
                jsps,
                trims,
                post,
                time,
                rslts,
                sigs
            }

            let data = ethers.utils.id(await oracle.combineOracleResponse(oracleResponse));
            let digestHex = ethers.utils.hexlify(data);

            let signature1 = signingKey1.signDigest(digestHex);
            let signature2 = signingKey2.signDigest(digestHex);
            let signature3 = signingKey3.signDigest(digestHex);
            let signature4 = signingKey4.signDigest(digestHex);

            sigs.push({
                v: signature1.v,
                r: signature1.r,
                s: signature1.s,
            });
            sigs.push({
                v: signature2.v,
                r: signature2.r,
                s: signature2.s,
            });
            sigs.push({
                v: signature3.v,
                r: signature3.r,
                s: signature3.s,
            });
            sigs.push({
                v: signature4.v,
                r: signature4.r,
                s: signature4.s,
            });

            oracleResponse.sigs = sigs;

            await (await oracle.setOracleResponse(oracleResponse)).wait();

            let res = await oracle.data(ethers.utils.id(uri + jsps[0] + post));
            res.should.be.equal(rslts[0]);

            rslts[0] = "Hello_World2";

            oracleResponse.rslts = rslts;

            data = ethers.utils.id(await oracle.combineOracleResponse(oracleResponse));
            digestHex = ethers.utils.hexlify(data);

            signature1 = signingKey1.signDigest(digestHex);
            signature2 = signingKey2.signDigest(digestHex);
            signature3 = signingKey3.signDigest(digestHex);
            signature4 = signingKey4.signDigest(digestHex);

            sigs[0] = {
                v: signature1.v,
                r: signature1.r,
                s: signature1.s,
            };
            sigs[1] = {
                v: signature2.v,
                r: signature2.r,
                s: signature2.s,
            };
            sigs[2] = {
                v: signature3.v,
                r: signature3.r,
                s: signature3.s,
            };
            sigs[3] = {
                v: signature4.v,
                r: signature4.r,
                s: signature4.s,
            };

            oracleResponse.sigs = sigs;

            await oracle.setOracleResponse(oracleResponse);

            res = await oracle.data(ethers.utils.id(uri + jsps[0] + post));
            res.should.be.equal(rslts[0]);
        });

        it("should not verify oracle response", async () => {

            const wallet1 = ethers.Wallet.createRandom();
            const wallet2 = ethers.Wallet.createRandom();
            const wallet3 = ethers.Wallet.createRandom();
            const wallet4 = ethers.Wallet.createRandom();

            await oracle.setNumberOfNodes(4);
            const numberOfNodes = await oracle.getNumberOfNodesInSchain();
            numberOfNodes.should.be.equal(4);

            const countOfTrust = await oracle.getTrustNumberOfNodes();
            countOfTrust.should.be.equal(2);

            await oracle.setNodeAddress(wallet1.address);
            await oracle.setNodeAddress(wallet2.address);
            await oracle.setNodeAddress(wallet3.address);
            await oracle.setNodeAddress(wallet4.address);

            const nodeAddress1 = await oracle.nodeAddresses(0);
            const nodeAddress2 = await oracle.nodeAddresses(1);
            const nodeAddress3 = await oracle.nodeAddresses(2);
            const nodeAddress4 = await oracle.nodeAddresses(3);

            nodeAddress1.should.be.equal(wallet1.address);
            nodeAddress2.should.be.equal(wallet2.address);
            nodeAddress3.should.be.equal(wallet3.address);
            nodeAddress4.should.be.equal(wallet4.address);

            const signingKey1 = new ethers.utils.SigningKey(wallet1.privateKey);
            // const signingKey2 = new ethers.utils.SigningKey(wallet2.privateKey);
            const signingKey3 = new ethers.utils.SigningKey(wallet3.privateKey);
            const signingKey4 = new ethers.utils.SigningKey(wallet4.privateKey);

            const oracleResponse = {
                cid,
                uri,
                encoding,
                ethApi,
                params,
                jsps,
                trims,
                post,
                time,
                rslts,
                sigs
            }

            let data = ethers.utils.id(await oracle.combineOracleResponse(oracleResponse));
            let digestHex = ethers.utils.hexlify(data);

            let signature1 = signingKey1.signDigest(digestHex);
            // let signature2 = signingKey2.signDigest(digestHex);
            let signature3 = signingKey3.signDigest(digestHex);
            let signature4 = signingKey4.signDigest(digestHex);

            sigs[0] = {
                v: 0,
                r: "0x0000000000000000000000000000000000000000000000000000000000000000",
                s: "0x0000000000000000000000000000000000000000000000000000000000000000",
            };
            sigs[1] = {
                v: 0,
                r: "0x0000000000000000000000000000000000000000000000000000000000000000",
                s: "0x0000000000000000000000000000000000000000000000000000000000000000",
            };
            sigs[2] = {
                v: 0,
                r: "0x0000000000000000000000000000000000000000000000000000000000000000",
                s: "0x0000000000000000000000000000000000000000000000000000000000000000",
            };
            sigs[3] = {
                v: 0,
                r: "0x0000000000000000000000000000000000000000000000000000000000000000",
                s: "0x0000000000000000000000000000000000000000000000000000000000000000",
            };

            oracleResponse.sigs = sigs;

            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Verification is failed");

            data = ethers.utils.id(await oracle.combineOracleResponse(oracleResponse));
            digestHex = ethers.utils.hexlify(data);

            signature1 = signingKey1.signDigest(digestHex);
            // signature2 = signingKey2.signDigest(digestHex);
            signature3 = signingKey3.signDigest(digestHex);
            signature4 = signingKey4.signDigest(digestHex);

            sigs[0] = {
                v: signature1.v,
                r: signature1.r,
                s: signature1.s,
            };

            oracleResponse.sigs = sigs;

            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Verification is failed");

            sigs[1] = {
                v: signature4.v,
                r: signature4.r,
                s: signature4.s,
            };

            oracleResponse.sigs = sigs;

            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Verification is failed");

            sigs[2] = {
                v: signature3.v,
                r: signature3.r,
                s: signature3.s,
            };

            oracleResponse.sigs = sigs;

            await oracle.setOracleResponse(oracleResponse);

            const res = await oracle.data(ethers.utils.id(uri + jsps[0] + post));
            res.should.be.equal(rslts[0]);
        });

    });

    describe("Manual example with post", () => {

        // Manual example with post response
        // {
        //     "cid":1234,
        //     "uri":"https://www.helloworld.com",
        //     "encoding":"json",
        //     "jsps":[/greetings],
        //     "trims":[],
        //     "post": "/say_greetings"
        //     "time":1649253252000,
        //     "rslts":["Hello_World"],
        // }

        const dataToSign = "{\"cid\":1234,\"uri\":\"https://www.helloworld.com\",\"encoding\":\"json\",\"jsps\":[\"/greetings\"],\"post\":\"/say_greetings\",\"time\":1649253252000,\"rslts\":[\"Hello_World\"],";

        const cid = 1234;
        const uri = "https://www.helloworld.com";
        const encoding = "json";
        const ethApi = "";
        const params = "";
        const jsps: string[] = ["/greetings"];
        const trims: number[] = [];
        const post = "/say_greetings";
        const time = 1649253252000;
        const rslts: string[] = ["Hello_World"];
        const sigs: {v: number, r: string, s: string}[] = [];

        it("should create a JSON string to sign", async () => {
            const oracleResponse = {
                cid,
                uri,
                encoding,
                ethApi,
                params,
                jsps,
                trims,
                post,
                time,
                rslts,
                sigs
            }

            const dataByContract = await oracle.combineOracleResponse(oracleResponse);

            dataByContract.should.be.equal(dataToSign);
        });

        it("should verify oracle response", async () => {

            const wallet1 = ethers.Wallet.createRandom();
            const wallet2 = ethers.Wallet.createRandom();
            const wallet3 = ethers.Wallet.createRandom();
            const wallet4 = ethers.Wallet.createRandom();

            await oracle.setNumberOfNodes(4);
            const numberOfNodes = await oracle.getNumberOfNodesInSchain();
            numberOfNodes.should.be.equal(4);

            const countOfTrust = await oracle.getTrustNumberOfNodes();
            countOfTrust.should.be.equal(2);

            await oracle.setNodeAddress(wallet1.address);
            await oracle.setNodeAddress(wallet2.address);
            await oracle.setNodeAddress(wallet3.address);
            await oracle.setNodeAddress(wallet4.address);

            const nodeAddress1 = await oracle.nodeAddresses(0);
            const nodeAddress2 = await oracle.nodeAddresses(1);
            const nodeAddress3 = await oracle.nodeAddresses(2);
            const nodeAddress4 = await oracle.nodeAddresses(3);

            nodeAddress1.should.be.equal(wallet1.address);
            nodeAddress2.should.be.equal(wallet2.address);
            nodeAddress3.should.be.equal(wallet3.address);
            nodeAddress4.should.be.equal(wallet4.address);

            const signingKey1 = new ethers.utils.SigningKey(wallet1.privateKey);
            const signingKey2 = new ethers.utils.SigningKey(wallet2.privateKey);
            const signingKey3 = new ethers.utils.SigningKey(wallet3.privateKey);
            const signingKey4 = new ethers.utils.SigningKey(wallet4.privateKey);

            const oracleResponse = {
                cid,
                uri,
                encoding,
                ethApi,
                params,
                jsps,
                trims,
                post,
                time,
                rslts,
                sigs
            }

            let data = ethers.utils.id(await oracle.combineOracleResponse(oracleResponse));
            let digestHex = ethers.utils.hexlify(data);

            let signature1 = signingKey1.signDigest(digestHex);
            let signature2 = signingKey2.signDigest(digestHex);
            let signature3 = signingKey3.signDigest(digestHex);
            let signature4 = signingKey4.signDigest(digestHex);

            sigs.push({
                v: signature1.v,
                r: signature1.r,
                s: signature1.s,
            });
            sigs.push({
                v: signature2.v,
                r: signature2.r,
                s: signature2.s,
            });
            sigs.push({
                v: signature3.v,
                r: signature3.r,
                s: signature3.s,
            });
            sigs.push({
                v: signature4.v,
                r: signature4.r,
                s: signature4.s,
            });

            oracleResponse.sigs = sigs;

            await oracle.setOracleResponse(oracleResponse);

            let res = await oracle.data(ethers.utils.id(uri + jsps[0] + post));
            res.should.be.equal(rslts[0]);

            rslts[0] = "Hello_World2";

            oracleResponse.rslts = rslts;

            data = ethers.utils.id(await oracle.combineOracleResponse(oracleResponse));
            digestHex = ethers.utils.hexlify(data);

            signature1 = signingKey1.signDigest(digestHex);
            signature2 = signingKey2.signDigest(digestHex);
            signature3 = signingKey3.signDigest(digestHex);
            signature4 = signingKey4.signDigest(digestHex);

            sigs[0] = {
                v: signature1.v,
                r: signature1.r,
                s: signature1.s,
            };
            sigs[1] = {
                v: signature2.v,
                r: signature2.r,
                s: signature2.s,
            };
            sigs[2] = {
                v: signature3.v,
                r: signature3.r,
                s: signature3.s,
            };
            sigs[3] = {
                v: signature4.v,
                r: signature4.r,
                s: signature4.s,
            };

            oracleResponse.sigs = sigs;

            await oracle.setOracleResponse(oracleResponse);

            res = await oracle.data(ethers.utils.id(uri + jsps[0] + post));
            res.should.be.equal(rslts[0]);
        });

        it("should not verify oracle response", async () => {

            const wallet1 = ethers.Wallet.createRandom();
            const wallet2 = ethers.Wallet.createRandom();
            const wallet3 = ethers.Wallet.createRandom();
            const wallet4 = ethers.Wallet.createRandom();

            await oracle.setNumberOfNodes(4);
            const numberOfNodes = await oracle.getNumberOfNodesInSchain();
            numberOfNodes.should.be.equal(4);

            const countOfTrust = await oracle.getTrustNumberOfNodes();
            countOfTrust.should.be.equal(2);

            await oracle.setNodeAddress(wallet1.address);
            await oracle.setNodeAddress(wallet2.address);
            await oracle.setNodeAddress(wallet3.address);
            await oracle.setNodeAddress(wallet4.address);

            const nodeAddress1 = await oracle.nodeAddresses(0);
            const nodeAddress2 = await oracle.nodeAddresses(1);
            const nodeAddress3 = await oracle.nodeAddresses(2);
            const nodeAddress4 = await oracle.nodeAddresses(3);

            nodeAddress1.should.be.equal(wallet1.address);
            nodeAddress2.should.be.equal(wallet2.address);
            nodeAddress3.should.be.equal(wallet3.address);
            nodeAddress4.should.be.equal(wallet4.address);

            const signingKey1 = new ethers.utils.SigningKey(wallet1.privateKey);
            // const signingKey2 = new ethers.utils.SigningKey(wallet2.privateKey);
            const signingKey3 = new ethers.utils.SigningKey(wallet3.privateKey);
            const signingKey4 = new ethers.utils.SigningKey(wallet4.privateKey);

            const oracleResponse = {
                cid,
                uri,
                encoding,
                ethApi,
                params,
                jsps,
                trims,
                post,
                time,
                rslts,
                sigs
            }

            let data = ethers.utils.id(await oracle.combineOracleResponse(oracleResponse));
            let digestHex = ethers.utils.hexlify(data);

            let signature1 = signingKey1.signDigest(digestHex);
            // let signature2 = signingKey2.signDigest(digestHex);
            let signature3 = signingKey3.signDigest(digestHex);
            let signature4 = signingKey4.signDigest(digestHex);

            sigs[0] = {
                v: 0,
                r: "0x0000000000000000000000000000000000000000000000000000000000000000",
                s: "0x0000000000000000000000000000000000000000000000000000000000000000",
            };
            sigs[1] = {
                v: 0,
                r: "0x0000000000000000000000000000000000000000000000000000000000000000",
                s: "0x0000000000000000000000000000000000000000000000000000000000000000",
            };
            sigs[2] = {
                v: 0,
                r: "0x0000000000000000000000000000000000000000000000000000000000000000",
                s: "0x0000000000000000000000000000000000000000000000000000000000000000",
            };
            sigs[3] = {
                v: 0,
                r: "0x0000000000000000000000000000000000000000000000000000000000000000",
                s: "0x0000000000000000000000000000000000000000000000000000000000000000",
            };

            oracleResponse.sigs = sigs;

            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Verification is failed");

            data = ethers.utils.id(await oracle.combineOracleResponse(oracleResponse));
            digestHex = ethers.utils.hexlify(data);

            signature1 = signingKey1.signDigest(digestHex);
            // signature2 = signingKey2.signDigest(digestHex);
            signature3 = signingKey3.signDigest(digestHex);
            signature4 = signingKey4.signDigest(digestHex);

            sigs[0] = {
                v: signature1.v,
                r: signature1.r,
                s: signature1.s,
            };

            oracleResponse.sigs = sigs;

            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Verification is failed");

            sigs[1] = {
                v: signature4.v,
                r: signature4.r,
                s: signature4.s,
            };

            oracleResponse.sigs = sigs;

            await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Verification is failed");

            sigs[2] = {
                v: signature3.v,
                r: signature3.r,
                s: signature3.s,
            };

            oracleResponse.sigs = sigs;

            await oracle.setOracleResponse(oracleResponse);

            const res = await oracle.data(ethers.utils.id(uri + jsps[0] + post));
            res.should.be.equal(rslts[0]);
        });

    });

    describe("Time example", () => {

        // Time example response
        // {
        //     "cid":1,
        //     "uri":"http://worldtimeapi.org/api/timezone/Europe/Kiev",
        //     "encoding":"json",
        //     "jsps":["/unixtime","/day_of_year"],
        //     "trims":[4,0],
        //     "time":1649716742000,
        //     "rslts":["164971","102"],
        //     "sigs":[
        //         "28:2ff66bf21063289eb7b0321cbcd2249e5fe117dc80d9a5d6fc7166ca2cf9abe3:49f33d43ea40f1186e4da36b7558dee232312113f632965b8de04900335815eb",
        //         "28:6a82dca3174cd9405bf987265ddc06b4557f26f25fa3983b6fa3da88684103ec:53198de374177d52b2529ef1d10d1e6c6a49bbb85d3b6da7441b036136f272f8",
        //         null,
        //         null
        //     ]
        // }

        const dataToSign = "{\"cid\":1,\"uri\":\"http://worldtimeapi.org/api/timezone/Europe/Kiev\",\"encoding\":\"json\",\"jsps\":[\"/unixtime\",\"/day_of_year\"],\"trims\":[4,0],\"time\":1649716742000,\"rslts\":[\"164971\",\"102\"],";

        const cid = 1;
        const uri = "http://worldtimeapi.org/api/timezone/Europe/Kiev";
        const encoding = "json";
        const ethApi = "";
        const params = "";
        const jsps: string[] = ["/unixtime","/day_of_year"];
        const trims: number[] = [4,0];
        const post = "";
        const time = 1649716742000;
        const rslts: string[] = ["164971", "102"];
        const sigs: {v: number, r: string, s: string}[] = [
            {
                v: 28,
                r: "0x2ff66bf21063289eb7b0321cbcd2249e5fe117dc80d9a5d6fc7166ca2cf9abe3",
                s: "0x49f33d43ea40f1186e4da36b7558dee232312113f632965b8de04900335815eb",
            },
            {
                v: 28,
                r: "0x6a82dca3174cd9405bf987265ddc06b4557f26f25fa3983b6fa3da88684103ec",
                s: "0x53198de374177d52b2529ef1d10d1e6c6a49bbb85d3b6da7441b036136f272f8",
            },
            {
                v: 0,
                r: "0x0000000000000000000000000000000000000000000000000000000000000000",
                s: "0x0000000000000000000000000000000000000000000000000000000000000000",
            },
            {
                v: 0,
                r: "0x0000000000000000000000000000000000000000000000000000000000000000",
                s: "0x0000000000000000000000000000000000000000000000000000000000000000",
            }
        ];
        const nodePublicKeyInSchain1 = "0x04cef9675d6bde53c4a6acf6f9b627eef98aa6db63fab81e8f7047b1aae2071b9c2d54675ed5042a7d819142d19fff4b87309c177f28fc27144f2eb0b30d806eb5";
        const nodePublicKeyInSchain2 = "0x04e3b423463f38ec5a2310c05546d0f629e1e2bd0177ecdecf4860a477e054dcd3bd98c258f7d8cbbab02548a966d59274473e1ad32075ba5d3073be24803d46dc";
        const nodePublicKeyInSchain3 = "0x043f3a2fcd4eff3f1df8a86b8c86410353c6899128a7659046d3bb8dba80853bd73445513becf4601b50c45611fc4edd954994d5e6bf308ee0767b7102200bd252";
        const nodePublicKeyInSchain4 = "0x04edb47dbc4737489d66ef6a816b67828c4f6ae28427e6a267aa04db576ebe628d976a3e45ba3705571d8e59637d1cc9ada855218a99ce12df845c5bcfc21aa958";

        it("should create a JSON string to sign", async () => {
            const oracleResponse = {
                cid,
                uri,
                encoding,
                ethApi,
                params,
                jsps,
                trims,
                post,
                time,
                rslts,
                sigs
            }

            const dataByContract = await oracle.combineOracleResponse(oracleResponse);

            dataByContract.should.be.equal(dataToSign);
        });

        it.skip("should verify oracle response", async () => {

            await oracle.setNumberOfNodes(4);
            const numberOfNodes = await oracle.getNumberOfNodesInSchain();
            numberOfNodes.should.be.equal(4);

            const countOfTrust = await oracle.getTrustNumberOfNodes();
            countOfTrust.should.be.equal(2);

            const nodeAddressInSchain1: string = ethers.utils.computeAddress(nodePublicKeyInSchain1);
            const nodeAddressInSchain2: string = ethers.utils.computeAddress(nodePublicKeyInSchain2);
            const nodeAddressInSchain3: string = ethers.utils.computeAddress(nodePublicKeyInSchain3);
            const nodeAddressInSchain4: string = ethers.utils.computeAddress(nodePublicKeyInSchain4);

            await oracle.setNodeAddress(nodeAddressInSchain1);
            await oracle.setNodeAddress(nodeAddressInSchain2);
            await oracle.setNodeAddress(nodeAddressInSchain3);
            await oracle.setNodeAddress(nodeAddressInSchain4);

            const nodeAddress1 = await oracle.nodeAddresses(0);
            const nodeAddress2 = await oracle.nodeAddresses(1);
            const nodeAddress3 = await oracle.nodeAddresses(2);
            const nodeAddress4 = await oracle.nodeAddresses(3);

            nodeAddress1.should.be.equal(ethers.utils.getAddress(nodeAddressInSchain1));
            nodeAddress2.should.be.equal(ethers.utils.getAddress(nodeAddressInSchain2));
            nodeAddress3.should.be.equal(ethers.utils.getAddress(nodeAddressInSchain3));
            nodeAddress4.should.be.equal(ethers.utils.getAddress(nodeAddressInSchain4));

            const oracleResponse = {
                cid,
                uri,
                encoding,
                ethApi,
                params,
                jsps,
                trims,
                post,
                time,
                rslts,
                sigs
            }

            await oracle.setOracleResponse(oracleResponse);
            // TODO: change with real oracle signature
            // await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Verification is failed");

            const res = await oracle.data(ethers.utils.id(uri + jsps[0] + post));
            res.should.be.equal(rslts[0]);
        });
    });

    describe("Binance example", () => {

        // Binance example response
        // {
        //     "cid":1,
        //     "uri":"https://www.binance.com/api/v3/time",
        //     "encoding":"json",
        //     "jsps":["/serverTime"],
        //     "trims":[4],
        //     "time":1649716768000,
        //     "rslts":["164971676"],
        //     "sigs":[
        //         "27:fd4dde03a49aa83dcad8fe4e1e3e7b51e827c35d0339b047c71dd2a5673ac843:695b94e047f7310143a238d8b61f22ea60dcc3960d897d6dc57f212b91efe6f0",
        //         "27:67f6d6e061ea286892dbd5fc4b7eb81beda3c25492782953a6176e3b3881e59a:6113210d2f68d95a06674b584a3f1cd610d010ac31d93da11352a0dee96dc2bf",
        //         null,
        //         null
        //     ]
        // }

        const dataToSign = "{\"cid\":1,\"uri\":\"https://www.binance.com/api/v3/time\",\"encoding\":\"json\",\"jsps\":[\"/serverTime\"],\"trims\":[4],\"time\":1649716768000,\"rslts\":[\"164971676\"],";

        const cid = 1;
        const uri = "https://www.binance.com/api/v3/time";
        const encoding = "json";
        const ethApi = "";
        const params = "";
        const jsps: string[] = ["/serverTime"];
        const trims: number[] = [4];
        const post = "";
        const time = 1649716768000;
        const rslts: string[] = ["164971676"];
        const sigs: {v: number, r: string, s: string}[] = [
            {
                v: 27,
                r: "0xfd4dde03a49aa83dcad8fe4e1e3e7b51e827c35d0339b047c71dd2a5673ac843",
                s: "0x695b94e047f7310143a238d8b61f22ea60dcc3960d897d6dc57f212b91efe6f0"
            },
            {
                v: 27,
                r: "0x67f6d6e061ea286892dbd5fc4b7eb81beda3c25492782953a6176e3b3881e59a",
                s: "0x6113210d2f68d95a06674b584a3f1cd610d010ac31d93da11352a0dee96dc2bf"
            },
            {
                v: 0,
                r: "0x0000000000000000000000000000000000000000000000000000000000000000",
                s: "0x0000000000000000000000000000000000000000000000000000000000000000"
            },
            {
                v: 0,
                r: "0x0000000000000000000000000000000000000000000000000000000000000000",
                s: "0x0000000000000000000000000000000000000000000000000000000000000000"
            },
        ];

        const nodePublicKeyInSchain1 = "0x04cef9675d6bde53c4a6acf6f9b627eef98aa6db63fab81e8f7047b1aae2071b9c2d54675ed5042a7d819142d19fff4b87309c177f28fc27144f2eb0b30d806eb5";
        const nodePublicKeyInSchain2 = "0x04e3b423463f38ec5a2310c05546d0f629e1e2bd0177ecdecf4860a477e054dcd3bd98c258f7d8cbbab02548a966d59274473e1ad32075ba5d3073be24803d46dc";
        const nodePublicKeyInSchain3 = "0x043f3a2fcd4eff3f1df8a86b8c86410353c6899128a7659046d3bb8dba80853bd73445513becf4601b50c45611fc4edd954994d5e6bf308ee0767b7102200bd252";
        const nodePublicKeyInSchain4 = "0x04edb47dbc4737489d66ef6a816b67828c4f6ae28427e6a267aa04db576ebe628d976a3e45ba3705571d8e59637d1cc9ada855218a99ce12df845c5bcfc21aa958";

        it("should create a JSON string to sign", async () => {
            const oracleResponse = {
                cid,
                uri,
                encoding,
                ethApi,
                params,
                jsps,
                trims,
                post,
                time,
                rslts,
                sigs
            }

            const dataByContract = await oracle.combineOracleResponse(oracleResponse);

            dataByContract.should.be.equal(dataToSign);
        });

        it.skip("should verify oracle response", async () => {

            await oracle.setNumberOfNodes(4);
            const numberOfNodes = await oracle.getNumberOfNodesInSchain();
            numberOfNodes.should.be.equal(4);

            const countOfTrust = await oracle.getTrustNumberOfNodes();
            countOfTrust.should.be.equal(2);

            const nodeAddressInSchain1: string = ethers.utils.computeAddress(nodePublicKeyInSchain1);
            const nodeAddressInSchain2: string = ethers.utils.computeAddress(nodePublicKeyInSchain2);
            const nodeAddressInSchain3: string = ethers.utils.computeAddress(nodePublicKeyInSchain3);
            const nodeAddressInSchain4: string = ethers.utils.computeAddress(nodePublicKeyInSchain4);

            await oracle.setNodeAddress(nodeAddressInSchain1);
            await oracle.setNodeAddress(nodeAddressInSchain2);
            await oracle.setNodeAddress(nodeAddressInSchain3);
            await oracle.setNodeAddress(nodeAddressInSchain4);

            const nodeAddress1 = await oracle.nodeAddresses(0);
            const nodeAddress2 = await oracle.nodeAddresses(1);
            const nodeAddress3 = await oracle.nodeAddresses(2);
            const nodeAddress4 = await oracle.nodeAddresses(3);

            nodeAddress1.should.be.equal(ethers.utils.getAddress(nodeAddressInSchain1));
            nodeAddress2.should.be.equal(ethers.utils.getAddress(nodeAddressInSchain2));
            nodeAddress3.should.be.equal(ethers.utils.getAddress(nodeAddressInSchain3));
            nodeAddress4.should.be.equal(ethers.utils.getAddress(nodeAddressInSchain4));

            const oracleResponse = {
                cid,
                uri,
                encoding,
                ethApi,
                params,
                jsps,
                trims,
                post,
                time,
                rslts,
                sigs
            }

            await oracle.setOracleResponse(oracleResponse);
            // TODO: change with real oracle signature
            // await oracle.setOracleResponse(oracleResponse).should.be.eventually.rejectedWith("Verification is failed");

            const res = await oracle.data(ethers.utils.id(uri + jsps[0] + post));
            res.should.be.equal(rslts[0]);
        });

    });

}


describe("Oracle", () => {
    testOracle(deployOracle);
});

describe("OracleUpgradeable", () => {
    testOracle(deployOracleUpgradeable);
});