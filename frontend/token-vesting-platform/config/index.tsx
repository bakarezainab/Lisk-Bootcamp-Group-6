// import { cookieStorage, createStorage } from "@wagmi/core"
// import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
// import { mainnet } from "@reown/appkit/networks"
// import type { Chain } from "viem"

// // Get projectId from https://cloud.reown.com
// export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

// if (!projectId) {
//   throw new Error("Project ID is not defined")
// }

// // Define Lisk Sepolia network
// export const liskSepolia: Chain = {
//   id: 14418302,
//   name: "Lisk Sepolia",
//   nativeCurrency: {
//     decimals: 18,
//     name: "Lisk Sepolia Ether",
//     symbol: "ETH",
//   },
//   rpcUrls: {
//     default: {
//       http: ["https://rpc.sepolia-api.lisk.com"],
//     },
//     public: {
//       http: ["https://rpc.sepolia-api.lisk.com"],
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: "Lisk Explorer",
//       url: "https://sepolia-explorer.lisk.com",
//     },
//   },
//   testnet: true,
// }

// export const networks = [mainnet, liskSepolia]

// // Set up the Wagmi Adapter (Config)
// export const wagmiAdapter = new WagmiAdapter({
//   storage: createStorage({
//     storage: cookieStorage,
//   }),
//   ssr: true,
//   projectId,
//   networks,
// })

// export const config = wagmiAdapter.wagmiConfig

import { cookieStorage, createStorage } from "@wagmi/core"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import { mainnet } from "@reown/appkit/networks"
import type { Chain } from "viem"

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) {
  throw new Error("Project ID is not defined")
}

// Define Lisk Sepolia network with correct configuration
export const liskSepolia: Chain = {
  id: 4202,
  name: "Lisk Sepolia Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Sepolia Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia-api.lisk.com"],
      webSocket: ["wss://ws.sepolia-api.lisk.com"],
    },
    public: {
      http: ["https://rpc.sepolia-api.lisk.com"],
      webSocket: ["wss://ws.sepolia-api.lisk.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Lisk Sepolia Explorer",
      url: "https://sepolia-blockscout.lisk.com",
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 0,
    },
  },
  testnet: true,
}

export const networks = [liskSepolia, mainnet]

// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
})

export const config = wagmiAdapter.wagmiConfig
