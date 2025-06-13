"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Clock, Coins, TrendingUp, AlertCircle } from "lucide-react"
import { useAllBeneficiaries, useTokenInfo, useVestingTokenAddress } from "@/hooks/use-contracts"
import { formatUnits } from "viem"
import { useMemo } from "react"
import { Badge } from "@/components/ui/badge"

export function AdminStats() {
  const { beneficiaries, isLoading: beneficiariesLoading } = useAllBeneficiaries()
  const { totalSupply, symbol } = useTokenInfo()
  const { isTokenSet } = useVestingTokenAddress()

  // Calculate aggregate stats
  const stats = useMemo(() => {
    if (beneficiariesLoading || !beneficiaries) {
      return {
        totalBeneficiaries: 0,
        activeVestingSchedules: 0,
        totalTokensLocked: "0",
        totalTokensClaimed: "0",
      }
    }

    return {
      totalBeneficiaries: beneficiaries.length,
      activeVestingSchedules: beneficiaries.length,
      totalTokensLocked: totalSupply ? formatUnits(totalSupply, 18) : "0",
      totalTokensClaimed: "0", // Would need to aggregate from all schedules
    }
  }, [beneficiaries, beneficiariesLoading, totalSupply])

  if (beneficiariesLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-slate-800/50 border-slate-700 ">
              <CardHeader className="pb-2">
                <div className="h-3 sm:h-4 bg-slate-700 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-6 sm:h-8 bg-slate-700 rounded w-1/2 mb-2"></div>
                <div className="h-2 sm:h-3 bg-slate-700 rounded w-1/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Token Setup Warning */}
      {!isTokenSet && (
        <Card className="bg-green-500/10 border-green-500/20">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-start space-x-2 sm:space-x-3">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-green-300 font-medium text-sm sm:text-base">Token Address Not Set</p>
                <p className="text-green-400 text-xs sm:text-sm mt-1">
                  The vesting contract needs a token address to be set before creating vesting schedules.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-white">Total Beneficiaries</CardTitle>
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-white">{stats.totalBeneficiaries}</div>
            <p className="text-xs text-white">
              {stats.totalBeneficiaries === 0 ? "No beneficiaries yet" : "Active users"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-white">Active Schedules</CardTitle>
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-white">{stats.activeVestingSchedules}</div>
            <p className="text-xs text-white">Currently vesting</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-white">Total Supply</CardTitle>
            <Coins className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-white">
              {Number(stats.totalTokensLocked).toLocaleString()}
            </div>
            <p className="text-xs text-white">{symbol || "Tokens"}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-white">Platform Status</CardTitle>
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-xl sm:text-2xl font-bold text-white">{isTokenSet ? "Ready" : "Setup"}</div>
              <Badge
                className={
                  isTokenSet
                    ? "bg-green-500/20 text-white-300 border-white text-xs"
                    : "bg-green-500/20 text-green-300 border-green-500/30 text-xs"
                }
              >
                {isTokenSet ? "✓" : "!"}
              </Badge>
            </div>
            <p className="text-xs text-white">{isTokenSet ? "Ready for vesting" : "Needs configuration"}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
