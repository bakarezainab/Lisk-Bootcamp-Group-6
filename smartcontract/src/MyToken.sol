// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Import OpenZeppelin's ERC20 standard implementation
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// Import OpenZeppelin's Ownable contract to restrict certain functions to the owner
import "@openzeppelin/contracts/access/Ownable.sol";

// MyToken is an ERC20 token with additional features: ownership, capped supply, minting, and burning
contract MyToken is ERC20, Ownable {
    // Define a constant max supply of 1 million tokens (with 18 decimal places)
    uint256 public constant MAX_SUPPLY = 1_000_000 * 10 ** 18;

    // --- Custom Errors for gas-efficient reverts ---

    // Thrown when the constructor tries to mint more than MAX_SUPPLY initially
    error InitialSupplyExceedsMax(uint256 requested, uint256 max);

    // Thrown when trying to mint tokens that would push total supply above MAX_SUPPLY
    error MintExceedsMaxSupply(uint256 currentTotal, uint256 mintAmount, uint256 max);
    
    // error OwnableUnauthorizedAccount(address account);

    // Constructor sets token name, symbol, initial supply, and contract owner
    constructor(
        string memory name, // Name of the token (e.g., "MyToken")
        string memory symbol, // Symbol (e.g., "MTK")
        uint256 initialSupply, // How much to mint initially
        address owner //Who should own the contract
    ) ERC20(name, symbol) Ownable(owner) {
        // Ensure the initial supply does not exceed the max limit
        if (initialSupply > MAX_SUPPLY) {
            revert InitialSupplyExceedsMax(initialSupply, MAX_SUPPLY);
        }
        // Mint the initial supply to the owner
        _mint(owner, initialSupply);
    }

    // Owner-only function to mint new tokens, within the max supply limit
    function mint(address to, uint256 amount) external onlyOwner {
        // Check if minting this amount would exceed max supply
        if (totalSupply() + amount > MAX_SUPPLY) {
            revert MintExceedsMaxSupply(totalSupply(), amount, MAX_SUPPLY);
        }
        // Mint the tokens to the specified address
        _mint(to, amount);
    }

    // Allow any holder to burn (destroy) some of their own tokens
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

   
}







