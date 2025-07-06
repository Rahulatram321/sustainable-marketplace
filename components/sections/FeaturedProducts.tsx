import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { MapPin, Users, Leaf, Star, Eye, ShoppingCart } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "Hand-Woven Recycled Rugs",
    producer: "Fatima Al-Rashid",
    location: "Morocco",
    price: 89,
    originalPrice: 120,
    image: "/placeholder.svg?height=300&width=400",
    story: "Meet Fatima - she hand-weaves each rug using recycled materials from local textile waste",
    impact: {
      water: "200L saved",
      carbon: "5kg CO₂ offset",
      families: 1,
    },
    funding: {
      current: 75,
      goal: 100,
      backers: 23,
    },
    rating: 4.9,
    reviews: 127,
    tags: ["Recycled", "Fair Trade", "Women-Led"],
  },
  {
    id: 2,
    name: "Organic Coffee Beans",
    producer: "Maria Santos Cooperative",
    location: "Colombia",
    price: 24,
    originalPrice: 32,
    image: "/placeholder.svg?height=300&width=400",
    story: "Grown by 50 women farmers using regenerative practices that restore soil health",
    impact: {
      water: "500L saved",
      carbon: "12kg CO₂ offset",
      families: 50,
    },
    funding: {
      current: 92,
      goal: 100,
      backers: 156,
    },
    rating: 4.8,
    reviews: 89,
    tags: ["Organic", "Women-Led", "Carbon Negative"],
  },
  {
    id: 3,
    name: "Bamboo Furniture Set",
    producer: "Green Craft Collective",
    location: "Vietnam",
    price: 299,
    originalPrice: 450,
    image: "/placeholder.svg?height=300&width=400",
    story: "Crafted from fast-growing bamboo by artisans earning 3x local minimum wage",
    impact: {
      water: "1000L saved",
      carbon: "25kg CO₂ offset",
      families: 8,
    },
    funding: {
      current: 45,
      goal: 100,
      backers: 12,
    },
    rating: 4.7,
    reviews: 34,
    tags: ["Sustainable", "Handcrafted", "Fair Wage"],
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-green-900 dark:text-green-100 mb-4">
            Featured Impact Products
          </h2>
          <p className="text-lg text-green-700 dark:text-green-300 max-w-2xl mx-auto">
            Every product tells a story of positive change. Meet the makers and see the impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-xl transition-shadow border-2 hover:border-green-300 dark:hover:border-green-700"
            >
              <div className="relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} className="bg-green-600 text-white text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button size="sm" variant="secondary" className="absolute top-4 right-4 bg-white/90 hover:bg-white">
                  <Eye className="h-4 w-4 mr-1" />
                  AR View
                </Button>
              </div>

              <CardContent className="p-6 space-y-4">
                {/* Product Info */}
                <div>
                  <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {product.producer} • {product.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium ml-1">{product.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* Producer Story */}
                <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-300 italic">"{product.story}"</p>
                </div>

                {/* Impact Metrics */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 text-sm">Your Impact:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      💧 {product.impact.water}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      🌱 {product.impact.carbon}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      👨‍👩‍👧‍👦 {product.impact.families} families
                    </Badge>
                  </div>
                </div>

                {/* Funding Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700 dark:text-green-300">Funding Goal</span>
                    <span className="font-medium">{product.funding.current}%</span>
                  </div>
                  <Progress value={product.funding.current} className="h-2" />
                  <div className="flex justify-between text-xs text-green-600 dark:text-green-400">
                    <span>{product.funding.backers} backers</span>
                    <span>{100 - product.funding.current}% to go</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-900 dark:text-green-100">${product.price}</span>
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  </div>
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </Badge>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <div className="flex gap-2 w-full">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Users className="h-4 w-4 mr-1" />
                    Group Buy
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Leaf className="h-4 w-4 mr-1" />
                    NFT Passport
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
