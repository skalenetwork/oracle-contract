// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.13;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./interfaces/IOracleJson.sol";
import "./interfaces/IOracle.sol";

contract OracleJson is IOracleJson {

    function combineOracleResponse(IOracle.OracleResponse memory response)
        public
        pure
        override
        returns (string memory wholeData)
    {
        return _combineOracleResponse(
            response.cid,
            response.uri,
            response.jsps,
            response.trims,
            response.post,
            response.time,
            response.rslts
        );
    }

    function _combineOracleResponse(
        uint256 cid,
        string memory uri,
        string[] memory jsps,
        uint256[] memory trims,
        string memory post,
        uint256 time,
        string[] memory rslts
    )
        private
        pure
        returns (string memory wholeData)
    {
        wholeData = "{";
        wholeData = string.concat(wholeData, "\"cid\":", Strings.toString(cid), ",");
        wholeData = string.concat(wholeData, "\"uri\":\"", uri, "\",");
        wholeData = string.concat(wholeData, "\"jsps\":[");
        for (uint256 i = 0; i < jsps.length - 1; i++) {
            wholeData = string.concat(wholeData, "\"", jsps[i], "\",");
        }
        wholeData = string.concat(wholeData, "\"", jsps[jsps.length - 1], "\"],");
        if (trims.length != 0) {
            wholeData = string.concat(wholeData, "\"trims\":[");
            for (uint256 i = 0; i < trims.length - 1; i++) {
                wholeData = string.concat(wholeData, Strings.toString(trims[i]), ",");
            }
            wholeData = string.concat(wholeData, Strings.toString(trims[trims.length - 1]), "],");
        }
        if (bytes(post).length != 0) {
            wholeData = string.concat(wholeData, "\"post\":\"", post, "\",");
        }
        wholeData = string.concat(wholeData, "\"time\":", Strings.toString(time), ",");
        wholeData = string.concat(wholeData, "\"rslts\":[");
        for (uint256 i = 0; i < rslts.length - 1; i++) {
            if (!_compareString(rslts[i], "null")) {
                wholeData = string.concat(wholeData, "\"", rslts[i], "\",");
            } else {
                wholeData = string.concat(wholeData, "null,");
            }
        }
        if (!_compareString(rslts[rslts.length - 1], "null")) {
            wholeData = string.concat(wholeData, "\"", rslts[rslts.length - 1], "\"],");
        } else {
            wholeData = string.concat(wholeData, "null],");
        }
    }

    function _compareString(string memory a, string memory b) private pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}