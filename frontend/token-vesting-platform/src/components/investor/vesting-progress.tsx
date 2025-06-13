"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, TrendingUp, Coins } from "lucide-react"
import { format } from "date-fns"
import { useAccount } from "wagmi"
import { useVestingSchedule, useVestedAmount, useClaimableAmount } from "@/hooks/use-contracts"
import { formatUnits } from "viem"
import { useEffect, useState } from "react"

export function VestingProgress() {
  const { address, isConnected } = useAccount()
  const { schedule, isLoading } = useVestingSchedule(address)
  const { vestedAmount } = useVestedAmount(address)
  const { claimableAmount } = useClaimableAmount(address)
  const [currentTime, setCurrentTime] = useState(Date.now())

  // Update current time every second for real-time progress
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!isConnected) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Vesting Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-slate-400">Please connect your wallet to view vesting progress</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Vesting Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-4 bg-slate-700 rounded "></div>
          <div className="h-4 bg-slate-700 rounded w-2/3 "></div>
          <div className="h-4 bg-slate-700 rounded w-1/2 "></div>
        </CardContent>
      </Card>
    )
  }

  const hasVestingSchedule = schedule && schedule.totalAmount > 0n

  if (!hasVestingSchedule) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Vesting Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No Vesting Schedule</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              You don&apos;t have any active vesting schedules. Contact your administrator to create a vesting schedule for
              your address.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Calculate progress
  const totalAmount = Number(formatUnits(schedule.totalAmount, 18))
  const claimedAmount = Number(formatUnits(schedule.claimedAmount, 18))
  const currentVestedAmount = vestedAmount ? Number(formatUnits(vestedAmount, 18)) : 0
  const currentClaimableAmount = claimableAmount ? Number(formatUnits(claimableAmount, 18)) : 0

  const claimedProgressPercentage = totalAmount > 0 ? (claimedAmount / totalAmount) * 100 : 0
  const vestedProgressPercentage = totalAmount > 0 ? (currentVestedAmount / totalAmount) * 100 : 0

  // Calculate dates and time progress
  const startDate = new Date(Number(schedule.startTime) * 1000)
  const endDate = new Date(startDate.getTime() + 14 * 24 * 60 * 60 * 1000)
  const now = new Date(currentTime)

  const timeElapsed = Math.max(0, now.getTime() - startDate.getTime())
  const totalDuration = endDate.getTime() - startDate.getTime()
  const timeProgressPercentage = Math.min(100, (timeElapsed / totalDuration) * 100)

  const daysElapsed = Math.floor(timeElapsed / (1000 * 60 * 60 * 24))
  const hoursElapsed = Math.floor((timeElapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutesElapsed = Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60))

  const daysRemaining = Math.max(0, 14 - daysElapsed)
  const hoursRemaining = daysRemaining > 0 ? 24 - hoursElapsed : 0
  const minutesRemaining = hoursRemaining > 0 ? 60 - minutesElapsed : 0

  // Determine status
  const isPending = now < startDate
  const isActive = now >= startDate && now <= endDate
  const isCompleted = now > endDate

  const getStatus = () => {
    if (isPending) return { label: "Pending", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" }
    if (isActive) return { label: "Active", color: "bg-green-500/20 text-green-300 border-green-500/30" }
    if (isCompleted) return { label: "Completed", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" }
    return { label: "Unknown", color: "bg-slate-500/20 text-slate-300 border-slate-500/30" }
  }

  const status = getStatus()

  return (
    <Card className="bg-black border-2xl border-emerald-600">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Vesting Progress
          </CardTitle>
          <Badge className={status.color}>{status.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Time Progress */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-300">Time Progress</span>
            <span className="text-white font-medium">{Math.round(timeProgressPercentage)}%</span>
          </div>
          <Progress value={timeProgressPercentage} className="h-3" />
          <div className="flex justify-between text-xs text-slate-400">
            <span>{isPending ? "Not started" : `${daysElapsed}d ${hoursElapsed}h ${minutesElapsed}m elapsed`}</span>
            <span>
              {isCompleted
                ? "Completed"
                : isPending
                  ? "14 days total"
                  : `${daysRemaining}d ${hoursRemaining}h ${minutesRemaining}m remaining`}
            </span>
          </div>
        </div>

        {/* Vested Amount Progress */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-300">Tokens Vested</span>
            <span className="text-white font-medium">{Math.round(vestedProgressPercentage)}%</span>
          </div>
          <Progress value={vestedProgressPercentage} className="h-3" />
          <div className="flex justify-between text-xs text-slate-400">
            <span>{currentVestedAmount.toLocaleString()} vested</span>
            <span>{totalAmount.toLocaleString()} total</span>
          </div>
        </div>

        {/* Claimed Progress */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-300">Tokens Claimed</span>
            <span className="text-white font-medium">{Math.round(claimedProgressPercentage)}%</span>
          </div>
          <Progress value={claimedProgressPercentage} className="h-3" />
          <div className="flex justify-between text-xs text-slate-400">
            <span>{claimedAmount.toLocaleString()} claimed</span>
            <span>{currentClaimableAmount.toLocaleString()} available</span>
          </div>
        </div>

        {/* Schedule Details */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-xs text-slate-400">Start Date</p>
              <p className="text-sm font-medium text-white">{format(startDate, "MMM dd, yyyy")}</p>
              <p className="text-xs text-slate-500">{format(startDate, "HH:mm")}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-xs text-slate-400">End Date</p>
              <p className="text-sm font-medium text-white">{format(endDate, "MMM dd, yyyy")}</p>
              <p className="text-xs text-slate-500">{format(endDate, "HH:mm")}</p>
            </div>
          </div>
        </div>

        {/* Real-time Stats */}
        <div className="bg-black border border-2xl border-emerald-600 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-white mb-3 flex items-center">
            <Coins className="h-4 w-4 mr-2" />
            Real-time Statistics
          </h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-slate-400">Vested Amount</p>
              <p className="text-white font-medium">{currentVestedAmount.toLocaleString()} tokens</p>
            </div>
            <div>
              <p className="text-slate-400">Claimable Now</p>
              <p className="text-green-400 font-medium">{currentClaimableAmount.toLocaleString()} tokens</p>
            </div>
            <div>
              <p className="text-slate-400">Already Claimed</p>
              <p className="text-blue-400 font-medium">{claimedAmount.toLocaleString()} tokens</p>
            </div>
            <div>
              <p className="text-slate-400">Remaining</p>
              <p className="text-green-400 font-medium">{(totalAmount - claimedAmount).toLocaleString()} tokens</p>
            </div>
          </div>
        </div>

        {/* Daily Release Info */}
        <div className="bg-black border border-green-800 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-white mb-2">Vesting Schedule</h4>
          <div className="space-y-1 text-xs text-slate-300">
            <p>• Linear vesting over 14 days</p>
            <p>• Hourly release: ~{Math.floor(totalAmount / (14 * 24)).toLocaleString()} tokens</p>
            <p>• Daily release: ~{Math.floor(totalAmount / 14).toLocaleString()} tokens</p>
            <p>• Claim anytime after tokens unlock</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}