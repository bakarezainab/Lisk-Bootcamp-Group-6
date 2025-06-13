// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {MyToken} from "../src/MyToken.sol";

contract MyTokenScript is Script {
    function run() external {
        // Retrieve private key from environment variable
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy MyToken contract
        // Parameters:
        // - name: "MyToken"
        // - symbol: "MTK"
        // - initialSupply: 100,000 tokens (100,000 * 10^18)
        // - owner: msg.sender (the deployer)
        MyToken token = new MyToken(
            "MyToken",
            "MTK",
            100_000 * 10**18,
            msg.sender
        );

        vm.stopBroadcast();
    }
}


