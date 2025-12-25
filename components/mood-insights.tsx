"use client"

import { Card } from "@/components/ui/card"
import { Lightbulb, TrendingUp, AlertCircle, Heart } from "lucide-react"

interface MoodEntry {
  mood: "great" | "good" | "okay" | "bad" | "terrible"
  note: string
  timestamp: string
}

interface MoodInsightsProps {
  entries: MoodEntry[]
}

const moodValues = {
  terrible: 1,
  bad: 2,
  okay: 3,
  good: 4,
  great: 5,
}

export function MoodInsights({ entries }: MoodInsightsProps) {
  const insights: Array<{ icon: any; title: string; description: string; color: string }> = []

  // Calculate insights
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

  // Insight 1: Recent trend
  if (last7Average > averageMood + 0.3) {
    insights.push({
      icon: TrendingUp,
      title: "Positive Momentum",
      description:
        "Your mood has been improving over the past week. Keep up the good work with your self-care practices!",
      color: "text-green-500 bg-green-500/10",
    })
  } else if (last7Average < averageMood - 0.3) {
    insights.push({
      icon: AlertCircle,
      title: "Challenging Week",
      description:
        "Your mood has been lower recently. Consider reaching out to a friend or trying some coping strategies.",
      color: "text-orange-500 bg-orange-500/10",
    })
  }

  // Insight 2: Consistency
  const checkInFrequency = entries.length / Math.max(1, getDaysSinceFirstEntry(entries))
  if (checkInFrequency > 0.8) {
    insights.push({
      icon: Heart,
      title: "Great Consistency",
      description: "You're doing an excellent job of checking in regularly. Consistency helps build self-awareness.",
      color: "text-pink-500 bg-pink-500/10",
    })
  }

  // Insight 3: Positive days
  const positiveDays = entries.filter((e) => moodValues[e.mood] >= 4).length
  const positivePercentage = (positiveDays / entries.length) * 100
  if (positivePercentage > 60) {
    insights.push({
      icon: Heart,
      title: "Mostly Positive",
      description: `${Math.round(positivePercentage)}% of your check-ins have been positive. You're doing well!`,
      color: "text-blue-500 bg-blue-500/10",
    })
  }

  // Default insight if none generated
  if (insights.length === 0) {
    insights.push({
      icon: Lightbulb,
      title: "Keep Tracking",
      description:
        "Continue logging your mood regularly to unlock more personalized insights about your emotional patterns.",
      color: "text-primary bg-primary/10",
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Insights</h2>
        <p className="text-sm text-muted-foreground">Personalized observations based on your mood patterns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon
          return (
            <Card key={index} className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg ${insight.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-1">{insight.title}</h3>
                  <p className="text-sm text-muted-foreground text-pretty">{insight.description}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function getDaysSinceFirstEntry(entries: MoodEntry[]): number {
  if (entries.length === 0) return 1
  const firstEntry = new Date(entries[entries.length - 1].timestamp)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - firstEntry.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
