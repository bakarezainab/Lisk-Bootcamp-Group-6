import { InvestorDashboard } from "@/components/investor/investor-dashboard"
import Link from "next/link"

export default function InvestorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-emerald-400 drop-shadow-lg">Investor Portal</h1>
          <Link href="/">
            <button className="px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-colors">Back to Home</button>
          </Link>
        </div>
        <div className="bg-slate-800 border-emerald-700/40 shadow-lg rounded-lg p-6">
          <InvestorDashboard />
        </div>
      </div>
    </div>
  )
}
