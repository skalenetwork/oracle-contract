// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.13;

import "@openzeppelin/contracts/utils/Address.sol";

contract ReaderFromConfig {

    address public constant FN_NUM_GET_CONFIG_VARIABLE_UINT256 = 0x0000000000000000000000000000000000000013;
    address public constant FN_NUM_GET_CONFIG_VARIABLE_ADDRESS = 0x0000000000000000000000000000000000000014;
    address public constant FN_NUM_GET_CONFIG_VARIABLE_STRING = 0x0000000000000000000000000000000000000015;

    /**
     * @dev Get uint256 value from the skaled config.
     */
    function _getConfigVariableUint256(
        string memory strConfigVariableName
    )
        internal
        view
        returns (uint256)
    {
        (bool success, bytes memory answer) = FN_NUM_GET_CONFIG_VARIABLE_UINT256.staticcall(
            abi.encodePacked(bytes(strConfigVariableName).length, strConfigVariableName)
        );
        require(success, "Get config uint256 failed");
        return abi.decode(answer, (uint256));
    }

    function _getConfigVariableAddress(
        string memory strConfigVariableName
    )
        internal
        view
        returns (address)
    {
        (bool success, bytes memory answer) = FN_NUM_GET_CONFIG_VARIABLE_ADDRESS.staticcall(
            abi.encodePacked(bytes(strConfigVariableName).length, strConfigVariableName)
        );
        require(success, "Get config address failed");
        return abi.decode(answer, (address));
    }
}