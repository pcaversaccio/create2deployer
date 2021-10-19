# EVM Cross Deployer
[![build status](https://github.com/pcaversaccio/evm-cross-deployer/actions/workflows/test-contracts.yml/badge.svg)](https://github.com/pcaversaccio/evm-cross-deployer/actions)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

Deploy your smart contracts across multiple EVM chains with the same deterministic address.

<div align="center">
  <img src="assets/img/distribution.jpg" alt="A very fancy meme" width="80%" />
</div>

## Unit Tests
Since [Hardhat](https://hardhat.org) implements great features for Solidity debugging like Solidity stack traces, console.log, and explicit error messages when transactions fail, we leverage [Hardhat](https://hardhat.org) for testing:
```bash
npx hardhat test
```
### Test Coverage
This project repository implements a test coverage [plugin](https://github.com/sc-forks/solidity-coverage). Simply run:
```bash
npx hardhat coverage
```

The written tests available in the file [`Create2.test.ts`](https://github.com/pcaversaccio/evm-cross-deployer/blob/main/test/Create2.test.ts) achieve a test coverage of 100%:
```bash
----------------------|----------|----------|----------|----------|----------------|
File                  |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------------------|----------|----------|----------|----------|----------------|
 contracts\           |      100 |      100 |      100 |      100 |                |
  Create2Deployer.sol |      100 |      100 |      100 |      100 |                |
----------------------|----------|----------|----------|----------|----------------|
All files             |      100 |      100 |      100 |      100 |                |
----------------------|----------|----------|----------|----------|----------------|
```
> **Important:** A test coverage of 100% does not mean that there are no vulnerabilities. What really counts is the quality and spectrum of the tests themselves. This project is in beta, use at your own risk!

## Test Deployments
- Rinkeby: `[0xCBb870898c2b41b431E0007F20d47fadDF2C1BDB](https://rinkeby.etherscan.io/address/0xCBb870898c2b41b431E0007F20d47fadDF2C1BDB)`
- Ropsten: `[0xcAb9c567C02db1907372201897c56E0c18F4183d](https://ropsten.etherscan.io/address/0xcAb9c567C02db1907372201897c56E0c18F4183d)`
- Kovan: `[0xbe9eb78b9fB4eD9e11e3dedB5B3d324Ea8dF6544](https://kovan.etherscan.io/address/0xbe9eb78b9fB4eD9e11e3dedB5B3d324Ea8dF6544)`
- Goerli: `[0xd411B211bCD6DE869570238FEBb4EfF7f3c6d1D1](https://goerli.etherscan.io/address/0xd411B211bCD6DE869570238FEBb4EfF7f3c6d1D1)`

## TO DOS
- Frontend
- Automatic download of OpenZeppelin dependencies (similar to Remix)
- Implement automatic smart contract verification (for Etherscan supported chains)
