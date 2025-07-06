"use client"

import { useState } from "react"
import Header from "@/components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { Leaf, Users, DollarSign, TrendingUp, Target, Shuffle, Plus, Settings } from "lucide-react"

interface ETFComponent {
  id: string
  name: string
  category: string
  percentage: number
  impact: string
  color: string
}

const availableComponents: ETFComponent[] = [
  {
    id: "1",
    name: "Vegan Leather Products",
    category: "Materials",
    percentage: 0,
    impact: "Animal Welfare",
    color: "#8B5CF6",
  },
  { id: "2", name: "Women-Led Farms", category: "Social", percentage: 0, impact: "Gender Equality", color: "#EC4899" },
  {
    id: "3",
    name: "Carbon-Negative Products",
    category: "Environmental",
    percentage: 0,
    impact: "Climate Action",
    color: "#10B981",
  },
  { id: "4", name: "Fair Trade Certified", category: "Social", percentage: 0, impact: "Fair Wages", color: "#F59E0B" },
  {
    id: "5",
    name: "Recycled Materials",
    category: "Environmental",
    percentage: 0,
    impact: "Waste Reduction",
    color: "#3B82F6",
  },
  {
    id: "6",
    name: "Local Sourcing",
    category: "Economic",
    percentage: 0,
    impact: "Community Support",
    color: "#EF4444",
  },
]

const impactData = [
  { name: "Jan", environmental: 65, social: 78, governance: 82 },
  { name: "Feb", environmental: 68, social: 81, governance: 85 },
  { name: "Mar", environmental: 72, social: 85, governance: 88 },
  { name: "Apr", environmental: 75, social: 88, governance: 90 },
  { name: "May", environmental: 78, social: 92, governance: 93 },
  { name: "Jun", environmental: 82, social: 95, governance: 96 },
]

export default function ESGDashboard() {
  const [etfComponents, setETFComponents] = useState<ETFComponent[]>([
    { ...availableComponents[1], percentage: 30 }, // Women-Led Farms
    { ...availableComponents[0], percentage: 50 }, // Vegan Leather
    { ...availableComponents[2], percentage: 20 }, // Carbon-Negative
  ])

  const [availablePool, setAvailablePool] = useState<ETFComponent[]>(
    availableComponents.filter((comp) => !etfComponents.find((etf) => etf.id === comp.id)),
  )

  const [isAutoRebalancing, setIsAutoRebalancing] = useState(true)

  const totalPercentage = etfComponents.reduce((sum, comp) => sum + comp.percentage, 0)

  const pieData = etfComponents.map((comp) => ({
    name: comp.name,
    value: comp.percentage,
    color: comp.color,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-900 dark:text-green-100 mb-2">Corporate ESG Dashboard</h1>
          <p className="text-green-700 dark:text-green-300">
            Build and manage your custom Impact ETF with real-time ESG data
          </p>
        </div>

        <Tabs defaultValue="builder" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="builder">ETF Builder</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="impact">Impact Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="space-y-6">
            {/* ETF Overview */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Portfolio Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-green-900 dark:text-green-100">{totalPercentage}%</div>
                    <p className="text-sm text-green-600 dark:text-green-400">Total Allocated</p>
                  </div>
                  <Progress value={totalPercentage} className="h-3" />
                  <div className="flex justify-between text-xs text-green-600 dark:text-green-400 mt-2">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    ESG Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">87.5</div>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Overall Rating</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Environmental</span>
                      <span>82</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Social</span>
                      <span>95</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Governance</span>
                      <span>96</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shuffle className="h-5 w-5 text-purple-600" />
                    Auto-Rebalancing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm">Status</span>
                    <Badge className={isAutoRebalancing ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {isAutoRebalancing ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAutoRebalancing(!isAutoRebalancing)}
                    className="w-full"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {isAutoRebalancing ? "Disable" : "Enable"}
                  </Button>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    AI adjusts allocation based on real-time impact data
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Drag & Drop ETF Builder */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* ETF Builder */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Your Impact ETF
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 min-h-[200px]">
                    {etfComponents.map((component, index) => (
                      <div
                        key={component.id}
                        className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: component.color }} />
                            <div>
                              <h4 className="font-medium text-sm">{component.name}</h4>
                              <p className="text-xs text-gray-500">{component.impact}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">{component.percentage}%</div>
                            <Badge variant="outline" className="text-xs">
                              {component.category}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={component.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Available Components Pool */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-blue-600" />
                    Available Components
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 min-h-[200px]">
                    {availablePool.map((component, index) => (
                      <div
                        key={component.id}
                        className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-800 transition-colors cursor-pointer"
                        onClick={() => {
                          // Simple click to add functionality
                          const newItem = { ...component, percentage: 10 }
                          setAvailablePool((prev) => prev.filter((c) => c.id !== component.id))
                          setETFComponents((prev) => [...prev, newItem])
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: component.color }} />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{component.name}</h4>
                            <p className="text-xs text-gray-500">{component.impact}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {component.category}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Portfolio Visualization */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Composition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3">
                    {etfComponents.map((component) => (
                      <div
                        key={component.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: component.color }} />
                          <span className="text-sm font-medium">{component.name}</span>
                        </div>
                        <span className="font-bold">{component.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* Performance Metrics */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Return</p>
                      <p className="text-2xl font-bold text-green-600">+12.4%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">AUM</p>
                      <p className="text-2xl font-bold text-blue-600">$2.4M</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Investors</p>
                      <p className="text-2xl font-bold text-purple-600">1,247</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                      <Leaf className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Impact Score</p>
                      <p className="text-2xl font-bold text-orange-600">87.5</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>ESG Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={impactData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="environmental" stroke="#10B981" strokeWidth={2} />
                      <Line type="monotone" dataKey="social" stroke="#3B82F6" strokeWidth={2} />
                      <Line type="monotone" dataKey="governance" stroke="#8B5CF6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            {/* Impact Metrics */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    Environmental Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Carbon Offset</span>
                    <span className="font-bold">2,450 tons CO₂</span>
                  </div>
                  <Progress value={82} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Water Saved</span>
                    <span className="font-bold">1.2M liters</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Waste Reduced</span>
                    <span className="font-bold">890 tons</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Social Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Lives Impacted</span>
                    <span className="font-bold">15,670 people</span>
                  </div>
                  <Progress value={95} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fair Wages Paid</span>
                    <span className="font-bold">$1.8M</span>
                  </div>
                  <Progress value={88} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Women Empowered</span>
                    <span className="font-bold">3,240</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    Governance Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Transparency</span>
                    <span className="font-bold">98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Compliance</span>
                    <span className="font-bold">96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Accountability</span>
                    <span className="font-bold">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </CardContent>
              </Card>
            </div>

            {/* Real-time Impact Feed */}
            <Card>
              <CardHeader>
                <CardTitle>Real-time Impact Feed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New carbon offset verified</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Maria's Coffee Farm - 50kg CO₂ sequestered
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">2 min ago</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Fair wage payment processed</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Textile Cooperative - $2,400 distributed to 12 workers
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">5 min ago</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Sustainability audit completed</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Bamboo Furniture Co. - 95% compliance score
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">12 min ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
