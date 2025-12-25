"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Heart, Smile, Meh, Frown, Angry } from "lucide-react"

interface MoodEntry {
  mood: "great" | "good" | "okay" | "bad" | "terrible"
  note: string
  timestamp: string
}

const moodIcons = {
  great: { icon: Heart, color: "text-green-500", bg: "bg-green-500/10" },
  good: { icon: Smile, color: "text-blue-500", bg: "bg-blue-500/10" },
  okay: { icon: Meh, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  bad: { icon: Frown, color: "text-orange-500", bg: "bg-orange-500/10" },
  terrible: { icon: Angry, color: "text-red-500", bg: "bg-red-500/10" },
}

export function RecentEntries() {
  const [entries, setEntries] = useState<MoodEntry[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("moodEntries")
    if (stored) {
      setEntries(JSON.parse(stored).slice(0, 5))
    }
  }, [])

  if (entries.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">Recent Check-ins</h3>
        <p className="text-sm text-muted-foreground">Your latest mood entries</p>
      </div>

      <div className="space-y-3">
        {entries.map((entry, index) => {
          const moodConfig = moodIcons[entry.mood]
          const Icon = moodConfig.icon
          const date = new Date(entry.timestamp)
          const timeAgo = getTimeAgo(date)

          return (
            <Card key={index} className="p-4">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg ${moodConfig.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${moodConfig.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-medium text-foreground capitalize">{entry.mood}</span>
                    <span className="text-xs text-muted-foreground">{timeAgo}</span>
                  </div>
                  {entry.note && <p className="text-sm text-muted-foreground line-clamp-2">{entry.note}</p>}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInMins = Math.floor(diffInMs / 60000)
  const diffInHours = Math.floor(diffInMs / 3600000)
  const diffInDays = Math.floor(diffInMs / 86400000)

  if (diffInMins < 1) return "Just now"
  if (diffInMins < 60) return `${diffInMins}m ago`
  if (diffInHours < 24) return `${diffInHours}h ago`
  if (diffInDays < 7) return `${diffInDays}d ago`
  return date.toLocaleDateString()
}
