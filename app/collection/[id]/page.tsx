"use client"

import { useState } from "react"
import { ArrowLeft, Share, Heart, MoreHorizontal, Verified } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketplaceHeader } from "@/components/marketplace-header"
import { useSearch } from "@/hooks/use-search"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function CollectionPage() {
  const params = useParams()
  const { getCollectionById } = useSearch()
  const collection = getCollectionById(params.id as string)

  const [isFollowing, setIsFollowing] = useState(false)

  if (!collection) {
    return (
      <div className="min-h-screen bg-background">
        <MarketplaceHeader />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Collection not found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Mock NFT items for this collection
  const nftItems = Array.from({ length: 12 }, (_, i) => ({
    id: `${collection.id}-${i + 1}`,
    name: `${collection.name} #${i + 1}`,
    image: collection.image,
    price: (Math.random() * 2 + 0.1).toFixed(2),
    rarity: ["Common", "Rare", "Epic", "Legendary"][Math.floor(Math.random() * 4)],
    lastSale: (Math.random() * 1.5 + 0.05).toFixed(2),
  }))

  return (
    <div className="min-h-screen bg-background">
      <MarketplaceHeader />

      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Link href="/search">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
        </Link>

        {/* Collection Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-80">
              <img
                src={collection.image || "/placeholder.svg"}
                alt={collection.name}
                className="w-full aspect-square rounded-lg object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold">{collection.name}</h1>
                    {collection.verified && <Verified className="h-6 w-6 text-primary" />}
                  </div>
                  <p className="text-muted-foreground mb-4">by {collection.creator}</p>
                  <p className="text-foreground mb-6">{collection.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button variant={isFollowing ? "default" : "outline"} onClick={() => setIsFollowing(!isFollowing)}>
                    <Heart className={`h-4 w-4 mr-2 ${isFollowing ? "fill-current" : ""}`} />
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Items</p>
                  <p className="text-2xl font-bold">{collection.items.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Owners</p>
                  <p className="text-2xl font-bold">{collection.owners.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Floor Price</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">{collection.floorPrice} ETH</p>
                    <Badge variant={collection.change.startsWith("+") ? "default" : "destructive"} className="text-xs">
                      {collection.change}
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Volume</p>
                  <p className="text-2xl font-bold">{collection.totalVolume} ETH</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="items" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="items" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {nftItems.map((item) => (
                <Link key={item.id} href={`/nft/${item.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="aspect-square relative">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2" variant="secondary">
                        {item.rarity}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2 truncate">{item.name}</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Price</p>
                          <p className="font-semibold">{item.price} ETH</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Last Sale</p>
                          <p className="text-sm">{item.lastSale} ETH</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">Activity feed coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">Analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{collection.description}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Blockchain</p>
                        <p className="capitalize">{collection.blockchain}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p>{collection.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
