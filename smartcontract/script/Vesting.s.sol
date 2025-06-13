// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/Vesting.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

contract DeployVesting is Script {
    function run() external {
        // --- Replace with actual deployed token address ---
        address tokenAddress = 0xF83162590278EB895496dFDAC2929dCCa9c38e1c; // e.g. 0x123...abc

        // --- Replace with your deployer/private key index or load from env ---
        address deployer = vm.envAddress("DEPLOYER_ADDRESS");
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        // Deploy Vesting contract
        Vesting vesting = new Vesting();

        // Set the token address
        vesting.setTokenAddress(tokenAddress);

        // Optional: transfer tokens to vesting contract from deployer wallet
        // IERC20(tokenAddress).transfer(address(vesting), 100_000 ether);

        vm.stopBroadcast();

        console.log("Vesting contract deployed at:", address(vesting));
    }
}
