"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Play, Pause, RotateCcw, ArrowLeft } from "lucide-react"

interface BreathingExerciseProps {
  onClose: () => void
}

export function BreathingExercise({ onClose }: BreathingExerciseProps) {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("inhale")
  const [countdown, setCountdown] = useState(4)
  const [cyclesCompleted, setCyclesCompleted] = useState(0)

  const phaseDurations = {
    inhale: 4,
    hold: 4,
    exhale: 4,
    rest: 2,
  }

  const phaseMessages = {
    inhale: "Breathe In",
    hold: "Hold",
    exhale: "Breathe Out",
    rest: "Rest",
  }

  useEffect(() => {
    if (!isActive) return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Move to next phase
          if (phase === "inhale") {
            setPhase("hold")
            return phaseDurations.hold
          } else if (phase === "hold") {
            setPhase("exhale")
            return phaseDurations.exhale
          } else if (phase === "exhale") {
            setPhase("rest")
            return phaseDurations.rest
          } else {
            // Complete cycle
            setCyclesCompleted((c) => c + 1)
            setPhase("inhale")
            return phaseDurations.inhale
          }
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, phase])

  const handleStart = () => {
    setIsActive(true)
  }

  const handlePause = () => {
    setIsActive(false)
  }

  const handleReset = () => {
    setIsActive(false)
    setPhase("inhale")
    setCountdown(4)
    setCyclesCompleted(0)
  }

  const getCircleScale = () => {
    if (phase === "inhale") return "scale-150"
    if (phase === "hold") return "scale-150"
    if (phase === "exhale") return "scale-75"
    return "scale-100"
  }

  const getCircleColor = () => {
    if (phase === "inhale") return "bg-blue-500/20 border-blue-500"
    if (phase === "hold") return "bg-purple-500/20 border-purple-500"
    if (phase === "exhale") return "bg-teal-500/20 border-teal-500"
    return "bg-muted border-border"
  }

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg p-8 relative">
        <Button variant="ghost" size="icon" className="absolute top-4 right-4 hover:bg-muted" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Breathing Exercise</h2>
          <p className="text-sm text-muted-foreground">
            Follow the circle and breathe deeply. Complete 5 cycles for best results.
          </p>
        </div>

        {/* Breathing Circle */}
        <div className="flex items-center justify-center mb-8 h-64">
          <div className="relative">
            <div
              className={`w-32 h-32 rounded-full border-4 transition-all duration-[4000ms] ease-in-out ${getCircleScale()} ${getCircleColor()}`}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-semibold text-foreground">{countdown}</p>
              <p className="text-sm text-muted-foreground">{phaseMessages[phase]}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground">
            Cycles Completed: <span className="font-semibold text-foreground">{cyclesCompleted}</span> / 5
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {!isActive ? (
            <Button onClick={handleStart} size="lg" className="gap-2">
              <Play className="w-4 h-4" />
              {cyclesCompleted > 0 ? "Resume" : "Start"}
            </Button>
          ) : (
            <Button onClick={handlePause} size="lg" variant="outline" className="gap-2 bg-transparent">
              <Pause className="w-4 h-4" />
              Pause
            </Button>
          )}
          <Button onClick={handleReset} size="lg" variant="outline" className="gap-2 bg-transparent">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        <Button onClick={onClose} variant="outline" className="w-full gap-2 bg-transparent mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        {/* Instructions */}
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-2">How it works:</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Breathe in slowly for 4 seconds as the circle expands</li>
            <li>• Hold your breath for 4 seconds</li>
            <li>• Breathe out slowly for 4 seconds as the circle contracts</li>
            <li>• Rest for 2 seconds before the next cycle</li>
          </ul>
        </div>
      </Card>
    </div>
  )
}
