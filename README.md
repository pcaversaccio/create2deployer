# `CREATE2` Deployer
[![build status](https://github.com/pcaversaccio/evm-cross-deployer/actions/workflows/test-contracts.yml/badge.svg)](https://github.com/pcaversaccio/evm-cross-deployer/actions)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

Helper smart contract to make easier and safer usage of the [`CREATE2`](https://eips.ethereum.org/EIPS/eip-1014) Ethereum Virtual Machine (EVM) opcode. `CREATE2` can be used to compute in advance the address where a smart contract will be deployed, which allows for interesting new mechanisms known as _counterfactual interactions_.

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

## Deployments [`Create2Deployer.sol`](https://github.com/pcaversaccio/create2deployer/blob/main/contracts/Create2Deployer.sol)
- **Ethereum Test Networks:**
  - Rinkeby: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://rinkeby.etherscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Ropsten: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://ropsten.etherscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Kovan: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://kovan.etherscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Goerli: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://goerli.etherscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
- **Additional EVM-Based Test Networks:**
  - Binance Smart Chain Testnet: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://testnet.bscscan.com/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Optimism Testnet (Kovan): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://kovan-optimistic.etherscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Arbitrum Testnet (Rinkeby): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://testnet.arbiscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Polygon Testnet (Mumbai): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://mumbai.polygonscan.com/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - HecoInfo Testnet: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://testnet.hecoinfo.com/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Fantom Testnet: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://testnet.ftmscan.com/address/0x13b0d85ccb8bf860b6b79af3029fca081ae9bef2)
  - Avalanche Testnet (Fuji): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://testnet.snowtrace.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
> TO DO: Contract verification for Fuji contract.