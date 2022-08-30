import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-truffle5";
import "@nomiclabs/hardhat-etherscan";
import "@nomicfoundation/hardhat-chai-matchers";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

task("accounts", "Prints the list of accounts", async (_, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
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
    localhost: {
      url: "http://127.0.0.1:8545",
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
    sepolia: {
      url: "https://rpc.sepolia.org", // Publicly known RPC,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    ethMain: {
      url: process.env.MAIN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bscMain: {
      url: "https://bsc-dataseed.binance.org", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    optimismTestnet: {
      url: process.env.OPTIMISM_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    optimismMain: {
      url: process.env.OPTIMISM_MAIN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    arbitrumTestnet: {
      url: process.env.ARBITRUM_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    arbitrumMain: {
      url: process.env.ARBITRUM_MAIN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    arbitrumNova: {
      url: "https://nova.arbitrum.io/rpc", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    mumbai: {
      url: process.env.MUMBAI_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    polygon: {
      url: process.env.POLYGON_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    hecoTestnet: {
      url: "https://http-testnet.hecochain.com", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    hecoMain: {
      url: "https://http-mainnet.hecochain.com", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    fantomTestnet: {
      url: "https://rpc.testnet.fantom.network", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    fantomMain: {
      url: "https://rpc.ftm.tools", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    avalanche: {
      url: "https://api.avax.network/ext/bc/C/rpc", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    sokol: {
      url: "https://sokol.poa.network", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    gnosis: {
      url: "https://rpc.gnosischain.com", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    moonbaseAlpha: {
      url: "https://rpc.api.moonbase.moonbeam.network", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    moonriver: {
      url: "https://rpc.moonriver.moonbeam.network", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    moonbeam: {
      url: "https://rpc.api.moonbeam.network", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    celo: {
      url: "https://forno.celo.org", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    auroraTestnet: {
      url: "https://testnet.aurora.dev", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    auroraMain: {
      url: "https://mainnet.aurora.dev", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    harmonyTestnet: {
      url: "https://api.s0.b.hmny.io", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    harmonyMain: {
      url: "https://api.harmony.one", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    autobahn: {
      url: "https://rpc.autobahn.network", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    spark: {
      url: "https://rpc.fusespark.io", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    fuse: {
      url: "https://rpc.fuse.io", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    cronosTestnet: {
      url: "https://evm-t3.cronos.org", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    cronosMain: {
      url: "https://evm.cronos.org", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    evmosTestnet: {
      url: "https://eth.bd.evmos.dev:8545", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    evmosMain: {
      url: "https://eth.bd.evmos.org:8545", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bobaTestnet: {
      url: "https://rinkeby.boba.network", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bobaMain: {
      url: "https://mainnet.boba.network", // Publicly known RPC
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      // For Mainnet, Ropsten, Rinkeby, Goerli, Kovan, Sepolia
      mainnet: process.env.ETHERSCAN_API_KEY || "",
      ropsten: process.env.ETHERSCAN_API_KEY || "",
      rinkeby: process.env.ETHERSCAN_API_KEY || "",
      goerli: process.env.ETHERSCAN_API_KEY || "",
      kovan: process.env.ETHERSCAN_API_KEY || "",
      sepolia: process.env.ETHERSCAN_API_KEY || "",
      // For BSC testnet & mainnet
      bsc: process.env.BSC_API_KEY || "",
      bscTestnet: process.env.BSC_API_KEY || "",
      // For Heco testnet & mainnet
      heco: process.env.HECO_API_KEY || "",
      hecoTestnet: process.env.HECO_API_KEY || "",
      // For Fantom testnet & mainnet
      opera: process.env.FANTOM_API_KEY || "",
      ftmTestnet: process.env.FANTOM_API_KEY || "",
      // For Optimism testnets & mainnet
      optimisticEthereum: process.env.OPTIMISM_API_KEY || "",
      optimisticKovan: process.env.OPTIMISM_API_KEY || "",
      optimisticGoerli: process.env.OPTIMISM_API_KEY || "",
      // For Polygon testnet & mainnet
      polygon: process.env.POLYGON_API_KEY || "",
      polygonMumbai: process.env.POLYGON_API_KEY || "",
      // For Arbitrum testnet & mainnets; we use the same
      // string placeholder for Arbitrum Nova as for xdai and sokol
      arbitrumOne: process.env.ARBITRUM_API_KEY || "",
      arbitrumNova: "wagmi",
      arbitrumTestnet: process.env.ARBITRUM_API_KEY || "",
      // For Avalanche testnet & mainnet
      avalanche: process.env.AVALANCHE_API_KEY || "",
      avalancheFujiTestnet: process.env.AVALANCHE_API_KEY || "",
      // For Moonbeam testnet & mainnets
      moonbeam: process.env.MOONBEAM_API_KEY || "",
      moonriver: process.env.MOONBEAM_API_KEY || "",
      moonbaseAlpha: process.env.MOONBEAM_API_KEY || "",
      // For Harmony testnet & mainnet
      harmony: process.env.HARMONY_API_KEY || "",
      harmonyTest: process.env.HARMONY_API_KEY || "",
      // For Aurora testnet & mainnet
      aurora: process.env.AURORA_API_KEY || "",
      auroraTestnet: process.env.AURORA_API_KEY || "",
      // For Cronos testnet & mainnet
      cronos: process.env.CRONOS_API_KEY || "",
      cronosTestnet: process.env.CRONOS_API_KEY || "",
      // xdai and sokol don't need an API key, but you still need
      // to specify one; any string placeholder will work
      xdai: "wagmi",
      sokol: "wagmi",
      // For Fuse testnet; we use the same string placeholder as for
      // xdai and sokol
      spark: "wagmi",
      // For Evmos testnet & mainnet; we use the same string placeholder
      // as for xdai and sokol
      evmos: "wagmi",
      evmosTestnet: "wagmi",
      // For Boba network testnet & mainnet
      boba: process.env.BOBA_API_KEY || "",
      bobaTestnet: process.env.BOBA_API_KEY || "",
    },
    customChains: [
      {
        network: "cronos",
        chainId: 25,
        urls: {
          apiURL: "https://api.cronoscan.com/api",
          browserURL: "https://cronoscan.com",
        },
      },
      {
        network: "cronosTestnet",
        chainId: 338,
        urls: {
          apiURL: "https://api-testnet.cronoscan.com/api",
          browserURL: "https://testnet.cronoscan.com",
        },
      },
      {
        network: "optimisticGoerli",
        chainId: 420,
        urls: {
          apiURL: "https://api-goerli-optimism.etherscan.io/api",
          browserURL: "https://goerli-optimism.etherscan.io",
        },
      },
      {
        network: "spark",
        chainId: 123,
        urls: {
          apiURL: "https://explorer.fusespark.io/api",
          browserURL: "https://explorer.fusespark.io",
        },
      },
      {
        network: "evmos",
        chainId: 9001,
        urls: {
          apiURL: "https://evm.evmos.org/api",
          browserURL: "https://evm.evmos.org",
        },
      },
      {
        network: "evmosTestnet",
        chainId: 9000,
        urls: {
          apiURL: "https://evm.evmos.dev/api",
          browserURL: "https://evm.evmos.dev",
        },
      },
      {
        network: "boba",
        chainId: 288,
        urls: {
          apiURL: "https://api.bobascan.com/api",
          browserURL: "https://bobascan.com",
        },
      },
      {
        network: "bobaTestnet",
        chainId: 28,
        urls: {
          apiURL: "https://api-testnet.bobascan.com/api",
          browserURL: "https://testnet.bobascan.com",
        },
      },
      {
        network: "arbitrumNova",
        chainId: 42170,
        urls: {
          apiURL: "https://nova-explorer.arbitrum.io/api",
          browserURL: "https://nova-explorer.arbitrum.io",
        },
      },
      {
        network: "arbitrumTestnet",
        chainId: 421613,
        urls: {
          apiURL: "https://goerli-rollup-explorer.arbitrum.io/api",
          browserURL: "https://goerli-rollup-explorer.arbitrum.io",
        },
      },
    ],
  },
};

export default config;
