// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.13;

import "@openzeppelin/contracts/utils/Strings.sol";

import "./interfaces/INodesReader.sol";

import "./ReaderFromConfig.sol";

contract NodesReader is ReaderFromConfig, INodesReader {

    function getNodeAddress(uint256 nodeIndex) public view virtual override returns (address) {
        string memory pathToAddress = string.concat(
            "skaleConfig.sChain.nodes[",
            Strings.toString(nodeIndex), "].owner"
        );
        return _getConfigVariableAddress(pathToAddress);
    }

    function getCountOfTrustNumber() public view override returns (uint) {
        uint n = getNumberOfNodesInSchain();
        return (n + 2) / 3; // n - (n * 2 + 1) / 3 + 1 = (n * 3 - n * 2 - 1 + 3) / 3 = (n + 2) / 3
    }

    function getNumberOfNodesInSchain() public view virtual override returns (uint256) {
        return _getConfigVariableUint256("skaleConfig.nodeInfo.wallets.ima.n");
    }
}