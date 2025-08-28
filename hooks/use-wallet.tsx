"use client"

import { useState, createContext, useContext, type ReactNode } from "react"

export interface WalletState {
  isConnected: boolean
  address: string | null
  balance: string | null
  network: string
  isConnecting: boolean
}

export interface WalletContextType extends WalletState {
  connect: () => Promise<void>
  disconnect: () => void
  switchNetwork: (network: string) => Promise<void>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    network: "intuition",
    isConnecting: false,
  })

  // Mock wallet connection - in real implementation, this would integrate with MetaMask, WalletConnect, etc.
  const connect = async () => {
    setWalletState((prev) => ({ ...prev, isConnecting: true }))

    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock successful connection
    setWalletState({
      isConnected: true,
      address: "0x1234...5678",
      balance: "2.45",
      network: "intuition",
      isConnecting: false,
    })
  }

  const disconnect = () => {
    setWalletState({
      isConnected: false,
      address: null,
      balance: null,
      network: "intuition",
      isConnecting: false,
    })
  }

  const switchNetwork = async (network: string) => {
    setWalletState((prev) => ({ ...prev, network }))
  }

  return (
    <WalletContext.Provider value={{ ...walletState, connect, disconnect, switchNetwork }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
