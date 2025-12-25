"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface MoodEntry {
  mood: "great" | "good" | "okay" | "bad" | "terrible"
  note: string
  timestamp: string
}

interface MoodChartProps {
  entries: MoodEntry[]
}

const moodValues = {
  terrible: 1,
  bad: 2,
  okay: 3,
  good: 4,
  great: 5,
}

const moodLabels = {
  1: "Terrible",
  2: "Bad",
  3: "Okay",
  4: "Good",
  5: "Great",
}

export function MoodChart({ entries }: MoodChartProps) {
  // Get last 30 days of data
  const last30Days = entries.slice(0, 30).reverse()

  const chartData = last30Days.map((entry) => {
    const date = new Date(entry.timestamp)
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      mood: moodValues[entry.mood],
      fullDate: date.toLocaleDateString(),
    }
  })

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">Mood Trend</h2>
          <p className="text-sm text-muted-foreground">Your emotional patterns over the last 30 check-ins</p>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="date"
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                tickFormatter={(value) => moodLabels[value as keyof typeof moodLabels]}
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickLine={{ stroke: "hsl(var(--border))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
                formatter={(value: number) => [moodLabels[value as keyof typeof moodLabels], "Mood"]}
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}
