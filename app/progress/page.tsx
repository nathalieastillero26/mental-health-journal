"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MoodChart } from "@/components/mood-chart"
import { MoodStats } from "@/components/mood-stats"
import { MoodInsights } from "@/components/mood-insights"
import { ArrowLeft, TrendingUp } from "lucide-react"
import Link from "next/link"

interface MoodEntry {
  mood: "great" | "good" | "okay" | "bad" | "terrible"
  note: string
  timestamp: string
}

export default function ProgressPage() {
  const [entries, setEntries] = useState<MoodEntry[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("moodEntries")
    if (stored) {
      setEntries(JSON.parse(stored))
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Progress & Insights</h1>
                <p className="text-xs text-muted-foreground">Track your emotional journey</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {entries.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">No data yet</h2>
              <p className="text-muted-foreground mb-6 text-pretty max-w-md mx-auto">
                Start tracking your mood to see insights and trends over time.
              </p>
              <Link href="/">
                <Button>Go to Dashboard</Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Stats Overview */}
              <MoodStats entries={entries} />

              {/* Mood Chart */}
              <MoodChart entries={entries} />

              {/* Insights */}
              <MoodInsights entries={entries} />
            </>
          )}
        </div>
      </main>
    </div>
  )
}
