"use client"

import type React from "react"

import { useAccount } from "wagmi"
import { ADMIN_ADDRESS } from "@/lib/contracts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, AlertCircle, Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { WalletButton } from "@/components/wallet/wallet-button"
import { useEffect, useState } from "react"

interface AdminProtectionProps {
  children: React.ReactNode
}

export function AdminProtection({ children }: AdminProtectionProps) {
  const { address, isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Show loading during hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center">
        <Card className="bg-slate-800/50 border-slate-700 w-full max-w-md">
          <CardContent className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
          </CardContent>
        </Card>
      </div>
    )
  }

  // Check if wallet is connected
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center p-4">
        <Card className="bg-slate-800/50 border-slate-700 w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-orange-400" />
            </div>
            <CardTitle className="text-white text-xl">Wallet Required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-slate-400">Please connect your wallet to access the admin panel.</p>

            <WalletButton />

            <div className="pt-4 border-t border-slate-700">
              <Link href="/">
                <Button variant="ghost" className="text-white hover:text-green-500">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Check if connected address is the admin
  const isAdmin = address?.toLowerCase() === ADMIN_ADDRESS.toLowerCase()

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center p-4">
        <Card className="bg-slate-800/50 border-red-500/20 w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
            <CardTitle className="text-white text-xl">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-red-400 font-medium">Sorry, only the admin can access this page.</p>

            {/* <div className="bg-slate-700/30 p-4 rounded-lg text-left">
              <p className="text-slate-400 text-sm mb-2">Your Address:</p>
              <p className="text-white text-xs font-mono break-all">{address}</p>

              <p className="text-slate-400 text-sm mb-2 mt-4">Required Address:</p>
              <p className="text-slate-300 text-xs font-mono break-all">{ADMIN_ADDRESS}</p>
            </div> */}

            <p className="text-slate-500 text-sm">
              If you believe this is an error, please contact the system administrator.
            </p>

            <div className="flex flex-col space-y-2">
              <WalletButton />
              <Link href="/">
                <Button variant="ghost" className="w-full text-white hover:text-green-400 cursor-pointer">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // User is admin, render the protected content
  return <>{children}</>
}
