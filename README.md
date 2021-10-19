# EVM Cross Deployer
Deploy your smart contracts across multiple EVM chains with the same deterministic address.

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
- Rinkeby: `[]()`
- Ropsten: `[]()`
- Kovan: `[]()`
- Goerli: `[]()`

