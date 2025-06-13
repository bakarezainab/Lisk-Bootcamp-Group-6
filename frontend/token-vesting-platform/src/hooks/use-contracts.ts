"use client"

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { CONTRACT_ADDRESSES, TOKEN_ABI, VESTING_ABI } from "@/lib/contracts"
import type { VestingSchedule } from "@/lib/contracts"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

// Token Contract Hooks
export function useTokenInfo() {
  const { data: name } = useReadContract({
    address: CONTRACT_ADDRESSES.TOKEN,
    abi: TOKEN_ABI,
    functionName: "name",
  })

  const { data: symbol } = useReadContract({
    address: CONTRACT_ADDRESSES.TOKEN,
    abi: TOKEN_ABI,
    functionName: "symbol",
  })

  const { data: decimals } = useReadContract({
    address: CONTRACT_ADDRESSES.TOKEN,
    abi: TOKEN_ABI,
    functionName: "decimals",
  })

  const { data: totalSupply } = useReadContract({
    address: CONTRACT_ADDRESSES.TOKEN,
    abi: TOKEN_ABI,
    functionName: "totalSupply",
  })

  const { data: maxSupply } = useReadContract({
    address: CONTRACT_ADDRESSES.TOKEN,
    abi: TOKEN_ABI,
    functionName: "MAX_SUPPLY",
  })

  return {
    name: name as string,
    symbol: symbol as string,
    decimals: decimals as number,
    totalSupply: totalSupply as bigint,
    maxSupply: maxSupply as bigint,
  }
}

export function useTokenBalance(address?: `0x${string}`) {
  const {
    data: balance,
    isError,
    isLoading,
    refetch,
  } = useReadContract({
    address: CONTRACT_ADDRESSES.TOKEN,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 5000, // Refetch every 5 seconds
    },
  })

  return {
    balance: balance as bigint,
    isError,
    isLoading,
    refetch,
  }
}

export function useTokenOwner() {
  const { data: owner } = useReadContract({
    address: CONTRACT_ADDRESSES.TOKEN,
    abi: TOKEN_ABI,
    functionName: "owner",
  })

  return owner as `0x${string}`
}

// Vesting Contract Hooks
export function useVestingSchedule(address?: `0x${string}`) {
  const {
    data: schedule,
    isError,
    isLoading,
    refetch,
  } = useReadContract({
    address: CONTRACT_ADDRESSES.VESTING,
    abi: VESTING_ABI,
    functionName: "getVestingSchedule",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 5000, // Refetch every 5 seconds
    },
  })

  return {
    schedule: schedule as VestingSchedule,
    isError,
    isLoading,
    refetch,
  }
}

export function useClaimableAmount(address?: `0x${string}`) {
  const {
    data: claimableAmount,
    isError,
    isLoading,
    refetch,
  } = useReadContract({
    address: CONTRACT_ADDRESSES.VESTING,
    abi: VESTING_ABI,
    functionName: "getClaimableAmount",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 3000, // Refetch every 3 seconds for real-time updates
    },
  })

  return {
    claimableAmount: claimableAmount as bigint,
    isError,
    isLoading,
    refetch,
  }
}

export function useVestedAmount(address?: `0x${string}`) {
  const {
    data: vestedAmount,
    isError,
    isLoading,
    refetch,
  } = useReadContract({
    address: CONTRACT_ADDRESSES.VESTING,
    abi: VESTING_ABI,
    functionName: "getVestedAmount",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
  })

  return {
    vestedAmount: vestedAmount as bigint,
    isError,
    isLoading,
    refetch,
  }
}

export function useVestingOwner() {
  const { data: owner } = useReadContract({
    address: CONTRACT_ADDRESSES.VESTING,
    abi: VESTING_ABI,
    functionName: "owner",
  })

  return owner as `0x${string}`
}

export function useVestingPaused() {
  const { data: paused } = useReadContract({
    address: CONTRACT_ADDRESSES.VESTING,
    abi: VESTING_ABI,
    functionName: "paused",
  })

  return paused as boolean
}

export function useAllBeneficiaries() {
  const {
    data: beneficiaries,
    isLoading,
    refetch,
  } = useReadContract({
    address: CONTRACT_ADDRESSES.VESTING,
    abi: VESTING_ABI,
    functionName: "getAllBeneficiaries",
    query: {
      refetchInterval: 10000, // Refetch every 10 seconds
    },
  })

  return {
    beneficiaries: beneficiaries as `0x${string}`[],
    isLoading,
    refetch,
  }
}

// Check if vesting contract has token address set
export function useVestingTokenAddress() {
  const {
    data: tokenAddress,
    isLoading,
    refetch,
  } = useReadContract({
    address: CONTRACT_ADDRESSES.VESTING,
    abi: VESTING_ABI,
    functionName: "token",
  })

  return {
    tokenAddress: tokenAddress as `0x${string}`,
    isLoading,
    isTokenSet: tokenAddress && tokenAddress !== "0x0000000000000000000000000000000000000000",
    refetch,
  }
}

// Write Contract Hooks
export function useClaimTokens() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract()
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  // Handle success state
  useEffect(() => {
    if (isConfirmed && hash) {
      setIsSuccess(true)
      toast({
        title: "Tokens Claimed Successfully! 🎉",
        description: `Transaction confirmed: ${hash.slice(0, 10)}...`,
        variant: "success",
      })
      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
        reset()
      }, 5000)
    }
  }, [isConfirmed, hash, toast, reset])

  // Handle error state
  useEffect(() => {
    if (error) {
      console.error("Claim tokens error:", error)
      let errorMessage = "Failed to claim tokens"

      if (error.message.includes("NothingToClaim")) {
        errorMessage = "No tokens available to claim at this time"
      } else if (error.message.includes("NoVestingSchedule")) {
        errorMessage = "No vesting schedule found for your address"
      } else if (error.message.includes("user rejected")) {
        errorMessage = "Transaction was rejected by user"
      }

      toast({
        title: "Claim Failed",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }, [error, toast])

  const claimTokens = () => {
    try {
      console.log("Claiming tokens from vesting contract:", CONTRACT_ADDRESSES.VESTING)
      writeContract({
        address: CONTRACT_ADDRESSES.VESTING,
        abi: VESTING_ABI,
        functionName: "claimTokens",
      })
    } catch (err) {
      console.error("Error calling claimTokens:", err)
      toast({
        title: "Error",
        description: "Failed to initiate claim transaction",
        variant: "destructive",
      })
    }
  }

  return {
    claimTokens,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
    reset,
  }
}

export function useCreateVestingSchedule() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract()
  const [isSuccess, setIsSuccess] = useState(false)
  // const { toast } = useToast()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  // Handle success state
  useEffect(() => {
    if (isConfirmed && hash) {
      setIsSuccess(true)
      console.log("Vesting schedule creation confirmed:", hash)
      // Don't show toast here, let the component handle it
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    }
  }, [isConfirmed, hash])

  // Handle error state
  useEffect(() => {
    if (error) {
      console.error("Create vesting error details:", error)
      // Don't show toast here, let the component handle it
    }
  }, [error])

  const createVestingSchedule = async (beneficiary: `0x${string}`, totalAmount: bigint, startTime: bigint) => {
    console.log("Creating vesting schedule with parameters:", {
      beneficiary,
      totalAmount: totalAmount.toString(),
      startTime: startTime.toString(),
      vestingContract: CONTRACT_ADDRESSES.VESTING,
    })

    try {
      await writeContract({
        address: CONTRACT_ADDRESSES.VESTING,
        abi: VESTING_ABI,
        functionName: "createVestingSchedule",
        args: [beneficiary, totalAmount, startTime],
      })
    } catch (err) {
      console.error("Error calling createVestingSchedule:", err)
      throw err
    }
  }

  return {
    createVestingSchedule,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
    reset,
  }
}

export function useSetTokenAddress() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract()
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  // Handle success state
  useEffect(() => {
    if (isConfirmed && hash) {
      setIsSuccess(true)
      toast({
        title: "Token Address Set! ✅",
        description: `Transaction confirmed: ${hash.slice(0, 10)}...`,
        variant: "success",
      })
      setTimeout(() => {
        setIsSuccess(false)
        reset()
      }, 5000)
    }
  }, [isConfirmed, hash, toast, reset])

  // Handle error state
  useEffect(() => {
    if (error) {
      let errorMessage = "Failed to set token address"

      if (error.message.includes("OwnableUnauthorizedAccount")) {
        errorMessage = "Only the contract owner can set the token address"
      } else if (error.message.includes("user rejected")) {
        errorMessage = "Transaction was rejected by user"
      }

      toast({
        title: "Transaction Failed",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }, [error, toast])

  const setTokenAddress = (tokenAddress: `0x${string}`) => {
    try {
      console.log("Setting token address:", tokenAddress)
      writeContract({
        address: CONTRACT_ADDRESSES.VESTING,
        abi: VESTING_ABI,
        functionName: "setTokenAddress",
        args: [tokenAddress],
      })
    } catch (err) {
      console.error("Error calling setTokenAddress:", err)
      toast({
        title: "Error",
        description: "Failed to initiate set token address transaction",
        variant: "destructive",
      })
    }
  }

  return {
    setTokenAddress,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
    reset,
  }
}

export function useApproveTokens() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract()
  const [isSuccess, setIsSuccess] = useState(false)
  // const { toast } = useToast()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  // Handle success state
  useEffect(() => {
    if (isConfirmed && hash) {
      setIsSuccess(true)
      console.log("Token approval confirmed:", hash)
      // Don't show toast here, let the component handle it
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    }
  }, [isConfirmed, hash])

  // Handle error state
  useEffect(() => {
    if (error) {
      console.error("Approve error details:", error)
      // Don't show toast here, let the component handle it
    }
  }, [error])

  const approveTokens = async (amount: bigint) => {
    console.log("Approving tokens:", {
      tokenContract: CONTRACT_ADDRESSES.TOKEN,
      spender: CONTRACT_ADDRESSES.VESTING,
      amount: amount.toString(),
    })

    try {
      await writeContract({
        address: CONTRACT_ADDRESSES.TOKEN,
        abi: TOKEN_ABI,
        functionName: "approve",
        args: [CONTRACT_ADDRESSES.VESTING, amount],
      })
    } catch (err) {
      console.error("Error calling approve:", err)
      throw err
    }
  }

  return {
    approveTokens,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
    reset,
  }
}

export function useTokenAllowance(owner?: `0x${string}`, spender?: `0x${string}`) {
  const {
    data: allowance,
    isError,
    isLoading,
    refetch,
  } = useReadContract({
    address: CONTRACT_ADDRESSES.TOKEN,
    abi: TOKEN_ABI,
    functionName: "allowance",
    args: owner && spender ? [owner, spender] : undefined,
    query: {
      enabled: !!(owner && spender),
      refetchInterval: 5000, // Refetch every 5 seconds
    },
  })

  return {
    allowance: allowance as bigint,
    isError,
    isLoading,
    refetch,
  }
}


export function useTransferTokens() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract()
  const [isSuccess, setIsSuccess] = useState(false)

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  // Handle success state
  useEffect(() => {
    if (isConfirmed && hash) {
      setIsSuccess(true)
      console.log("Token transfer confirmed:", hash)
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    }
  }, [isConfirmed, hash])

  // Handle error state
  useEffect(() => {
    if (error) {
      console.error("Transfer error details:", error)
    }
  }, [error])

  const transferTokens = async (to: `0x${string}`, amount: bigint) => {
    console.log("Transferring tokens:", {
      tokenContract: CONTRACT_ADDRESSES.TOKEN,
      to,
      amount: amount.toString(),
    })

    try {
      await writeContract({
        address: CONTRACT_ADDRESSES.TOKEN,
        abi: TOKEN_ABI,
        functionName: "transfer",
        args: [to, amount],
      })
    } catch (err) {
      console.error("Error calling transfer:", err)
      throw err
    }
  }

  return {
    transferTokens,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
    reset,
  }
}

// Helper hook to check if user is admin (token owner)
export function useIsAdmin(address?: `0x${string}`) {
  const tokenOwner = useTokenOwner()
  const vestingOwner = useVestingOwner()

  return {
    isTokenOwner: address && tokenOwner && address.toLowerCase() === tokenOwner.toLowerCase(),
    isVestingOwner: address && vestingOwner && address.toLowerCase() === vestingOwner.toLowerCase(),
    isAdmin:
      address &&
      ((tokenOwner && address.toLowerCase() === tokenOwner.toLowerCase()) ||
        (vestingOwner && address.toLowerCase() === vestingOwner.toLowerCase())),
  }
}


