"use client"

import { useAccount, useBalance, useChainId, useSwitchChain } from "wagmi"
import { liskSepolia } from "../../config"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

export function useWallet() {
  const { address, isConnected, chain } = useAccount()
  const chainId = useChainId()
  const { switchChain, isPending: isSwitching, error: switchError } = useSwitchChain()
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()

  const { data: balance } = useBalance({
    address,
    chainId: liskSepolia.id,
  })

  // Handle hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Check if on the correct network
  const isCorrectNetwork = chainId === liskSepolia.id

  // Handle switch chain errors
  useEffect(() => {
    if (switchError) {
      toast({
        title: "Network Switch Failed",
        description: switchError.message || "Failed to switch to Lisk Sepolia",
        variant: "destructive",
      })
    }
  }, [switchError, toast])

  // Switch to Lisk Sepolia
  const switchToLiskSepolia = async () => {
    if (!switchChain) {
      toast({
        title: "Switch Not Available",
        description: "Network switching is not available in your wallet",
        variant: "destructive",
      })
      return
    }

    try {
      await switchChain({ chainId: liskSepolia.id })
      toast({
        title: "Network Switched",
        description: "Successfully switched to Lisk Sepolia",
        variant: "success",
      })
    } catch (error) {
      console.error("Failed to switch network:", error)
      // Error is already handled by the useEffect above
    }
  }

  // Auto-prompt network switch when connected to wrong network
  useEffect(() => {
    if (mounted && isConnected && !isCorrectNetwork && !isSwitching) {
      // Show a toast asking user to switch network
      toast({
        title: "Wrong Network",
        description: "Please switch to Lisk Sepolia to use this application",
        variant: "destructive",
      })
    }
  }, [mounted, isConnected, isCorrectNetwork, isSwitching, toast])

  return {
    address,
    isConnected: mounted && isConnected,
    balance,
    isCorrectNetwork,
    switchToLiskSepolia,
    isSwitching,
    chain,
    chainId,
  }
}
