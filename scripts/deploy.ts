import hre, { ethers } from "hardhat";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const create2Deployer = await ethers.deployContract("Create2Deployer");

  await create2Deployer.deployed();
  const create2DeployerAddress = create2Deployer.address;

  console.log("Create2Deployer deployed to:", create2DeployerAddress);

  await delay(30000); // Wait for 30 seconds before verifying the contract

  await hre.run("verify:verify", {
    address: create2DeployerAddress,
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
