"use client"

import { wagmiAdapter, projectId, liskSepolia } from "../config"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createAppKit } from "@reown/appkit/react"
import { mainnet} from "@reown/appkit/networks"
import type { ReactNode } from "react"
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi"

// Set up queryClient
const queryClient = new QueryClient()

if (!projectId) {
  throw new Error("Project ID is not defined")
}

// Set up metadata
const metadata = {
  name: "Token Vesting Platform",
  description: "EVM Token Vesting Platform",
  url: "https://token-vesting-platform.com", // origin must match your domain & subdomain
  icons: ["https://placeholder.svg?height=64&width=64"],
}

// Create the modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, liskSepolia],
  defaultNetwork: liskSepolia, // Set Lisk Sepolia as default
  metadata: metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
})

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider
