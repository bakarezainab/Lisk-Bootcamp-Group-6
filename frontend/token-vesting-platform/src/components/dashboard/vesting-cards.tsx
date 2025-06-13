"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Coins, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { useAccount } from "wagmi"
import { useVestingSchedule, useClaimableAmount, useClaimTokens } from "@/hooks/use-contracts"
import { formatUnits } from "viem"

export function VestingCards() {
  const { address, isConnected } = useAccount()

  const {
    schedule,
    isLoading: scheduleLoading,
    isError: scheduleError,
    refetch: refetchSchedule,
  } = useVestingSchedule(address)
  const { claimableAmount, isLoading: claimableLoading, refetch: refetchClaimable } = useClaimableAmount(address)
  const { claimTokens, isPending: claimLoading, isSuccess } = useClaimTokens()

  // Refetch data when claim is successful
  if (isSuccess) {
    refetchSchedule()
    refetchClaimable()
  }

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Your Vesting Schedules</h2>
        <Card className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Please connect your wallet to view vesting schedules</p>
        </Card>
      </div>
    )
  }

  if (scheduleLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Your Vesting Schedules</h2>
        <Card className="">
          <CardHeader>
            <div className="h-6 bg-slate-200 rounded w-48"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-20 bg-slate-200 rounded"></div>
            <div className="h-10 bg-slate-200 rounded"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (scheduleError || !schedule || schedule.totalAmount === BigInt(0)) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Your Vesting Schedules</h2>
        <Card className="p-8 text-center">
          <Clock className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">No Vesting Schedule Found</h3>
          <p className="text-slate-600 dark:text-slate-400">
            You don&apos;t have any active vesting schedules. Contact your administrator to create one.
          </p>
        </Card>
      </div>
    )
  }

  // Calculate values from contract data
  const totalAmount = Number(formatUnits(schedule.totalAmount, 18))
  const claimedAmount = Number(formatUnits(schedule.claimedAmount, 18))
  const claimableNow = claimableAmount ? Number(formatUnits(claimableAmount, 18)) : 0

  const progressPercentage = totalAmount > 0 ? (claimedAmount / totalAmount) * 100 : 0

  // Calculate dates (start time from contract + 14 days duration)
  const startDate = new Date(Number(schedule.startTime) * 1000)
  const endDate = new Date(startDate.getTime() + 14 * 24 * 60 * 60 * 1000) // 14 days later
  const currentDate = new Date()

  // Determine if vesting is active
  const isActive = currentDate >= startDate && currentDate <= endDate
  const isCompleted = currentDate > endDate
  const isPending = currentDate < startDate

  const getStatus = () => {
    if (isPending)
      return { label: "Pending", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" }
    if (isCompleted)
      return { label: "Completed", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" }
    if (isActive)
      return { label: "Active", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" }
    return { label: "Unknown", color: "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200" }
  }

  const status = getStatus()

  const handleClaimTokens = () => {
    if (claimTokens && claimableNow > 0) {
      claimTokens()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Your Vesting Schedule</h2>
        <Badge className={status.color}>{status.label}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow lg:col-span-2 xl:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Vesting Details</CardTitle>
              <Badge className={status.color}>{status.label}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Progress</span>
                <span className="font-medium">
                  {claimedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} /{" "}
                  {totalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <div className="text-xs text-slate-500 dark:text-slate-400 text-right">
                {progressPercentage.toFixed(1)}% claimed
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-slate-500" />
                <div>
                  <p className="text-slate-600 dark:text-slate-400">Start</p>
                  <p className="font-medium">{format(startDate, "MMM dd, yyyy")}</p>
                  <p className="text-xs text-slate-500">{format(startDate, "HH:mm")}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-slate-500" />
                <div>
                  <p className="text-slate-600 dark:text-slate-400">End</p>
                  <p className="font-medium">{format(endDate, "MMM dd, yyyy")}</p>
                  <p className="text-xs text-slate-500">{format(endDate, "HH:mm")}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-600 dark:text-slate-400">Total Amount</p>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    {totalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} Tokens
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-400">Daily Release</p>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    {(totalAmount / 14).toLocaleString(undefined, { maximumFractionDigits: 2 })} Tokens
                  </p>
                </div>
              </div>
            </div>

            {claimableNow > 0 && (
              <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Coins className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                      {claimableLoading
                        ? "Calculating..."
                        : `${claimableNow.toLocaleString(undefined, { maximumFractionDigits: 2 })} Tokens Available`}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Button
              className="w-full"
              disabled={claimableNow === 0 || claimLoading || claimableLoading}
              onClick={handleClaimTokens}
            >
              {claimLoading
                ? "Claiming..."
                : claimableLoading
                  ? "Calculating..."
                  : claimableNow > 0
                    ? `Claim ${claimableNow.toLocaleString(undefined, { maximumFractionDigits: 2 })} Tokens`
                    : "No Tokens Available"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}