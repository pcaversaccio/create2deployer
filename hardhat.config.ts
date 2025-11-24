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

dotenv.config({ quiet: true });

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
    version: "1.5.15",
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
    hoodi: {
      chainId: 560048,
      url: process.env.ETH_HOODI_TESTNET_URL || "",
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
    seiDevnet: {
      chainId: 713715,
      url: process.env.SEI_DEVNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    seiTestnet: {
      chainId: 1328,
      url: process.env.SEI_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    seiMain: {
      chainId: 1329,
      url: process.env.SEI_MAINNET_URL || "",
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
      chainId: 98867,
      url: process.env.PLUME_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    plumeMain: {
      chainId: 98866,
      url: process.env.PLUME_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    unichainTestnet: {
      chainId: 1301,
      url: process.env.UNICHAIN_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    unichainMain: {
      chainId: 130,
      url: process.env.UNICHAIN_MAINNET_URL || "",
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
      chainId: 1315,
      url: process.env.STORY_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    sonicTestnet: {
      chainId: 57054,
      url: process.env.SONIC_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    sonicMain: {
      chainId: 146,
      url: process.env.SONIC_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    flowTestnet: {
      chainId: 545,
      url: process.env.FLOW_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    flowMain: {
      chainId: 747,
      url: process.env.FLOW_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    inkTestnet: {
      chainId: 763373,
      url: process.env.INK_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    inkMain: {
      chainId: 57073,
      url: process.env.INK_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    morphTestnet: {
      chainId: 2810,
      url: process.env.MORPH_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    morphMain: {
      chainId: 2818,
      url: process.env.MORPH_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    shapeTestnet: {
      chainId: 11011,
      url: process.env.SHAPE_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    shapeMain: {
      chainId: 360,
      url: process.env.SHAPE_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    etherlinkTestnet: {
      chainId: 128123,
      url: process.env.ETHERLINK_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    etherlinkMain: {
      chainId: 42793,
      url: process.env.ETHERLINK_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    soneiumTestnet: {
      chainId: 1946,
      url: process.env.SONEIUM_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    soneiumMain: {
      chainId: 1868,
      url: process.env.SONEIUM_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    swellTestnet: {
      chainId: 1924,
      url: process.env.SWELL_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    swellMain: {
      chainId: 1923,
      url: process.env.SWELL_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    hemiTestnet: {
      chainId: 743111,
      url: process.env.HEMI_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    hemiMain: {
      chainId: 43111,
      url: process.env.HEMI_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    berachainTestnet: {
      chainId: 80084,
      url: process.env.BERACHAIN_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    berachainMain: {
      chainId: 80094,
      url: process.env.BERACHAIN_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    monadTestnet: {
      chainId: 10143,
      url: process.env.MONAD_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    monadMain: {
      chainId: 143,
      url: process.env.MONAD_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    cornTestnet: {
      chainId: 21000001,
      url: process.env.CORN_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    cornMain: {
      chainId: 21000000,
      url: process.env.CORN_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    arenazTestnet: {
      chainId: 9897,
      url: process.env.ARENAZ_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    arenazMain: {
      chainId: 7897,
      url: process.env.ARENAZ_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    iotexTestnet: {
      chainId: 4690,
      url: process.env.IOTEX_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    iotexMain: {
      chainId: 4689,
      url: process.env.IOTEX_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    hychainTestnet: {
      chainId: 29112,
      url: process.env.HYCHAIN_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    hychainMain: {
      chainId: 2911,
      url: process.env.HYCHAIN_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    zircuitTestnet: {
      chainId: 48898,
      url: process.env.ZIRCUIT_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    zircuitMain: {
      chainId: 48900,
      url: process.env.ZIRCUIT_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    megaETHTestnet: {
      chainId: 6342,
      url: process.env.MEGAETH_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bitlayerTestnet: {
      chainId: 200810,
      url: process.env.BITLAYER_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bitlayerMain: {
      chainId: 200901,
      url: process.env.BITLAYER_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    roninTestnet: {
      chainId: 2021,
      url: process.env.RONIN_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    roninMain: {
      chainId: 2020,
      url: process.env.RONIN_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    immutableZkEVMTestnet: {
      chainId: 13473,
      url: process.env.IMMUTABLEZKEVM_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    immutableZkEVMMain: {
      chainId: 13371,
      url: process.env.IMMUTABLEZKEVM_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    abstractTestnet: {
      chainId: 11124,
      url: process.env.ABSTRACT_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    abstractMain: {
      chainId: 2741,
      url: process.env.ABSTRACT_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    hyperevmTestnet: {
      chainId: 998,
      url: process.env.HYPEREVM_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    hyperevmMain: {
      chainId: 999,
      url: process.env.HYPEREVM_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    kaiaMain: {
      chainId: 8217,
      url: process.env.KAIA_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    apeChainTestnet: {
      chainId: 33111,
      url: process.env.APECHAIN_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    apeChainMain: {
      chainId: 33139,
      url: process.env.APECHAIN_MAINNET_URL || "",
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
      hoodi: process.env.ETHERSCAN_API_KEY || "",
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
      // For Plume testnet & mainnet
      plume: process.env.PLUME_API_KEY || "",
      plumeTestnet: process.env.PLUME_API_KEY || "",
      // For Unichain testnet & mainnet
      unichain: process.env.UNICHAIN_API_KEY || "",
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
      // For Sonic testnet & mainnet
      sonic: process.env.SONIC_API_KEY || "",
      sonicTestnet: process.env.SONIC_API_KEY || "",
      // For EVM on Flow testnet & mainnet
      flow: process.env.FLOW_API_KEY || "",
      flowTestnet: process.env.FLOW_API_KEY || "",
      // For Ink testnet & mainnet
      ink: process.env.INK_API_KEY || "",
      inkTestnet: process.env.INK_API_KEY || "",
      // For Morph testnet & mainnet
      morph: process.env.MORPH_API_KEY || "",
      morphTestnet: process.env.MORPH_API_KEY || "",
      // For Shape testnet & mainnet
      shape: process.env.SHAPE_API_KEY || "",
      shapeTestnet: process.env.SHAPE_API_KEY || "",
      // For Etherlink testnet & mainnet
      etherlink: process.env.ETHERLINK_API_KEY || "",
      etherlinkTestnet: process.env.ETHERLINK_API_KEY || "",
      // For Soneium testnet & mainnet
      soneium: process.env.SONEIUM_API_KEY || "",
      soneiumTestnet: process.env.SONEIUM_API_KEY || "",
      // For Swellchain testnet & mainnet
      swell: process.env.SWELL_API_KEY || "",
      swellTestnet: process.env.SWELL_API_KEY || "",
      // For Hemi testnet & mainnet
      hemi: process.env.HEMI_API_KEY || "",
      hemiTestnet: process.env.HEMI_API_KEY || "",
      // For Berachain testnet & mainnet
      berachain: process.env.BERACHAIN_API_KEY || "",
      berachainTestnet: process.env.BERACHAIN_API_KEY || "",
      // For Monad testnet & mainnet
      monad: process.env.MONAD_API_KEY || "",
      monadTestnet: process.env.MONAD_API_KEY || "",
      // For Corn testnet & mainnet
      corn: process.env.CORN_API_KEY || "",
      cornTestnet: process.env.CORN_API_KEY || "",
      // For Arena-Z testnet & mainnet
      arenaz: process.env.ARENAZ_API_KEY || "",
      arenazTestnet: process.env.ARENAZ_API_KEY || "",
      // For IoTeX testnet & mainnet
      iotex: process.env.IOTEX_API_KEY || "",
      iotexTestnet: process.env.IOTEX_API_KEY || "",
      // For HYCHAIN testnet & mainnet
      hychain: process.env.HYCHAIN_API_KEY || "",
      hychainTestnet: process.env.HYCHAIN_API_KEY || "",
      // For Zircuit testnet & mainnet
      zircuit: process.env.ZIRCUIT_API_KEY || "",
      zircuitTestnet: process.env.ZIRCUIT_API_KEY || "",
      // For Bitlayer testnet & mainnet
      bitlayer: process.env.BITLAYER_API_KEY || "",
      bitlayerTestnet: process.env.BITLAYER_API_KEY || "",
      // For Immutable zkEVM testnet & mainnet
      immutableZkEVM: process.env.IMMUTABLEZKEVM_API_KEY || "",
      immutableZkEVMTestnet: process.env.IMMUTABLEZKEVM_API_KEY || "",
      // For Abstract testnet & mainnet
      abstract: process.env.ABSTRACT_API_KEY || "",
      abstractTestnet: process.env.ABSTRACT_API_KEY || "",
      // For Kaia mainnet
      kaia: process.env.OKLINK_API_KEY || "",
      // For ApeChain testnet & mainnet
      apeChain: process.env.APECHAIN_API_KEY || "",
      apeChainTestnet: process.env.APECHAIN_API_KEY || "",
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
        network: "hoodi",
        chainId: 560048,
        urls: {
          apiURL: "https://api-hoodi.etherscan.io/api",
          browserURL: "https://hoodi.etherscan.io",
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
        network: "polygonAmoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com",
        },
      },
      {
        network: "polygonZkEVMTestnet",
        chainId: 2442,
        urls: {
          apiURL: "https://api-cardona-zkevm.polygonscan.com/api",
          browserURL: "https://cardona-zkevm.polygonscan.com",
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
          browserURL: "https://www.oklink.com/x-layer",
        },
      },
      {
        network: "xlayerTestnet",
        chainId: 195,
        urls: {
          apiURL:
            "https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/XLAYER_TESTNET",
          browserURL: "https://www.oklink.com/x-layer-testnet",
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
          apiURL: "https://zetascan.com/api",
          browserURL: "https://zetascan.com",
        },
      },
      {
        network: "zetaChainTestnet",
        chainId: 7001,
        urls: {
          apiURL: "https://testnet.zetascan.com/api",
          browserURL: "https://testnet.zetascan.com",
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
        network: "plume",
        chainId: 98866,
        urls: {
          apiURL: "https://explorer.plume.org/api",
          browserURL: "https://explorer.plume.org",
        },
      },
      {
        network: "plumeTestnet",
        chainId: 98867,
        urls: {
          apiURL: "https://testnet-explorer.plume.org/api",
          browserURL: "https://testnet-explorer.plume.org",
        },
      },
      {
        network: "unichain",
        chainId: 130,
        urls: {
          apiURL: "https://api.uniscan.xyz/api",
          browserURL: "https://uniscan.xyz",
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
        chainId: 1315,
        urls: {
          apiURL: "https://aeneid.storyscan.io/api",
          browserURL: "https://aeneid.storyscan.io",
        },
      },
      {
        network: "sonic",
        chainId: 146,
        urls: {
          apiURL: "https://api.sonicscan.org/api",
          browserURL: "https://sonicscan.org",
        },
      },
      {
        network: "sonicTestnet",
        chainId: 57054,
        urls: {
          apiURL: "https://api-testnet.sonicscan.org/api",
          browserURL: "https://testnet.sonicscan.org",
        },
      },
      {
        network: "flow",
        chainId: 747,
        urls: {
          apiURL: "https://evm.flowscan.io/api",
          browserURL: "https://evm.flowscan.io",
        },
      },
      {
        network: "flowTestnet",
        chainId: 545,
        urls: {
          apiURL: "https://evm-testnet.flowscan.io/api",
          browserURL: "https://evm-testnet.flowscan.io",
        },
      },
      {
        network: "ink",
        chainId: 57073,
        urls: {
          apiURL: "https://explorer.inkonchain.com/api",
          browserURL: "https://explorer.inkonchain.com",
        },
      },
      {
        network: "inkTestnet",
        chainId: 763373,
        urls: {
          apiURL: "https://explorer-sepolia.inkonchain.com/api",
          browserURL: "https://explorer-sepolia.inkonchain.com",
        },
      },
      {
        network: "morph",
        chainId: 2818,
        urls: {
          apiURL: "https://explorer.morphl2.io/api",
          browserURL: "https://explorer.morphl2.io",
        },
      },
      {
        network: "morphTestnet",
        chainId: 2810,
        urls: {
          apiURL: "https://explorer-holesky.morphl2.io/api",
          browserURL: "https://explorer-holesky.morphl2.io",
        },
      },
      {
        network: "shape",
        chainId: 360,
        urls: {
          apiURL: "https://shapescan.xyz/api",
          browserURL: "https://shapescan.xyz",
        },
      },
      {
        network: "shapeTestnet",
        chainId: 11011,
        urls: {
          apiURL: "https://sepolia.shapescan.xyz/api",
          browserURL: "https://sepolia.shapescan.xyz",
        },
      },
      {
        network: "etherlink",
        chainId: 42793,
        urls: {
          apiURL: "https://explorer.etherlink.com/api",
          browserURL: "https://explorer.etherlink.com",
        },
      },
      {
        network: "etherlinkTestnet",
        chainId: 128123,
        urls: {
          apiURL: "https://testnet.explorer.etherlink.com/api",
          browserURL: "https://testnet.explorer.etherlink.com",
        },
      },
      {
        network: "soneium",
        chainId: 1868,
        urls: {
          apiURL: "https://soneium.blockscout.com/api",
          browserURL: "https://soneium.blockscout.com",
        },
      },
      {
        network: "soneiumTestnet",
        chainId: 1946,
        urls: {
          apiURL: "https://soneium-minato.blockscout.com/api",
          browserURL: "https://soneium-minato.blockscout.com",
        },
      },
      {
        network: "swell",
        chainId: 1923,
        urls: {
          apiURL: "https://explorer.swellnetwork.io/api",
          browserURL: "https://explorer.swellnetwork.io",
        },
      },
      {
        network: "swellTestnet",
        chainId: 1924,
        urls: {
          apiURL: "https://swell-testnet-explorer.alt.technology/api",
          browserURL: "https://swell-testnet-explorer.alt.technology",
        },
      },
      {
        network: "hemi",
        chainId: 43111,
        urls: {
          apiURL: "https://explorer.hemi.xyz/api",
          browserURL: "https://explorer.hemi.xyz",
        },
      },
      {
        network: "hemiTestnet",
        chainId: 743111,
        urls: {
          apiURL: "https://testnet.explorer.hemi.xyz/api",
          browserURL: "https://testnet.explorer.hemi.xyz",
        },
      },
      {
        network: "berachain",
        chainId: 80094,
        urls: {
          apiURL: "https://api.berascan.com/api",
          browserURL: "https://berascan.com",
        },
      },
      {
        network: "berachainTestnet",
        chainId: 80084,
        urls: {
          apiURL:
            "https://api.routescan.io/v2/network/testnet/evm/80084/etherscan",
          browserURL: "https://bartio.beratrail.io",
        },
      },
      {
        network: "monad",
        chainId: 143,
        urls: {
          apiURL: "https://api.monadscan.com/api",
          browserURL: "https://monadscan.com",
        },
      },
      {
        network: "monadTestnet",
        chainId: 10143,
        urls: {
          apiURL: "https://api-testnet.monadscan.com/api",
          browserURL: "https://testnet.monadscan.com",
        },
      },
      {
        network: "corn",
        chainId: 21000000,
        urls: {
          apiURL:
            "https://api.routescan.io/v2/network/mainnet/evm/21000000/etherscan",
          browserURL: "https://cornscan.io",
        },
      },
      {
        network: "cornTestnet",
        chainId: 21000001,
        urls: {
          apiURL:
            "https://api.routescan.io/v2/network/testnet/evm/21000001/etherscan",
          browserURL: "https://testnet.cornscan.io",
        },
      },
      {
        network: "arenaz",
        chainId: 7897,
        urls: {
          apiURL: "https://explorer.arena-z.gg/api",
          browserURL: "https://explorer.arena-z.gg",
        },
      },
      {
        network: "arenazTestnet",
        chainId: 9897,
        urls: {
          apiURL: "https://arena-z.blockscout.com/api",
          browserURL: "https://arena-z.blockscout.com",
        },
      },
      {
        network: "iotex",
        chainId: 4689,
        urls: {
          apiURL: "https://iotexscout.io/api",
          browserURL: "https://iotexscan.io",
        },
      },
      {
        network: "iotexTestnet",
        chainId: 4690,
        urls: {
          apiURL: "https://testnet.iotexscan.io/api",
          browserURL: "https://testnet.iotexscan.io",
        },
      },
      {
        network: "hychain",
        chainId: 2911,
        urls: {
          apiURL: "https://explorer.hychain.com/api",
          browserURL: "https://explorer.hychain.com",
        },
      },
      {
        network: "hychainTestnet",
        chainId: 29112,
        urls: {
          apiURL: "https://testnet.explorer.hychain.com/api",
          browserURL: "https://testnet.explorer.hychain.com",
        },
      },
      {
        network: "zircuit",
        chainId: 48900,
        urls: {
          apiURL: "https://explorer.zircuit.com/api/contractVerifyHardhat",
          browserURL: "https://explorer.zircuit.com",
        },
      },
      {
        network: "zircuitTestnet",
        chainId: 48898,
        urls: {
          apiURL:
            "https://explorer.garfield-testnet.zircuit.com/api/contractVerifyHardhat",
          browserURL: "https://explorer.garfield-testnet.zircuit.com",
        },
      },
      {
        network: "bitlayer",
        chainId: 200901,
        urls: {
          apiURL: "https://api.btrscan.com/scan/api",
          browserURL: "https://www.btrscan.com",
        },
      },
      {
        network: "bitlayerTestnet",
        chainId: 200810,
        urls: {
          apiURL: "https://api-testnet.btrscan.com/scan/api",
          browserURL: "https://testnet.btrscan.com",
        },
      },
      {
        network: "immutableZkEVM",
        chainId: 13371,
        urls: {
          apiURL: "https://explorer.immutable.com/api",
          browserURL: "https://explorer.immutable.com",
        },
      },
      {
        network: "immutableZkEVMTestnet",
        chainId: 13473,
        urls: {
          apiURL: "https://explorer.testnet.immutable.com/api",
          browserURL: "https://explorer.testnet.immutable.com",
        },
      },
      {
        network: "abstract",
        chainId: 2741,
        urls: {
          apiURL: "https://api.abscan.org/api",
          browserURL: "https://abscan.org",
        },
      },
      {
        network: "abstractTestnet",
        chainId: 11124,
        urls: {
          apiURL: "https://api-sepolia.abscan.org/api",
          browserURL: "https://sepolia.abscan.org",
        },
      },
      {
        network: "kaia",
        chainId: 8217,
        urls: {
          apiURL:
            "https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/KAIA",
          browserURL: "https://www.oklink.com/kaia",
        },
      },
      {
        network: "apeChain",
        chainId: 33139,
        urls: {
          apiURL: "https://api.apescan.io/api",
          browserURL: "https://apescan.io",
        },
      },
      {
        network: "apeChainTestnet",
        chainId: 33111,
        urls: {
          apiURL: "https://api-curtis.apescan.io/api",
          browserURL: "https://curtis.apescan.io",
        },
      },
    ],
  },
};

export default config;
