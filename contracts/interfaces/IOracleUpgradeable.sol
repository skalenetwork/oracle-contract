// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.13;

import "./IOracle.sol";

interface IOracleUpgradeable is IOracle {
    function initialize() external;
}