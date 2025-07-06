"use client"

import { useState } from "react"
import Header from "@/components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Clock, Target, TrendingDown, Share, Heart, ShoppingCart, DollarSign } from "lucide-react"
import Image from "next/image"

const groupBuyingCampaigns = [
  {
    id: 1,
    title: "Organic Coffee Beans - Premium Blend",
    producer: "Maria Santos Cooperative",
    location: "Colombia",
    image: "/placeholder.svg?height=300&width=400",
    currentPrice: 32,
    targetPrice: 24,
    moq: 100,
    currentOrders: 78,
    timeLeft: "2 days 14 hours",
    participants: 45,
    savings: 25,
    description:
      "Premium organic coffee beans from women-led cooperative. Fair trade certified with regenerative farming practices.",
    impact: {
      carbon: "12kg CO₂ offset per bag",
      water: "500L saved per bag",
      families: "50 families supported",
    },
    backers: [
      { name: "Sarah M.", avatar: "/placeholder.svg?height=32&width=32", orders: 5 },
      { name: "John D.", avatar: "/placeholder.svg?height=32&width=32", orders: 3 },
      { name: "Lisa K.", avatar: "/placeholder.svg?height=32&width=32", orders: 8 },
      { name: "Mike R.", avatar: "/placeholder.svg?height=32&width=32", orders: 2 },
    ],
  },
  {
    id: 2,
    title: "Handwoven Bamboo Baskets Set",
    producer: "Artisan Collective Vietnam",
    location: "Vietnam",
    image: "/placeholder.svg?height=300&width=400",
    currentPrice: 89,
    targetPrice: 65,
    moq: 50,
    currentOrders: 32,
    timeLeft: "5 days 8 hours",
    participants: 28,
    savings: 27,
    description: "Beautiful handwoven baskets made from sustainable bamboo. Each set supports local artisan families.",
    impact: {
      carbon: "5kg CO₂ offset per set",
      water: "200L saved per set",
      families: "8 artisan families supported",
    },
    backers: [
      { name: "Emma T.", avatar: "/placeholder.svg?height=32&width=32", orders: 2 },
      { name: "David L.", avatar: "/placeholder.svg?height=32&width=32", orders: 4 },
      { name: "Anna P.", avatar: "/placeholder.svg?height=32&width=32", orders: 1 },
    ],
  },
  {
    id: 3,
    title: "Organic Cotton T-Shirts",
    producer: "Fair Thread Collective",
    location: "India",
    image: "/placeholder.svg?height=300&width=400",
    currentPrice: 45,
    targetPrice: 28,
    moq: 200,
    currentOrders: 156,
    timeLeft: "1 day 6 hours",
    participants: 89,
    savings: 38,
    description: "Soft organic cotton t-shirts made by women-led cooperative. GOTS certified and fair trade.",
    impact: {
      carbon: "3kg CO₂ offset per shirt",
      water: "1000L saved per shirt",
      families: "25 families supported",
    },
    backers: [
      { name: "Rachel W.", avatar: "/placeholder.svg?height=32&width=32", orders: 10 },
      { name: "Tom H.", avatar: "/placeholder.svg?height=32&width=32", orders: 6 },
      { name: "Sophie B.", avatar: "/placeholder.svg?height=32&width=32", orders: 4 },
      { name: "Alex C.", avatar: "/placeholder.svg?height=32&width=32", orders: 8 },
    ],
  },
]

export default function GroupBuying() {
  const [selectedCampaign, setSelectedCampaign] = useState(groupBuyingCampaigns[0])
  const [quantity, setQuantity] = useState(1)

  const progressPercentage = (selectedCampaign.currentOrders / selectedCampaign.moq) * 100
  const remainingOrders = selectedCampaign.moq - selectedCampaign.currentOrders

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-900 dark:text-purple-100 mb-2">Group Buying Campaigns</h1>
          <p className="text-purple-700 dark:text-purple-300">
            Join forces with other conscious consumers to unlock better prices and greater impact
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Campaign List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-4">Active Campaigns</h2>
            {groupBuyingCampaigns.map((campaign) => (
              <Card
                key={campaign.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedCampaign.id === campaign.id
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900"
                    : "hover:border-purple-300"
                }`}
                onClick={() => setSelectedCampaign(campaign)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Image
                      src={campaign.image || "/placeholder.svg"}
                      alt={campaign.title}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1 truncate">{campaign.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{campaign.producer}</p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-purple-600">${campaign.targetPrice}</span>
                        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs">
                          -{campaign.savings}%
                        </Badge>
                      </div>
                      <Progress value={progressPercentage} className="h-2 mb-2" />
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span>
                          {campaign.currentOrders}/{campaign.moq}
                        </span>
                        <span>{campaign.timeLeft}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Campaign Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Campaign Card */}
            <Card className="overflow-hidden">
              <div className="relative">
                <Image
                  src={selectedCampaign.image || "/placeholder.svg"}
                  alt={selectedCampaign.title}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge className="bg-purple-600 text-white">
                    <Clock className="h-3 w-3 mr-1" />
                    {selectedCampaign.timeLeft}
                  </Badge>
                  <Badge className="bg-green-600 text-white">-{selectedCampaign.savings}% OFF</Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h1 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-2">
                      {selectedCampaign.title}
                    </h1>
                    <p className="text-purple-700 dark:text-purple-300 mb-4">
                      {selectedCampaign.producer} • {selectedCampaign.location}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedCampaign.description}</p>

                    {/* Impact Metrics */}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-purple-800 dark:text-purple-200">Your Impact:</h3>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span>🌱</span>
                          <span>{selectedCampaign.impact.carbon}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span>💧</span>
                          <span>{selectedCampaign.impact.water}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span>👨‍👩‍👧‍👦</span>
                          <span>{selectedCampaign.impact.families}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Pricing */}
                    <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Current Price</span>
                        <span className="text-lg line-through text-gray-500">${selectedCampaign.currentPrice}</span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium">Group Price</span>
                        <span className="text-2xl font-bold text-purple-600">${selectedCampaign.targetPrice}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-600 dark:text-green-400">You Save</span>
                        <span className="text-lg font-bold text-green-600">
                          ${selectedCampaign.currentPrice - selectedCampaign.targetPrice}
                        </span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Campaign Progress</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {Math.round(progressPercentage)}%
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="h-3" />
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-purple-600">{selectedCampaign.currentOrders}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Orders</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-orange-600">{remainingOrders}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Needed</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-blue-600">{selectedCampaign.participants}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Backers</div>
                        </div>
                      </div>
                    </div>

                    {/* Order Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <label className="text-sm font-medium">Quantity:</label>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                            -
                          </Button>
                          <Input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                            className="w-20 text-center"
                          />
                          <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                            +
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="font-medium">Total:</span>
                        <span className="text-xl font-bold text-purple-600">
                          ${selectedCampaign.targetPrice * quantity}
                        </span>
                      </div>

                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Join Group Buy
                      </Button>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Heart className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Share className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Backers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  Recent Backers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedCampaign.backers.map((backer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={backer.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {backer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{backer.name}</span>
                      </div>
                      <Badge variant="outline">
                        {backer.orders} {backer.orders === 1 ? "order" : "orders"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card>
              <CardHeader>
                <CardTitle>How Group Buying Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Join Campaign</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Add your order to the group buying campaign
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Reach MOQ</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Campaign succeeds when minimum order quantity is met
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                      <DollarSign className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Get Discount</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Everyone pays the reduced group price</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingDown className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Create Impact</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Bulk orders support sustainable producers
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
