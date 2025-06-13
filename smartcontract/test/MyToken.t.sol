// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/MyToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error OwnableUnauthorizedAccount(address);



contract MyTokenTest is Test {
    MyToken public token;
    address public owner = address(0xb216270aFB9DfcD611AFAf785cEB38250863F2C9);
    address public user = address(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);

    function setUp() public {
        vm.prank(owner);
        token = new MyToken("MyToken", "MTK", 500_000 ether, owner);
    }

    function testInitialSupply() public view {
        assertEq(token.totalSupply(), 500_000 ether);
        assertEq(token.balanceOf(owner), 500_000 ether);
    }

    function testMintAsOwner() public {
        vm.prank(owner);
        token.mint(user, 100_000 ether);
        assertEq(token.balanceOf(user), 100_000 ether);
    }

    function testMintFailsIfExceedsCap() public {
        vm.prank(owner);
        vm.expectRevert(
            abi.encodeWithSelector(
                MyToken.MintExceedsMaxSupply.selector,
                500_000 ether,
                600_000 ether,
                1_000_000 ether
            )
        );
        token.mint(user, 600_000 ether);
    }

   function testNonOwnerCannotMint() public {
    vm.prank(user);
    vm.expectRevert(
        abi.encodeWithSelector(
            OwnableUnauthorizedAccount.selector,
            user
        )
    );
    token.mint(user, 1 ether);
}


    function testBurnTokens() public {
        vm.startPrank(owner);
        token.burn(100_000 ether);
        vm.stopPrank();
        assertEq(token.totalSupply(), 400_000 ether);
    }

   

    function testInitialSupplyTooHighShouldRevert() public {
        vm.expectRevert(
            abi.encodeWithSelector(
                MyToken.InitialSupplyExceedsMax.selector,
                2_000_000 ether,
                1_000_000 ether
            )
        );
        vm.prank(owner);
        new MyToken("Fail", "F", 2_000_000 ether, owner);
    }
}
