"use client"

import { useState } from "react"
import { X, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ListNFTModalProps {
  isOpen: boolean
  onClose: () => void
  nft: {
    id: string
    name: string
    image: string
    collection: string
  }
}

export function ListNFTModal({ isOpen, onClose, nft }: ListNFTModalProps) {
  const [listingType, setListingType] = useState("fixed")
  const [price, setPrice] = useState("")
  const [duration, setDuration] = useState("7")
  const [reservePrice, setReservePrice] = useState("")

  if (!isOpen) return null

  const handleList = () => {
    // Mock listing logic
    alert(`NFT would be listed for ${price} ETH`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>List NFT for Sale</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* NFT Preview */}
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <img src={nft.image || "/placeholder.svg"} alt={nft.name} className="w-12 h-12 rounded-lg object-cover" />
            <div>
              <p className="font-semibold">{nft.name}</p>
              <p className="text-sm text-muted-foreground">{nft.collection}</p>
            </div>
          </div>

          {/* Listing Type */}
          <div>
            <Label>Listing Type</Label>
            <Select value={listingType} onValueChange={setListingType}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">Fixed Price</SelectItem>
                <SelectItem value="auction">Timed Auction</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price">{listingType === "fixed" ? "Price" : "Starting Price"} (ETH)</Label>
            <div className="relative mt-2">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="price"
                type="number"
                placeholder="0.1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Reserve Price for Auctions */}
          {listingType === "auction" && (
            <div>
              <Label htmlFor="reserve">Reserve Price (ETH)</Label>
              <div className="relative mt-2">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="reserve"
                  type="number"
                  placeholder="0.05"
                  value={reservePrice}
                  onChange={(e) => setReservePrice(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          )}

          {/* Duration */}
          <div>
            <Label>Duration</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 day</SelectItem>
                <SelectItem value="3">3 days</SelectItem>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Fees */}
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>Service Fee</span>
              <span>2.5%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Creator Royalty</span>
              <span>5%</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>You will receive</span>
              <span>{price ? (Number.parseFloat(price) * 0.925).toFixed(3) : "0"} ETH</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleList} className="flex-1" disabled={!price}>
              List NFT
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
