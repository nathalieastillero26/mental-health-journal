"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Activity, Calendar } from "lucide-react"

interface MoodEntry {
  mood: "great" | "good" | "okay" | "bad" | "terrible"
  note: string
  timestamp: string
}

interface MoodStatsProps {
  entries: MoodEntry[]
}

const moodValues = {
  terrible: 1,
  bad: 2,
  okay: 3,
  good: 4,
  great: 5,
}

export function MoodStats({ entries }: MoodStatsProps) {
  // Calculate statistics
  const totalEntries = entries.length
  const last7Days = entries.filter((entry) => {
    const date = new Date(entry.timestamp)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7
  })

  const averageMood =
    entries.length > 0 ? entries.reduce((sum, entry) => sum + moodValues[entry.mood], 0) / entries.length : 0

  const last7Average =
    last7Days.length > 0 ? last7Days.reduce((sum, entry) => sum + moodValues[entry.mood], 0) / last7Days.length : 0

  const moodCounts = entries.reduce(
    (acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const mostCommonMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"

  const trend = last7Average > averageMood ? "improving" : last7Average < averageMood ? "declining" : "stable"

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Check-ins</p>
            <p className="text-2xl font-bold text-foreground">{totalEntries}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Average Mood</p>
            <p className="text-2xl font-bold text-foreground">{averageMood.toFixed(1)}/5</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">7-Day Trend</p>
            <p className="text-2xl font-bold text-foreground capitalize">{trend}</p>
          </div>
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              trend === "improving" ? "bg-green-500/10" : trend === "declining" ? "bg-red-500/10" : "bg-yellow-500/10"
            }`}
          >
            {trend === "improving" ? (
              <TrendingUp className="w-5 h-5 text-green-500" />
            ) : trend === "declining" ? (
              <TrendingDown className="w-5 h-5 text-red-500" />
            ) : (
              <Activity className="w-5 h-5 text-yellow-500" />
            )}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Most Common</p>
            <p className="text-2xl font-bold text-foreground capitalize">{mostCommonMood}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Activity className="w-5 h-5 text-purple-500" />
          </div>
        </div>
      </Card>
    </div>
  )
}
