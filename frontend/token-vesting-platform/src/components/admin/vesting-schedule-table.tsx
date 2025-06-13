"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, RefreshCw, ExternalLink } from "lucide-react"
import { format } from "date-fns"
import { useAllBeneficiaries, useVestingSchedule } from "@/hooks/use-contracts"
import { formatUnits } from "viem"
import { formatAddress } from "@/lib/utils"

// Component to display individual vesting schedule row
function VestingScheduleRow({ address, index }: { address: `0x${string}`; index: number }) {
  const { schedule, isLoading, isError } = useVestingSchedule(address)

  if (isLoading) {
    return (
      <TableRow>
        <TableCell className="text-xs sm:text-sm">#{index + 1}</TableCell>
        <TableCell className="font-mono text-xs sm:text-sm">{formatAddress(address)}</TableCell>
        <TableCell colSpan={6}>
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
            <span className="text-xs sm:text-sm text-slate-400">Loading...</span>
          </div>
        </TableCell>
      </TableRow>
    )
  }

  if (isError || !schedule || schedule.totalAmount === 0n) {
    return (
      <TableRow>
        <TableCell className="text-xs sm:text-sm">#{index + 1}</TableCell>
        <TableCell className="font-mono text-xs sm:text-sm">{formatAddress(address)}</TableCell>
        <TableCell colSpan={6}>
          <span className="text-xs sm:text-sm text-slate-500">No vesting schedule found</span>
        </TableCell>
      </TableRow>
    )
  }

  // Calculate values
  const totalAmount = Number(formatUnits(schedule.totalAmount, 18))
  const claimedAmount = Number(formatUnits(schedule.claimedAmount, 18))
  const progressPercentage = totalAmount > 0 ? (claimedAmount / totalAmount) * 100 : 0

  // Calculate dates
  const startDate = new Date(Number(schedule.startTime) * 1000)
  const endDate = new Date(startDate.getTime() + 14 * 24 * 60 * 60 * 1000) // 14 days later
  const now = new Date()

  // Determine status
  const isPending = now < startDate
  const isActive = now >= startDate && now <= endDate
  const isCompleted = now > endDate

  const getStatus = () => {
    if (isPending) return { label: "pending", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" }
    if (isActive) return { label: "active", color: "bg-green-500/20 text-green-300 border-green-500/30" }
    if (isCompleted) return { label: "completed", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" }
    return { label: "unknown", color: "bg-slate-500/20 text-slate-300 border-slate-500/30" }
  }

  const status = getStatus()

  const handleViewOnExplorer = () => {
    // Open address on block explorer
    window.open(`https://sepolia-blockscout.lisk.com/address/${address}`, "_blank")
  }

  return (
    <TableRow className="hover:bg-slate-700/30">
      <TableCell className="font-medium text-white text-xs sm:text-sm">#{index + 1}</TableCell>
      <TableCell className="font-mono text-xs sm:text-sm text-slate-300">{formatAddress(address)}</TableCell>
      <TableCell className="min-w-[120px]">
        <div>
          <p className="font-medium text-white text-xs sm:text-sm">{totalAmount.toLocaleString()} Tokens</p>
          <p className="text-xs text-slate-400">Claimed: {claimedAmount.toLocaleString()}</p>
        </div>
      </TableCell>
      <TableCell className="min-w-[80px]">
        <div className="space-y-1">
          <Progress value={progressPercentage} className="h-1.5 sm:h-2 w-16 sm:w-20" />
          <p className="text-xs text-slate-400">{Math.round(progressPercentage)}%</p>
        </div>
      </TableCell>
      <TableCell className="text-xs sm:text-sm text-slate-300 min-w-[100px]">
        {format(startDate, "MMM dd, yyyy")}
      </TableCell>
      <TableCell className="text-xs sm:text-sm text-slate-300 min-w-[100px]">
        {format(endDate, "MMM dd, yyyy")}
      </TableCell>
      <TableCell className="min-w-[80px]">
        <Badge className={`${status.color} text-xs`}>{status.label}</Badge>
      </TableCell>
      <TableCell className="min-w-[60px]">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 sm:h-8 sm:w-8 text-slate-400 hover:text-white"
            onClick={handleViewOnExplorer}
            title="View on Explorer"
          >
            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

export function VestingScheduleTable() {
  const { beneficiaries, isLoading, refetch } = useAllBeneficiaries()

  if (isLoading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between text-base sm:text-lg">
            Vesting Schedules
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
              <span className="text-xs sm:text-sm">Loading...</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 sm:h-16 bg-slate-700 rounded "></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!beneficiaries || beneficiaries.length === 0) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between text-base sm:text-lg">
            Vesting Schedules
            <Badge variant="secondary" className="text-xs">
              0 Total
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 sm:py-12">
            <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-slate-700 rounded-full flex items-center justify-center mb-4">
              <Eye className="h-8 w-8 sm:h-12 sm:w-12 text-slate-400" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-white mb-2">No Vesting Schedules</h3>
            <p className="text-slate-400 max-w-md mx-auto text-sm sm:text-base">
              No vesting schedules have been created yet. Create your first vesting schedule to get started.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
          <CardTitle className="text-white text-base sm:text-lg">Vesting Schedules</CardTitle>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Badge className="text-xs border border-emerald-600">
              {beneficiaries.length} Total
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="border-slate-600 text-slate-300 hover:text-white text-xs sm:text-sm"
            >
              <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300 text-xs sm:text-sm">ID</TableHead>
                <TableHead className="text-slate-300 text-xs sm:text-sm">Beneficiary</TableHead>
                <TableHead className="text-slate-300 text-xs sm:text-sm">Amount</TableHead>
                <TableHead className="text-slate-300 text-xs sm:text-sm">Progress</TableHead>
                <TableHead className="text-slate-300 text-xs sm:text-sm">Start Date</TableHead>
                <TableHead className="text-slate-300 text-xs sm:text-sm">End Date</TableHead>
                <TableHead className="text-slate-300 text-xs sm:text-sm">Status</TableHead>
                <TableHead className="text-slate-300 text-xs sm:text-sm">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {beneficiaries.map((address, index) => (
                <VestingScheduleRow key={address} address={address} index={index} />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
