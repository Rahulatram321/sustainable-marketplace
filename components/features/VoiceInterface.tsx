"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Volume2, Languages, AudioWaveformIcon as Waveform } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "sw", name: "Kiswahili", flag: "🇰🇪" },
]

export default function VoiceInterface() {
  const [isListening, setIsListening] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [transcript, setTranscript] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)

  // Simulate voice recognition
  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100)
      }, 100)

      // Simulate transcript after 3 seconds
      const timeout = setTimeout(() => {
        setTranscript("Find carbon-negative coffee paying 2x fair wage")
        setIsListening(false)
      }, 3000)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }
  }, [isListening])

  const toggleListening = () => {
    setIsListening(!isListening)
    if (!isListening) {
      setTranscript("")
    }
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <>
      {/* Floating Voice Button */}
      <Button
        onClick={toggleVisibility}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg z-50"
        size="lg"
      >
        <Mic className="h-6 w-6" />
      </Button>

      {/* Voice Interface Panel */}
      {isVisible && (
        <Card className="fixed bottom-24 right-6 w-80 z-50 shadow-2xl border-2 border-green-200 dark:border-green-800">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-green-900 dark:text-green-100">Voice Assistant</h3>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">AI Powered</Badge>
            </div>

            {/* Language Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-green-700 dark:text-green-300">Language</label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Voice Controls */}
            <div className="flex items-center gap-3">
              <Button
                onClick={toggleListening}
                variant={isListening ? "destructive" : "default"}
                className={isListening ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? "Stop" : "Start"}
              </Button>
              <Button variant="outline" size="sm">
                <Volume2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Languages className="h-4 w-4" />
              </Button>
            </div>

            {/* Audio Visualization */}
            {isListening && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Waveform className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700 dark:text-green-300">Listening...</span>
                </div>
                <div className="flex gap-1 h-8 items-end">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-green-500 w-1 rounded-t transition-all duration-100"
                      style={{
                        height: `${Math.random() * audioLevel}%`,
                        minHeight: "4px",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Transcript */}
            {transcript && (
              <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-300">
                  <strong>You said:</strong> "{transcript}"
                </p>
              </div>
            )}

            {/* Quick Commands */}
            <div className="space-y-2">
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">Try saying:</p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs cursor-pointer hover:bg-green-50 dark:hover:bg-green-900">
                  "Show organic coffee"
                </Badge>
                <Badge variant="outline" className="text-xs cursor-pointer hover:bg-green-50 dark:hover:bg-green-900">
                  "Fair trade textiles"
                </Badge>
                <Badge variant="outline" className="text-xs cursor-pointer hover:bg-green-50 dark:hover:bg-green-900">
                  "Carbon negative products"
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
