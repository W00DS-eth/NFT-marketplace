"use client"

import { useState } from "react"
import { ArrowLeft, Heart, Share, MoreHorizontal, Clock, TrendingUp, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MarketplaceHeader } from "@/components/marketplace-header"
import { useWallet } from "@/hooks/use-wallet"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function NFTDetailPage() {
  const params = useParams()
  const { isConnected, address } = useWallet()
  const [isFavorited, setIsFavorited] = useState(false)
  const [offerAmount, setOfferAmount] = useState("")
  const [showMakeOffer, setShowMakeOffer] = useState(false)

  // Mock NFT data - in real app, this would be fetched based on ID
  const nft = {
    id: params.id as string,
    name: "Intuition Genesis #1234",
    collection: "Intuition Genesis",
    collectionId: "1",
    image: "/futuristic-digital-art.png",
    price: "0.15",
    usdPrice: "245.50",
    owner: "0x1234...5678",
    creator: "intuition-labs",
    description:
      "A unique piece from the first official collection on the Intuition blockchain. This NFT represents the genesis of digital art on our platform.",
    rarity: "Rare",
    rank: "#234",
    traits: [
      { trait_type: "Background", value: "Cosmic", rarity: "12%" },
      { trait_type: "Eyes", value: "Glowing", rarity: "8%" },
      { trait_type: "Aura", value: "Golden", rarity: "5%" },
      { trait_type: "Pattern", value: "Geometric", rarity: "15%" },
    ],
    history: [
      { event: "Sale", price: "0.12", from: "0xabcd...efgh", to: "0x1234...5678", date: "2 days ago" },
      { event: "Transfer", price: "-", from: "0x9876...5432", to: "0xabcd...efgh", date: "1 week ago" },
      { event: "Mint", price: "0.05", from: "0x0000...0000", to: "0x9876...5432", date: "2 weeks ago" },
    ],
    offers: [
      { from: "0xdef0...1234", amount: "0.13", expires: "in 2 days" },
      { from: "0x5678...9abc", amount: "0.12", expires: "in 5 days" },
      { from: "0xfedc...ba98", amount: "0.11", expires: "in 1 day" },
    ],
  }

  const isOwner = address === nft.owner

  const handleBuyNow = () => {
    // Mock purchase logic
    alert("Purchase functionality would be implemented here with smart contract integration")
  }

  const handleMakeOffer = () => {
    if (!offerAmount) return
    // Mock offer logic
    alert(`Offer of ${offerAmount} ETH would be submitted here`)
    setOfferAmount("")
    setShowMakeOffer(false)
  }

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* NFT Image */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="aspect-square relative">
                <img src={nft.image || "/placeholder.svg"} alt={nft.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setIsFavorited(!isFavorited)}
                    className="bg-black/50 hover:bg-black/70"
                  >
                    <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : "text-white"}`} />
                  </Button>
                  <Button variant="secondary" size="icon" className="bg-black/50 hover:bg-black/70">
                    <Share className="h-4 w-4 text-white" />
                  </Button>
                  <Button variant="secondary" size="icon" className="bg-black/50 hover:bg-black/70">
                    <MoreHorizontal className="h-4 w-4 text-white" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{nft.description}</p>
              </CardContent>
            </Card>

            {/* Traits */}
            <Card>
              <CardHeader>
                <CardTitle>Traits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {nft.traits.map((trait, index) => (
                    <div key={index} className="bg-muted rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{trait.trait_type}</p>
                      <p className="font-semibold">{trait.value}</p>
                      <p className="text-xs text-muted-foreground">{trait.rarity}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* NFT Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <Link href={`/collection/${nft.collectionId}`}>
                <Badge variant="secondary" className="mb-2 cursor-pointer hover:bg-secondary/80">
                  {nft.collection}
                </Badge>
              </Link>
              <h1 className="text-3xl font-bold mb-2">{nft.name}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Owned by {isOwner ? "you" : nft.owner}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  1.2k views
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  89 favorites
                </span>
              </div>
            </div>

            {/* Price & Actions */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current price</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold">{nft.price} ETH</p>
                      <p className="text-muted-foreground">${nft.usdPrice}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">{nft.rarity}</Badge>
                    <p className="text-sm text-muted-foreground mt-1">{nft.rank} of 10,000</p>
                  </div>
                </div>

                {isConnected ? (
                  isOwner ? (
                    <div className="space-y-3">
                      <Button className="w-full" size="lg">
                        List for Sale
                      </Button>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="bg-transparent">
                          Lower Price
                        </Button>
                        <Button variant="outline" className="bg-transparent">
                          Transfer
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button onClick={handleBuyNow} className="w-full" size="lg">
                        Buy Now
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowMakeOffer(!showMakeOffer)}
                        className="w-full bg-transparent"
                      >
                        Make Offer
                      </Button>

                      {showMakeOffer && (
                        <div className="space-y-3 p-4 bg-muted rounded-lg">
                          <div>
                            <Label htmlFor="offer">Offer Amount (ETH)</Label>
                            <Input
                              id="offer"
                              type="number"
                              placeholder="0.1"
                              value={offerAmount}
                              onChange={(e) => setOfferAmount(e.target.value)}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleMakeOffer} className="flex-1">
                              Submit Offer
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setShowMakeOffer(false)}
                              className="bg-transparent"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                ) : (
                  <Button className="w-full" size="lg" disabled>
                    Connect Wallet to Buy
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="offers" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="offers">Offers</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>

              <TabsContent value="offers" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    {nft.offers.length > 0 ? (
                      <div className="space-y-4">
                        {nft.offers.map((offer, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div>
                              <p className="font-semibold">{offer.amount} ETH</p>
                              <p className="text-sm text-muted-foreground">from {offer.from}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {offer.expires}
                              </p>
                              {isOwner && (
                                <Button size="sm" className="mt-1">
                                  Accept
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">No offers yet</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {nft.history.map((event, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border-b last:border-b-0">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <TrendingUp className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold">{event.event}</p>
                              <p className="text-sm text-muted-foreground">
                                from {event.from} to {event.to}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            {event.price !== "-" && <p className="font-semibold">{event.price} ETH</p>}
                            <p className="text-sm text-muted-foreground">{event.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contract Address</span>
                        <span className="font-mono text-sm">0x1234...abcd</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Token ID</span>
                        <span className="font-mono text-sm">1234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Token Standard</span>
                        <span>ERC-721</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Blockchain</span>
                        <span>Intuition</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Creator Royalties</span>
                        <span>5%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
