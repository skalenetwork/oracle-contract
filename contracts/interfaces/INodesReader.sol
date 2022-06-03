// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.13;

interface INodesReader {

    function getNodeAddress(uint256 nodeIndex) external view returns (address);

    function getTrustNumberOfNodes() external view returns (uint);

    function getNumberOfNodesInSchain() external view returns (uint256);
}