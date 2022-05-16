// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.13;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "./Verifier.sol";
import "./OracleJson.sol";
import "./interfaces/IOracleUpgradeable.sol";

contract OracleUpgradeable is Verifier, OracleJson, IOracleUpgradeable, Initializable {

    function initialize() external initializer override {}

    function verifyOracleResponse(OracleResponse memory response) public view override returns (bool) {
        require(
            response.jsps.length > 0 && response.jsps.length == response.rslts.length &&
            (response.trims.length == 0 || response.trims.length == response.rslts.length),
            "Incorrect number of results"
        );
        // verify signature
        require(response.sigs.length == getNumberOfNodesInSchain(), "Invalid length of signatures");
        string memory oracleData = combineOracleResponse(response);
        bytes32 hashedMessage = keccak256(abi.encodePacked(oracleData));
        return verifyArrayOfSignatures(hashedMessage, response.sigs);
    }
}