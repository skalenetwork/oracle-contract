# oracle-contract
Predeployed contract to verify Oracle responses

## Description

Oracle-contract is a predeployed smart-contract set running on each SKALE Chain which can verify [Oracle](https://github.com/skalenetwork/skale-consensus/tree/develop/oracle) responses.

### Response structure

```json
{
    "cid": 1,
    "uri": "http://worldtimeapi.org/api/timezone/Europe/Kiev",
    "jsps": [ "/unixtime", "/day_of_year", "/xxx" ],
    "trims": [ 1, 1, 1 ],
    "post": "/time_answer",
    "time": 1642521456593,
    "rslts": [ "164252145", "1", null ],
    "sigs":[
        "0:fd4dde03a49aa83dcad8fe4e1e3e7b51e827c35d0339b047c71dd2a5673ac844:695b94e047f7310143a238d8b61f22ea60dcc3960d897d6dc57f212b91efe6f1",
        "0:fd4dde03a49aa83dcad8fe4e1e3e7b51e827c35d0339b047c71dd2a5673ac845:695b94e047f7310143a238d8b61f22ea60dcc3960d897d6dc57f212b91efe6f1",
        "0:fd4dde03a49aa83dcad8fe4e1e3e7b51e827c35d0339b047c71dd2a5673ac846:695b94e047f7310143a238d8b61f22ea60dcc3960d897d6dc57f212b91efe6f2",
        "0:fd4dde03a49aa83dcad8fe4e1e3e7b51e827c35d0339b047c71dd2a5673ac847:695b94e047f7310143a238d8b61f22ea60dcc3960d897d6dc57f212b91efe6f3",
        "0:fd4dde03a49aa83dcad8fe4e1e3e7b51e827c35d0339b047c71dd2a5673ac848:695b94e047f7310143a238d8b61f22ea60dcc3960d897d6dc57f212b91efe6f4",
        "0:fd4dde03a49aa83dcad8fe4e1e3e7b51e827c35d0339b047c71dd2a5673ac849:695b94e047f7310143a238d8b61f22ea60dcc3960d897d6dc57f212b91efe6f5",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ]
}
```

### Signature structure

Each node of SKALE chain get an Oracle response, removes part after `"rslts":[...],`, combine to one string without spaces, get a KECCAK256 hash of this string and sign this string by ECDSA signature of this node

Example object to sign:

```json
{
    "cid": 1,
    "uri": "http://worldtimeapi.org/api/timezone/Europe/Kiev",
    "jsps": [ "/unixtime", "/day_of_year", "/xxx" ],
    "trims": [ 1, 1, 1 ],
    "post": "/time_answer",
    "time": 1642521456593,
    "rslts": [ "164252145", "1", null ],
```

Combined to string:

```json
{"cid":1,"uri":"http://worldtimeapi.org/api/timezone/Europe/Kiev","jsps":["/unixtime","/day_of_year","/xxx"],"trims":[1,1,1],"post":"/time_answer","time": 1642521456593,"rslts":["164252145","1",null],
```

If n - t + 1 ECDSA signatures provided - Oracle response is signed

where:
n - number of nodes in SKALE chain
t - threshold number for BLS signature ( 2/3n + 1 )

## Install

1)  Clone this repo and enter the repo
2)  run `cd oracle-contract/`
2)  run `yarn install`

## Deployment

The `.env` file in the `oracle-contract` folder should include the following variables:

```bash
ENDPOINT="your mainnet RPC url, it also can be an infura endpoint"
PRIVATE_KEY="your private key for mainnet"
GASPRICE="preferred gas price (optional param)" 
```

-   deploy test version to custom network:

```bash
yarn deploy --network custom
```

-   deploy test upgradeable version to custom network:

```bash
yarn deploy-upgradeable --network custom
```

-   deploy production version to custom network:

```bash
yarn deploy-production --network custom
```

-   deploy production upgradeable version to custom network:

```bash
yarn deploy-production-upgradeable --network custom
```

## Test

```bash
yarn test
```

## Usage

1)  Install `@skalenetwork/oracle-interfaces` npm package by npm or yarn
2)  Import `IOracle.sol` in your Solidity smart contract
3)  Import a predeployed address `0xd205aC1e00000000000000000000000000000000` in your Solidity smart contract
3)  Run verification

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.13;

import "@skalenetwork/oracle-interfaces/IOracle.sol";

contract VerifyOracleResponses {

    address public constant ORACLE_ADDRESS = 0xd205aC1e00000000000000000000000000000000;

    function checkOracleResponse(
        IOracle.OracleResponse memory response
    )
        public
    {
        require(IOracle(ORACLE_ADDRESS).verifyOracleResponse(response), "Verification is failed");
    }
```

### Python Oracle usage

To see how to send Oracle request and get Oracle responses please go to [oracle-demo](https://github.com/skalenetwork/oracle-demo)
