// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "lib/openzeppelin-contracts/contracts/utils/Pausable.sol";

contract Vesting is Ownable, Pausable {
    IERC20 public token;
    uint256 public constant VESTING_DURATION = 14 days;
    
    constructor() Ownable(msg.sender) {
        // Constructor initialization code here
    }

    struct VestingSchedule {
        uint256 totalAmount;
        uint256 claimedAmount;
        uint256 startTime;
    }

    mapping(address => VestingSchedule) public vestingSchedules;

    // --- Custom Errors ---
    error NoVestingSchedule();
    error ZeroAddress();
    error AlreadyVesting();
    error NothingToClaim();
    error TokenNotSet();
    error NotEnoughTokens();
    error OnlyUnclaimedTokensCanBeWithdrawn();

    // --- Events ---
    event VestingCreated(address indexed beneficiary, uint256 totalAmount, uint256 startTime);
    event TokensClaimed(address indexed beneficiary, uint256 amount);
    event TokenAddressSet(address token);
    event UnusedTokensWithdrawn(uint256 amount);
    event Paused();
    event Unpaused();

    // --- Core Functions ---

    function createVestingSchedule(address beneficiary, uint256 totalAmount, uint256 startTime) external onlyOwner {
        if (beneficiary == address(0)) revert ZeroAddress();
        if (token == IERC20(address(0))) revert TokenNotSet();
        if (vestingSchedules[beneficiary].totalAmount > 0) revert AlreadyVesting();

        vestingSchedules[beneficiary] = VestingSchedule({
            totalAmount: totalAmount,
            claimedAmount: 0,
            startTime: startTime
        });
        _beneficiaries.push(beneficiary);

        emit VestingCreated(beneficiary, totalAmount, startTime);
    }

    function claimTokens() external whenNotPaused {
        VestingSchedule storage schedule = vestingSchedules[msg.sender];
        if (schedule.totalAmount == 0) revert NoVestingSchedule();

        uint256 claimable = getClaimableAmount(msg.sender);
        if (claimable == 0) revert NothingToClaim();

        schedule.claimedAmount += claimable;
        token.transfer(msg.sender, claimable);

        emit TokensClaimed(msg.sender, claimable);
    }

    // --- Admin Functions ---

    function setTokenAddress(address _token) external onlyOwner {
        if (_token == address(0)) revert ZeroAddress();
        token = IERC20(_token);
        emit TokenAddressSet(_token);
    }

    function withdrawUnusedTokens() external onlyOwner {
        uint256 totalAllocated;
        uint256 claimed;

        for (uint256 i = 0; i < _beneficiaries.length; i++) {
            VestingSchedule storage schedule = vestingSchedules[_beneficiaries[i]];
            totalAllocated += schedule.totalAmount;
            claimed += schedule.claimedAmount;
        }

        uint256 balance = token.balanceOf(address(this));
        uint256 locked = totalAllocated - claimed;

        if (balance <= locked) revert OnlyUnclaimedTokensCanBeWithdrawn();

        uint256 amountToWithdraw = balance - locked;
        token.transfer(owner(), amountToWithdraw);

        emit UnusedTokensWithdrawn(amountToWithdraw);
    }

    function pauseVesting() external onlyOwner {
        _pause();
        emit Paused();
    }

    function unpauseVesting() external onlyOwner {
        _unpause();
        emit Unpaused();
    }

    // --- View Functions ---

    function vestingDuration() external pure returns (uint256) {
        return VESTING_DURATION;
    }

    function getBlockTimestamp() public view returns (uint256) {
        return block.timestamp;
    }

    function getVestingSchedule(address beneficiary) external view returns (VestingSchedule memory) {
        return vestingSchedules[beneficiary];
    }

    function getClaimableAmount(address beneficiary) public view returns (uint256) {
        return calculateVestedAmount(vestingSchedules[beneficiary]) - vestingSchedules[beneficiary].claimedAmount;
    }

    function getVestedAmount(address beneficiary) public view returns (uint256) {
        return calculateVestedAmount(vestingSchedules[beneficiary]);
    }

    function calculateVestedAmount(VestingSchedule memory schedule) public view returns (uint256) {
        if (block.timestamp < schedule.startTime) {
            return 0;
        } else if (block.timestamp >= schedule.startTime + VESTING_DURATION) {
            return schedule.totalAmount;
        } else {
            uint256 elapsed = block.timestamp - schedule.startTime;
            return (schedule.totalAmount * elapsed) / VESTING_DURATION;
        }
    }

    // --- Optional: beneficiaries list for withdrawal accounting ---
    address[] private _beneficiaries;

    function getAllBeneficiaries() external view returns (address[] memory) {
        return _beneficiaries;
    }
}
