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

  // const calculateDailyRelease = () => {
  //   const totalTokens = Number.parseInt(formData.totalTokenAmount) || 0
  //   const duration = 14 // 14 days
  //   return Math.floor(totalTokens / duration)
  // }

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
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-black border border-emerald-700/80 shadow-lg shadow-emerald-500/10 text-white">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-emerald-400 text-2xl drop-shadow-lg">
            <Clock className="w-6 h-6 text-emerald-400" />
            Fill This Form For Investors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Beneficiary Address */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-emerald-300 text-base font-semibold">
              <User className="w-4 h-4 text-emerald-400" />
              Beneficiary Address *
            </Label>
            <Input
              value={formData.beneficiaryAddress}
              onChange={(e) => handleInputChange('beneficiaryAddress', e.target.value)}
              className="bg-slate-800 border border-emerald-700/40 text-white placeholder: h-12 focus:ring-emerald-400 focus:border-emerald-400"
              placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590c6C87"
            />
            <p className="text-emerald-200 text-xs">Enter the Ethereum address of the token recipient</p>
          </div>
          {/* Email Address */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-emerald-300 text-base font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-emerald-400"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Email Address *
            </Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="bg-slate-800 border border-emerald-700/40 text-white placeholder: h-12 focus:ring-emerald-400 focus:border-emerald-400"
              placeholder="investor@example.com"
              required
            />
            <p className="text-emerald-200 text-xs">We&apos;ll send feedback and updates to this email</p>
          </div>
          {/* Total Token Amount */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-emerald-300 text-base font-semibold">
              <Coins className="w-4 h-4 text-emerald-400" />
              Total Token Amount *
            </Label>
            <Input
              type="number"
              value={formData.totalTokenAmount}
              onChange={(e) => handleInputChange('totalTokenAmount', e.target.value)}
              className="bg-slate-800 border border-emerald-700/40 text-white placeholder: h-12 focus:ring-emerald-400 focus:border-emerald-400"
              placeholder="100000"
            />
            <p className="text-emerald-200 text-xs">Total number of tokens to be vested over 14 days</p>
          </div>
          {/* Start Date & Time */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-emerald-300 text-base font-semibold">
              <Calendar className="w-4 h-4 text-emerald-400" />
              Start Date & Time *
            </Label>
            <Input
              type="datetime-local"
              value={formData.startDateTime}
              onChange={(e) => handleInputChange('startDateTime', e.target.value)}
              className="bg-slate-800 border border-emerald-700/40 text-white placeholder: h-12 focus:ring-emerald-400 focus:border-emerald-400"
              placeholder="2025-11-06T23:54"
            />
            <p className="text-emerald-200 text-xs">When the vesting period should begin (can be immediate)</p>
          </div>
          {/* Action Buttons */}
          <div className="flex gap-3 pt-6">
            <Link href="/">
              <Button variant="outline" className="flex-1 bg-transparent border-emerald-700 text-emerald-400 hover:bg-emerald-900 hover:text-white transition-colors">
                Go Back
              </Button>
            </Link>
            <Button type="submit" className="flex-1 bg-gradient-to-r from-emerald-500 to-green-700 hover:from-emerald-400 hover:to-green-600 text-white shadow-md shadow-emerald-500/20">
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-gradient-to-br from-slate-900 via-slate-800 to-black border border-emerald-700 text-white max-w-md shadow-lg shadow-emerald-500/20">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-emerald-400 text-xl drop-shadow-lg">
              <div className="w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              Form Submitted Successfully
            </DialogTitle>
            <DialogDescription className="text-emerald-200 text-base leading-relaxed pt-4">
              Thank you for submitting your vesting schedule request. Our team will review your application and provide
              feedback within <span className="text-emerald-400 font-semibold">48 hours</span>.
              <br />
              <br />
              You will receive an email notification at{' '}
              <span className="text-emerald-400 font-semibold">{formData.email}</span> once the review is complete.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end pt-4">
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="bg-gradient-to-r from-emerald-500 to-green-700 hover:from-emerald-400 hover:to-green-600 text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </form>
  )
}