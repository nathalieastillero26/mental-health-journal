"use client"

import { useState } from "react"
import { X, Sparkles, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface GratitudePracticeProps {
  onClose: () => void
}

export function GratitudePractice({ onClose }: GratitudePracticeProps) {
  const [gratitudes, setGratitudes] = useState<string[]>(["", "", ""])
  const [saved, setSaved] = useState(false)

  const updateGratitude = (index: number, value: string) => {
    const newGratitudes = [...gratitudes]
    newGratitudes[index] = value
    setGratitudes(newGratitudes)
    setSaved(false)
  }

  const addGratitude = () => {
    setGratitudes([...gratitudes, ""])
    setSaved(false)
  }

  const removeGratitude = (index: number) => {
    if (gratitudes.length > 1) {
      setGratitudes(gratitudes.filter((_, i) => i !== index))
      setSaved(false)
    }
  }

  const saveGratitudes = () => {
    const filledGratitudes = gratitudes.filter((g) => g.trim())
    if (filledGratitudes.length > 0) {
      const existing = JSON.parse(localStorage.getItem("gratitudes") || "[]")
      existing.push({
        date: new Date().toISOString(),
        items: filledGratitudes,
      })
      localStorage.setItem("gratitudes", JSON.stringify(existing))
      setSaved(true)
      setTimeout(() => {
        onClose()
      }, 1500)
    }
  }

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl my-8">
        <Card className="p-6 md:p-8 relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-pink-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Gratitude Practice</h2>
            <p className="text-muted-foreground text-balance">
              Take a moment to reflect on what you're grateful for today
            </p>
          </div>

          {/* Gratitude inputs */}
          <div className="space-y-4 mb-6">
            {gratitudes.map((gratitude, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 w-8 h-8 bg-pink-500/10 rounded-full flex items-center justify-center text-pink-500 font-medium text-sm mt-2">
                    {index + 1}
                  </div>
                  <Textarea
                    value={gratitude}
                    onChange={(e) => updateGratitude(index, e.target.value)}
                    placeholder="I'm grateful for..."
                    className="flex-1 min-h-[80px] resize-none"
                  />
                  {gratitudes.length > 1 && (
                    <button
                      onClick={() => removeGratitude(index)}
                      className="flex-shrink-0 mt-2 text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add more button */}
          {gratitudes.length < 10 && (
            <Button onClick={addGratitude} variant="outline" className="w-full mb-6 bg-transparent" size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Another
            </Button>
          )}

          {/* Save message */}
          {saved && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
              <p className="text-green-600 dark:text-green-400 font-medium">✓ Your gratitudes have been saved!</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={saveGratitudes} className="flex-1" size="lg" disabled={gratitudes.every((g) => !g.trim())}>
              Save Gratitudes
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent" size="lg">
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
