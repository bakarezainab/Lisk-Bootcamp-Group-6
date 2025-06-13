"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { Clock, User, Coins, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function VestingForm() {
  const [formData, setFormData] = useState({
    beneficiaryAddress: "",
    totalTokenAmount: "",
    startDateTime: "",
    email: "",
  })

  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const calculateDailyRelease = () => {
    const totalTokens = Number.parseInt(formData.totalTokenAmount) || 0
    const duration = 14 // 14 days
    return Math.floor(totalTokens / duration)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.beneficiaryAddress || !formData.totalTokenAmount || !formData.startDateTime || !formData.email) {
      alert("Please fill in all required fields")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address")
      return
    }

    // Show success modal
    setShowSuccessModal(true)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="bg-emerald-800 text-white border-slate-700">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-white text-xl">
            <Clock className="w-6 h-6" />
            Fill This Form For Investors
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Beneficiary Address */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-white text-base font-medium">
              <User className="w-4 h-4" />
              Beneficiary Address *
            </Label>
            <Input
              value={formData.beneficiaryAddress}
              onChange={(e) => handleInputChange("beneficiaryAddress", e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 h-12"
              placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590c6C87"
            />
            <p className="text-slate-400 text-sm">Enter the Ethereum address of the token recipient</p>
          </div>

          {/* Email Address */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-white text-base font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Email Address *
            </Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 h-12"
              placeholder="investor@example.com"
              required
            />
            <p className="text-slate-400 text-sm">We'll send feedback and updates to this email</p>
          </div>

          {/* Total Token Amount */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-white text-base font-medium">
              <Coins className="w-4 h-4" />
              Total Token Amount *
            </Label>
            <Input
              type="number"
              value={formData.totalTokenAmount}
              onChange={(e) => handleInputChange("totalTokenAmount", e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 h-12"
              placeholder="100000"
            />
            <p className="text-slate-400 text-sm">Total number of tokens to be vested over 14 days</p>
          </div>

          {/* Start Date & Time */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-white text-base font-medium">
              <Calendar className="w-4 h-4" />
              Start Date & Time *
            </Label>
            <Input
              type="datetime-local"
              value={formData.startDateTime}
              onChange={(e) => handleInputChange("startDateTime", e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 h-12"
              placeholder="2025-11-06T23:54"
            />
            <p className="text-slate-400 text-sm">When the vesting period should begin (can be immediate)</p>
          </div>

          {/* Vesting Summary */}
          {/* <div className="mt-8 space-y-4">
            <h3 className="text-white text-lg font-semibold">Vesting Summary</h3>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Duration: 14 days (2 weeks)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Release Type: Linear vesting (continuous unlock)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Daily Release: ~{calculateDailyRelease()} tokens</span>
              </div>
            </div>
          </div> */}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6">
            <Link href="/#">
            <Button variant="outline" className="flex-1 bg-transparent border-slate-600 text-white hover:bg-slate-700">
              Go Back
            </Button>
            </Link>



            {/* <Button variant="outline" className="flex-1 bg-transparent border-slate-600 text-white hover:bg-slate-700">
              Go Back
            </Button> */}
            <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-emerald-500 text-xl">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              Form Submitted Successfully
            </DialogTitle>
            <DialogDescription className="text-slate-300 text-base leading-relaxed pt-4">
              Thank you for submitting your vesting schedule request. Our team will review your application and provide
              feedback within <span className="text-emerald-500 font-semibold">48 hours</span>.
              <br />
              <br />
              You will receive an email notification at{" "}
              <span className="text-emerald-500 font-semibold">{formData.email}</span> once the review is complete.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end pt-4">
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </form>
  )
}
