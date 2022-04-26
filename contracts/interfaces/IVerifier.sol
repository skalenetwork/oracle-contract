// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.13;

interface IVerifier {

    struct Signature {
        uint8 v;
        bytes32 r;
        bytes32 s;
    }

    function verifySignature(uint256 nodeIndex, bytes32 hashedMessage, Signature memory signature)
        external
        view
        returns (bool);

    function verifyArrayOfSignatures(bytes32 hashedMessage, Signature[] memory signatures) external view returns (bool);

    function getCountOfTrustNumber() external view returns (uint);

    function getNumberOfNodesInSchain() external view returns (uint256);
}