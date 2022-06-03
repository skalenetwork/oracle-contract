// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.13;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import "./interfaces/IVerifier.sol";

import "./NodesReader.sol";

contract Verifier is NodesReader, IVerifier {

    using ECDSA for bytes32;

    function verifySignature(uint256 nodeIndex, bytes32 hashedMessage, Signature memory signature)
        public
        view
        virtual
        override
        returns (bool)
    {
        address nodeAddress = getNodeAddress(nodeIndex);
        return nodeAddress == hashedMessage.recover(signature.v, signature.r, signature.s);
    }

    function verifyArrayOfSignatures(bytes32 hashedMessage, Signature[] memory signatures)
        public
        view
        override
        returns (bool)
    {
        uint256 verifiedAmount = 0;
        for (uint256 i = 0; i < signatures.length; i++) {
            if (
                (signatures[i].v != 0 || signatures[i].r != bytes32(0) || signatures[i].s != bytes32(0)) &&
                verifySignature(i, hashedMessage, signatures[i])
            ) {
                verifiedAmount++;
            }
        }
        return verifiedAmount >= getTrustNumberOfNodes();
    }
}