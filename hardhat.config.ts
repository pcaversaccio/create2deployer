import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "@nomicfoundation/hardhat-chai-matchers";
import "@typechain/hardhat";

import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-verify";
import "@matterlabs/hardhat-zksync-ethers";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-abi-exporter";

dotenv.config();

task("accounts", "Prints the list of accounts", async (_, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("evm", "Prints the configured EVM version", async (_, hre) => {
  console.log(hre.config.solidity.compilers[0].settings.evmVersion);
});

task(
  "balances",
  "Prints the list of accounts and their balances",
  async (_, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
      console.log(
        account.address +
          " " +
          (await hre.ethers.provider.getBalance(account.address)),
      );
    }
  },
);

const config: HardhatUserConfig = {
  solidity: {
    // Only use Solidity default versions `>=0.8.25` for EVM networks that support the new `cancun` opcodes:
    // https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md
    // Only use Solidity default versions `>=0.8.20` for EVM networks that support the opcode `PUSH0`
    // Otherwise, use the versions `<=0.8.19`
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999_999,
      },
    },
  },
  zksolc: {
    version: "1.5.7",
    compilerSource: "binary",
    settings: {
      enableEraVMExtensions: false,
      forceEVMLA: false,
      optimizer: {
        enabled: true,
        mode: "3",
        fallback_to_optimizing_for_size: false,
      },
    },
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0,
      chainId: 31337,
      hardfork: "cancun",
      forking: {
        url: process.env.ETH_MAINNET_URL || "",
        enabled: false,
      },
      // zksync: true, // Enables ZKsync in the Hardhat local network
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    "truffle-dashboard": {
      url: "http://localhost:24012/rpc",
    },
    tenderly: {
      url: `https://rpc.tenderly.co/fork/${process.env.TENDERLY_FORK_ID}`,
    },
    goerli: {
      chainId: 5,
      url: process.env.ETH_GOERLI_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    sepolia: {
      chainId: 11155111,
      url: process.env.ETH_SEPOLIA_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    holesky: {
      chainId: 17000,
      url: process.env.ETH_HOLESKY_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    ethMain: {
      chainId: 1,
      url: process.env.ETH_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bscTestnet: {
      chainId: 97,
      url: process.env.BSC_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bscMain: {
      chainId: 56,
      url: process.env.BSC_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    optimismTestnet: {
      chainId: 420,
      url: process.env.OPTIMISM_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    optimismSepolia: {
      chainId: 11155420,
      url: process.env.OPTIMISM_SEPOLIA_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    optimismMain: {
      chainId: 10,
      url: process.env.OPTIMISM_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    arbitrumSepolia: {
      chainId: 421614,
      url: process.env.ARBITRUM_SEPOLIA_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    arbitrumMain: {
      chainId: 42161,
      url: process.env.ARBITRUM_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    arbitrumNova: {
      chainId: 42170,
      url: process.env.ARBITRUM_NOVA_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    amoy: {
      chainId: 80002,
      url: process.env.POLYGON_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    polygonZkEVMTestnet: {
      chainId: 2442,
      url: process.env.POLYGON_ZKEVM_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    polygon: {
      chainId: 137,
      url: process.env.POLYGON_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    polygonZkEVMMain: {
      chainId: 1101,
      url: process.env.POLYGON_ZKEVM_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    hecoMain: {
      chainId: 128,
      url: process.env.HECO_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    fantomTestnet: {
      chainId: 4002,
      url: process.env.FANTOM_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    fantomMain: {
      chainId: 250,
      url: process.env.FANTOM_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    fuji: {
      chainId: 43113,
      url: process.env.AVALANCHE_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    avalanche: {
      chainId: 43114,
      url: process.env.AVALANCHE_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    chiado: {
      chainId: 10200,
      url: process.env.GNOSIS_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    gnosis: {
      chainId: 100,
      url: process.env.GNOSIS_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    moonbaseAlpha: {
      chainId: 1287,
      url: process.env.MOONBEAM_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    moonriver: {
      chainId: 1285,
      url: process.env.MOONRIVER_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    moonbeam: {
      chainId: 1284,
      url: process.env.MOONBEAM_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    alfajores: {
      chainId: 44787,
      url: process.env.CELO_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    celo: {
      chainId: 42220,
      url: process.env.CELO_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    auroraTestnet: {
      chainId: 1313161555,
      url: process.env.AURORA_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    auroraMain: {
      chainId: 1313161554,
      url: process.env.AURORA_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    harmonyTestnet: {
      chainId: 1666700000,
      url: process.env.HARMONY_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    harmonyMain: {
      chainId: 1666600000,
      url: process.env.HARMONY_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    spark: {
      chainId: 123,
      url: process.env.FUSE_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    fuse: {
      chainId: 122,
      url: process.env.FUSE_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    cronosTestnet: {
      chainId: 338,
      url: process.env.CRONOS_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    cronosMain: {
      chainId: 25,
      url: process.env.CRONOS_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    evmosTestnet: {
      chainId: 9000,
      url: process.env.EVMOS_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    evmosMain: {
      chainId: 9001,
      url: process.env.EVMOS_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bobaTestnet: {
      chainId: 2888,
      url: process.env.BOBA_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bobaMain: {
      chainId: 288,
      url: process.env.BOBA_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    cantoTestnet: {
      chainId: 7701,
      url: process.env.CANTO_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    cantoMain: {
      chainId: 7700,
      url: process.env.CANTO_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    baseTestnet: {
      chainId: 84531,
      url: process.env.BASE_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    baseSepolia: {
      chainId: 84532,
      url: process.env.BASE_SEPOLIA_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    baseMain: {
      chainId: 8453,
      url: process.env.BASE_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    zkSyncTestnet: {
      chainId: 300,
      url: process.env.ZKSYNC_TESTNET_URL || "",
      ethNetwork: "sepolia",
      zksync: true,
      verifyURL:
        "https://explorer.sepolia.era.zksync.dev/contract_verification",
      browserVerifyURL: "https://sepolia.explorer.zksync.io",
      enableVerifyURL: true,
    },
    zkSyncMain: {
      chainId: 324,
      url: process.env.ZKSYNC_MAINNET_URL || "",
      ethNetwork: "mainnet",
      zksync: true,
      verifyURL:
        "https://zksync2-mainnet-explorer.zksync.io/contract_verification",
      browserVerifyURL: "https://explorer.zksync.io",
      enableVerifyURL: true,
    },
    mantleTestnet: {
      chainId: 5003,
      url: process.env.MANTLE_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    mantleMain: {
      chainId: 5000,
      url: process.env.MANTLE_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    filecoinTestnet: {
      chainId: 314159,
      url: process.env.FILECOIN_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    filecoinMain: {
      chainId: 314,
      url: process.env.FILECOIN_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    scrollTestnet: {
      chainId: 534351,
      url: process.env.SCROLL_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    scrollMain: {
      chainId: 534352,
      url: process.env.SCROLL_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    lineaTestnet: {
      chainId: 59141,
      url: process.env.LINEA_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    lineaMain: {
      chainId: 59144,
      url: process.env.LINEA_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    shimmerEVMTestnet: {
      chainId: 1071,
      url: process.env.SHIMMEREVM_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    zoraTestnet: {
      chainId: 999999999,
      url: process.env.ZORA_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    zoraMain: {
      chainId: 7777777,
      url: process.env.ZORA_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    luksoTestnet: {
      chainId: 4201,
      url: process.env.LUKSO_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    luksoMain: {
      chainId: 42,
      url: process.env.LUKSO_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    mantaTestnet: {
      chainId: 3441006,
      url: process.env.MANTA_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    mantaMain: {
      chainId: 169,
      url: process.env.MANTA_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    shardeumTestnet: {
      chainId: 8081,
      url: process.env.SHARDEUM_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    artheraTestnet: {
      chainId: 10243,
      url: process.env.ARTHERA_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    frameTestnet: {
      chainId: 68840142,
      url: process.env.FRAME_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    enduranceTestnet: {
      chainId: 6480,
      url: process.env.ENDURANCE_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    openduranceTestnet: {
      chainId: 6480001001,
      url: process.env.OPENDURANCE_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    enduranceMain: {
      chainId: 648,
      url: process.env.ENDURANCE_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    blastTestnet: {
      chainId: 168587773,
      url: process.env.BLAST_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    blastMain: {
      chainId: 81457,
      url: process.env.BLAST_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    kromaTestnet: {
      chainId: 2358,
      url: process.env.KROMA_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    kromaMain: {
      chainId: 255,
      url: process.env.KROMA_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    dosTestnet: {
      chainId: 3939,
      url: process.env.DOS_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    dosMain: {
      chainId: 7979,
      url: process.env.DOS_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    fraxtalTestnet: {
      chainId: 2522,
      url: process.env.FRAXTAL_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    fraxtalMain: {
      chainId: 252,
      url: process.env.FRAXTAL_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    kavaMain: {
      chainId: 2222,
      url: process.env.KAVA_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    metisTestnet: {
      chainId: 59902,
      url: process.env.METIS_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    metisMain: {
      chainId: 1088,
      url: process.env.METIS_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    modeTestnet: {
      chainId: 919,
      url: process.env.MODE_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    modeMain: {
      chainId: 34443,
      url: process.env.MODE_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    xlayerTestnet: {
      chainId: 195,
      url: process.env.XLAYER_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    xlayerMain: {
      chainId: 196,
      url: process.env.XLAYER_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bobTestnet: {
      chainId: 111,
      url: process.env.BOB_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bobMain: {
      chainId: 60808,
      url: process.env.BOB_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    coreTestnet: {
      chainId: 1115,
      url: process.env.CORE_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    coreMain: {
      chainId: 1116,
      url: process.env.CORE_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    telosTestnet: {
      chainId: 41,
      url: process.env.TELOS_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    telosMain: {
      chainId: 40,
      url: process.env.TELOS_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    rootstockTestnet: {
      chainId: 31,
      url: process.env.ROOTSTOCK_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    rootstockMain: {
      chainId: 30,
      url: process.env.ROOTSTOCK_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    chilizTestnet: {
      chainId: 88882,
      url: process.env.CHILIZ_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    chilizMain: {
      chainId: 88888,
      url: process.env.CHILIZ_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    taraxaTestnet: {
      chainId: 842,
      url: process.env.TARAXA_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    taraxaMain: {
      chainId: 841,
      url: process.env.TARAXA_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    artheraMain: {
      chainId: 10242,
      url: process.env.ARTHERA_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    gravityAlphaTestnet: {
      chainId: 13505,
      url: process.env.GRAVITY_ALPHA_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    gravityAlphaMain: {
      chainId: 1625,
      url: process.env.GRAVITY_ALPHA_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    taikoTestnet: {
      chainId: 167009,
      url: process.env.TAIKO_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    taikoMain: {
      chainId: 167000,
      url: process.env.TAIKO_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    zetaChainTestnet: {
      chainId: 7001,
      url: process.env.ZETA_CHAIN_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    zetaChainMain: {
      chainId: 7000,
      url: process.env.ZETA_CHAIN_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    "5ireChainTestnet": {
      chainId: 997,
      url: process.env["5IRE_CHAIN_TESTNET_URL"] || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    "5ireChainMain": {
      chainId: 995,
      url: process.env["5IRE_CHAIN_MAINNET_URL"] || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    sapphireTestnet: {
      chainId: 23295,
      url: process.env.SAPPHIRE_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    sapphireMain: {
      chainId: 23294,
      url: process.env.SAPPHIRE_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    worldChainTestnet: {
      chainId: 4801,
      url: process.env.WORLD_CHAIN_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    worldChainMain: {
      chainId: 480,
      url: process.env.WORLD_CHAIN_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    plumeTestnet: {
      chainId: 98864,
      url: process.env.PLUME_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    unichainTestnet: {
      chainId: 1301,
      url: process.env.UNICHAIN_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    xdcTestnet: {
      chainId: 51,
      url: process.env.XDC_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    xdcMain: {
      chainId: 50,
      url: process.env.XDC_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    sxTestnet: {
      chainId: 79479957,
      url: process.env.SX_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    sxMain: {
      chainId: 4162,
      url: process.env.SX_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    liskTestnet: {
      chainId: 4202,
      url: process.env.LISK_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    liskMain: {
      chainId: 1135,
      url: process.env.LISK_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    metalL2Testnet: {
      chainId: 1740,
      url: process.env.METALL2_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    metalL2Main: {
      chainId: 1750,
      url: process.env.METALL2_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    superseedTestnet: {
      chainId: 53302,
      url: process.env.SUPERSEED_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    superseedMain: {
      chainId: 5330,
      url: process.env.SUPERSEED_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    storyTestnet: {
      chainId: 1516,
      url: process.env.STORY_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  abiExporter: {
    path: "./abis",
    runOnCompile: true,
    clear: true,
    flat: false,
    only: ["Create2Deployer", "Create2DeployerDeprecated"],
    spacing: 2,
    pretty: true,
  },
  sourcify: {
    // Enable Sourcify verification by default
    enabled: true,
    apiUrl: "https://sourcify.dev/server",
    browserUrl: "https://repo.sourcify.dev",
  },
  etherscan: {
    apiKey: {
      // For Ethereum testnets & mainnet
      mainnet: process.env.ETHERSCAN_API_KEY || "",
      goerli: process.env.ETHERSCAN_API_KEY || "",
      sepolia: process.env.ETHERSCAN_API_KEY || "",
      holesky: process.env.ETHERSCAN_API_KEY || "",
      // For BSC testnet & mainnet
      bsc: process.env.BSC_API_KEY || "",
      bscTestnet: process.env.BSC_API_KEY || "",
      // For Heco mainnet
      heco: process.env.HECO_API_KEY || "",
      // For Fantom testnet & mainnet
      opera: process.env.FANTOM_API_KEY || "",
      ftmTestnet: process.env.FANTOM_API_KEY || "",
      // For Optimism testnets & mainnet
      optimisticEthereum: process.env.OPTIMISM_API_KEY || "",
      optimisticGoerli: process.env.OPTIMISM_API_KEY || "",
      optimisticSepolia: process.env.OPTIMISM_API_KEY || "",
      // For Polygon testnets & mainnets
      polygon: process.env.POLYGON_API_KEY || "",
      polygonZkEVM: process.env.POLYGON_ZKEVM_API_KEY || "",
      polygonAmoy: process.env.POLYGON_API_KEY || "",
      polygonZkEVMTestnet: process.env.POLYGON_ZKEVM_API_KEY || "",
      // For Arbitrum testnet & mainnets
      arbitrumOne: process.env.ARBITRUM_API_KEY || "",
      arbitrumNova: process.env.ARBITRUM_API_KEY || "",
      arbitrumSepolia: process.env.ARBITRUM_API_KEY || "",
      // For Avalanche testnet & mainnet
      avalanche: process.env.AVALANCHE_API_KEY || "",
      avalancheFujiTestnet: process.env.AVALANCHE_API_KEY || "",
      // For Moonbeam testnet & mainnets
      moonbeam: process.env.MOONBEAM_API_KEY || "",
      moonriver: process.env.MOONBEAM_API_KEY || "",
      moonbaseAlpha: process.env.MOONBEAM_API_KEY || "",
      // For Celo testnet & mainnet
      celo: process.env.CELO_API_KEY || "",
      alfajores: process.env.CELO_API_KEY || "",
      // For Harmony testnet & mainnet
      harmony: process.env.HARMONY_API_KEY || "",
      harmonyTestnet: process.env.HARMONY_API_KEY || "",
      // For Aurora testnet & mainnet
      aurora: process.env.AURORA_API_KEY || "",
      auroraTestnet: process.env.AURORA_API_KEY || "",
      // For Cronos testnet & mainnet
      cronos: process.env.CRONOS_API_KEY || "",
      cronosTestnet: process.env.CRONOS_API_KEY || "",
      // For Gnosis/xDai testnet & mainnets
      gnosis: process.env.GNOSIS_API_KEY || "",
      xdai: process.env.GNOSIS_API_KEY || "",
      chiado: process.env.GNOSIS_API_KEY || "",
      // For Fuse testnet & mainnet
      fuse: process.env.FUSE_API_KEY || "",
      spark: process.env.FUSE_API_KEY || "",
      // For Evmos testnet & mainnet
      evmos: process.env.EVMOS_API_KEY || "",
      evmosTestnet: process.env.EVMOS_API_KEY || "",
      // For Boba network testnet & mainnet
      boba: process.env.BOBA_API_KEY || "",
      bobaTestnet: process.env.BOBA_API_KEY || "",
      // For Canto testnet & mainnet
      canto: process.env.CANTO_API_KEY || "",
      cantoTestnet: process.env.CANTO_API_KEY || "",
      // For Base testnets & mainnet
      base: process.env.BASE_API_KEY || "",
      baseTestnet: process.env.BASE_API_KEY || "",
      baseSepolia: process.env.BASE_API_KEY || "",
      // For Mantle testnet & mainnet
      mantle: process.env.MANTLE_API_KEY || "",
      mantleTestnet: process.env.MANTLE_API_KEY || "",
      // For Filecoin testnet & mainnet
      filecoin: process.env.FILECOIN_API_KEY || "",
      filecoinTestnet: process.env.FILECOIN_API_KEY || "",
      // For Scroll testnet & mainnet
      scroll: process.env.SCROLL_API_KEY || "",
      scrollTestnet: process.env.SCROLL_API_KEY || "",
      // For Linea testnet & mainnet
      linea: process.env.LINEA_API_KEY || "",
      lineaTestnet: process.env.LINEA_API_KEY || "",
      // For ShimmerEVM testnet
      shimmerEVMTestnet: process.env.SHIMMEREVM_API_KEY || "",
      // For Zora testnet & mainnet
      zora: process.env.ZORA_API_KEY || "",
      zoraTestnet: process.env.ZORA_API_KEY || "",
      // For Lukso testnet & mainnet
      lukso: process.env.LUKSO_API_KEY || "",
      luksoTestnet: process.env.LUKSO_API_KEY || "",
      // For Manta testnet & mainnet
      manta: process.env.MANTA_API_KEY || "",
      mantaTestnet: process.env.MANTA_API_KEY || "",
      // For Arthera testnet
      artheraTestnet: process.env.ARTHERA_API_KEY || "",
      // For Endurance testnets & mainnet
      endurance: process.env.ENDURANCE_API_KEY || "",
      enduranceTestnet: process.env.ENDURANCE_API_KEY || "",
      openduranceTestnet: process.env.OPENDURANCE_API_KEY || "",
      // For Blast testnet & mainnet
      blast: process.env.BLAST_API_KEY || "",
      blastTestnet: process.env.BLAST_API_KEY || "",
      // For Kroma testnet & mainnet
      kroma: process.env.KROMA_API_KEY || "",
      kromaTestnet: process.env.KROMA_API_KEY || "",
      // For DOS Chain testnet & mainnet
      dos: process.env.DOS_API_KEY || "",
      dosTestnet: process.env.DOS_API_KEY || "",
      // For Fraxtal testnet & mainnet
      fraxtal: process.env.FRAXTAL_API_KEY || "",
      fraxtalTestnet: process.env.FRAXTAL_API_KEY || "",
      // For Kava mainnet
      kava: process.env.KAVA_API_KEY || "",
      // For Metis testnet & mainnet
      metis: process.env.METIS_API_KEY || "",
      metisTestnet: process.env.METIS_API_KEY || "",
      // For Mode testnet & mainnet
      mode: process.env.MODE_API_KEY || "",
      modeTestnet: process.env.MODE_API_KEY || "",
      // For X Layer testnet & mainnet
      xlayer: process.env.OKLINK_API_KEY || "",
      xlayerTestnet: process.env.OKLINK_API_KEY || "",
      // For BOB testnet & mainnet
      bob: process.env.BOB_API_KEY || "",
      bobTestnet: process.env.BOB_API_KEY || "",
      // For Core testnet & mainnet
      core: process.env.CORE_MAINNET_API_KEY || "",
      coreTestnet: process.env.CORE_TESTNET_API_KEY || "",
      // For Telos testnet & mainnet
      telos: process.env.TELOS_API_KEY || "",
      telosTestnet: process.env.TELOS_API_KEY || "",
      // For Rootstock testnet & mainnet
      rootstock: process.env.ROOTSTOCK_API_KEY || "",
      rootstockTestnet: process.env.ROOTSTOCK_API_KEY || "",
      // For Chiliz testnet & mainnet
      chiliz: process.env.CHILIZ_API_KEY || "",
      chilizTestnet: process.env.CHILIZ_API_KEY || "",
      // For Arthera mainnet
      arthera: process.env.ARTHERA_API_KEY || "",
      // For Gravity Alpha testnet & mainnet
      gravityAlpha: process.env.GRAVITY_ALPHA_API_KEY || "",
      gravityAlphaTestnet: process.env.GRAVITY_ALPHA_API_KEY || "",
      // For Taiko testnet & mainnet
      taiko: process.env.TAIKO_API_KEY || "",
      taikoTestnet: process.env.TAIKO_API_KEY || "",
      // For ZetaChain testnet & mainnet
      zetaChain: process.env.ZETA_CHAIN_API_KEY || "",
      zetaChainTestnet: process.env.ZETA_CHAIN_API_KEY || "",
      // For 5ireChain testnet & mainnet
      "5ireChain": process.env["5IRE_CHAIN_API_KEY"] || "",
      "5ireChainTestnet": process.env["5IRE_CHAIN_API_KEY"] || "",
      // For Oasis Sapphire testnet & mainnet
      sapphire: process.env.SAPPHIRE_API_KEY || "",
      sapphireTestnet: process.env.SAPPHIRE_API_KEY || "",
      // For World Chain testnet & mainnet
      worldChain: process.env.WORLD_CHAIN_API_KEY || "",
      worldChainTestnet: process.env.WORLD_CHAIN_API_KEY || "",
      // For Plume testnet
      plumeTestnet: process.env.PLUME_API_KEY || "",
      // For Unichain testnet
      unichainTestnet: process.env.UNICHAIN_API_KEY || "",
      // For XDC testnet & mainnet
      xdc: process.env.XDC_API_KEY || "",
      xdcTestnet: process.env.XDC_API_KEY || "",
      // For SX testnet & mainnet
      sx: process.env.SX_API_KEY || "",
      sxTestnet: process.env.SX_API_KEY || "",
      // For ZKsync testnet & mainnet
      zkSync: process.env.ZKSYNC_API_KEY || "",
      zkSyncTestnet: process.env.ZKSYNC_API_KEY || "",
      // For Lisk testnet & mainnet
      lisk: process.env.LISK_API_KEY || "",
      liskTestnet: process.env.LISK_API_KEY || "",
      // For Metal L2 testnet & mainnet
      metalL2: process.env.METALL2_API_KEY || "",
      metalL2Testnet: process.env.METALL2_API_KEY || "",
      // For Superseed testnet & mainnet
      superseed: process.env.SUPERSEED_API_KEY || "",
      superseedTestnet: process.env.SUPERSEED_API_KEY || "",
      // For Story testnet
      storyTestnet: process.env.STORY_API_KEY || "",
    },
    customChains: [
      {
        network: "holesky",
        chainId: 17000,
        urls: {
          apiURL: "https://api-holesky.etherscan.io/api",
          browserURL: "https://holesky.etherscan.io",
        },
      },
      {
        network: "optimisticSepolia",
        chainId: 11155420,
        urls: {
          apiURL: "https://api-sepolia-optimistic.etherscan.io/api",
          browserURL: "https://sepolia-optimism.etherscan.io",
        },
      },
      {
        network: "chiado",
        chainId: 10200,
        urls: {
          apiURL: "https://gnosis-chiado.blockscout.com/api",
          browserURL: "https://gnosis-chiado.blockscout.com",
        },
      },
      {
        network: "celo",
        chainId: 42220,
        urls: {
          apiURL: "https://api.celoscan.io/api",
          browserURL: "https://celoscan.io",
        },
      },
      {
        network: "alfajores",
        chainId: 44787,
        urls: {
          apiURL: "https://api-alfajores.celoscan.io/api",
          browserURL: "https://alfajores.celoscan.io",
        },
      },
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
          apiURL: "https://cronos.org/explorer/testnet3/api",
          browserURL: "https://cronos.org/explorer/testnet3",
        },
      },
      {
        network: "fuse",
        chainId: 122,
        urls: {
          apiURL: "https://explorer.fuse.io/api",
          browserURL: "https://explorer.fuse.io",
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
          apiURL: "https://api.verify.mintscan.io/evm/api/0x2329",
          browserURL: "https://www.mintscan.io/evmos",
        },
      },
      {
        network: "evmosTestnet",
        chainId: 9000,
        urls: {
          apiURL: "https://api.verify.mintscan.io/evm/api/0x2328",
          browserURL: "https://www.mintscan.io/evmos-testnet",
        },
      },
      {
        network: "boba",
        chainId: 288,
        urls: {
          apiURL:
            "https://api.routescan.io/v2/network/mainnet/evm/288/etherscan",
          browserURL: "https://bobascan.com",
        },
      },
      {
        network: "bobaTestnet",
        chainId: 2888,
        urls: {
          apiURL:
            "https://api.routescan.io/v2/network/testnet/evm/2888/etherscan",
          browserURL: "https://testnet.bobascan.com",
        },
      },
      {
        network: "arbitrumNova",
        chainId: 42170,
        urls: {
          apiURL: "https://api-nova.arbiscan.io/api",
          browserURL: "https://nova.arbiscan.io",
        },
      },
      {
        network: "arbitrumSepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia.arbiscan.io",
        },
      },
      {
        network: "canto",
        chainId: 7700,
        urls: {
          apiURL: "https://tuber.build/api",
          browserURL: "https://tuber.build",
        },
      },
      {
        network: "cantoTestnet",
        chainId: 7701,
        urls: {
          apiURL: "https://testnet.tuber.build/api",
          browserURL: "https://testnet.tuber.build",
        },
      },
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org",
        },
      },
      {
        network: "baseTestnet",
        chainId: 84531,
        urls: {
          apiURL: "https://api-goerli.basescan.org/api",
          browserURL: "https://goerli.basescan.org",
        },
      },
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org",
        },
      },
      {
        network: "mantle",
        chainId: 5000,
        urls: {
          apiURL: "https://api.mantlescan.xyz/api",
          browserURL: "https://mantlescan.xyz",
        },
      },
      {
        network: "mantleTestnet",
        chainId: 5003,
        urls: {
          apiURL: "https://api-sepolia.mantlescan.xyz/api",
          browserURL: "https://sepolia.mantlescan.xyz",
        },
      },
      {
        network: "filecoin",
        chainId: 314,
        urls: {
          apiURL: "https://filfox.info/api/v1/tools/verifyContract",
          browserURL: "https://filfox.info/en",
        },
      },
      {
        network: "filecoinTestnet",
        chainId: 314159,
        urls: {
          apiURL: "https://calibration.filfox.info/api/v1/tools/verifyContract",
          browserURL: "https://calibration.filfox.info/en",
        },
      },
      {
        network: "scroll",
        chainId: 534352,
        urls: {
          apiURL: "https://api.scrollscan.com/api",
          browserURL: "https://scrollscan.com",
        },
      },
      {
        network: "scrollTestnet",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.com",
        },
      },
      {
        network: "polygonZkEVM",
        chainId: 1101,
        urls: {
          apiURL: "https://api-zkevm.polygonscan.com/api",
          browserURL: "https://zkevm.polygonscan.com",
        },
      },
      {
        network: "polygonZkEVMTestnet",
        chainId: 1442,
        urls: {
          apiURL: "https://api-cardona-zkevm.polygonscan.com/api",
          browserURL: "https://cardona-zkevm.polygonscan.com",
        },
      },
      {
        network: "polygonAmoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com",
        },
      },
      {
        network: "linea",
        chainId: 59144,
        urls: {
          apiURL: "https://api.lineascan.build/api",
          browserURL: "https://lineascan.build",
        },
      },
      {
        network: "lineaTestnet",
        chainId: 59141,
        urls: {
          apiURL: "https://api-sepolia.lineascan.build/api",
          browserURL: "https://sepolia.lineascan.build",
        },
      },
      {
        network: "shimmerEVMTestnet",
        chainId: 1071,
        urls: {
          apiURL: "https://explorer.evm.testnet.shimmer.network/api",
          browserURL: "https://explorer.evm.testnet.shimmer.network",
        },
      },
      {
        network: "zora",
        chainId: 7777777,
        urls: {
          apiURL: "https://explorer.zora.energy/api",
          browserURL: "https://explorer.zora.energy",
        },
      },
      {
        network: "zoraTestnet",
        chainId: 999999999,
        urls: {
          apiURL: "https://sepolia.explorer.zora.energy/api",
          browserURL: "https://sepolia.explorer.zora.energy",
        },
      },
      {
        network: "lukso",
        chainId: 42,
        urls: {
          apiURL: "https://explorer.execution.mainnet.lukso.network/api",
          browserURL: "https://explorer.execution.mainnet.lukso.network",
        },
      },
      {
        network: "luksoTestnet",
        chainId: 4201,
        urls: {
          apiURL: "https://explorer.execution.testnet.lukso.network/api",
          browserURL: "https://explorer.execution.testnet.lukso.network",
        },
      },
      {
        network: "manta",
        chainId: 169,
        urls: {
          apiURL: "https://pacific-explorer.manta.network/api",
          browserURL: "https://pacific-explorer.manta.network",
        },
      },
      {
        network: "mantaTestnet",
        chainId: 3441006,
        urls: {
          apiURL: "https://pacific-explorer.sepolia-testnet.manta.network/api",
          browserURL: "https://pacific-explorer.sepolia-testnet.manta.network",
        },
      },
      {
        network: "artheraTestnet",
        chainId: 10243,
        urls: {
          apiURL: "https://explorer-test.arthera.net/api",
          browserURL: "https://explorer-test.arthera.net",
        },
      },
      {
        network: "endurance",
        chainId: 648,
        urls: {
          apiURL: "https://explorer-endurance.fusionist.io/api",
          browserURL: "https://explorer-endurance.fusionist.io",
        },
      },
      {
        network: "enduranceTestnet",
        chainId: 6480,
        urls: {
          apiURL: "https://myexplorertestnet.fusionist.io/api",
          browserURL: "https://myexplorertestnet.fusionist.io",
        },
      },
      {
        network: "openduranceTestnet",
        chainId: 6480001001,
        urls: {
          apiURL: "https://explorer-l2-testnet.fusionist.io/api",
          browserURL: "https://explorer-l2-testnet.fusionist.io",
        },
      },
      {
        network: "blast",
        chainId: 81457,
        urls: {
          apiURL: "https://api.blastscan.io/api",
          browserURL: "https://blastscan.io",
        },
      },
      {
        network: "blastTestnet",
        chainId: 168587773,
        urls: {
          apiURL: "https://api-sepolia.blastscan.io/api",
          browserURL: "https://sepolia.blastscan.io",
        },
      },
      {
        network: "kroma",
        chainId: 255,
        urls: {
          apiURL: "https://api.kromascan.com/api",
          browserURL: "https://kromascan.com",
        },
      },
      {
        network: "kromaTestnet",
        chainId: 2358,
        urls: {
          apiURL: "https://api-sepolia.kromascan.com",
          browserURL: "https://sepolia.kromascan.com",
        },
      },
      {
        network: "dos",
        chainId: 7979,
        urls: {
          apiURL: "https://doscan.io/api",
          browserURL: "https://doscan.io",
        },
      },
      {
        network: "dosTestnet",
        chainId: 3939,
        urls: {
          apiURL: "https://test.doscan.io/api",
          browserURL: "https://test.doscan.io",
        },
      },
      {
        network: "fraxtal",
        chainId: 252,
        urls: {
          apiURL: "https://api.fraxscan.com/api",
          browserURL: "https://fraxscan.com",
        },
      },
      {
        network: "fraxtalTestnet",
        chainId: 2522,
        urls: {
          apiURL: "https://api-holesky.fraxscan.com/api",
          browserURL: "https://holesky.fraxscan.com",
        },
      },
      {
        network: "kava",
        chainId: 2222,
        urls: {
          apiURL: "https://kavascan.com/api",
          browserURL: "https://kavascan.com",
        },
      },
      {
        network: "metis",
        chainId: 1088,
        urls: {
          apiURL: "https://andromeda-explorer.metis.io/api",
          browserURL: "https://andromeda-explorer.metis.io",
        },
      },
      {
        network: "metisTestnet",
        chainId: 59902,
        urls: {
          apiURL: "https://sepolia-explorer.metisdevops.link/api",
          browserURL: "https://sepolia-explorer.metisdevops.link",
        },
      },
      {
        network: "mode",
        chainId: 34443,
        urls: {
          apiURL: "https://explorer.mode.network/api",
          browserURL: "https://explorer.mode.network",
        },
      },
      {
        network: "modeTestnet",
        chainId: 919,
        urls: {
          apiURL: "https://sepolia.explorer.mode.network/api",
          browserURL: "https://sepolia.explorer.mode.network",
        },
      },
      {
        network: "xlayer",
        chainId: 196,
        urls: {
          apiURL:
            "https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/XLAYER",
          browserURL: "https://www.oklink.com/xlayer",
        },
      },
      {
        network: "xlayerTestnet",
        chainId: 195,
        urls: {
          apiURL:
            "https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/XLAYER_TESTNET",
          browserURL: "https://www.oklink.com/xlayer-test",
        },
      },
      {
        network: "bob",
        chainId: 60808,
        urls: {
          apiURL: "https://explorer.gobob.xyz/api",
          browserURL: "https://explorer.gobob.xyz",
        },
      },
      {
        network: "bobTestnet",
        chainId: 111,
        urls: {
          apiURL: "https://testnet-explorer.gobob.xyz/api",
          browserURL: "https://testnet-explorer.gobob.xyz",
        },
      },
      {
        network: "core",
        chainId: 1116,
        urls: {
          apiURL: "https://openapi.coredao.org/api",
          browserURL: "https://scan.coredao.org",
        },
      },
      {
        network: "coreTestnet",
        chainId: 1115,
        urls: {
          apiURL: "https://api.test.btcs.network/api",
          browserURL: "https://scan.test.btcs.network",
        },
      },
      {
        network: "telos",
        chainId: 40,
        urls: {
          apiURL: "https://api.teloscan.io/api",
          browserURL: "https://www.teloscan.io",
        },
      },
      {
        network: "telosTestnet",
        chainId: 41,
        urls: {
          apiURL: "https://api.testnet.teloscan.io/api",
          browserURL: "https://testnet.teloscan.io",
        },
      },
      {
        network: "rootstock",
        chainId: 30,
        urls: {
          apiURL: "https://rootstock.blockscout.com/api",
          browserURL: "https://rootstock.blockscout.com",
        },
      },
      {
        network: "rootstockTestnet",
        chainId: 31,
        urls: {
          apiURL: "https://rootstock-testnet.blockscout.com/api",
          browserURL: "https://rootstock-testnet.blockscout.com",
        },
      },
      {
        network: "chiliz",
        chainId: 88888,
        urls: {
          apiURL:
            "https://api.routescan.io/v2/network/mainnet/evm/88888/etherscan/api",
          browserURL: "https://chiliscan.com",
        },
      },
      {
        network: "chilizTestnet",
        chainId: 88882,
        urls: {
          apiURL:
            "https://api.routescan.io/v2/network/testnet/evm/88882/etherscan/api",
          browserURL: "https://testnet.chiliscan.com",
        },
      },
      {
        network: "harmony",
        chainId: 1666600000,
        urls: {
          apiURL: "https://explorer.harmony.one/api",
          browserURL: "https://explorer.harmony.one",
        },
      },
      {
        network: "harmonyTestnet",
        chainId: 1666700000,
        urls: {
          apiURL: "https://explorer.testnet.harmony.one/api",
          browserURL: "https://explorer.testnet.harmony.one",
        },
      },
      {
        network: "arthera",
        chainId: 10242,
        urls: {
          apiURL: "https://explorer.arthera.net/api",
          browserURL: "https://explorer.arthera.net",
        },
      },
      {
        network: "gravityAlpha",
        chainId: 1625,
        urls: {
          apiURL: "https://explorer.gravity.xyz/api",
          browserURL: "https://explorer.gravity.xyz",
        },
      },
      {
        network: "gravityAlphaTestnet",
        chainId: 13505,
        urls: {
          apiURL: "https://explorer-sepolia.gravity.xyz/api",
          browserURL: "https://explorer-sepolia.gravity.xyz",
        },
      },
      {
        network: "taiko",
        chainId: 167000,
        urls: {
          apiURL: "https://api.taikoscan.io/api",
          browserURL: "https://taikoscan.io",
        },
      },
      {
        network: "taikoTestnet",
        chainId: 167009,
        urls: {
          apiURL: "https://api-hekla.taikoscan.io/api",
          browserURL: "https://hekla.taikoscan.io",
        },
      },
      {
        network: "zetaChain",
        chainId: 7000,
        urls: {
          apiURL: "https://zetachain.blockscout.com/api",
          browserURL: "https://zetachain.blockscout.com",
        },
      },
      {
        network: "zetaChainTestnet",
        chainId: 7001,
        urls: {
          apiURL: "https://zetachain-athens-3.blockscout.com/api",
          browserURL: "https://zetachain-athens-3.blockscout.com",
        },
      },
      {
        network: "5ireChain",
        chainId: 995,
        urls: {
          apiURL: "https://5irescan.io/api",
          browserURL: "https://5irescan.io",
        },
      },
      {
        network: "5ireChainTestnet",
        chainId: 997,
        urls: {
          apiURL: "https://testnet.5irescan.io/api",
          browserURL: "https://testnet.5irescan.io",
        },
      },
      {
        network: "sapphire",
        chainId: 23294,
        urls: {
          apiURL: "https://explorer.oasis.io/mainnet/sapphire/api",
          browserURL: "https://explorer.oasis.io/mainnet/sapphire",
        },
      },
      {
        network: "sapphireTestnet",
        chainId: 23295,
        urls: {
          apiURL: "https://explorer.oasis.io/testnet/sapphire/api",
          browserURL: "https://explorer.oasis.io/testnet/sapphire",
        },
      },
      {
        network: "worldChain",
        chainId: 480,
        urls: {
          apiURL: "https://worldchain-mainnet.explorer.alchemy.com/api",
          browserURL: "https://worldchain-mainnet.explorer.alchemy.com",
        },
      },
      {
        network: "worldChainTestnet",
        chainId: 4801,
        urls: {
          apiURL: "https://worldchain-sepolia.explorer.alchemy.com/api",
          browserURL: "https://worldchain-sepolia.explorer.alchemy.com",
        },
      },
      {
        network: "plumeTestnet",
        chainId: 98864,
        urls: {
          apiURL: "https://test-explorer.plumenetwork.xyz/api",
          browserURL: "https://test-explorer.plumenetwork.xyz",
        },
      },
      {
        network: "unichainTestnet",
        chainId: 1301,
        urls: {
          apiURL: "https://api-sepolia.uniscan.xyz/api",
          browserURL: "https://sepolia.uniscan.xyz",
        },
      },
      {
        network: "xdc",
        chainId: 50,
        urls: {
          apiURL: "https://api.xdcscan.com/api",
          browserURL: "https://xdcscan.com",
        },
      },
      {
        network: "xdcTestnet",
        chainId: 51,
        urls: {
          apiURL: "https://api-testnet.xdcscan.com/api",
          browserURL: "https://testnet.xdcscan.com",
        },
      },
      {
        network: "sx",
        chainId: 4162,
        urls: {
          apiURL: "https://explorerl2.sx.technology/api",
          browserURL: "https://explorerl2.sx.technology",
        },
      },
      {
        network: "sxTestnet",
        chainId: 79479957,
        urls: {
          apiURL: "https://explorerl2.toronto.sx.technology/api",
          browserURL: "https://explorerl2.toronto.sx.technology",
        },
      },
      {
        network: "zkSync",
        chainId: 324,
        urls: {
          apiURL: "https://api-era.zksync.network/api",
          browserURL: "https://era.zksync.network",
        },
      },
      {
        network: "zkSyncTestnet",
        chainId: 300,
        urls: {
          apiURL: "https://api-sepolia-era.zksync.network/api",
          browserURL: "https://sepolia-era.zksync.network",
        },
      },
      {
        network: "lisk",
        chainId: 1135,
        urls: {
          apiURL: "https://blockscout.lisk.com/api",
          browserURL: "https://blockscout.lisk.com",
        },
      },
      {
        network: "liskTestnet",
        chainId: 4202,
        urls: {
          apiURL: "https://sepolia-blockscout.lisk.com/api",
          browserURL: "https://sepolia-blockscout.lisk.com",
        },
      },
      {
        network: "metalL2",
        chainId: 1750,
        urls: {
          apiURL: "https://explorer.metall2.com/api",
          browserURL: "https://explorer.metall2.com",
        },
      },
      {
        network: "metalL2Testnet",
        chainId: 1740,
        urls: {
          apiURL: "https://testnet.explorer.metall2.com/api",
          browserURL: "https://testnet.explorer.metall2.com",
        },
      },
      {
        network: "superseed",
        chainId: 5330,
        urls: {
          apiURL: "https://explorer.superseed.xyz/api",
          browserURL: "https://explorer.superseed.xyz",
        },
      },
      {
        network: "superseedTestnet",
        chainId: 53302,
        urls: {
          apiURL: "https://sepolia-explorer.superseed.xyz/api",
          browserURL: "https://sepolia-explorer.superseed.xyz",
        },
      },
      {
        network: "storyTestnet",
        chainId: 1516,
        urls: {
          apiURL: "https://odyssey.storyscan.xyz/api",
          browserURL: "https://odyssey.storyscan.xyz",
        },
      },
    ],
  },
};

export default config;
