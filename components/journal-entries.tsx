"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Sparkles, Trash2 } from "lucide-react"

interface JournalEntry {
  id: string
  title: string
  content: string
  prompt?: string
  timestamp: string
}

export function JournalEntries() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("journalEntries")
    if (stored) {
      setEntries(JSON.parse(stored))
    }
  }, [])

  const handleDelete = (id: string) => {
    const updated = entries.filter((entry) => entry.id !== id)
    setEntries(updated)
    localStorage.setItem("journalEntries", JSON.stringify(updated))
    if (expandedId === id) {
      setExpandedId(null)
    }
  }

  if (entries.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
            <Calendar className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No entries yet</h3>
            <p className="text-sm text-muted-foreground text-pretty">
              Start your journaling journey by writing your first entry. Use the prompts above for inspiration.
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Your Entries</h2>
        <p className="text-sm text-muted-foreground">
          {entries.length} {entries.length === 1 ? "entry" : "entries"}
        </p>
      </div>

      <div className="space-y-3">
        {entries.map((entry) => {
          const isExpanded = expandedId === entry.id
          const date = new Date(entry.timestamp)
          const preview = entry.content.slice(0, 150)

          return (
            <Card key={entry.id} className="overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1">{entry.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {date.toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(entry.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {entry.prompt && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">{entry.prompt}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                    {isExpanded ? entry.content : preview}
                    {!isExpanded && entry.content.length > 150 && "..."}
                  </p>
                  {entry.content.length > 150 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                      className="text-primary hover:text-primary"
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
