"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb } from "lucide-react"

interface JournalPromptsProps {
  onPromptSelect: (prompt: string) => void
}

const prompts = [
  "What are three things you're grateful for today?",
  "Describe a challenge you're facing and how you might overcome it.",
  "What emotions have you experienced today? What triggered them?",
  "Write about a moment when you felt proud of yourself.",
  "What's something you'd like to let go of?",
  "How can you be kinder to yourself today?",
  "What does self-care mean to you right now?",
  "Describe a person who makes you feel supported.",
  "What are your hopes for tomorrow?",
  "What's one small step you can take toward your goals?",
]

export function JournalPrompts({ onPromptSelect }: JournalPromptsProps) {
  // Get a consistent daily prompt based on the date
  const today = new Date().toDateString()
  const promptIndex = Math.abs(today.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)) % prompts.length
  const dailyPrompt = prompts[promptIndex]
  const otherPrompts = prompts.filter((_, i) => i !== promptIndex).slice(0, 3)

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Writing Prompts</h2>
        <p className="text-sm text-muted-foreground">Need inspiration? Try one of these prompts to get started</p>
      </div>

      {/* Daily Featured Prompt */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Today's Featured Prompt</span>
          </div>
          <p className="text-foreground text-lg leading-relaxed text-balance">{dailyPrompt}</p>
          <Button onClick={() => onPromptSelect(dailyPrompt)} className="w-full sm:w-auto">
            Write About This
          </Button>
        </div>
      </Card>

      {/* Other Prompts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {otherPrompts.map((prompt, index) => (
          <Card
            key={index}
            className="p-4 hover:border-primary/50 transition-colors cursor-pointer group"
            onClick={() => onPromptSelect(prompt)}
          >
            <p className="text-sm text-foreground leading-relaxed text-pretty group-hover:text-primary transition-colors">
              {prompt}
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}
