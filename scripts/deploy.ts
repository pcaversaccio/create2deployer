import hre from "hardhat";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const create2Deployer = await hre.ethers.deployContract("Create2Deployer");

  await create2Deployer.waitForDeployment();
  const create2DeployerAddress = await create2Deployer.getAddress();

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
