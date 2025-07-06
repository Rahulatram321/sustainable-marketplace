"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Droplets, Leaf, Users, DollarSign, TrendingUp, Heart } from "lucide-react"

const impactData = [
  {
    icon: Droplets,
    title: "Water Saved",
    value: "2.4M",
    unit: "Liters",
    progress: 78,
    color: "blue",
    description: "Through sustainable farming practices",
  },
  {
    icon: Leaf,
    title: "Carbon Offset",
    value: "156K",
    unit: "Tons CO₂",
    progress: 65,
    color: "green",
    description: "Via regenerative agriculture",
  },
  {
    icon: Users,
    title: "Lives Impacted",
    value: "45K",
    unit: "Families",
    progress: 89,
    color: "purple",
    description: "Fair wage employment created",
  },
  {
    icon: DollarSign,
    title: "Fair Wages",
    value: "$2.8M",
    unit: "Distributed",
    progress: 92,
    color: "yellow",
    description: "Above market rate payments",
  },
]

export default function ImpactStats() {
  return (
    <section className="py-16 px-4 bg-white dark:bg-green-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <Heart className="w-4 h-4 mr-2" />
            Real-Time Impact Dashboard
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-green-900 dark:text-green-100 mb-4">
            Your Purchases Create Real Change
          </h2>
          <p className="text-lg text-green-700 dark:text-green-300 max-w-2xl mx-auto">
            Every transaction is tracked on blockchain, showing measurable environmental and social impact
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactData.map((item, index) => (
            <Card key={index} className="border-2 hover:border-green-300 dark:hover:border-green-700 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full bg-${item.color}-100 dark:bg-${item.color}-900`}>
                    <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-green-900 dark:text-green-100">{item.value}</span>
                      <span className="text-sm text-green-600 dark:text-green-400">{item.unit}</span>
                    </div>
                    <h3 className="font-semibold text-green-800 dark:text-green-200">{item.title}</h3>
                  </div>

                  <Progress value={item.progress} className="h-2" />

                  <p className="text-xs text-green-600 dark:text-green-400">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Impact Calculator */}
        <div className="mt-12 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 rounded-2xl">
          <div className="text-center">
            <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">🎯 Your Next Purchase Impact</h3>
            <p className="text-green-700 dark:text-green-300 mb-4">
              Buying organic coffee from Maria's farm will save 50L water and support 1 family
            </p>
            <div className="flex justify-center gap-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                💧 50L Water Saved
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                🌱 2kg CO₂ Offset
              </Badge>
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
              >
                👨‍👩‍👧‍👦 1 Family Supported
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
