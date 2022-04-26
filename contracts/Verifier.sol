// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.13;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import "./interfaces/IVerifier.sol";

import "./Reader.sol";

contract Verifier is Reader, IVerifier {

    using ECDSA for bytes32;

    function verifySignature(uint256 nodeIndex, bytes32 hashedMessage, Signature memory signature)
        public
        view
        virtual
        override
        returns (bool)
    {
        string memory pathToAddress = string.concat("skaleConfig.sChain.nodes[", Strings.toString(nodeIndex), "].owner");
        address nodeAddress = _getConfigVariableAddress(pathToAddress);
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
            if (signatures[i].v != 0 || signatures[i].r != bytes32(0) || signatures[i].s != bytes32(0)) {
                verifiedAmount += verifySignature(i, hashedMessage, signatures[i]) ? 1 : 0;
            }
        }
        return verifiedAmount >= getCountOfTrustNumber();
    }

    function getCountOfTrustNumber() public view override returns (uint) {
        uint n = getNumberOfNodesInSchain();
        return (n + 2) / 3; // n - (n * 2 + 1) / 3 + 1 = (n * 3 - n * 2 - 1 + 3) / 3 = (n + 2) / 3
    }

    function getNumberOfNodesInSchain() public view virtual override returns (uint256) {
        return _getConfigVariableUint256("skaleConfig.nodeInfo.wallets.ima.n");
    }
}