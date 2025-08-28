"use client"

import { useState } from "react"
import { Settings, Share, MoreHorizontal, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MarketplaceHeader } from "@/components/marketplace-header"
import { ListNFTModal } from "@/components/list-nft-modal"
import { useWallet } from "@/hooks/use-wallet"
import Link from "next/link"

export default function ProfilePage() {
  const { isConnected, address, balance } = useWallet()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterBy, setFilterBy] = useState("all")
  const [listModalOpen, setListModalOpen] = useState(false)
  const [selectedNFT, setSelectedNFT] = useState<any>(null)

  const userNFTs: any[] = []

  const stats = {
    totalValue: "0",
    totalItems: userNFTs.length,
    collections: new Set(userNFTs.map((nft) => nft.collection)).size,
  }

  const handleListNFT = (nft: any) => {
    setSelectedNFT(nft)
    setListModalOpen(true)
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <MarketplaceHeader />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-muted-foreground mb-6">Connect your wallet to view your NFT collection</p>
          <Button onClick={() => (window.location.href = "/")}>Go Home</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <MarketplaceHeader />

      <div className="container mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {address?.slice(2, 4).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">My Collection</h1>
                <p className="text-muted-foreground mb-2">{address}</p>
                <p className="text-sm text-muted-foreground">Member since January 2024</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Share className="h-4 w-4" />
              </Button>
              <Link href="/profile/settings">
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-2xl font-bold">{stats.totalItems}</p>
                <p className="text-sm text-muted-foreground">Items</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-2xl font-bold">{stats.collections}</p>
                <p className="text-sm text-muted-foreground">Collections</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-2xl font-bold">{stats.totalValue} TTRUST</p>
                <p className="text-sm text-muted-foreground">Total Value</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-2xl font-bold">{balance} TTRUST</p>
                <p className="text-sm text-muted-foreground">Wallet Balance</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="collected" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="collected">Collected</TabsTrigger>
              <TabsTrigger value="created">Created</TabsTrigger>
              <TabsTrigger value="favorited">Favorited</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="listed">Listed</SelectItem>
                  <SelectItem value="unlisted">Not Listed</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="collected">
            {userNFTs.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="text-muted-foreground">
                  <h4 className="text-lg font-medium mb-2">No NFTs Yet</h4>
                  <p>Your NFTs will appear here once you mint or purchase them on the Intuition blockchain.</p>
                  <Button className="mt-4" onClick={() => (window.location.href = "/search")}>
                    Explore Collections
                  </Button>
                </div>
              </Card>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {userNFTs.map((nft) => (
                  <Card key={nft.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <Link href={`/nft/${nft.id}`}>
                      <div className="aspect-square relative">
                        <img
                          src={nft.image || "/placeholder.svg"}
                          alt={nft.name}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-2 right-2" variant="secondary">
                          {nft.rarity}
                        </Badge>
                        {nft.isListed && (
                          <Badge className="absolute top-2 left-2" variant="default">
                            Listed
                          </Badge>
                        )}
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-1 truncate">{nft.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{nft.collection}</p>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Floor Price</p>
                          <p className="font-semibold">{nft.price} TTRUST</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Last Sale</p>
                          <p className="text-sm">{nft.lastSale} TTRUST</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {nft.isListed ? (
                          <>
                            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                              Edit Listing
                            </Button>
                            <Button size="sm" variant="destructive" className="flex-1">
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button size="sm" className="flex-1" onClick={() => handleListNFT(nft)}>
                              List for Sale
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                              Transfer
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {userNFTs.map((nft) => (
                  <Card key={nft.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <Link href={`/nft/${nft.id}`}>
                          <img
                            src={nft.image || "/placeholder.svg"}
                            alt={nft.name}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                        </Link>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold mb-1">{nft.name}</h4>
                          <p className="text-muted-foreground mb-2">{nft.collection}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{nft.rarity}</Badge>
                            {nft.isListed && <Badge variant="default">Listed</Badge>}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="mb-2">
                            <p className="text-sm text-muted-foreground">Floor Price</p>
                            <p className="text-lg font-semibold">{nft.price} TTRUST</p>
                          </div>
                          <div className="flex gap-2">
                            {nft.isListed ? (
                              <>
                                <Button size="sm" variant="outline">
                                  Edit Listing
                                </Button>
                                <Button size="sm" variant="destructive">
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button size="sm" onClick={() => handleListNFT(nft)}>
                                  List for Sale
                                </Button>
                                <Button size="sm" variant="outline">
                                  Transfer
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="created">
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No created items yet</p>
                <Button className="mt-4">Create Your First NFT</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorited">
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No favorited items yet</p>
                <Button className="mt-4 bg-transparent" variant="outline">
                  Explore Collections
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">Activity history coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {selectedNFT && (
        <ListNFTModal
          isOpen={listModalOpen}
          onClose={() => {
            setListModalOpen(false)
            setSelectedNFT(null)
          }}
          nft={selectedNFT}
        />
      )}
    </div>
  )
}
