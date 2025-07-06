"use client"

import { useState } from "react"
import Header from "@/components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, MapPin, Leaf, QrCode, ExternalLink, CheckCircle, AlertCircle, Clock } from "lucide-react"
import Image from "next/image"

const nftPassports = [
  {
    id: "NFT-001",
    productName: "Organic Coffee Beans - Premium Blend",
    producer: "Maria Santos Cooperative",
    location: "Huila, Colombia",
    coordinates: { lat: 2.5358, lng: -75.5273 },
    image: "/placeholder.svg?height=300&width=400",
    mintDate: "2024-01-15",
    carbonFootprint: -12.5,
    certifications: ["Organic", "Fair Trade", "Rainforest Alliance"],
    supplyChain: [
      {
        stage: "Farm",
        location: "Huila, Colombia",
        date: "2024-01-10",
        actor: "Maria Santos Cooperative",
        action: "Coffee beans harvested",
        verified: true,
      },
      {
        stage: "Processing",
        location: "Huila, Colombia",
        date: "2024-01-12",
        actor: "Solar Processing Center",
        action: "Beans washed and dried using solar energy",
        verified: true,
      },
      {
        stage: "Export",
        location: "Bogotá, Colombia",
        date: "2024-01-18",
        actor: "Fair Trade Exporters",
        action: "Quality control and packaging",
        verified: true,
      },
      {
        stage: "Import",
        location: "Miami, USA",
        date: "2024-01-25",
        actor: "Sustainable Imports Co.",
        action: "Customs clearance and distribution",
        verified: true,
      },
    ],
    wageReceipts: [
      {
        worker: "Maria Santos",
        amount: 450,
        date: "2024-01-15",
        rate: "2.5x fair trade minimum",
        verified: true,
      },
      {
        worker: "Carlos Mendez",
        amount: 380,
        date: "2024-01-15",
        rate: "2.3x fair trade minimum",
        verified: true,
      },
      {
        worker: "Ana Rodriguez",
        amount: 420,
        date: "2024-01-15",
        rate: "2.4x fair trade minimum",
        verified: true,
      },
    ],
    blockchainHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z",
    transactionId: "TXN-2024-001-COFFEE-SANTOS",
  },
]

export default function BlockchainVerify() {
  const [selectedPassport, setSelectedPassport] = useState(nftPassports[0])
  const [qrInput, setQrInput] = useState('')
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'verified' | 'failed'>('idle')

  const handleQRVerification = () => {
    setVerificationStatus('verifying')
    // Simulate verification process
    setTimeout(() => {
      if (qrInput.includes('NFT-001')) {
        setVerificationStatus('verified')
      } else {
        setVerificationStatus('failed')
      }
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-900 dark:text-indigo-100 mb-2">
            Blockchain Product Verification
          </h1>
          <p className="text-indigo-700 dark:text-indigo-300">
            Verify product authenticity and trace the complete supply chain journey
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* QR Code Scanner */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-indigo-600" />
                  QR Code Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Scan product QR code or enter manually
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Input
                    placeholder="Enter QR code or NFT ID"
                    value={qrInput}
                    onChange={(e) => setQrInput(e.target.value)}
                  />
                  <Button 
                    onClick={handleQRVerification}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    disabled={verificationStatus === 'verifying'}
                  >
                    {verificationStatus === 'verifying' ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        Verify Product
                      </>
                    )}
                  </Button>
                </div>

                {verificationStatus === 'verified' && (
                  <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Verified Authentic</span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      Product authenticity confirmed on blockchain
                    </p>
                  </div>
                )}

                {verificationStatus === 'failed' && (
                  <div className="p-3 bg-red-50 dark:bg-red-900 rounded-lg">
                    <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
                      <AlertCircle className="h-5 w-5" />
                      <span className="font-medium">Verification Failed</span>
                    </div>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                      Product not found or invalid QR code
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sample QR Codes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Try Sample Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent"
                    onClick={() => setQrInput('NFT-001-COFFEE-SANTOS')}
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    Coffee Beans - NFT-001
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent"
                    onClick={() => setQrInput('NFT-002-TEXTILE-INDIA')}
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    Organic Cotton - NFT-002
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent"
                    onClick={() => setQrInput('NFT-003-BAMBOO-VIETNAM')}
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    Bamboo Furniture - NFT-003
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* NFT Passport Details */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-indigo-600" />
                    NFT Product Passport
                  </CardTitle>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Image
                      src={selectedPassport.image || "/placeholder.svg"}
                      alt={selectedPassport.productName}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-100 mb-2">
                      {selectedPassport.productName}
                    </h2>
                    <p className="text-indigo-700 dark:text-indigo-300 mb-4">
                      {selectedPassport.producer} • {selectedPassport.location}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPassport.certifications.map((cert) => (
                        <Badge key={cert} className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
                        Blockchain Details
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>NFT ID:</span>
                          <span className="font-mono">{selectedPassport.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Mint Date:</span>
                          <span>{selectedPassport.mintDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Transaction:</span>
                          <Button variant="link" size="sm" className="p-0 h-auto">
                            <span className="font-mono text-xs truncate max-w-32">
                              {selectedPassport.transactionId}
                            </span>
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
                        Environmental Impact
                      </h3>
                      <div className="flex items-center gap-2">
                        <Leaf className="h-5 w-5 text-green-600" />
                        <span className="text-sm">
                          Carbon Footprint: 
                          <span className="font-bold text-green-600 ml-1">
                            {selectedPassport.carbonFootprint}kg CO₂
                          </span>
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
                        GPS Coordinates
                      </h3>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-red-600" />
                        <span className="text-sm font-mono">
                          {selectedPassport.coordinates.lat}, {selectedPassport.coordinates.lng}
                        </span>
                        <Button variant="link" size="sm" className="p-0 h-auto">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="supply-chain" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="supply-chain">Supply Chain</TabsTrigger>
                <TabsTrigger value="wage-receipts">Wage Receipts</TabsTrigger>
                <TabsTrigger value="blockchain">Blockchain Data</Tab\
