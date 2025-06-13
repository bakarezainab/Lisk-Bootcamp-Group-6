"use client"

import { useWallet } from "@/hooks/use-wallet"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function NetworkIndicator() {
  const { isConnected, isCorrectNetwork, switchToLiskSepolia, isSwitching, chain } = useWallet()

  if (!isConnected) return null

  if (isSwitching) {
    return (
      <div className="flex items-center space-x-2 text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
        <Loader2 className="h-3 w-3 animate-spin" />
        <span>Switching...</span>
      </div>
    )
  }

  if (!isCorrectNetwork) {
    return (
      <div className="flex items-center space-x-2">
        <Badge variant="destructive" className="flex items-center space-x-1">
          <AlertCircle className="h-3 w-3" />
          <span>{chain?.name || "Unknown"}</span>
        </Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={switchToLiskSepolia}
          className="text-xs border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950"
        >
          Switch to Lisk Sepolia
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2 text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
      <CheckCircle className="h-3 w-3" />
      <span>Lisk Sepolia</span>
    </div>
  )
}
