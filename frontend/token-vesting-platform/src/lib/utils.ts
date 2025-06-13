import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility functions for formatting
export function formatTokenAmount(amount: number): string {
  return new Intl.NumberFormat().format(amount)
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function calculateVestingProgress(startDate: Date, endDate: Date, currentDate: Date = new Date()): number {
  const totalDuration = endDate.getTime() - startDate.getTime()
  const elapsed = currentDate.getTime() - startDate.getTime()

  if (elapsed <= 0) return 0
  if (elapsed >= totalDuration) return 100

  return (elapsed / totalDuration) * 100
}

export function calculateClaimableAmount(
  totalAmount: number,
  startDate: Date,
  endDate: Date,
  claimedAmount: number,
  currentDate: Date = new Date(),
): number {
  const progress = calculateVestingProgress(startDate, endDate, currentDate)
  const vestedAmount = (totalAmount * progress) / 100
  return Math.max(0, vestedAmount - claimedAmount)
}
