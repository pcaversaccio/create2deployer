# `CREATE2` Deployer

[![Test smart contracts](https://github.com/pcaversaccio/create2deployer/actions/workflows/test-contracts.yml/badge.svg)](https://github.com/pcaversaccio/create2deployer/actions/workflows/test-contracts.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/license/mit/)

Helper smart contract to make easier and safer usage of the [`CREATE2`](https://eips.ethereum.org/EIPS/eip-1014) Ethereum Virtual Machine (EVM) opcode. `CREATE2` can be used to compute in advance the address where a smart contract will be deployed, which allows for interesting new mechanisms known as _counterfactual interactions_.

<div align="center">
  <img src="assets/img/distribution.jpg" alt="A very fancy meme" width="80%" />
</div>

## Unit Tests

Since [Hardhat](https://hardhat.org) implements great features for Solidity debugging like Solidity stack traces, `console.log`, and explicit error messages when transactions fail, we leverage [Hardhat](https://hardhat.org) for testing:

```bash
npm run test
```

### Test Coverage

This project repository implements a test coverage [plugin](https://github.com/sc-forks/solidity-coverage). Simply run:

```bash
npm run coverage
```

The written tests available in the file [`Create2Deployer.test.ts`](https://github.com/pcaversaccio/create2deployer/blob/main/test/Create2Deployer.test.ts) achieve a test coverage of 100%:

```bash
--------------------------------|----------|----------|----------|----------|----------------|
File                            |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
--------------------------------|----------|----------|----------|----------|----------------|
 contracts\                     |      100 |      100 |      100 |      100 |                |
  Create2Deployer.sol           |      100 |      100 |      100 |      100 |                |
  Create2DeployerDeprecated.sol |      100 |      100 |      100 |      100 |                |
--------------------------------|----------|----------|----------|----------|----------------|
All files                       |      100 |      100 |      100 |      100 |                |
--------------------------------|----------|----------|----------|----------|----------------|
```

> **Important:** A test coverage of 100% does not mean that there are no vulnerabilities. What really counts is the quality and spectrum of the tests themselves.

## Deployments [`Create2Deployer.sol`](https://github.com/pcaversaccio/create2deployer/blob/main/contracts/Create2Deployer.sol)

- **EVM-Based Production Networks:**
  - Ethereum: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://etherscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Binance Smart Chain: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://bscscan.com/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Optimism: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://optimistic.etherscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Arbitrum One: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://arbiscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Arbitrum Nova: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://nova.arbiscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Polygon: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://polygonscan.com/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Polygon zkEVM: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://zkevm.polygonscan.com/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Heco: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://www.hecoinfo.com/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Fantom: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://ftmscan.com/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Avalanche: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://snowtrace.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Gnosis Chain: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://gnosisscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Moonriver: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://moonriver.moonscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Moonbeam: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://moonscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Celo: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://celoscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Aurora: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://explorer.aurora.dev/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Harmony: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://explorer.harmony.one/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Autobahn (⚠️ Deprecated): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://explorer.autobahn.network/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Fuse Network: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://explorer.fuse.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Cronos: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://cronoscan.com/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Evmos: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://escan.live/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Boba Network: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://bobascan.com/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Canto: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://tuber.build/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Zora: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://explorer.zora.energy/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
- **Ethereum Test Networks:**
  - Rinkeby (⚠️ Deprecated): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://rinkeby.etherscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Ropsten (⚠️ Deprecated): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://ropsten.etherscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Kovan (⚠️ Deprecated): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://kovan.etherscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Goerli: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://goerli.etherscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Sepolia: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://sepolia.etherscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
- **Additional EVM-Based Test Networks:**
  - Binance Smart Chain Testnet: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://testnet.bscscan.com/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Optimism Testnet (Kovan; ⚠️ Deprecated): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://kovan-optimistic.etherscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Optimism Testnet (Goerli): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://goerli-optimism.etherscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Arbitrum Testnet (Rinkeby; ⚠️ Deprecated): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://testnet.arbiscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Arbitrum Testnet (Goerli): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://goerli.arbiscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Polygon Testnet (Mumbai): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://mumbai.polygonscan.com/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Polygon Testnet (zkEVM): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://testnet-zkevm.polygonscan.com/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Heco Testnet: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://testnet.hecoinfo.com/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Fantom Testnet: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://testnet.ftmscan.com/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Avalanche Testnet (Fuji): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://testnet.snowtrace.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Sokol: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://blockscout.com/poa/sokol/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Gnosis Chain Testnet (Chiado): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://blockscout.chiadochain.net/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Moonbeam Testnet (Moonbase Alpha): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://moonbase.moonscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Celo Testnet (Alfajores): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://alfajores.celoscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Aurora Testnet: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://explorer.testnet.aurora.dev/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Harmony Testnet: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://explorer.pops.one/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Autobahn Testnet (⚠️ Deprecated): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://testnet.autobahn-explorer.com/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Fuse Network Testnet (Spark): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://explorer.fusespark.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Cronos Testnet: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://cronos.org/explorer/testnet3/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Evmos Testnet: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://evm.evmos.dev/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Boba Network Testnet: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://testnet.bobascan.com/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Canto Testnet: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://testnet.tuber.build/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Base Testnet: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://goerli.basescan.org/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Mantle Testnet (Wadsley): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://explorer.testnet.mantle.xyz/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Filecoin Testnet (Hyperspace; ⚠️ Deprecated): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://hyperspace.filfox.info/en/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Filecoin Testnet (Calibration): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://calibration.filfox.info/en/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Scroll Testnet (Alpha): [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://blockscout.scroll.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Linea Testnet: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://explorer.goerli.linea.build/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
  - Zora Testnet: [`0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`](https://testnet.explorer.zora.co/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2)
