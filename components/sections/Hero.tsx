"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Leaf, Users, Globe } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 opacity-50" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                🌱 Blockchain-Powered Sustainability
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-green-900 dark:text-green-100 leading-tight">
                Trade with
                <span className="text-green-600 dark:text-green-400"> Purpose</span>,
                <br />
                Impact with
                <span className="text-emerald-600 dark:text-emerald-400"> Transparency</span>
              </h1>
              <p className="text-xl text-green-700 dark:text-green-300 max-w-lg">
                Connect with verified sustainable producers worldwide. Every purchase creates measurable impact, tracked
                on blockchain.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/marketplace">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  Explore Marketplace
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-green-600 mr-2" />
                  <span className="text-2xl font-bold text-green-900 dark:text-green-100">10K+</span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">Verified Producers</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Globe className="h-6 w-6 text-green-600 mr-2" />
                  <span className="text-2xl font-bold text-green-900 dark:text-green-100">50+</span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">Countries</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Leaf className="h-6 w-6 text-green-600 mr-2" />
                  <span className="text-2xl font-bold text-green-900 dark:text-green-100">1M+</span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">CO₂ Tons Saved</p>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-green-200 to-emerald-300 dark:from-green-800 dark:to-emerald-900 rounded-3xl p-8 shadow-2xl">
              <div className="h-full w-full bg-white dark:bg-green-950 rounded-2xl p-6 flex flex-col justify-center items-center space-y-6">
                <div className="text-6xl">🌍</div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-green-900 dark:text-green-100">Real-Time Impact</h3>
                  <p className="text-green-700 dark:text-green-300">
                    Track your environmental impact with every purchase
                  </p>
                </div>
                <div className="w-full bg-green-100 dark:bg-green-900 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full w-3/4 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
