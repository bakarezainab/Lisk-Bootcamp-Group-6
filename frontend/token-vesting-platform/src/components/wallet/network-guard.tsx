"use client"

import type React from "react"
import { useWallet } from "@/hooks/use-wallet"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Wifi } from "lucide-react"
import { NetworkIndicator } from "./network-indicator"

interface NetworkGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function NetworkGuard({ children, fallback }: NetworkGuardProps) {
  const { isConnected, isCorrectNetwork, switchToLiskSepolia, isSwitching } = useWallet()

  if (!isConnected) {
    return (
      fallback || (
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <Wifi className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            </div>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>Please connect your wallet to access this feature</CardDescription>
          </CardHeader>
        </Card>
      )
    )
  }

  if (!isCorrectNetwork) {
    return (
      fallback || (
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle>Wrong Network</CardTitle>
            <CardDescription>Please switch to Lisk Sepolia to use this application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <NetworkIndicator />
            </div>
            <Button
              onClick={switchToLiskSepolia}
              disabled={isSwitching}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              {isSwitching ? "Switching..." : "Switch to Lisk Sepolia"}
            </Button>
          </CardContent>
        </Card>
      )
    )
  }

  return <>{children}</>
}
