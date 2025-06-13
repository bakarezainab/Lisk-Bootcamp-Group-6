"use client"

import { Button } from "@/components/ui/button"
import { Bell, Settings, Menu, X } from "lucide-react"
import { WalletButton } from "@/components/wallet/wallet-button"
import { NetworkIndicator } from "@/components/wallet/network-indicator"
import { useState } from "react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TV</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 hidden sm:block">
              Token Vesting
            </h1>
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 sm:hidden">TV</h1>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <NetworkIndicator />
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <WalletButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <NetworkIndicator />
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-col space-y-4">
            <WalletButton />
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="flex-1">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
