import { artifacts, contract, web3 } from "hardhat";
import { computeCreate2Address } from "@eth-sdk/utils";

const {
  balance,
  BN,
  ether,
  expectRevert,
  send,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("@openzeppelin/test-helpers");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { expect } = require("chai");

const Create2Deployer = artifacts.require("Create2Deployer");
const ERC20Mock = artifacts.require("ERC20Mock");
const ERC1820Implementer = artifacts.require("ERC1820Implementer");

contract("Create2", function (accounts) {
  const [deployerAccount] = accounts;

  const salt = "salt message";
  const saltHex = web3.utils.soliditySha3(salt);

  const encodedParams = web3.eth.abi
    .encodeParameters(
      ["string", "string", "address", "uint256"],
      ["MyToken", "MTKN", deployerAccount, 100]
    )
    .slice(2);

  const constructorByteCode = `${ERC20Mock.bytecode}${encodedParams}`;

  beforeEach(async function () {
    this.factory = await Create2Deployer.new();
  });
  describe("computeAddress", function () {
    it("computes the correct contract address", async function () {
      const onChainComputed = await this.factory.computeAddress(
        saltHex,
        web3.utils.soliditySha3(constructorByteCode)
      );
      const offChainComputed = computeCreate2Address(
        this.factory.address,
        saltHex,
        constructorByteCode
      );
      expect(onChainComputed).to.equal(offChainComputed);
    });

    it("computes the correct contract address with deployer", async function () {
      const onChainComputed = await this.factory.computeAddressWithDeployer(
        saltHex,
        web3.utils.soliditySha3(constructorByteCode),
        deployerAccount
      );
      const offChainComputed = computeCreate2Address(
        deployerAccount,
        saltHex,
        constructorByteCode
      );
      expect(onChainComputed).to.equal(offChainComputed);
    });
  });

  describe("deploy", function () {
    it("deploys a ERC1820Implementer from inline assembly code", async function () {
      const offChainComputed = computeCreate2Address(
        this.factory.address,
        saltHex,
        ERC1820Implementer.bytecode
      );
      await this.factory.deployERC1820Implementer(0, saltHex);
      expect(ERC1820Implementer.bytecode).to.include(
        (await web3.eth.getCode(offChainComputed)).slice(2)
      );
    });

    it("deploys a ERC20Mock with correct balances", async function () {
      const offChainComputed = computeCreate2Address(
        this.factory.address,
        saltHex,
        constructorByteCode
      );

      await this.factory.deploy(0, saltHex, constructorByteCode);

      const erc20 = await ERC20Mock.at(offChainComputed);
      expect(await erc20.balanceOf(deployerAccount)).to.be.bignumber.equal(
        new BN(100)
      );
    });

    it("deploys a contract with funds deposited in the factory", async function () {
      const deposit = ether("2");
      await send.ether(deployerAccount, this.factory.address, deposit);
      expect(await balance.current(this.factory.address)).to.be.bignumber.equal(
        deposit
      );

      const onChainComputed = await this.factory.computeAddressWithDeployer(
        saltHex,
        web3.utils.soliditySha3(constructorByteCode),
        this.factory.address
      );

      await this.factory.deploy(deposit, saltHex, constructorByteCode);
      expect(await balance.current(onChainComputed)).to.be.bignumber.equal(
        deposit
      );
    });

    it("fails deploying a contract in an existent address", async function () {
      await this.factory.deploy(0, saltHex, constructorByteCode, {
        from: deployerAccount,
      });
      await expectRevert(
        this.factory.deploy(0, saltHex, constructorByteCode, {
          from: deployerAccount,
        }),
        "Create2: Failed on deploy"
      );
    });

    it("fails deploying a contract if the bytecode length is zero", async function () {
      await expectRevert(
        this.factory.deploy(0, saltHex, "0x", { from: deployerAccount }),
        "Create2: bytecode length is zero"
      );
    });

    it("fails deploying a contract if factory contract does not have sufficient balance", async function () {
      await expectRevert(
        this.factory.deploy(1, saltHex, constructorByteCode, {
          from: deployerAccount,
        }),
        "Create2: insufficient balance"
      );
    });
  });

  describe("pause", function () {
    it("success", async function () {
      expect(await this.factory.pause({ from: accounts[0] }));
    });
    it("prevents non-owners from executing", async function () {
      await expectRevert(
        this.factory.pause({ from: accounts[1] }),
        "Ownable: caller is not the owner"
      );
    });
  });

  describe("unpause", function () {
    it("success", async function () {
      await this.factory.pause({ from: accounts[0] });
      expect(await this.factory.unpause({ from: accounts[0] }));
    });
    it("prevents non-owners from executing", async function () {
      await this.factory.pause({ from: accounts[0] });
      await expectRevert(
        this.factory.unpause({ from: accounts[1] }),
        "Ownable: caller is not the owner"
      );
    });
  });

  describe("killCreate2Deployer", function () {
    it("success", async function () {
      expect(
        await this.factory.killCreate2Deployer(accounts[0], {
          from: accounts[0],
        })
      );
    });
    it("prevents non-owners from executing", async function () {
      await expectRevert(
        this.factory.killCreate2Deployer(accounts[0], { from: accounts[1] }),
        "Ownable: caller is not the owner"
      );
    });
  });
});
