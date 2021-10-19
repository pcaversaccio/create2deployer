import * as dotenv from "dotenv";
import * as data from "./deployments/addresses.json";
import abi from "./deployments/abi/contracts/Create2Deployer.sol/Create2Deployer.json";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-truffle5";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-abi-exporter";

dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("xdeploy", "Deploys the contract across all test networks")
  .addParam("contract", "The to be deployed contract's name")
  .addParam("salt", "Salt message")
  .addOptionalParam("deployargs", "Path to constructor arguments")
  .setAction(async (taskArgs, hre) => {
    const provider = new hre.ethers.providers.JsonRpcProvider(
      process.env.RINKEBY_URL
    );
    const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const signer = wallet.connect(provider);
    const create2DeployerRinkeby = new hre.ethers.Contract(
      data.rinkeby,
      abi,
      signer
    );

    const args = require(taskArgs.deployargs);
    const Contract = await hre.ethers.getContractFactory(taskArgs.contract);
    const initcode = await Contract.getDeployTransaction(...args);
    console.log(
      await create2DeployerRinkeby.deploy(
        0,
        hre.ethers.utils.id(taskArgs.salt),
        initcode.data,
        { gasLimit: 10 ** 6 }
      )
    );
  });

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.4", // Hardhat currently only fully supports up to and including 0.8.4
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0,
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    kovan: {
      url: process.env.KOVAN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    goerli: {
      url: process.env.GOERLI_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    main: {
      url: process.env.MAIN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  abiExporter: {
    path: "deployments/abi",
    clear: false,
    flat: false,
    only: [":Create2Deployer$"],
    spacing: 2,
    pretty: true,
  },
};

export default config;
