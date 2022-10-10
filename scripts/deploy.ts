import { ethers } from "hardhat";

async function main() {
  const create2Deployer = await ethers.deployContract("Create2Deployer");

  await create2Deployer.deployed();

  console.log("Create2Deployer deployed to:", create2Deployer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
