"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Coins, User, Clock, AlertCircle, CheckCircle, Settings, Loader2 } from "lucide-react"
import {
  useCreateVestingSchedule,
  useApproveTokens,
  useTokenAllowance,
  useTokenBalance,
  useVestingTokenAddress,
  useSetTokenAddress,
  useIsAdmin,
  useAllBeneficiaries,
} from "@/hooks/use-contracts"
import { parseUnits, formatUnits, isAddress } from "viem"
import { useAccount } from "wagmi"
import { useToast } from "@/hooks/use-toast"
import { CONTRACT_ADDRESSES } from "@/lib/contracts"

export function CreateVestingForm() {
  const [formData, setFormData] = useState({
    beneficiaryAddress: "",
    totalAmount: "",
    startDate: "",
  })
  const [step, setStep] = useState<"form" | "approve" | "create" | "success">("form")
  const [isFormValid, setIsFormValid] = useState(false)

  const { address } = useAccount()
  const { isAdmin } = useIsAdmin(address)
  const { isTokenSet } = useVestingTokenAddress()
  const { refetch: refetchBeneficiaries } = useAllBeneficiaries()

  const {
    createVestingSchedule,
    isPending: isCreating,
    isSuccess: isCreated,
    error: createError,
    reset: resetCreate,
    hash: createHash,
  } = useCreateVestingSchedule()

  const {
    approveTokens,
    isPending: isApproving,
    isSuccess: isApproved,
    error: approveError,
    reset: resetApprove,
    hash: approveHash,
  } = useApproveTokens()

  const {
    setTokenAddress,
    isPending: isSettingToken,
    isSuccess: isTokenAddressSet,
    error: setTokenError,
  } = useSetTokenAddress()

  const { balance: tokenBalance, refetch: refetchBalance } = useTokenBalance(address)
  const { allowance, refetch: refetchAllowance } = useTokenAllowance(address, CONTRACT_ADDRESSES.VESTING)
  const { toast } = useToast()

  // Validate form
  useEffect(() => {
    const isValidAddress = formData.beneficiaryAddress && isAddress(formData.beneficiaryAddress)
    const isValidAmount = formData.totalAmount && Number(formData.totalAmount) > 0
    const isValidDate = formData.startDate && new Date(formData.startDate).getTime() > Date.now() - 3600000 // Allow 1 hour in past

    setIsFormValid(!!(isValidAddress && isValidAmount && isValidDate && isTokenSet))
  }, [formData, isTokenSet])

  // Memoize handleCreateVesting to prevent unnecessary re-renders
  const handleCreateVesting = useCallback(async () => {
    if (!address || !formData.beneficiaryAddress || !formData.totalAmount || !formData.startDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      const totalAmountWei = parseUnits(formData.totalAmount, 18)
      const startTimeUnix = Math.floor(new Date(formData.startDate).getTime() / 1000)

      console.log("Creating vesting schedule with params:", {
        beneficiary: formData.beneficiaryAddress,
        amount: formData.totalAmount,
        amountWei: totalAmountWei.toString(),
        startTime: startTimeUnix,
        startDate: formData.startDate,
        vestingContract: CONTRACT_ADDRESSES.VESTING,
      })

      setStep("create")
      await createVestingSchedule(formData.beneficiaryAddress as `0x${string}`, totalAmountWei, BigInt(startTimeUnix))
    } catch (error) {
      console.error("Error in handleCreateVesting:", error)
      toast({
        title: "Error",
        description: "Failed to create vesting schedule",
        variant: "destructive",
      })
      setStep("form")
    }
  }, [address, formData.beneficiaryAddress, formData.totalAmount, formData.startDate, createVestingSchedule, toast])

  // Handle successful vesting creation
  useEffect(() => {
    if (isCreated && createHash) {
      console.log("Vesting created successfully:", createHash)
      setStep("success")

      // Refresh data
      setTimeout(() => {
        refetchBeneficiaries()
        refetchBalance()
        refetchAllowance()
      }, 2000)

      toast({
        title: "Vesting Schedule Created! 🎉",
        description: `Successfully created vesting for ${formData.beneficiaryAddress.slice(0, 6)}...${formData.beneficiaryAddress.slice(-4)}`,
        variant: "success",
      })

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          beneficiaryAddress: "",
          totalAmount: "",
          startDate: "",
        })
        setStep("form")
        resetCreate()
      }, 3000)
    }
  }, [
    isCreated,
    createHash,
    formData.beneficiaryAddress,
    toast,
    resetCreate,
    refetchBeneficiaries,
    refetchBalance,
    refetchAllowance,
  ])

  // Handle successful approval
  useEffect(() => {
    if (isApproved && approveHash) {
      console.log("Approval successful:", approveHash)
      toast({
        title: "Tokens Approved! ✅",
        description: "Now creating vesting schedule...",
        variant: "success",
      })

      resetApprove()

      // Wait a bit then refetch allowance and create vesting
      setTimeout(() => {
        refetchAllowance().then(() => {
          handleCreateVesting()
        })
      }, 3000)
    }
  }, [isApproved, approveHash, toast, resetApprove, refetchAllowance, handleCreateVesting])

  // Handle token address set success
  useEffect(() => {
    if (isTokenAddressSet) {
      toast({
        title: "Token Address Set! ✅",
        description: "You can now create vesting schedules",
        variant: "success",
      })
    }
  }, [isTokenAddressSet, toast])

  // Handle errors
  useEffect(() => {
    if (createError) {
      console.error("Create vesting error:", createError)
      let errorMessage = "Failed to create vesting schedule"

      if (createError.message.includes("AlreadyVesting")) {
        errorMessage = "This address already has a vesting schedule"
      } else if (createError.message.includes("NotEnoughTokens")) {
        errorMessage = "Insufficient token balance or allowance"
      } else if (createError.message.includes("TokenNotSet")) {
        errorMessage = "Token address not set in vesting contract"
      } else if (createError.message.includes("ZeroAddress")) {
        errorMessage = "Invalid beneficiary address"
      } else if (createError.message.includes("user rejected")) {
        errorMessage = "Transaction was rejected by user"
      }

      toast({
        title: "Transaction Failed",
        description: errorMessage,
        variant: "destructive",
      })
      setStep("form")
    }
  }, [createError, toast])

  useEffect(() => {
    if (approveError) {
      console.error("Approve error:", approveError)
      let errorMessage = "Failed to approve tokens"

      if (approveError.message.includes("user rejected")) {
        errorMessage = "Approval was rejected by user"
      } else if (approveError.message.includes("ERC20InsufficientBalance")) {
        errorMessage = "Insufficient token balance"
      }

      toast({
        title: "Approval Failed",
        description: errorMessage,
        variant: "destructive",
      })
      setStep("form")
    }
  }, [approveError, toast])

  useEffect(() => {
    if (setTokenError) {
      console.error("Set token error:", setTokenError)
      toast({
        title: "Set Token Failed",
        description: setTokenError.message || "Failed to set token address",
        variant: "destructive",
      })
    }
  }, [setTokenError, toast])

  const handleSetTokenAddress = () => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only contract owner can set token address",
        variant: "destructive",
      })
      return
    }
    console.log("Setting token address:", CONTRACT_ADDRESSES.TOKEN)
    setTokenAddress(CONTRACT_ADDRESSES.TOKEN)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      })
      return
    }

    if (!isTokenSet) {
      toast({
        title: "Token Not Set",
        description: "Please set the token address first",
        variant: "destructive",
      })
      return
    }

    if (!isFormValid) {
      toast({
        title: "Invalid Form",
        description: "Please check all fields and try again",
        variant: "destructive",
      })
      return
    }

    // Validate beneficiary address
    if (!isAddress(formData.beneficiaryAddress)) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid Ethereum address",
        variant: "destructive",
      })
      return
    }

    // Validate amount
    const amount = Number(formData.totalAmount)
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Amount must be greater than 0",
        variant: "destructive",
      })
      return
    }

    // Validate start date
    const startTime = new Date(formData.startDate).getTime()
    const now = Date.now()
    if (startTime < now - 3600000) {
      // Allow 1 hour in the past
      toast({
        title: "Invalid Start Date",
        description: "Start date should be in the future or within the last hour",
        variant: "destructive",
      })
      return
    }

    try {
      const totalAmountWei = parseUnits(formData.totalAmount, 18)

      // Check if user has enough tokens
      if (tokenBalance && totalAmountWei > tokenBalance) {
        toast({
          title: "Insufficient Balance",
          description: `You need ${formData.totalAmount} tokens but only have ${formatUnits(tokenBalance, 18)}`,
          variant: "destructive",
        })
        return
      }

      console.log("Checking allowance:", {
        currentAllowance: allowance?.toString(),
        requiredAmount: totalAmountWei.toString(),
        needsApproval: !allowance || allowance < totalAmountWei,
      })

      // Check if approval is needed
      if (!allowance || allowance < totalAmountWei) {
        console.log("Approval needed, requesting approval for:", totalAmountWei.toString())
        setStep("approve")
        await approveTokens(totalAmountWei)
      } else {
        console.log("Already approved, creating vesting schedule directly")
        await handleCreateVesting()
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error)
      toast({
        title: "Error",
        description: "Failed to process request",
        variant: "destructive",
      })
      setStep("form")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const isLoading = isApproving || isCreating || isSettingToken
  const currentBalance = tokenBalance ? Number(formatUnits(tokenBalance, 18)) : 0
  const currentAllowance = allowance ? Number(formatUnits(allowance, 18)) : 0

  // Set default start date to current time + 1 minute
  useEffect(() => {
    if (!formData.startDate) {
      const now = new Date()
      now.setMinutes(now.getMinutes() + 1) // Add 1 minute to current time
      const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
      setFormData((prev) => ({ ...prev, startDate: localDateTime }))
    }
  }, [formData.startDate])

  return (
    <div className="space-y-6">
      {/* Token Setup Card */}
      {!isTokenSet && (
        <Card className="bg-green-500/10 border-green-500/20">
          <CardHeader>
            <CardTitle className="text-text-white flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Setup required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-white">
              The vesting contract needs to be configugreen with a token address before you can create vesting schedules.
            </p>
            <div className="bg-green-500/10 p-3 rounded-lg">
              <p className="text-sm text-text-white">Token Contract: {CONTRACT_ADDRESSES.TOKEN}</p>
              <p className="text-sm text-text-white">Vesting Contract: {CONTRACT_ADDRESSES.VESTING}</p>
            </div>
            <Button
              onClick={handleSetTokenAddress}
              disabled={!isAdmin || isSettingToken}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSettingToken ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Setting Token Address...
                </>
              ) : (
                "Set Token Address"
              )}
            </Button>
            {!isAdmin && <p className="text-xs text-white">Only the contract owner can set the token address.</p>}
          </CardContent>
        </Card>
      )}

      {/* Main Form */}
      <Card className="bg-black border border-green-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Create New Vesting Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Status indicator */}
          {step !== "form" && step !== "success" && (
            <div className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center space-x-2">
                {step === "approve" && (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                    <span className="text-blue-300">Step 1: Approving tokens for vesting contract...</span>
                  </>
                )}
                {step === "create" && (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                    <span className="text-blue-300">Step 2: Creating vesting schedule...</span>
                  </>
                )}
              </div>
              <div className="mt-2 text-xs text-blue-400">
                {step === "approve" && "Please confirm the approval transaction in your wallet"}
                {step === "create" && "Please confirm the vesting creation transaction in your wallet"}
              </div>
            </div>
          )}

          {/* Success indicator */}
          {step === "success" && (
            <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-white" />
                <span className="text-text-white">Vesting schedule created successfully! 🎉</span>
              </div>
              <div className="mt-2 text-xs text-white">
                The beneficiary can now view their vesting schedule and claim tokens as they vest.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="beneficiary" className="flex items-center space-x-2 text-slate-300">
                <User className="h-4 w-4" />
                <span>Beneficiary Address *</span>
              </Label>
              <Input
                id="beneficiary"
                type="text"
                placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590c6C87"
                value={formData.beneficiaryAddress}
                onChange={(e) => handleInputChange("beneficiaryAddress", e.target.value)}
                required
                className="font-mono bg-slate-700/50 border-slate-600 text-white"
                disabled={isLoading || !isTokenSet}
              />
              <p className="text-xs text-slate-400">Enter the Ethereum address of the token recipient</p>
              {formData.beneficiaryAddress && !isAddress(formData.beneficiaryAddress) && (
                <p className="text-xs text-green-800">Invalid Ethereum address</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="flex items-center space-x-2 text-slate-300">
                <Coins className="h-4 w-4" />
                <span>Total Token Amount *</span>
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="100000"
                value={formData.totalAmount}
                onChange={(e) => handleInputChange("totalAmount", e.target.value)}
                required
                min="1"
                step="0.000000000000000001"
                disabled={isLoading || !isTokenSet}
                className="bg-slate-700/50 border-slate-600 text-white"
              />
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Total number of tokens to be vested over 14 days</span>
                <span className="text-slate-400">Your Balance: {currentBalance.toLocaleString()} tokens</span>
              </div>
              {formData.totalAmount && Number(formData.totalAmount) > currentBalance && (
                <p className="text-xs text-green-800">Amount exceeds your token balance</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate" className="flex items-center space-x-2 text-slate-300">
                <Calendar className="h-4 w-4" />
                <span>Start Date & Time *</span>
              </Label>
              <Input
                id="startDate"
                type="datetime-local"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                required
                disabled={isLoading || !isTokenSet}
                className="bg-slate-700/50 border-slate-600 text-white"
              />
              <p className="text-xs text-slate-400">When the vesting period should begin (can be immediate)</p>
            </div>

            {/* Transaction Details */}
            {formData.totalAmount && isTokenSet && (
              <div className="bg-slate-700/30 p-4 rounded-lg">
                <h4 className="font-medium text-white mb-2">Transaction Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">required Amount:</span>
                    <span className="font-medium text-white">
                      {Number(formData.totalAmount).toLocaleString()} tokens
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Current Allowance:</span>
                    <span className="font-medium text-white">{currentAllowance.toLocaleString()} tokens</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Approval Needed:</span>
                    <div className="flex items-center space-x-1">
                      {currentAllowance >= Number(formData.totalAmount) ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-white" />
                          <span className="text-white">No</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 text-white" />
                          <span className="text-white">Yes</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Vesting Summary */}
            <div className="bg-slate-700/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Vesting Summary</h4>
              <div className="space-y-1 text-sm text-slate-400">
                <p>• Duration: 14 days (2 weeks)</p>
                <p>• Release Type: Linear vesting (continuous unlock)</p>
                <p>
                  • Daily Release: ~
                  {formData.totalAmount ? Math.floor(Number(formData.totalAmount) / 14).toLocaleString() : "0"} tokens
                </p>
                <p>
                  • Hourly Release: ~
                  {formData.totalAmount ? Math.floor(Number(formData.totalAmount) / (14 * 24)).toLocaleString() : "0"}{" "}
                  tokens
                </p>
                <p>• Claimable: Anytime after tokens are unlocked</p>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-600 hover:from-green-600 hover:to-green-600 disabled:from-slate-600 disabled:to-slate-600"
              disabled={!isFormValid || isLoading || !address || step === "success"}
              size="lg"
            >
              {step === "approve" ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Approving Tokens...
                </>
              ) : step === "create" ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating Vesting Schedule...
                </>
              ) : step === "success" ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Vesting Created Successfully!
                </>
              ) : !isTokenSet ? (
                "Token Address required"
              ) : !isFormValid ? (
                "Please Fill All Fields"
              ) : currentAllowance >= Number(formData.totalAmount || "0") ? (
                "Create Vesting Schedule"
              ) : (
                "Approve & Create Vesting Schedule"
              )}
            </Button>

            {!address && (
              <p className="text-center text-sm text-green-800">Please connect your wallet to create vesting schedules</p>
            )}

            {/* Debug Info (only in development) */}
            {/* {process.env.NODE_ENV === "development" && (
              <div className="bg-slate-900/50 p-3 rounded text-xs text-slate-400">
                <p>Debug Info:</p>
                <p>Token: {CONTRACT_ADDRESSES.TOKEN}</p>
                <p>Vesting: {CONTRACT_ADDRESSES.VESTING}</p>
                <p>Token Set: {isTokenSet ? "Yes" : "No"}</p>
                <p>Form Valid: {isFormValid ? "Yes" : "No"}</p>
                <p>Step: {step}</p>
              </div>
            )} */}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

