"use client"

import { useState, useMemo } from "react"

export interface NFTCollection {
  id: string
  name: string
  creator: string
  description: string
  image: string
  floorPrice: string
  totalVolume: string
  items: number
  owners: number
  change: string
  verified: boolean
  category: string
  blockchain: "intuition" | "ethereum" | "polygon"
}

export interface NFTItem {
  id: string
  name: string
  collection: string
  image: string
  price: string
  owner: string
  rarity: string
  traits: { trait_type: string; value: string }[]
}

const mockCollections: NFTCollection[] = []

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("trending")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])

  const filteredCollections = useMemo(() => {
    let filtered = mockCollections

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (collection) =>
          collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          collection.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
          collection.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((collection) => collection.category === selectedCategory)
    }

    // Filter by price range
    filtered = filtered.filter((collection) => {
      const price = Number.parseFloat(collection.floorPrice)
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Sort collections
    switch (sortBy) {
      case "trending":
        filtered.sort(
          (a, b) => Number.parseFloat(b.change.replace("%", "")) - Number.parseFloat(a.change.replace("%", "")),
        )
        break
      case "price-low":
        filtered.sort((a, b) => Number.parseFloat(a.floorPrice) - Number.parseFloat(b.floorPrice))
        break
      case "price-high":
        filtered.sort((a, b) => Number.parseFloat(b.floorPrice) - Number.parseFloat(a.floorPrice))
        break
      case "volume":
        filtered.sort(
          (a, b) =>
            Number.parseFloat(b.totalVolume.replace(",", "")) - Number.parseFloat(a.totalVolume.replace(",", "")),
        )
        break
      default:
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, sortBy, priceRange])

  const getCollectionById = (id: string) => {
    return mockCollections.find((collection) => collection.id === id)
  }

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    filteredCollections,
    getCollectionById,
    allCollections: mockCollections,
  }
}
