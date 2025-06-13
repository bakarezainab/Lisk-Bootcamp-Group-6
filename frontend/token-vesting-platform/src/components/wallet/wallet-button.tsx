"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet } from "lucide-react"
import { useAccount, useDisconnect } from "wagmi"
import { modal } from "../../../context"
import { useState, useEffect } from "react"
import { formatAddress } from "@/lib/utils"

export function WalletButton() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [mounted, setMounted] = useState(false)

  // Handle hydration issues by only rendering wallet info client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleConnect = async () => {
    try {
      await modal.open()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  const handleDisconnect = () => {
    disconnect()
  }

  if (!mounted) {
    return (
      <Button className="bg-gradient-to-tr from-green-600 to-green-800">
        <Wallet className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Connect Wallet</span>
        <span className="sm:hidden">Connect</span>
      </Button>
    )
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-2">
        <Badge
          variant="secondary"
          className="bg-gradient-to-tr from-green-600 to-green-800 hidden sm:inline-flex"
        >
          Connected
        </Badge>
        <Button variant="outline" className="flex items-center space-x-2  cursor-pointer">
          <Wallet className="h-4 w-4" />
          <span className="hidden sm:inline">{formatAddress(address)}</span>
          <span className="sm:hidden">{address.slice(0, 6)}...</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDisconnect}
          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950  cursor-pointer hidden sm:inline-flex"
        >
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Button className="bg-gradient-to-tr from-green-600 to-green-800 cursor-pointer" onClick={handleConnect}>
      <Wallet className="h-4 w-4 mr-2" />
      <span className="hidden sm:inline">Connect Wallet</span>
      <span className="sm:hidden">Connect</span>
    </Button>
  )
}
