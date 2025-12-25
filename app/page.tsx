"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MoodTracker } from "@/components/mood-tracker"
import { QuickActions } from "@/components/quick-actions"
import { RecentEntries } from "@/components/recent-entries"
import { BookOpen, Brain, Users, Library, Menu, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">MindfulSpace</h1>
                <p className="text-xs text-muted-foreground">Your mental wellness companion</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/progress">
                <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Progress
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground text-balance">Welcome back</h2>
            <p className="text-muted-foreground text-pretty">
              How are you feeling today? Take a moment to check in with yourself.
            </p>
          </div>

          {/* Mood Tracker */}
          <MoodTracker />

          {/* Quick Actions */}
          <QuickActions />

          {/* Recent Entries */}
          <RecentEntries />

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/journal">
              <Card className="p-6 hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Journal</h3>
                    <p className="text-sm text-muted-foreground text-pretty">Write your thoughts and feelings</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/therapists">
              <Card className="p-6 hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Find Support</h3>
                    <p className="text-sm text-muted-foreground text-pretty">
                      Connect with mental health professionals
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/resources">
              <Card className="p-6 hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Library className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Resources</h3>
                    <p className="text-sm text-muted-foreground text-pretty">Learn about mental health and wellness</p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
