// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.17;

import "./Verifier.sol";
import "./OracleJson.sol";
import "./interfaces/IOracle.sol";

contract Oracle is Verifier, OracleJson, IOracle {

    string private constant _VERSION = $(VERSION);

    function version() external pure override returns (string memory) {
        return _VERSION;
    }

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