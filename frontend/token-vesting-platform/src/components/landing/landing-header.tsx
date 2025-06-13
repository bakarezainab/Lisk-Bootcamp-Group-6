"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Shield, Users } from "lucide-react"

export function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-green-600 to-green-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-lg">V</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">VestFlow</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="#features" className="text-slate-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="#stats" className="text-slate-300 hover:text-white transition-colors">
              Stats
            </Link>
            <Link href="/community" className="text-slate-300 hover:text-white transition-colors">
              Community
            </Link>
            <Link href="/blog" className="text-slate-300 hover:text-white transition-colors">
              Blogs
            </Link>
            <Link href="/vesting-form" className="text-slate-300 hover:text-white transition-colors">
              Vesting-Form
            </Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Link href="/admin" className="btn btn-sm flex items-center justify-center gap-1 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-600 hover:to-green-600">
              {/* <Button
                variant="outline"
                size="sm"
                className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
              > */}
              <Shield className="h-4 w-4 mr-1 lg:mr-2" />
              <span className="hidden lg:inline">Admin Portal</span>
              <span className="lg:hidden">Admin</span>
              {/* </Button> */}
            </Link>
            <Link href="/investor" className="btn btn-sm flex items-center justify-center gap-1 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-600 hover:to-green-600">
              {/* <Button
                size="sm"
                
              > */}
              <Users className="h-4 w-4 mr-1 lg:mr-2" />
              <span className="hidden lg:inline">Investor Portal</span>
              <span className="lg:hidden">Investor</span>
              {/* </Button> */}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-slate-300 hover:text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700">
            <nav className="flex flex-col space-y-4">
              <Link
                href="#features"
                className="text-slate-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-slate-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="#stats"
                className="text-slate-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Stats
              </Link>
              <div className="flex flex-col space-y-3 pt-4">
                <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Admin Portal
                  </Button>
                </Link>
                <Link href="/investor" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-600 hover:to-green-600">
                    <Users className="h-4 w-4 mr-2" />
                    Investor Portal
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
