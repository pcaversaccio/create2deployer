// Note that the deployment scripts must be placed in the `deploy` folder for `hardhat deploy-zksync`
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Wallet } from "zksync-ethers";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

const PRIVATE_KEY: string = process.env.PRIVATE_KEY_ZKS || "";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function main(hre: HardhatRuntimeEnvironment) {
  const wallet = new Wallet(PRIVATE_KEY);
  const deployer = new Deployer(hre, wallet);

  const artifact = await deployer.loadArtifact("Create2Deployer");
  const create2Deployer = await deployer.deploy(artifact);

  await create2Deployer.waitForDeployment();
  const create2DeployerAddress = await create2Deployer.getAddress();

  console.log("Create2Deployer deployed to:", create2DeployerAddress);

  await delay(30000); // Wait for 30 seconds before verifying the contract

  await hre.run("verify:verify", {
    address: create2DeployerAddress,
  });
}
