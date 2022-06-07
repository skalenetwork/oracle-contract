#!/usr/bin/env bash

set -e

npx ganache-cli --gasLimit 8000000 --quiet &

PRODUCTION=false UPGRADEABLE=false npx hardhat run migrations/deploy.ts
PRODUCTION=false UPGRADEABLE=true npx hardhat run migrations/deploy.ts
PRODUCTION=true UPGRADEABLE=false npx hardhat run migrations/deploy.ts
PRODUCTION=true UPGRADEABLE=true npx hardhat run migrations/deploy.ts

npx kill-port 8545

while true
do
    if ! netstat -t -u -l -p -n | grep 8545
    then
        break
    fi
    echo "Port 8545 is busy"
    sleep 1
done
