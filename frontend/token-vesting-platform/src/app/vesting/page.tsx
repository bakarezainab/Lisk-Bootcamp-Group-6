import { VestingCards } from "@/components/dashboard/vesting-cards"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock } from "lucide-react"

export default function VestingPage() {
  return (
    <div className="space-y-6 bg-gradient-to-br from-slate-900 via-slate-800 to-black min-h-screen p-6">
      <div>
        <h1 className="text-3xl font-bold text-emerald-400 drop-shadow-lg">My Vesting</h1>
        <p className="text-emerald-200 mt-2">View and manage your token vesting schedules</p>
      </div>
      <Card className="bg-slate-800 border-emerald-700/40 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-emerald-400">
            <Clock className="h-5 w-5 text-emerald-400" />
            <span>Vesting Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-emerald-200">
                <span>Total Progress</span>
                <span className="font-medium">450,000 / 1,250,000 TVP</span>
              </div>
              <Progress value={36} className="h-2 bg-emerald-900" />
              <p className="text-xs text-emerald-200">36% of your tokens have been unlocked</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 p-4 rounded-lg">
                <p className="text-sm text-emerald-200">Total Vested</p>
                <p className="text-xl font-bold text-emerald-400">1,250,000 TVP</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg">
                <p className="text-sm text-emerald-200">Total Claimed</p>
                <p className="text-xl font-bold text-emerald-400">450,000 TVP</p>
              </div>
              <div className="bg-emerald-950 p-4 rounded-lg">
                <p className="text-sm text-emerald-200">Available to Claim</p>
                <p className="text-xl font-bold text-emerald-400">15,000 TVP</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <VestingCards />
    </div>
  )
}
