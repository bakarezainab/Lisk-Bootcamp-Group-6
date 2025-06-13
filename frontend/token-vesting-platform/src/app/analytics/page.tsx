import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, LineChart, PieChart } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 bg-gradient-to-br from-slate-900 via-slate-800 to-black min-h-screen p-6">
      <div>
        <h1 className="text-3xl font-bold text-emerald-400 drop-shadow-lg">Analytics</h1>
        <p className="text-emerald-200 mt-2">View detailed analytics about token vesting and distribution</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-slate-800 border-emerald-700/40 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-emerald-400">
              <LineChart className="h-5 w-5 text-emerald-400" />
              <span>Vesting Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center text-emerald-200">
            <p>Chart will be displayed here</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-blue-700/40 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-400">
              <PieChart className="h-5 w-5 text-blue-400" />
              <span>Token Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center text-blue-200">
            <p>Chart will be displayed here</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-purple-700/40 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-purple-400">
              <BarChart3 className="h-5 w-5 text-purple-400" />
              <span>Claim History</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center text-purple-200">
            <p>Chart will be displayed here</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Vesting Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <p className="text-sm text-slate-600 dark:text-slate-400">Average Vesting Amount</p>
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100">75,000 TVP</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Beneficiaries</p>
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100">45</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <p className="text-sm text-slate-600 dark:text-slate-400">Claim Rate</p>
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100">87%</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <p className="text-sm text-slate-600 dark:text-slate-400">Average Claim Time</p>
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100">2.3 days</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
