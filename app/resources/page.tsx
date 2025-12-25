"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ResourceCard } from "@/components/resource-card"
import { CrisisResources } from "@/components/crisis-resources"
import { resources, categories } from "@/lib/resource-data"
import { ArrowLeft, Library, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredResources =
    selectedCategory === "All" ? resources : resources.filter((resource) => resource.category === selectedCategory)

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
                <Library className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Educational Resources</h1>
                <p className="text-xs text-muted-foreground">Learn about mental health and wellness</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Crisis Resources Banner */}
          <CrisisResources />

          {/* Category Filter */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Browse by Topic</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredResources.length} {filteredResources.length === 1 ? "article" : "articles"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>

          {/* Additional Help Section */}
          <div className="mt-12 p-6 rounded-xl bg-muted/50 border border-border">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Need More Support?</h3>
                <p className="text-sm text-muted-foreground text-pretty mb-4">
                  These resources are for educational purposes only and are not a substitute for professional mental
                  health care. If you're struggling, please reach out to a mental health professional.
                </p>
                <Link href="/therapists">
                  <Button>Find a Therapist</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
