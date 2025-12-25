"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TherapistCard } from "@/components/therapist-card"
import { TherapistFilters } from "@/components/therapist-filters"
import { therapists } from "@/lib/therapist-data"
import { ArrowLeft, Users, Search } from "lucide-react"
import Link from "next/link"

export default function TherapistsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])
  const [insuranceOnly, setInsuranceOnly] = useState(false)

  const filteredTherapists = therapists.filter((therapist) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      therapist.specialty.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      therapist.location.toLowerCase().includes(searchQuery.toLowerCase())

    // Specialty filter
    const matchesSpecialty =
      selectedSpecialties.length === 0 ||
      selectedSpecialties.some((specialty) => therapist.specialty.includes(specialty))

    // Availability filter
    const matchesAvailability =
      selectedAvailability.length === 0 || selectedAvailability.includes(therapist.availability)

    // Insurance filter
    const matchesInsurance = !insuranceOnly || therapist.insurance

    return matchesSearch && matchesSpecialty && matchesAvailability && matchesInsurance
  })

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
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Find a Therapist</h1>
                <p className="text-xs text-muted-foreground">Connect with mental health professionals</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, specialty, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <TherapistFilters
            selectedSpecialties={selectedSpecialties}
            setSelectedSpecialties={setSelectedSpecialties}
            selectedAvailability={selectedAvailability}
            setSelectedAvailability={setSelectedAvailability}
            insuranceOnly={insuranceOnly}
            setInsuranceOnly={setInsuranceOnly}
          />

          {/* Results */}
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredTherapists.length} of {therapists.length} therapists
            </p>

            {filteredTherapists.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No therapists found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters or search query</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedSpecialties([])
                    setSelectedAvailability([])
                    setInsuranceOnly(false)
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredTherapists.map((therapist) => (
                  <TherapistCard key={therapist.id} therapist={therapist} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
