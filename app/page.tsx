import { Suspense } from "react"
import Header from "@/components/layout/Header"
import Hero from "@/components/sections/Hero"
import FeaturedProducts from "@/components/sections/FeaturedProducts"
import ImpactStats from "@/components/sections/ImpactStats"
import VoiceInterface from "@/components/features/VoiceInterface"
import AIAssistant from "@/components/features/AIAssistant"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
      <Header />
      <main>
        <Hero />
        <ImpactStats />
        <Suspense fallback={<div className="h-96 animate-pulse bg-green-100 dark:bg-green-900" />}>
          <FeaturedProducts />
        </Suspense>

        {/* Quick Access to Key Features */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-800 dark:text-green-200">
              Explore Our Unique Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/esg-dashboard">
                <Button
                  variant="outline"
                  className="h-24 w-full flex flex-col gap-2 hover:bg-green-50 dark:hover:bg-green-900 bg-transparent"
                >
                  <span className="text-2xl">📊</span>
                  <span>ESG Dashboard</span>
                </Button>
              </Link>
              <Link href="/ar-preview">
                <Button
                  variant="outline"
                  className="h-24 w-full flex flex-col gap-2 hover:bg-green-50 dark:hover:bg-green-900 bg-transparent"
                >
                  <span className="text-2xl">🥽</span>
                  <span>AR Preview</span>
                </Button>
              </Link>
              <Link href="/group-buying">
                <Button
                  variant="outline"
                  className="h-24 w-full flex flex-col gap-2 hover:bg-green-50 dark:hover:bg-green-900 bg-transparent"
                >
                  <span className="text-2xl">👥</span>
                  <span>Group Buying</span>
                </Button>
              </Link>
              <Link href="/blockchain-verify">
                <Button
                  variant="outline"
                  className="h-24 w-full flex flex-col gap-2 hover:bg-green-50 dark:hover:bg-green-900 bg-transparent"
                >
                  <span className="text-2xl">🔗</span>
                  <span>Blockchain Verify</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Features */}
      <VoiceInterface />
      <AIAssistant />
    </div>
  )
}
