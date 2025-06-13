"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coins, Download, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { useAccount } from "wagmi"
import { useClaimableAmount, useClaimTokens, useVestingSchedule } from "@/hooks/use-contracts"
import { formatUnits } from "viem"
import { useEffect } from "react"

export function ClaimTokens() {
  const { address, isConnected } = useAccount()
  const { claimableAmount, isLoading: claimableLoading, refetch } = useClaimableAmount(address)
  const { claimTokens, isPending: claimLoading, isSuccess, reset } = useClaimTokens()
  const { schedule, refetch: refetchSchedule } = useVestingSchedule(address)

  // Refetch data after successful claim
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        refetch()
        refetchSchedule()
        reset()
      }, 3000)
    }
  }, [isSuccess, refetch, refetchSchedule, reset])

  if (!isConnected) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Coins className="h-5 w-5 mr-2" />
            Claim Tokens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-slate-400">Please connect your wallet to claim tokens</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const claimableNow = claimableAmount ? Number(formatUnits(claimableAmount, 18)) : 0
  const hasVestingSchedule = schedule && schedule.totalAmount > 0n

  const handleClaimTokens = async () => {
    if (claimTokens && claimableNow > 0) {
      claimTokens()
    }
  }

  return (
    <Card className="bg-black border border-green-600">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Coins className="h-5 w-5 mr-2" />
          Claim Tokens
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Claimable Amount Display */}
        <div className="text-center">
          <div className="text-4xl font-bold text-white mb-2">
            {claimableLoading ? (
              <div className="h-12 bg-slate-700 rounded  mx-auto w-32"></div>
            ) : (
              claimableNow.toLocaleString()
            )}
          </div>
          <p className="text-slate-400">Tokens Available to Claim</p>
        </div>

        {/* Claim Status */}
        {!hasVestingSchedule ? (
          <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-slate-300 font-medium">No Vesting Schedule</p>
                <p className="text-slate-400 text-sm">You don&apos;t have any active vesting schedules</p>
              </div>
            </div>
          </div>
        ) : claimableNow > 0 ? (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-green-300 font-medium">Tokens Ready! 🎉</p>
                <p className="text-green-400 text-sm">You can claim {claimableNow.toLocaleString()} tokens now</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-green-300 font-medium">No Tokens Available Yet</p>
                <p className="text-green-400 text-sm">Check back later as your tokens vest over time</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {isSuccess && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-green-300 font-medium">Claim Successful! ✅</p>
                <p className="text-green-400 text-sm">Tokens have been transferred to your wallet</p>
              </div>
            </div>
          </div>
        )}

        {/* Claim Button */}
        <Button
          onClick={handleClaimTokens}
          disabled={claimableNow === 0 || claimLoading || claimableLoading || !hasVestingSchedule}
          className="w-full bg-gradient-to-r from-green-500 to-green-500 hover:from-green-600 hover:to-green-600 disabled:from-slate-600 disabled:to-slate-600"
          size="lg"
        >
          {claimLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Claiming Tokens...
            </>
          ) : claimableLoading ? (
            "Checking..."
          ) : !hasVestingSchedule ? (
            "No Vesting Schedule"
          ) : claimableNow > 0 ? (
            <>
              <Download className="h-4 w-4 mr-2" />
              Claim {claimableNow.toLocaleString()} Tokens
            </>
          ) : (
            "No Tokens Available"
          )}
        </Button>

        {/* Info */}
        <div className="bg-black border border-green-600 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-white mb-2">How Claiming Works</h4>
          <div className="space-y-1 text-xs text-slate-300">
            <p>• Tokens unlock linearly over 14 days</p>
            <p>• You can claim anytime after tokens unlock</p>
            <p>• Gas fees apply for claiming transactions</p>
            <p>• Claimed tokens go directly to your wallet</p>
            <p>• Real-time updates every few seconds</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}