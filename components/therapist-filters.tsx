"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { specialties } from "@/lib/therapist-data"
import { Filter, X } from "lucide-react"
import { useState } from "react"

interface TherapistFiltersProps {
  selectedSpecialties: string[]
  setSelectedSpecialties: (specialties: string[]) => void
  selectedAvailability: string[]
  setSelectedAvailability: (availability: string[]) => void
  insuranceOnly: boolean
  setInsuranceOnly: (value: boolean) => void
}

export function TherapistFilters({
  selectedSpecialties,
  setSelectedSpecialties,
  selectedAvailability,
  setSelectedAvailability,
  insuranceOnly,
  setInsuranceOnly,
}: TherapistFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(
      selectedSpecialties.includes(specialty)
        ? selectedSpecialties.filter((s) => s !== specialty)
        : [...selectedSpecialties, specialty],
    )
  }

  const toggleAvailability = (availability: string) => {
    setSelectedAvailability(
      selectedAvailability.includes(availability)
        ? selectedAvailability.filter((a) => a !== availability)
        : [...selectedAvailability, availability],
    )
  }

  const clearAllFilters = () => {
    setSelectedSpecialties([])
    setSelectedAvailability([])
    setInsuranceOnly(false)
  }

  const activeFilterCount = selectedSpecialties.length + selectedAvailability.length + (insuranceOnly ? 1 : 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
          <Filter className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs">
              {activeFilterCount}
            </span>
          )}
        </Button>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="gap-2">
            <X className="w-4 h-4" />
            Clear All
          </Button>
        )}
      </div>

      {showFilters && (
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Specialties */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Specialties</h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {specialties.map((specialty) => (
                  <div key={specialty} className="flex items-center gap-2">
                    <Checkbox
                      id={`specialty-${specialty}`}
                      checked={selectedSpecialties.includes(specialty)}
                      onCheckedChange={() => toggleSpecialty(specialty)}
                    />
                    <Label htmlFor={`specialty-${specialty}`} className="text-sm cursor-pointer">
                      {specialty}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Availability</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="availability-accepting"
                    checked={selectedAvailability.includes("accepting")}
                    onCheckedChange={() => toggleAvailability("accepting")}
                  />
                  <Label htmlFor="availability-accepting" className="text-sm cursor-pointer">
                    Accepting New Clients
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="availability-waitlist"
                    checked={selectedAvailability.includes("waitlist")}
                    onCheckedChange={() => toggleAvailability("waitlist")}
                  />
                  <Label htmlFor="availability-waitlist" className="text-sm cursor-pointer">
                    Waitlist Available
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="availability-full"
                    checked={selectedAvailability.includes("full")}
                    onCheckedChange={() => toggleAvailability("full")}
                  />
                  <Label htmlFor="availability-full" className="text-sm cursor-pointer">
                    Not Accepting
                  </Label>
                </div>
              </div>
            </div>

            {/* Other Filters */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Other</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="insurance"
                    checked={insuranceOnly}
                    onCheckedChange={(checked) => setInsuranceOnly(checked as boolean)}
                  />
                  <Label htmlFor="insurance" className="text-sm cursor-pointer">
                    Accepts Insurance
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
