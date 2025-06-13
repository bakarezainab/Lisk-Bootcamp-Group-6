import { VestingCards } from "@/components/dashboard/vesting-cards"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock } from "lucide-react"

export default function VestingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">My Vesting</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">View and manage your token vesting schedules</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-emerald-600" />
            <span>Vesting Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Total Progress</span>
                <span className="font-medium">450,000 / 1,250,000 TVP</span>
              </div>
              <Progress value={36} className="h-2" />
              <p className="text-xs text-slate-600 dark:text-slate-400">36% of your tokens have been unlocked</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Vested</p>
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">1,250,000 TVP</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Claimed</p>
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">450,000 TVP</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-950 p-4 rounded-lg">
                <p className="text-sm text-emerald-800 dark:text-emerald-200">Available to Claim</p>
                <p className="text-xl font-bold text-emerald-900 dark:text-emerald-100">15,000 TVP</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <VestingCards />
    </div>
  )
}
