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
  .addParam("contract", "Contract name")
  .addParam("salt", "Salt message")
  .addParam("deployargs", "Path to constructor arguments (formatted as array)")
  .setAction(async (taskArgs, hre) => {
    // RINKEBY
    const providerRinkeby = new hre.ethers.providers.JsonRpcProvider(
      process.env.RINKEBY_URL
    );
    const walletRinkeby = new hre.ethers.Wallet(
      process.env.PRIVATE_KEY,
      providerRinkeby
    );
    const signerRinkeby = walletRinkeby.connect(providerRinkeby);
    const create2DeployerRinkeby = new hre.ethers.Contract(
      data.rinkeby,
      abi,
      signerRinkeby
    );

    // ROPSTEN
    const providerRopsten = new hre.ethers.providers.JsonRpcProvider(
      process.env.ROPSTEN_URL
    );
    const walletRopsten = new hre.ethers.Wallet(
      process.env.PRIVATE_KEY,
      providerRopsten
    );
    const signerRopsten = walletRopsten.connect(providerRopsten);
    const create2DeployerRopsten = new hre.ethers.Contract(
      data.ropsten,
      abi,
      signerRopsten
    );

    // KOVAN
    const providerKovan = new hre.ethers.providers.JsonRpcProvider(
      process.env.KOVAN_URL
    );
    const walletKovan = new hre.ethers.Wallet(
      process.env.PRIVATE_KEY,
      providerKovan
    );
    const signerKovan = walletKovan.connect(providerKovan);
    const create2DeployerKovan = new hre.ethers.Contract(
      data.kovan,
      abi,
      signerKovan
    );

    // GOERLI
    const providerGoerli = new hre.ethers.providers.JsonRpcProvider(
      process.env.GOERLI_URL
    );
    const walletGoerli = new hre.ethers.Wallet(
      process.env.PRIVATE_KEY,
      providerGoerli
    );
    const signerGoerli = walletGoerli.connect(providerGoerli);
    const create2DeployerGoerli = new hre.ethers.Contract(
      data.goerli,
      abi,
      signerGoerli
    );

    // Create contract instance and retrieve creation bytecode including constructor arguments
    const args = require(taskArgs.deployargs);
    const Contract = await hre.ethers.getContractFactory(taskArgs.contract);
    const initcode = await Contract.getDeployTransaction(...args);

    // RINKBEY DEPLOYMENT
    const createReceiptRinkeby = await create2DeployerRinkeby.deploy(
      0,
      hre.ethers.utils.id(taskArgs.salt),
      initcode.data,
      { gasLimit: 10 ** 6 }
    );
    await createReceiptRinkeby.wait();
    console.log(
      `Rinkeby deployment successful with hash: ${createReceiptRinkeby.hash}`
    );

    // ROPSTEN DEPLOYMENT
    const createReceiptRopsten = await create2DeployerRopsten.deploy(
      0,
      hre.ethers.utils.id(taskArgs.salt),
      initcode.data,
      { gasLimit: 10 ** 6 }
    );
    await createReceiptRopsten.wait();
    console.log(
      `Ropsten deployment successful with hash: ${createReceiptRopsten.hash}`
    );

    // KOVAN DEPLOYMENT
    const createReceiptKovan = await create2DeployerKovan.deploy(
      0,
      hre.ethers.utils.id(taskArgs.salt),
      initcode.data,
      { gasLimit: 10 ** 6 }
    );
    await createReceiptKovan.wait();
    console.log(
      `Kovan deployment successful with hash: ${createReceiptKovan.hash}`
    );

    // GOERLI DEPLOYMENT
    const createReceiptGoerli = await create2DeployerGoerli.deploy(
      0,
      hre.ethers.utils.id(taskArgs.salt),
      initcode.data,
      { gasLimit: 10 ** 6 }
    );
    await createReceiptGoerli.wait();
    console.log(
      `Goerli deployment successful with hash: ${createReceiptGoerli.hash}`
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
