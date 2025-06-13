"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDownLeft, Clock, CheckCircle, RefreshCw } from "lucide-react"
import { format } from "date-fns"
import { useAccount } from "wagmi"
import { useVestingSchedule } from "@/hooks/use-contracts"

export function RecentActivity() {
  const { address, isConnected } = useAccount()
  const { schedule } = useVestingSchedule(address)

  // TODO: In a real implementation, you'd want to listen to contract events
  // or fetch transaction history from a blockchain indexer
  const activities = []

  // Show placeholder activity if user has a vesting schedule
  if (schedule && schedule.totalAmount > 0n) {
    const startDate = new Date(Number(schedule.startTime) * 1000)
    activities.push({
      id: 1,
      type: "vesting_created",
      amount: Number(schedule.totalAmount) / 1e18,
      timestamp: startDate,
      txHash: "0x1234...5678", // This would be the actual transaction hash
      status: "completed",
    })

    if (schedule.claimedAmount > 0n) {
      activities.push({
        id: 2,
        type: "claim",
        amount: Number(schedule.claimedAmount) / 1e18,
        timestamp: new Date(), // This would be the actual claim timestamp
        txHash: "0x5678...9012",
        status: "completed",
      })
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "claim":
        return <ArrowDownLeft className="h-4 w-4 text-emerald-600" />
      case "vesting_created":
        return <Clock className="h-4 w-4 text-green-600" />
      default:
        return <CheckCircle className="h-4 w-4 text-slate-600" />
    }
  }

  const getActivityLabel = (type: string) => {
    switch (type) {
      case "claim":
        return "Tokens Claimed"
      case "vesting_created":
        return "Vesting Created"
      default:
        return "Activity"
    }
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-slate-600 dark:text-slate-400">Connect your wallet to view activity</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Recent Activity
            <Badge variant="secondary">0 transactions</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-slate-400 mb-2">
              <RefreshCw className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">No Activity Yet</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Your transaction history will appear here once you start using the platform.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recent Activity
          <Badge variant="secondary">{activities.length} transactions</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-white dark:bg-slate-700">{getActivityIcon(activity.type)}</div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{getActivityLabel(activity.type)}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {format(activity.timestamp, "MMM dd, yyyy 'at' HH:mm")}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  {activity.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })} Tokens
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{activity.txHash}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
