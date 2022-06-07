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
            bytes(strConfigVariableName)
        );
        require(success, "Get config uint256 failed");
        return uint256(bytes32(_bytesToBytes32(answer)));
    }

    function _getConfigVariableString(
        string memory strConfigVariableName
    )
        internal
        view
        returns (string memory)
    {
        (bool success, bytes memory answer) = FN_NUM_GET_CONFIG_VARIABLE_STRING.staticcall(
            bytes(strConfigVariableName)
        );
        require(success, "Get config string failed");
        return string(answer);
    }

    function _getConfigVariableAddress(
        string memory strConfigVariableName
    )
        internal
        view
        returns (address)
    {
        (bool success, bytes memory answer) = FN_NUM_GET_CONFIG_VARIABLE_ADDRESS.staticcall(
            bytes(strConfigVariableName)
        );
        require(success, "Get config address failed");
        return address(bytes20(_bytesToBytes32(answer)));
    }

    function _bytesToBytes32(bytes memory data) private pure returns (bytes32) {
        require(data.length == 32, "Incorrect length of data");
        return bytes32(data);
    }
}