// SPDX-License-Identifier: MIT
// See: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/mocks/Create2Impl.sol

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Create2.sol";
import "@openzeppelin/contracts/utils/introspection/ERC1820Implementer.sol";

contract Create2Deployer {
    function deploy(
        uint256 value,
        bytes32 salt,
        bytes memory code
    ) public {
        Create2.deploy(value, salt, code);
    }

    function deployERC1820Implementer(uint256 value, bytes32 salt) public {
        Create2.deploy(value, salt, type(ERC1820Implementer).creationCode);
    }

    function computeAddress(bytes32 salt, bytes32 codeHash) public view returns (address) {
        return Create2.computeAddress(salt, codeHash);
    }

    function computeAddressWithDeployer(
        bytes32 salt,
        bytes32 codeHash,
        address deployer
    ) public pure returns (address) {
        return Create2.computeAddress(salt, codeHash, deployer);
    }

    receive() external payable {}
}
