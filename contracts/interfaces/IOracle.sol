// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.13;

import "./IVerifier.sol";

interface IOracle {

    struct OracleResponse {
        uint256 cid;
        string uri;
        string[] jsps;
        uint256[] trims;
        string post;
        uint256 time;
        string[] rslts;
        IVerifier.Signature[] sigs;
    }

    function verifyOracleResponse(OracleResponse memory response) external view returns (bool);
    function version() external view returns (string memory);
}