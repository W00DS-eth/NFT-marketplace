"use client"

import { Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import Link from "next/link"

export function MarketplaceHeader() {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary cursor-pointer">IntuitionSea</h1>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/search" className="text-foreground hover:text-primary transition-colors">
                Explore
              </Link>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Stats
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Resources
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Create
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search collections, NFTs, and accounts"
                className="pl-10 w-80 cursor-pointer"
                onClick={() => (window.location.href = "/search")}
                readOnly
              />
            </div>
            <WalletConnectButton />
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
