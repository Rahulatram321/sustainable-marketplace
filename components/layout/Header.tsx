"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, User, Menu, Leaf, Mic, Globe } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Header() {
  const [isVoiceActive, setIsVoiceActive] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-green-950/95 dark:supports-[backdrop-filter]:bg-green-950/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-green-600" />
          <span className="text-2xl font-bold text-green-800 dark:text-green-200">EcoChain</span>
        </Link>

        {/* Search Bar with Voice */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <Input placeholder="Search sustainable products..." className="pr-20" />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsVoiceActive(!isVoiceActive)}
              className={isVoiceActive ? "text-red-500" : ""}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link href="/marketplace" className="text-sm font-medium hover:text-green-600">
            Marketplace
          </Link>
          <Link href="/producers" className="text-sm font-medium hover:text-green-600">
            Producers
          </Link>
          <Link href="/impact" className="text-sm font-medium hover:text-green-600">
            Impact
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                EN
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Español</DropdownMenuItem>
              <DropdownMenuItem>हिंदी</DropdownMenuItem>
              <DropdownMenuItem>Kiswahili</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              3
            </Badge>
          </Button>
          <Button variant="ghost" size="sm">
            <User className="h-5 w-5" />
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/marketplace" className="text-lg font-medium">
                  Marketplace
                </Link>
                <Link href="/producers" className="text-lg font-medium">
                  Producers
                </Link>
                <Link href="/impact" className="text-lg font-medium">
                  Impact
                </Link>
                <Link href="/esg-dashboard" className="text-lg font-medium">
                  ESG Dashboard
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
