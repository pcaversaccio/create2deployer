import { expect } from "chai";
import { ContractDeployTransaction } from "ethers";
import hre from "hardhat";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { Create2Deployer, Create2DeployerDeprecated } from "../typechain-types";

describe("Create2Deployer", function () {
  const name = "MyToken";
  const symbol = "MTKN";
  const initialBalance = 100;

  const salt = hre.ethers.id("WAGMI");

  let deployerAccount: SignerWithAddress;
  let Alice: SignerWithAddress;

  let create2Deployer: Create2Deployer;
  let create2Addr: string;

  let creationBytecode: ContractDeployTransaction;
  let initCodehash: string;
  let creationBytecodeERC1820Implementer: ContractDeployTransaction;

  beforeEach(async function () {
    [deployerAccount, Alice] = await hre.ethers.getSigners();

    create2Deployer = await hre.ethers.deployContract("Create2Deployer", {
      from: deployerAccount,
    });
    create2Deployer.waitForDeployment();
    create2Addr = await create2Deployer.getAddress();

    const ERC20Mock = await hre.ethers.getContractFactory("ERC20Mock");
    creationBytecode = await ERC20Mock.getDeployTransaction(
      name,
      symbol,
      deployerAccount,
      initialBalance,
    );
    initCodehash = hre.ethers.keccak256(creationBytecode.data);

    const ERC1820Implementer =
      await hre.ethers.getContractFactory("ERC1820Implementer");
    creationBytecodeERC1820Implementer =
      await ERC1820Implementer.getDeployTransaction();
  });

  describe("computeAddress", function () {
    it("computes the correct contract address", async function () {
      const onChainComputed = await create2Deployer.computeAddress(
        salt,
        initCodehash,
      );
      const offChainComputed = hre.ethers.getCreate2Address(
        create2Addr,
        salt,
        initCodehash,
      );
      expect(onChainComputed).to.equal(offChainComputed);
    });

    it("computes the correct contract address with deployer", async function () {
      const onChainComputed = await create2Deployer.computeAddressWithDeployer(
        salt,
        initCodehash,
        deployerAccount.address,
      );
      const offChainComputed = hre.ethers.getCreate2Address(
        deployerAccount.address,
        salt,
        initCodehash,
      );
      expect(onChainComputed).to.equal(offChainComputed);
    });
  });

  describe("deploy", function () {
    it("deploys an ERC1820Implementer from inline assembly code", async function () {
      const offChainComputed = hre.ethers.getCreate2Address(
        create2Addr,
        salt,
        hre.ethers.keccak256(creationBytecodeERC1820Implementer.data),
      );
      await create2Deployer.deployERC1820Implementer(0, salt);
      expect(creationBytecodeERC1820Implementer.data).to.include(
        (await hre.ethers.provider.getCode(offChainComputed)).slice(2),
      );
    });

    it("deploys an ERC20Mock with correct balances", async function () {
      const offChainComputed = hre.ethers.getCreate2Address(
        create2Addr,
        salt,
        initCodehash,
      );
      await create2Deployer.deploy(0, salt, creationBytecode.data);
      const erc20 = await hre.ethers.getContractAt(
        "ERC20Mock",
        offChainComputed,
      );
      expect(await erc20.balanceOf(deployerAccount.address)).to.equal(
        initialBalance,
      );
    });

    it("deploys a contract with funds deposited in the factory", async function () {
      const deposit = hre.ethers.parseEther("2");
      await deployerAccount.sendTransaction({
        to: create2Addr,
        value: deposit,
      });
      expect(await hre.ethers.provider.getBalance(create2Addr)).to.equal(
        deposit,
      );
      const onChainComputed = await create2Deployer.computeAddress(
        salt,
        initCodehash,
      );
      await create2Deployer.deploy(deposit, salt, creationBytecode.data);
      expect(await hre.ethers.provider.getBalance(onChainComputed)).to.equal(
        deposit,
      );
    });

    it("fails deploying a contract in an existent address", async function () {
      await create2Deployer.deployERC1820Implementer(0, salt);
      await expect(
        create2Deployer.deployERC1820Implementer(0, salt, {
          from: deployerAccount,
        }),
      ).to.be.revertedWith("Create2: Failed on deploy");

      await create2Deployer.deploy(0, salt, creationBytecode.data);
      await expect(
        create2Deployer.deploy(0, salt, creationBytecode.data, {
          from: deployerAccount,
        }),
      ).to.be.revertedWith("Create2: Failed on deploy");
    });

    it("fails deploying a contract if the bytecode length is zero", async function () {
      await expect(
        create2Deployer.connect(deployerAccount).deploy(0, salt, "0x"),
      ).to.be.revertedWith("Create2: bytecode length is zero");
    });

    it("fails deploying a contract if factory contract does not have sufficient balance", async function () {
      await expect(
        create2Deployer.deployERC1820Implementer(1, salt),
      ).to.be.revertedWith("Create2: insufficient balance");
      await expect(
        create2Deployer.deploy(1, salt, creationBytecode.data),
      ).to.be.revertedWith("Create2: insufficient balance");
    });

    it("fails deploying when paused", async function () {
      await create2Deployer.connect(deployerAccount).pause();
      await expect(
        create2Deployer.deployERC1820Implementer(1, salt),
      ).to.be.revertedWith("Pausable: paused");
      await expect(
        create2Deployer.deploy(1, salt, creationBytecode.data),
      ).to.be.revertedWith("Pausable: paused");
    });
  });

  describe("pause", function () {
    it("success", async function () {
      await expect(create2Deployer.connect(deployerAccount).pause()).not.to.be
        .reverted;
    });

    it("prevents non-owners from executing", async function () {
      await expect(create2Deployer.connect(Alice).pause()).to.be.revertedWith(
        "Ownable: caller is not the owner",
      );
    });
  });

  describe("unpause", function () {
    it("success", async function () {
      await expect(create2Deployer.connect(deployerAccount).pause()).not.to.be
        .reverted;
      await expect(create2Deployer.connect(deployerAccount).unpause()).not.to.be
        .reverted;
    });

    it("prevents non-owners from executing", async function () {
      await expect(create2Deployer.connect(deployerAccount).pause()).not.to.be
        .reverted;
      await expect(create2Deployer.connect(Alice).unpause()).to.be.revertedWith(
        "Ownable: caller is not the owner",
      );
    });
  });
});

describe("Create2DeployerDeprecated", function () {
  const name = "MyToken";
  const symbol = "MTKN";
  const initialBalance = 100;

  const salt = hre.ethers.id("WAGMI");

  let deployerAccount: SignerWithAddress;
  let Alice: SignerWithAddress;

  let create2DeployerDeprecated: Create2DeployerDeprecated;
  let create2Addr: string;

  let creationBytecode: ContractDeployTransaction;
  let initCodehash: string;
  let creationBytecodeERC1820Implementer: ContractDeployTransaction;

  beforeEach(async function () {
    [deployerAccount, Alice] = await hre.ethers.getSigners();

    create2DeployerDeprecated = await hre.ethers.deployContract(
      "Create2DeployerDeprecated",
      {
        from: deployerAccount,
      },
    );
    create2DeployerDeprecated.waitForDeployment();
    create2Addr = await create2DeployerDeprecated.getAddress();

    const ERC20Mock = await hre.ethers.getContractFactory("ERC20Mock");
    creationBytecode = await ERC20Mock.getDeployTransaction(
      name,
      symbol,
      deployerAccount,
      initialBalance,
    );
    initCodehash = hre.ethers.keccak256(creationBytecode.data);

    const ERC1820Implementer =
      await hre.ethers.getContractFactory("ERC1820Implementer");
    creationBytecodeERC1820Implementer =
      await ERC1820Implementer.getDeployTransaction();
  });

  describe("computeAddress", function () {
    it("computes the correct contract address", async function () {
      const onChainComputed = await create2DeployerDeprecated.computeAddress(
        salt,
        initCodehash,
      );
      const offChainComputed = hre.ethers.getCreate2Address(
        create2Addr,
        salt,
        initCodehash,
      );
      expect(onChainComputed).to.equal(offChainComputed);
    });

    it("computes the correct contract address with deployer", async function () {
      const onChainComputed =
        await create2DeployerDeprecated.computeAddressWithDeployer(
          salt,
          initCodehash,
          deployerAccount.address,
        );
      const offChainComputed = hre.ethers.getCreate2Address(
        deployerAccount.address,
        salt,
        initCodehash,
      );
      expect(onChainComputed).to.equal(offChainComputed);
    });
  });

  describe("deploy", function () {
    it("deploys an ERC1820Implementer from inline assembly code", async function () {
      const offChainComputed = hre.ethers.getCreate2Address(
        create2Addr,
        salt,
        hre.ethers.keccak256(creationBytecodeERC1820Implementer.data),
      );
      await create2DeployerDeprecated.deployERC1820Implementer(0, salt);
      expect(creationBytecodeERC1820Implementer.data).to.include(
        (await hre.ethers.provider.getCode(offChainComputed)).slice(2),
      );
    });

    it("deploys an ERC20Mock with correct balances", async function () {
      const offChainComputed = hre.ethers.getCreate2Address(
        create2Addr,
        salt,
        initCodehash,
      );
      await create2DeployerDeprecated.deploy(0, salt, creationBytecode.data);
      const erc20 = await hre.ethers.getContractAt(
        "ERC20Mock",
        offChainComputed,
      );
      expect(await erc20.balanceOf(deployerAccount.address)).to.equal(
        initialBalance,
      );
    });

    it("deploys a contract with funds deposited in the factory", async function () {
      const deposit = hre.ethers.parseEther("2");
      await deployerAccount.sendTransaction({
        to: create2Addr,
        value: deposit,
      });
      expect(await hre.ethers.provider.getBalance(create2Addr)).to.equal(
        deposit,
      );
      const onChainComputed = await create2DeployerDeprecated.computeAddress(
        salt,
        initCodehash,
      );
      await create2DeployerDeprecated.deploy(
        deposit,
        salt,
        creationBytecode.data,
      );
      expect(await hre.ethers.provider.getBalance(onChainComputed)).to.equal(
        deposit,
      );
    });

    it("fails deploying a contract in an existent address", async function () {
      await create2DeployerDeprecated.deployERC1820Implementer(0, salt);
      await expect(
        create2DeployerDeprecated.deployERC1820Implementer(0, salt, {
          from: deployerAccount,
        }),
      ).to.be.revertedWith("Create2: Failed on deploy");

      await create2DeployerDeprecated.deploy(0, salt, creationBytecode.data);
      await expect(
        create2DeployerDeprecated.deploy(0, salt, creationBytecode.data, {
          from: deployerAccount,
        }),
      ).to.be.revertedWith("Create2: Failed on deploy");
    });

    it("fails deploying a contract if the bytecode length is zero", async function () {
      await expect(
        create2DeployerDeprecated
          .connect(deployerAccount)
          .deploy(0, salt, "0x"),
      ).to.be.revertedWith("Create2: bytecode length is zero");
    });

    it("fails deploying a contract if factory contract does not have sufficient balance", async function () {
      await expect(
        create2DeployerDeprecated.deployERC1820Implementer(1, salt),
      ).to.be.revertedWith("Create2: insufficient balance");
      await expect(
        create2DeployerDeprecated.deploy(1, salt, creationBytecode.data),
      ).to.be.revertedWith("Create2: insufficient balance");
    });

    it("fails deploying when paused", async function () {
      await create2DeployerDeprecated.connect(deployerAccount).pause();
      await expect(
        create2DeployerDeprecated.deployERC1820Implementer(1, salt),
      ).to.be.revertedWith("Pausable: paused");
      await expect(
        create2DeployerDeprecated.deploy(1, salt, creationBytecode.data),
      ).to.be.revertedWith("Pausable: paused");
    });
  });

  describe("pause", function () {
    it("success", async function () {
      await expect(create2DeployerDeprecated.connect(deployerAccount).pause())
        .not.to.be.reverted;
    });

    it("prevents non-owners from executing", async function () {
      await expect(
        create2DeployerDeprecated.connect(Alice).pause(),
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("unpause", function () {
    it("success", async function () {
      await expect(create2DeployerDeprecated.connect(deployerAccount).pause())
        .not.to.be.reverted;
      await expect(create2DeployerDeprecated.connect(deployerAccount).unpause())
        .not.to.be.reverted;
    });

    it("prevents non-owners from executing", async function () {
      await expect(create2DeployerDeprecated.connect(deployerAccount).pause())
        .not.to.be.reverted;
      await expect(
        create2DeployerDeprecated.connect(Alice).unpause(),
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  // Only relevant for the `Create2DeployerDeprecated` contract
  describe("killCreate2Deployer", function () {
    it("success", async function () {
      const deposit = hre.ethers.parseEther("2");
      await deployerAccount.sendTransaction({
        to: create2Addr,
        value: deposit,
      });
      expect(await hre.ethers.provider.getBalance(create2Addr)).to.equal(
        deposit,
      );
      const initialBalance = await hre.ethers.provider.getBalance(
        Alice.address,
      );
      await expect(
        create2DeployerDeprecated
          .connect(deployerAccount)
          .killCreate2Deployer(Alice.address),
      ).not.to.be.reverted;
      expect(await hre.ethers.provider.getBalance(Alice.address)).to.equal(
        deposit + initialBalance,
      );
    });

    it("prevents non-owners from executing", async function () {
      await expect(
        create2DeployerDeprecated
          .connect(Alice)
          .killCreate2Deployer(Alice.address),
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});
