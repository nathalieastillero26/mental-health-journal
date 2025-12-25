"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Sparkles } from "lucide-react"

interface JournalEditorProps {
  initialPrompt?: string | null
  onSave: () => void
  onCancel: () => void
}

interface JournalEntry {
  id: string
  title: string
  content: string
  prompt?: string
  timestamp: string
}

export function JournalEditor({ initialPrompt, onSave, onCancel }: JournalEditorProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [wordCount, setWordCount] = useState(0)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setContent(text)
    setWordCount(text.trim().split(/\s+/).filter(Boolean).length)
  }

  const handleSave = () => {
    if (!content.trim()) return

    const entry: JournalEntry = {
      id: Date.now().toString(),
      title: title.trim() || "Untitled Entry",
      content: content.trim(),
      prompt: initialPrompt || undefined,
      timestamp: new Date().toISOString(),
    }

    const entries = JSON.parse(localStorage.getItem("journalEntries") || "[]")
    entries.unshift(entry)
    localStorage.setItem("journalEntries", JSON.stringify(entries))

    onSave()
  }

  return (
    <div className="space-y-6">
      {initialPrompt && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Today's Prompt</p>
              <p className="text-sm text-muted-foreground">{initialPrompt}</p>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Title (optional)</label>
            <Input
              placeholder="Give your entry a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Your thoughts</label>
              <span className="text-xs text-muted-foreground">
                {wordCount} {wordCount === 1 ? "word" : "words"}
              </span>
            </div>
            <Textarea
              placeholder="Start writing... Let your thoughts flow freely. There's no right or wrong way to journal."
              value={content}
              onChange={handleContentChange}
              className="min-h-[400px] resize-none text-base leading-relaxed"
              autoFocus
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={!content.trim()}>
              Save Entry
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-muted/50">
        <p className="text-sm text-muted-foreground text-pretty">
          <strong className="text-foreground">Privacy Note:</strong> Your journal entries are stored locally on your
          device and are completely private. They are not shared with anyone.
        </p>
      </Card>
    </div>
  )
}
