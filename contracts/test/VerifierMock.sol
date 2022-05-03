// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.13;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import "../Verifier.sol";

interface IVerifierMock {
    function setNodeAddress(address nodeAddress) external;
    function setNumberOfNodes(uint256 amountOfNodes) external;
}

contract VerifierMock is Verifier, IVerifierMock {
    using ECDSA for bytes32;

    address[] public nodeAddresses;

    uint256 public numberOfNodes;


    function setNodeAddress(address nodeAddress) public override {
        nodeAddresses.push(nodeAddress);
    }

    function setNumberOfNodes(uint256 amountOfNodes) public override {
        numberOfNodes = amountOfNodes;
    }

    function verifySignature(uint256 nodeIndex, bytes32 hashedMessage, Signature memory signature)
        public
        view
        override
        returns (bool)
    {
        address nodeAddress = nodeAddresses[nodeIndex];
        return nodeAddress == hashedMessage.recover(signature.v, signature.r, signature.s);
    }

    function getNumberOfNodesInSchain() public view override returns (uint256) {
        return numberOfNodes;
    }
}