// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.17;

import "./IOracle.sol";

interface IOracleJson {

    function combineOracleResponse(
        IOracle.OracleResponse memory response
    )
        external
        pure
        returns (string memory wholeData);
}