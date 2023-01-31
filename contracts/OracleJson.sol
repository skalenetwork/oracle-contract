// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.17;

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
        returns (string memory)
    {
        string memory cidAndUriPart = string.concat("{\"cid\":", Strings.toString(cid), ",", "\"uri\":\"", uri, "\",");
        string memory jspsPart = "\"jsps\":[";
        for (uint256 i = 0; i < jsps.length - 1; i++)
            jspsPart = string.concat(jspsPart, "\"", jsps[i], "\",");
        jspsPart = string.concat(jspsPart, "\"", jsps[jsps.length - 1], "\"],");
        string memory trimsPart = "";
        if (trims.length != 0) {
            trimsPart = "\"trims\":[";
            for (uint256 i = 0; i < trims.length - 1; i++)
                trimsPart = string.concat(trimsPart, Strings.toString(trims[i]), ",");
            trimsPart = string.concat(trimsPart, Strings.toString(trims[trims.length - 1]), "],");
        }
        string memory postPart = "";
        if (bytes(post).length != 0)
            postPart = string.concat("\"post\":\"", post, "\",");
        string memory timePart = string.concat("\"time\":", Strings.toString(time), ",");
        string memory rsltsPart = "\"rslts\":[";
        for (uint256 i = 0; i < rslts.length - 1; i++)
            rsltsPart = string.concat(
                rsltsPart,
                !_compareString(rslts[i], "null") ? string.concat("\"", rslts[i], "\",") : "null,"
            );
        rsltsPart = string.concat(
            rsltsPart,
            !_compareString(rslts[rslts.length - 1], "null") ?
                string.concat("\"", rslts[rslts.length - 1], "\"],") :
                "null],"
        );
        return string.concat(cidAndUriPart, jspsPart, trimsPart, postPart, timePart, rsltsPart);
    }

    function _compareString(string memory a, string memory b) private pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}