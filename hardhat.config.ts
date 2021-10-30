import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-truffle5";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
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
    bsctestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    optimismtestnet: {
      url: process.env.OPTIMISM_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    arbitrumtestnet: {
      url: process.env.ARBITRUM_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    mumbai: {
      url: process.env.MUMBAI_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    hecoinfotestnet: {
      url: "https://http-testnet.hecochain.com", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    fantomtestnet: {
      url: "https://rpc.testnet.fantom.network", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    // apiKey: process.env.ETHERSCAN_API_KEY, // For Ethereum
    // apiKey: process.env.BSC_API_KEY // For BSC
    // apiKey: process.env.OPTIMISM_API_KEY // For Optimism
    // apiKey: process.env.ARBITRUM_API_KEY // For Arbitrum
    // apiKey: process.env.POLYGON_API_KEY // For Polygon
    // apiKey: process.env.HECOINFO_API_KEY // For HecoInfo
    apiKey: process.env.FANTOM_API_KEY, // For Fantom
  },
};

export default config;
