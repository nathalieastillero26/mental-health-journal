"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Sparkles, Wind, Coffee, Music } from "lucide-react"
import { BreathingExercise } from "./breathing-exercise"
import { TakeABreak } from "./take-a-break"
import { CalmingSounds } from "./calming-sounds"
import { GratitudePractice } from "./gratitude-practice"

const copingStrategies = [
  {
    icon: Wind,
    title: "Breathing Exercise",
    description: "5-minute guided breathing",
    color: "bg-blue-500/10 text-blue-500",
    action: "breathing",
  },
  {
    icon: Coffee,
    title: "Take a Break",
    description: "Step away and relax",
    color: "bg-amber-500/10 text-amber-500",
    action: "break",
  },
  {
    icon: Music,
    title: "Calming Sounds",
    description: "Listen to soothing music",
    color: "bg-purple-500/10 text-purple-500",
    action: "sounds",
  },
  {
    icon: Sparkles,
    title: "Gratitude Practice",
    description: "List 3 things you're grateful for",
    color: "bg-pink-500/10 text-pink-500",
    action: "gratitude",
  },
]

export function QuickActions() {
  const [showBreathingExercise, setShowBreathingExercise] = useState(false)
  const [showTakeABreak, setShowTakeABreak] = useState(false)
  const [showCalmingSounds, setShowCalmingSounds] = useState(false)
  const [showGratitudePractice, setShowGratitudePractice] = useState(false)

  const handleStrategyClick = (action: string) => {
    if (action === "breathing") {
      setShowBreathingExercise(true)
    } else if (action === "break") {
      setShowTakeABreak(true)
    } else if (action === "sounds") {
      setShowCalmingSounds(true)
    } else if (action === "gratitude") {
      setShowGratitudePractice(true)
    }
  }

  return (
    <>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Coping Strategies</h3>
          <p className="text-sm text-muted-foreground">Quick activities to help you feel better</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {copingStrategies.map((strategy) => {
            const Icon = strategy.icon
            return (
              <Card
                key={strategy.title}
                className="p-4 hover:border-primary/50 transition-colors cursor-pointer group"
                onClick={() => handleStrategyClick(strategy.action)}
              >
                <div className="space-y-3">
                  <div
                    className={`w-10 h-10 rounded-lg ${strategy.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{strategy.title}</h4>
                    <p className="text-xs text-muted-foreground">{strategy.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {showBreathingExercise && <BreathingExercise onClose={() => setShowBreathingExercise(false)} />}
      {showTakeABreak && <TakeABreak onClose={() => setShowTakeABreak(false)} />}
      {showCalmingSounds && <CalmingSounds onClose={() => setShowCalmingSounds(false)} />}
      {showGratitudePractice && <GratitudePractice onClose={() => setShowGratitudePractice(false)} />}
    </>
  )
}
