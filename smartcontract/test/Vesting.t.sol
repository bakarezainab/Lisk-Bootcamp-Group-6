// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/Vesting.sol";
import "../src/MyToken.sol";

contract VestingTest is Test {
    Vesting public vesting;
    MyToken public token;
    
    address public owner = address(0xb216270aFB9DfcD611AFAf785cEB38250863F2C9);
    address public user1 = address(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
    address public user2 = address(0x70997970C51812dc3A010C7d01b50e0d17dc79C8);
    
    uint256 public constant INITIAL_SUPPLY = 1_000_000 ether;
    uint256 public constant VESTING_AMOUNT = 10_000 ether;
    
    function setUp() public {
        vm.startPrank(owner);
        
        // Deploy token
        token = new MyToken("Test Token", "TEST", INITIAL_SUPPLY, owner);
        
        // Deploy vesting contract
        vesting = new Vesting();
        
        // Set token address in vesting contract
        vesting.setTokenAddress(address(token));
        
        // Transfer tokens to the vesting contract
        token.transfer(address(vesting), 100_000 ether);
        
        vm.stopPrank();
    }
    
    function testSetTokenAddress() public view {
        assertEq(address(vesting.token()), address(token));
    }
    
    function testSetTokenAddressFailsWithZeroAddress() public {
        vm.startPrank(owner);
        vm.expectRevert(Vesting.ZeroAddress.selector);
        vesting.setTokenAddress(address(0));
        vm.stopPrank();
    }
    
    function testCreateVestingSchedule() public {
        uint256 startTime = block.timestamp;
        
        vm.prank(owner);
        vesting.createVestingSchedule(user1, VESTING_AMOUNT, startTime);
        
        Vesting.VestingSchedule memory schedule = vesting.getVestingSchedule(user1);
        assertEq(schedule.totalAmount, VESTING_AMOUNT);
        assertEq(schedule.claimedAmount, 0);
        assertEq(schedule.startTime, startTime);
    }
    
    function testCreateVestingScheduleFailsWithZeroAddress() public {
        vm.prank(owner);
        vm.expectRevert(Vesting.ZeroAddress.selector);
        vesting.createVestingSchedule(address(0), VESTING_AMOUNT, block.timestamp);
    }
    
    function testCreateVestingScheduleFailsWithExistingSchedule() public {
        vm.startPrank(owner);
        vesting.createVestingSchedule(user1, VESTING_AMOUNT, block.timestamp);
        
        vm.expectRevert(Vesting.AlreadyVesting.selector);
        vesting.createVestingSchedule(user1, VESTING_AMOUNT, block.timestamp);
        vm.stopPrank();
    }
    
    function testClaimTokens() public {
        uint256 startTime = block.timestamp;
        
        vm.prank(owner);
        vesting.createVestingSchedule(user1, VESTING_AMOUNT, startTime);
        
        // Move time forward to 50% of vesting period
        uint256 halfVestingPeriod = vesting.vestingDuration() / 2;
        vm.warp(startTime + halfVestingPeriod);
        
        // Claim tokens
        vm.prank(user1);
        vesting.claimTokens();
        
        // Check that 50% of tokens were claimed
        uint256 expectedClaimed = VESTING_AMOUNT / 2;
        Vesting.VestingSchedule memory schedule = vesting.getVestingSchedule(user1);
        assertEq(schedule.claimedAmount, expectedClaimed);
        assertEq(token.balanceOf(user1), expectedClaimed);
    }
    
    function testClaimTokensFailsWithNoSchedule() public {
        vm.prank(user2);
        vm.expectRevert(Vesting.NoVestingSchedule.selector);
        vesting.claimTokens();
    }
    
    function testClaimTokensFailsWithNothingToClaim() public {
        uint256 startTime = block.timestamp;
        
        vm.prank(owner);
        vesting.createVestingSchedule(user1, VESTING_AMOUNT, startTime);
        
        // Try to claim before the start time
        vm.warp(startTime - 1);
        vm.prank(user1);
        vm.expectRevert(Vesting.NothingToClaim.selector);
        vesting.claimTokens();
    }
    
    function testClaimTokensWithMultipleClaims() public {
        uint256 startTime = block.timestamp;
        
        vm.prank(owner);
        vesting.createVestingSchedule(user1, VESTING_AMOUNT, startTime);
        
        // Move time forward to 25% of vesting period
        uint256 quarterVestingPeriod = vesting.vestingDuration() / 4;
        vm.warp(startTime + quarterVestingPeriod);
        
        // First claim (25%)
        vm.prank(user1);
        vesting.claimTokens();
        
        uint256 expectedFirstClaim = VESTING_AMOUNT / 4;
        // Allow small rounding differences
        uint256 tolerance = VESTING_AMOUNT / 400; // 0.25% tolerance
        assertGe(token.balanceOf(user1), expectedFirstClaim - tolerance);
        assertLe(token.balanceOf(user1), expectedFirstClaim + tolerance);
        
        // Move time forward to 75% of vesting period
        vm.warp(startTime + 3 * quarterVestingPeriod);
        
        // Second claim (additional 50%)
        vm.prank(user1);
        vesting.claimTokens();
        
        uint256 expectedTotalClaimed = VESTING_AMOUNT * 3 / 4;
        // Allow small rounding differences
        // Reusing the tolerance variable defined earlier
        assertGe(token.balanceOf(user1), expectedTotalClaimed - tolerance);
        assertLe(token.balanceOf(user1), expectedTotalClaimed + tolerance);
    }
    
    function testClaimAllTokensAfterVestingPeriod() public {
        uint256 startTime = block.timestamp;
        
        vm.prank(owner);
        vesting.createVestingSchedule(user1, VESTING_AMOUNT, startTime);
        
        // Move time forward to after vesting period
        uint256 fullVestingPeriod = vesting.vestingDuration();
        vm.warp(startTime + fullVestingPeriod + 1 days);
        
        // Claim tokens
        vm.prank(user1);
        vesting.claimTokens();
        
        // Check that all tokens were claimed
        Vesting.VestingSchedule memory schedule = vesting.getVestingSchedule(user1);
        assertEq(schedule.claimedAmount, VESTING_AMOUNT);
        assertEq(token.balanceOf(user1), VESTING_AMOUNT);
    }
    
    function testPauseAndUnpause() public {
        uint256 startTime = block.timestamp;
        
        vm.startPrank(owner);
        vesting.createVestingSchedule(user1, VESTING_AMOUNT, startTime);
        
        // Move time forward
        vm.warp(startTime + vesting.vestingDuration() / 2);
        
        // Pause the contract
        vesting.pauseVesting();
        vm.stopPrank();
        
        // Try to claim while paused
        vm.prank(user1);
        vm.expectRevert(); // The whenNotPaused modifier will revert
        vesting.claimTokens();
        
        // Unpause and verify claiming works
        vm.prank(owner);
        vesting.unpauseVesting();
        
        vm.prank(user1);
        vesting.claimTokens(); // Should not revert
        
        // Verify tokens were claimed
        assertGt(token.balanceOf(user1), 0);
    }
    
    function testWithdrawUnusedTokens() public {
        uint256 startTime = block.timestamp;
        uint256 contractBalance = token.balanceOf(address(vesting));
        
        vm.startPrank(owner);
        // Create vesting schedule using only part of the tokens
        vesting.createVestingSchedule(user1, VESTING_AMOUNT, startTime);
        
        // Withdraw unused tokens
        vesting.withdrawUnusedTokens();
        vm.stopPrank();
        
        // Check that the owner received the unused tokens

        uint256 expectedOwnerBalance = INITIAL_SUPPLY - VESTING_AMOUNT; // 1,000,000 - 10,000 = 990,000
assertEq(token.balanceOf(owner), expectedOwnerBalance);

    }
    
    function testGetClaimableAmount() public {
        uint256 startTime = block.timestamp;
        
        vm.prank(owner);
        vesting.createVestingSchedule(user1, VESTING_AMOUNT, startTime);
        
        // At start, nothing is claimable
        assertEq(vesting.getClaimableAmount(user1), 0);
        
        // Move time forward to 50% of vesting period
        uint256 halfVestingPeriod = vesting.vestingDuration() / 2;
        vm.warp(startTime + halfVestingPeriod);
        
        // Check claimable amount
        uint256 expectedClaimable = VESTING_AMOUNT / 2;
        // Allow small rounding differences
        uint256 tolerance = VESTING_AMOUNT / 400; // 0.25% tolerance
        assertGe(vesting.getClaimableAmount(user1), expectedClaimable - tolerance);
        assertLe(vesting.getClaimableAmount(user1), expectedClaimable + tolerance);
        
        // After claiming, claimable should be 0 again
        vm.prank(user1);
        vesting.claimTokens();
        assertEq(vesting.getClaimableAmount(user1), 0);
        
        // Move time forward more
        vm.warp(startTime + halfVestingPeriod + 1 days);
        
        // Should have more to claim now
        assertGt(vesting.getClaimableAmount(user1), 0);
    }
    
    function testOnlyOwnerFunctions() public {
        vm.prank(user1);
        vm.expectRevert(); // Ownable: caller is not the owner
        vesting.setTokenAddress(address(token));
        
        vm.prank(user1);
        vm.expectRevert(); // Ownable: caller is not the owner
        vesting.createVestingSchedule(user2, VESTING_AMOUNT, block.timestamp);
        
        vm.prank(user1);
        vm.expectRevert(); // Ownable: caller is not the owner
        vesting.withdrawUnusedTokens();
        
        vm.prank(user1);
        vm.expectRevert(); // Ownable: caller is not the owner
        vesting.pauseVesting();
        
        vm.prank(user1);
        vm.expectRevert(); // Ownable: caller is not the owner
        vesting.unpauseVesting();
    }
}
