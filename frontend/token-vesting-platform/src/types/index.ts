export interface User {
    address: string
    isAdmin: boolean
    vestingSchedules: VestingSchedule[]
  }
  
  export interface VestingSchedule {
    id: number
    beneficiary: string
    totalAmount: number
    claimedAmount: number
    startDate: Date
    endDate: Date
    status: "pending" | "active" | "completed" | "paused"
    claimableAmount: number
  }
  
  export interface Transaction {
    id: string
    type: "claim" | "vesting_created" | "vesting_paused" | "vesting_resumed"
    amount: number
    timestamp: Date
    txHash: string
    status: "pending" | "completed" | "failed"
    from?: string
    to?: string
  }
  
  export interface DashboardStats {
    totalVested: string
    totalClaimed: string
    activeSchedules: number
    nextClaim: string
  }
  
  export interface AdminStats {
    totalBeneficiaries: number
    activeVestingSchedules: number
    totalTokensLocked: string
    totalTokensClaimed: string
  }
  