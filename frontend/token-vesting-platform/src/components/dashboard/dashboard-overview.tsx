"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Coins, TrendingUp, Users } from "lucide-react"
import { useAccount } from "wagmi"
import { useTokenBalance, useVestingSchedule, useClaimableAmount } from "@/hooks/use-contracts"
import { formatUnits } from "viem"

export function DashboardOverview() {
  const { address, isConnected } = useAccount()

  const { balance, isLoading: balanceLoading } = useTokenBalance(address)
  const { schedule, isLoading: scheduleLoading } = useVestingSchedule(address)
  const { claimableAmount, isLoading: claimableLoading } = useClaimableAmount(address)

  // Show loading state
  if (!isConnected) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-slate-200 rounded w-24"></div>
              <div className="h-4 w-4 bg-slate-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-slate-200 rounded w-16 mb-1"></div>
              <div className="h-3 bg-slate-200 rounded w-12"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Calculate stats from real contract data
  const totalVested = schedule?.totalAmount ? formatUnits(schedule.totalAmount, 18) : "0"
  const totalClaimed = schedule?.claimedAmount ? formatUnits(schedule.claimedAmount, 18) : "0"
  const claimableNow = claimableAmount ? formatUnits(claimableAmount, 18) : "0"
  const tokenBalance = balance ? formatUnits(balance, 18) : "0"

  // Check if user has any vesting schedule
  const hasVestingSchedule = schedule && schedule.totalAmount > BigInt(0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-white border-green-200 dark:border-green-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-800 dark:text-green-200">Total Vested</CardTitle>
          <Coins className="h-4 w-4 text-green-600 dark:text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900 dark:text-green-100">
            {scheduleLoading ? (
              <div className="h-8 bg-green-200 rounded w-20 "></div>
            ) : (
              Number.parseFloat(totalVested).toLocaleString(undefined, { maximumFractionDigits: 2 })
            )}
          </div>
          <p className="text-xs text-green-600 dark:text-green-400">
            {hasVestingSchedule ? "Tokens in vesting" : "No vesting schedule"}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-50 to-green-50 dark:from-green-950 dark:to-green-950 border-green-200 dark:border-green-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-800 dark:text-green-200">Total Claimed</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900 dark:text-green-100">
            {scheduleLoading ? (
              <div className="h-8 bg-green-200 rounded w-20 "></div>
            ) : (
              Number.parseFloat(totalClaimed).toLocaleString(undefined, { maximumFractionDigits: 2 })
            )}
          </div>
          <p className="text-xs text-green-600 dark:text-green-400">Tokens claimed</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-50 to-green-50 dark:from-green-950 dark:to-green-950 border-green-200 dark:border-green-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-800 dark:text-green-200">Claimable Now</CardTitle>
          <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900 dark:text-green-100">
            {claimableLoading ? (
              <div className="h-8 bg-green-200 rounded w-20 "></div>
            ) : (
              Number.parseFloat(claimableNow).toLocaleString(undefined, { maximumFractionDigits: 2 })
            )}
          </div>
          <p className="text-xs text-green-600 dark:text-green-400">Available to claim</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-50 to-green-50 dark:from-green-950 dark:to-green-950 border-green-200 dark:border-green-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-800 dark:text-green-200">Token Balance</CardTitle>
          <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900 dark:text-green-100">
            {balanceLoading ? (
              <div className="h-8 bg-green-200 rounded w-20 "></div>
            ) : (
              Number.parseFloat(tokenBalance).toLocaleString(undefined, { maximumFractionDigits: 2 })
            )}
          </div>
          <p className="text-xs text-green-600 dark:text-green-400">In wallet</p>
        </CardContent>
      </Card>
    </div>
  )
}
