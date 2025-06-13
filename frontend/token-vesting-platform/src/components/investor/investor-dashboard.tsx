"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import { WalletButton } from "@/components/wallet/wallet-button"
import { NetworkIndicator } from "@/components/wallet/network-indicator"
import { InvestorStats } from "@/components/investor/investor-stats"
import { VestingProgress } from "@/components/investor/vesting-progress"
import { ClaimTokens } from "@/components/investor/claim-tokens"

export function InvestorDashboard() {
  return (
    <div className="min-h-screen bg-[#101010]">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/" className="btn text-slate-300 bg-emerald-600 cursor-pointer">
                {/* <Button variant="ghost" size="sm" > */}
                <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
                {/* </Button> */}
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-500 to-green-500 rounded-lg flex items-center justify-center">
                  <Users className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
                </div>
                <h1 className="text-lg sm:text-xl font-bold text-white">
                  <span className="hidden sm:inline">Investor Portal</span>
                  <span className="sm:hidden">Investor</span>
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:block">
                <NetworkIndicator />
              </div>
              <WalletButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">My Vesting Dashboard</h2>
          <p className="text-slate-300 text-sm sm:text-base">Track your vesting progress and claim available tokens</p>
        </div>

        {/* Stats Overview */}
        <div className="mb-6 sm:mb-8">
          <InvestorStats />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Vesting Progress */}
          <div className="space-y-4 sm:space-y-6">
            <VestingProgress />
          </div>

          {/* Claim Tokens */}
          <div className="space-y-4 sm:space-y-6">
            <ClaimTokens />

            {/* Recent Activity */}
            <Card className="bg-black border border-green-600">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-base sm:text-lg">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm sm:text-base">No recent activity to display</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}


