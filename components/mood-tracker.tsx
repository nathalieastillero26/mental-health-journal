"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Smile, Meh, Frown, Angry, Heart } from "lucide-react"

type Mood = "great" | "good" | "okay" | "bad" | "terrible"

interface MoodEntry {
  mood: Mood
  note: string
  timestamp: string
}

const moodOptions = [
  { value: "great" as Mood, icon: Heart, label: "Great", color: "text-green-500" },
  { value: "good" as Mood, icon: Smile, label: "Good", color: "text-blue-500" },
  { value: "okay" as Mood, icon: Meh, label: "Okay", color: "text-yellow-500" },
  { value: "bad" as Mood, icon: Frown, label: "Bad", color: "text-orange-500" },
  { value: "terrible" as Mood, icon: Angry, label: "Terrible", color: "text-red-500" },
]

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null)
  const [note, setNote] = useState("")
  const [showNote, setShowNote] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood)
    setShowNote(true)
    setSaved(false)
  }

  const handleSave = () => {
    if (!selectedMood) return

    const entry: MoodEntry = {
      mood: selectedMood,
      note,
      timestamp: new Date().toISOString(),
    }

    // Save to localStorage
    const entries = JSON.parse(localStorage.getItem("moodEntries") || "[]")
    entries.unshift(entry)
    localStorage.setItem("moodEntries", JSON.stringify(entries.slice(0, 100))) // Keep last 100 entries

    setSaved(true)
    setTimeout(() => {
      setShowNote(false)
      setSelectedMood(null)
      setNote("")
      setSaved(false)
    }, 2000)
  }

  return (
    <Card className="p-6 md:p-8">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">How are you feeling?</h3>
          <p className="text-sm text-muted-foreground">Select your current mood to track your emotional well-being</p>
        </div>

        {/* Mood Selection */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {moodOptions.map((option) => {
            const Icon = option.icon
            const isSelected = selectedMood === option.value
            return (
              <button
                key={option.value}
                onClick={() => handleMoodSelect(option.value)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                  isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
              >
                <Icon className={`w-8 h-8 ${isSelected ? "text-primary" : option.color}`} />
                <span className="text-sm font-medium text-foreground">{option.label}</span>
              </button>
            )
          })}
        </div>

        {/* Note Section */}
        {showNote && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Add a note (optional)</label>
              <Textarea
                placeholder="What's on your mind? How are you feeling right now?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={saved}>
                {saved ? "Saved!" : "Save Entry"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowNote(false)
                  setSelectedMood(null)
                  setNote("")
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
