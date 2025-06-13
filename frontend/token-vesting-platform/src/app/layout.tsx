import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import 'animate.css';
import { Toaster } from "@/components/ui/toaster"
import ClientWrapper from "../app/Client-Wrapper"

const inter = Inter({ subsets: ["latin"] })

import { headers } from "next/headers"
import ContextProvider from "../../context"

export const metadata: Metadata = {
  title: "VestFlow - Token Vesting Platform",
  description: "Secure, transparent, and automated token distribution platform built on Lisk blockchain",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersObj = headers()
  const cookies = (await headersObj).get("cookie")

  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider cookies={cookies}>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </ContextProvider>
        <Toaster />
      </body>
    </html>
  )
}