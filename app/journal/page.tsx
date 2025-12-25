"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { JournalEditor } from "@/components/journal-editor"
import { JournalPrompts } from "@/components/journal-prompts"
import { JournalEntries } from "@/components/journal-entries"
import { ArrowLeft, PenLine } from "lucide-react"
import Link from "next/link"

export default function JournalPage() {
  const [showEditor, setShowEditor] = useState(false)
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt)
    setShowEditor(true)
  }

  const handleEntrySaved = () => {
    setShowEditor(false)
    setSelectedPrompt(null)
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <PenLine className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">Journal</h1>
                  <p className="text-xs text-muted-foreground">Express your thoughts freely</p>
                </div>
              </div>
            </div>
            {!showEditor && <Button onClick={() => setShowEditor(true)}>New Entry</Button>}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {showEditor ? (
            <JournalEditor
              initialPrompt={selectedPrompt}
              onSave={handleEntrySaved}
              onCancel={() => {
                setShowEditor(false)
                setSelectedPrompt(null)
              }}
            />
          ) : (
            <>
              {/* Daily Prompts */}
              <JournalPrompts onPromptSelect={handlePromptSelect} />

              {/* Past Entries */}
              <JournalEntries key={refreshKey} />
            </>
          )}
        </div>
      </main>
    </div>
  )
}
