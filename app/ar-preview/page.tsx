"use client"

import { Suspense, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Html } from "@react-three/drei"
import Header from "@/components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, RotateCcw, ZoomIn, ZoomOut, Move3D, Eye, Share, Download } from "lucide-react"
import type * as THREE from "three"

// 3D Model Component
function ProductModel({ modelPath, scale = 1 }: { modelPath: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.scale.setScalar(hovered ? scale * 1.1 : scale)
    }
  })

  return (
    <mesh ref={meshRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? "#10B981" : "#059669"} />
      <Html position={[0, 2.5, 0]} center>
        <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-lg shadow-lg border">
          <p className="text-sm font-medium">Sustainable Bamboo Chair</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Carbon Negative • Fair Trade</p>
        </div>
      </Html>
    </mesh>
  )
}

// Farm Tour Component
function FarmTour() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Ground */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#4ADE80" />
      </mesh>

      {/* Coffee Plants */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 15, -1, (Math.random() - 0.5) * 15]}>
          <cylinderGeometry args={[0.1, 0.2, 2]} />
          <meshStandardMaterial color="#22C55E" />
        </mesh>
      ))}

      {/* Farm House */}
      <mesh position={[5, 0, 5]}>
        <boxGeometry args={[3, 2, 3]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Information Points */}
      <Html position={[0, 1, 0]} center>
        <div className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg">
          <p className="text-sm font-medium">☕ Organic Coffee Farm</p>
          <p className="text-xs">Maria Santos Cooperative</p>
        </div>
      </Html>

      <Html position={[5, 2, 5]} center>
        <div className="bg-green-600 text-white px-3 py-2 rounded-lg shadow-lg">
          <p className="text-sm font-medium">🏠 Processing Center</p>
          <p className="text-xs">Solar Powered</p>
        </div>
      </Html>
    </group>
  )
}

const products = [
  {
    id: 1,
    name: "Sustainable Bamboo Chair",
    producer: "Green Craft Collective",
    location: "Vietnam",
    price: 299,
    model: "chair",
    description: "Handcrafted from fast-growing bamboo",
    impact: ["Carbon Negative", "Fair Trade", "Sustainable"],
  },
  {
    id: 2,
    name: "Recycled Plastic Table",
    producer: "Ocean Clean Co.",
    location: "Philippines",
    price: 450,
    model: "table",
    description: "Made from 100% ocean plastic waste",
    impact: ["Ocean Cleanup", "Recycled", "Durable"],
  },
  {
    id: 3,
    name: "Hemp Fiber Sofa",
    producer: "Natural Living",
    location: "Canada",
    price: 899,
    model: "sofa",
    description: "Organic hemp fiber with natural dyes",
    impact: ["Organic", "Non-toxic", "Biodegradable"],
  },
]

export default function ARPreview() {
  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const [viewMode, setViewMode] = useState<"product" | "farm">("product")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-2">
            AR Product Preview & Virtual Farm Tours
          </h1>
          <p className="text-blue-700 dark:text-blue-300">
            Experience products in 3D and visit sustainable farms virtually
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 3D Viewer */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-600" />
                    {viewMode === "product" ? "3D Product Preview" : "Virtual Farm Tour"}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === "product" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("product")}
                    >
                      Product
                    </Button>
                    <Button
                      variant={viewMode === "farm" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("farm")}
                    >
                      Farm Tour
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 h-[500px]">
                <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <Suspense fallback={null}>
                    {viewMode === "product" ? <ProductModel modelPath={selectedProduct.model} /> : <FarmTour />}
                    <Environment preset="sunset" />
                  </Suspense>
                  <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                </Canvas>

                {/* 3D Controls Overlay */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                    <Move3D className="h-4 w-4" />
                  </Button>
                </div>

                {/* AR Mode Button */}
                <div className="absolute bottom-4 right-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Camera className="h-4 w-4 mr-2" />
                    AR Mode
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Selection & Info */}
          <div className="space-y-6">
            {/* Product Selector */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Product</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedProduct.id === product.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                        : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <h4 className="font-medium text-sm">{product.name}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {product.producer} • {product.location}
                    </p>
                    <p className="text-lg font-bold text-blue-600 mt-1">${product.price}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{selectedProduct.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{selectedProduct.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.impact.map((tag) => (
                      <Badge key={tag} className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Producer:</span>
                    <span className="font-medium">{selectedProduct.producer}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Location:</span>
                    <span className="font-medium">{selectedProduct.location}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Price:</span>
                    <span className="font-bold text-blue-600">${selectedProduct.price}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Add to Cart</Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Share className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Download className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AR Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AR Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p className="font-medium">📱 Mobile AR Mode:</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs text-gray-600 dark:text-gray-400">
                    <li>Click "AR Mode" button</li>
                    <li>Allow camera access</li>
                    <li>Point camera at flat surface</li>
                    <li>Tap to place product</li>
                    <li>Walk around to view from all angles</li>
                  </ol>
                </div>
                <div className="text-sm space-y-2">
                  <p className="font-medium">🥽 VR Farm Tours:</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs text-gray-600 dark:text-gray-400">
                    <li>Switch to "Farm Tour" mode</li>
                    <li>Use mouse/touch to navigate</li>
                    <li>Click info points for details</li>
                    <li>Meet the producers virtually</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
