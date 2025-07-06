"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, Satellite, AlertTriangle, TrendingUp, MapPin, X } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  metadata?: {
    suggestions?: string[]
    alerts?: string[]
    locations?: { name: string; coords: [number, number] }[]
  }
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        'Hi! I\'m your AI Sourcing Assistant. I can help you find sustainable products, verify suppliers, and predict supply chain risks. Try asking me something like "Find carbon-negative coffee paying 2x fair wage"',
      timestamp: new Date(),
      metadata: {
        suggestions: [
          "Find organic cotton from women-led farms",
          "Show me deforestation-free palm oil",
          "Carbon-negative coffee suppliers",
        ],
      },
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
        metadata: generateMetadata(inputValue),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 2000)
  }

  const generateAIResponse = (query: string): string => {
    if (query.toLowerCase().includes("coffee")) {
      return "I found 3 carbon-negative coffee suppliers paying 2x fair wage:\n\n1. **Maria Santos Cooperative** (Colombia)\n   - 100% organic, regenerative farming\n   - Pays $4.50/lb vs $2.25 market rate\n   - 50 women farmers, 12kg CO₂ offset per bag\n\n2. **Highland Growers Union** (Ethiopia)\n   - Shade-grown, bird-friendly\n   - Direct trade, $4.80/lb\n   - 200 families, reforestation program\n\n3. **Mountain Coffee Collective** (Guatemala)\n   - Permaculture methods\n   - $5.00/lb premium pricing\n   - Solar processing, water conservation"
    }

    if (query.toLowerCase().includes("drought") || query.toLowerCase().includes("risk")) {
      return "🚨 **Climate Risk Alert**: Drought conditions detected in East Africa coffee regions.\n\n**Affected Areas:**\n- Kenya: 40% below normal rainfall\n- Ethiopia: Severe drought in Sidamo region\n\n**Recommendations:**\n1. Diversify sourcing to Central/South America\n2. Consider pre-orders from affected regions to support farmers\n3. Alternative: Robusta varieties more drought-resistant\n\n**Satellite Data**: Updated 2 hours ago via NASA MODIS"
    }

    return "I'm analyzing your request using satellite imagery, blockchain verification, and real-time market data. Let me find the best sustainable options for you..."
  }

  const generateMetadata = (query: string) => {
    if (query.toLowerCase().includes("coffee")) {
      return {
        locations: [
          { name: "Colombia - Maria Santos Cooperative", coords: [4.5709, -74.2973] as [number, number] },
          { name: "Ethiopia - Highland Growers", coords: [9.145, 40.4897] as [number, number] },
          { name: "Guatemala - Mountain Collective", coords: [15.7835, -90.2308] as [number, number] },
        ],
        suggestions: [
          "Show me the blockchain certificates",
          "Schedule a virtual farm tour",
          "Compare carbon footprints",
        ],
      }
    }

    if (query.toLowerCase().includes("risk")) {
      return {
        alerts: [
          "Drought alert: East Africa coffee regions",
          "Price volatility: Cocoa markets +15%",
          "Supply disruption: Suez Canal delays",
        ],
        suggestions: ["View alternative suppliers", "Set up risk monitoring alerts", "Explore climate-resilient crops"],
      }
    }

    return {
      suggestions: ["Tell me more about this", "Show verification data", "Find similar products"],
    }
  }

  return (
    <>
      {/* AI Assistant Toggle */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg z-50"
        size="lg"
      >
        <Bot className="h-6 w-6" />
      </Button>

      {/* AI Assistant Panel */}
      {isOpen && (
        <Card className="fixed bottom-24 left-6 w-96 h-96 z-50 shadow-2xl border-2 border-blue-200 dark:border-blue-800 flex flex-col">
          <CardHeader className="pb-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-600" />
                AI Sourcing Assistant
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <Satellite className="h-3 w-3 mr-1" />
                Satellite Verified
              </Badge>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <TrendingUp className="h-3 w-3 mr-1" />
                Real-time Data
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-4 pt-0">
            {/* Messages */}
            <ScrollArea className="flex-1 mb-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>

                      {/* Metadata */}
                      {message.metadata && (
                        <div className="mt-3 space-y-2">
                          {/* Locations */}
                          {message.metadata.locations && (
                            <div className="space-y-1">
                              {message.metadata.locations.map((location, i) => (
                                <div key={i} className="flex items-center gap-1 text-xs">
                                  <MapPin className="h-3 w-3" />
                                  <span>{location.name}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Alerts */}
                          {message.metadata.alerts && (
                            <div className="space-y-1">
                              {message.metadata.alerts.map((alert, i) => (
                                <div
                                  key={i}
                                  className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400"
                                >
                                  <AlertTriangle className="h-3 w-3" />
                                  <span>{alert}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Suggestions */}
                          {message.metadata.suggestions && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {message.metadata.suggestions.map((suggestion, i) => (
                                <Badge
                                  key={i}
                                  variant="outline"
                                  className="text-xs cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900"
                                  onClick={() => setInputValue(suggestion)}
                                >
                                  {suggestion}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me about sustainable sourcing..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
