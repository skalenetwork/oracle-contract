// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.17;

import "../Oracle.sol";

interface IOracleTester is IOracle {

    event DataUpdated(uint256 indexed cid, uint256 indexed time);

    function setOracleResponse(OracleResponse memory response) external;

    function setNodeAddress(address nodeAddress) external;
    function setNumberOfNodes(uint256 amountOfNodes) external;
}

contract OracleTester is Oracle, IOracleTester {
    address[] public nodeAddresses;

    uint256 public numberOfNodes;

    mapping(bytes32 => string) public data;

    function setOracleResponse(
        OracleResponse memory response
    )
        public
        override
    {
        require(verifyOracleResponse(response), "Verification is failed");
        // store results
        for (uint256 i = 0; i < response.jsps.length; i++) {
            data[
                keccak256(
                    abi.encodePacked(
                        string.concat(
                            response.uri,
                            response.jsps[i],
                            (bytes(response.post).length > 0 ? response.post : "")
                        )
                    )
                )
            ] = response.rslts[i];
        }
        emit DataUpdated(response.cid, response.time);
    }

    function setNodeAddress(address nodeAddress) public override {
        nodeAddresses.push(nodeAddress);
    }

    function setNumberOfNodes(uint256 amountOfNodes) public override {
        numberOfNodes = amountOfNodes;
    }

    function getNodeAddress(uint256 nodeIndex) public view override returns (address) {
        return nodeAddresses[nodeIndex];
    }

    function getNumberOfNodesInSchain() public view override returns (uint256) {
        return numberOfNodes;
    }
}