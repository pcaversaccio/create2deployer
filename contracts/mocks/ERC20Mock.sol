// SPDX-License-Identifier: MIT
// Source: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/mocks/token/ERC20Mock.sol
pragma solidity ^0.8.9;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Mock class using ERC20
contract ERC20Mock is ERC20 {
    constructor(
        string memory name_,
        string memory symbol_,
        address initialAccount_,
        uint256 initialBalance_
    ) payable ERC20(name_, symbol_) {
        _mint(initialAccount_, initialBalance_);
    }

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public {
        _burn(account, amount);
    }
}
