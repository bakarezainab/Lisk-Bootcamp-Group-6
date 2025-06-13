"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, TrendingUp, Calendar } from "lucide-react"
import { useAccount } from "wagmi"
import { useVestingSchedule, useClaimableAmount, useTokenBalance } from "@/hooks/use-contracts"
import { formatUnits } from "viem"

export function InvestorStats() {
  const { address, isConnected } = useAccount()
  const { schedule, isLoading: scheduleLoading } = useVestingSchedule(address)
  const { claimableAmount, isLoading: claimableLoading } = useClaimableAmount(address)
  const { balance, isLoading: balanceLoading } = useTokenBalance(address)
  //   const { vestedAmount, isLoading: vestedLoading } = useVestedAmount(address)

  if (!isConnected) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-400 text-sm">Connect Wallet 2</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-500">--</div>
              <p className="text-xs text-slate-500">Please connect wallet</p>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Calculate stats from real contract data
  const hasVestingSchedule = schedule && schedule.totalAmount > 0n
  const totalVested = hasVestingSchedule ? Number(formatUnits(schedule.totalAmount, 18)) : 0
  //   const totalClaimed = hasVestingSchedule ? Number(formatUnits(schedule.claimedAmount, 18)) : 0
  const claimableNow = claimableAmount ? Number(formatUnits(claimableAmount, 18)) : 0
  const tokenBalance = balance ? Number(formatUnits(balance, 18)) : 0
  //   const currentVested = vestedAmount ? Number(formatUnits(vestedAmount, 18)) : 0

  // Calculate days remaining
  const daysRemaining = hasVestingSchedule
    ? Math.max(0, 14 - Math.floor((Date.now() - Number(schedule.startTime) * 1000) / (1000 * 60 * 60 * 24)))
    : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Total Vested</CardTitle>
          <Coins className="h-4 w-4 text-white" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            {scheduleLoading ? (
              <div className="h-8 bg-green-200/20 rounded "></div>
            ) : (
              totalVested.toLocaleString()
            )}
          </div>
          <p className="text-xs text-white">{hasVestingSchedule ? "Tokens in vesting" : "No vesting schedule"}</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Claimable Now</CardTitle>
          <TrendingUp className="h-4 w-4 text-white" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            {claimableLoading ? (
              <div className="h-8 bg-green-200/20 rounded "></div>
            ) : (
              claimableNow.toLocaleString()
            )}
          </div>
          <p className="text-xs text-white">Available to claim</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Wallet Balance</CardTitle>
          <Coins className="h-4 w-4 text-white" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            {balanceLoading ? (
              <div className="h-8 bg-blue-200/20 rounded "></div>
            ) : (
              tokenBalance.toLocaleString()
            )}
          </div>
          <p className="text-xs text-white">Tokens in wallet</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Days Remaining</CardTitle>
          <Calendar className="h-4 w-4 text-white" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            {scheduleLoading ? <div className="h-8 bg-green-200/20 rounded "></div> : daysRemaining}
          </div>
          <p className="text-xs text-white">Until fully vested</p>
        </CardContent>
      </Card>
    </div>
  )
}
