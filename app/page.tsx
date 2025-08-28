"use client"

import { Search, TrendingUp, TrendingDown, Verified } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function NFTMarketplace() {
  const featuredCollections: any[] = []
  const trendingCollections: any[] = []

  const categories = ["All", "Art", "Gaming", "Music", "Photography", "Sports", "Utility", "Virtual Worlds"]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-primary">IntuitionSea</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  Explore
                </a>
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
              <Button variant="outline">Connect Wallet</Button>
              <Button>Profile</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Hero Section */}
            <div className="mb-8">
              <Card className="overflow-hidden">
                <div className="relative h-96 bg-gradient-to-r from-primary/20 to-accent/20">
                  <img
                    src="/futuristic-nft-marketplace-banner.png"
                    alt="Featured Collection"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h2 className="text-4xl font-bold mb-2">Discover Digital Art on Intuition</h2>
                      <p className="text-xl mb-4">The premier NFT marketplace for the Intuition blockchain</p>
                      <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => (window.location.href = "/search")}
                      >
                        Explore Collections
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Featured Collections */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6">Featured Collections</h3>
              {featuredCollections.length === 0 ? (
                <Card className="p-12 text-center">
                  <div className="text-muted-foreground">
                    <h4 className="text-lg font-medium mb-2">No Collections Yet</h4>
                    <p>Collections will appear here once they're minted on the Intuition blockchain.</p>
                  </div>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredCollections.map((collection, index) => (
                    <Card
                      key={collection.name}
                      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => (window.location.href = `/collection/${index + 1}`)}
                    >
                      <div className="aspect-square relative">
                        <img
                          src={collection.image || "/placeholder.svg"}
                          alt={collection.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold truncate">{collection.name}</h4>
                          {collection.verified && <Verified className="h-4 w-4 text-primary" />}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">by {collection.creator}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">Floor price</p>
                            <p className="font-semibold">{collection.floorPrice} TTRUST</p>
                          </div>
                          <Badge
                            variant={collection.change.startsWith("+") ? "default" : "destructive"}
                            className="text-xs"
                          >
                            {collection.change}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Trending Collections</h3>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>

                {trendingCollections.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">No trending collections yet.</p>
                    <p className="text-xs mt-1">Check back once NFTs are minted!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {trendingCollections.map((collection, index) => (
                      <div
                        key={collection.name}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                      >
                        <span className="text-sm font-medium text-muted-foreground w-6">{index + 1}</span>
                        <img
                          src={collection.image || "/placeholder.svg"}
                          alt={collection.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <p className="font-medium truncate">{collection.name}</p>
                            {collection.verified && <Verified className="h-3 w-3 text-primary flex-shrink-0" />}
                          </div>
                          <p className="text-sm text-muted-foreground">{collection.floorPrice} TTRUST</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {collection.change.startsWith("+") ? (
                            <TrendingUp className="h-3 w-3 text-primary" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-destructive" />
                          )}
                          <span
                            className={`text-xs font-medium ${
                              collection.change.startsWith("+") ? "text-primary" : "text-destructive"
                            }`}
                          >
                            {collection.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
