import { ethers } from "hardhat";

async function main() {
  const Create2Deployer = await ethers.getContractFactory("Create2Deployer");
  const create2Deployer = await Create2Deployer.deploy();

  await create2Deployer.deployed();

  console.log("Create2Deployer deployed to:", create2Deployer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
