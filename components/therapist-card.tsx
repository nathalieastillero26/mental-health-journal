import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Therapist } from "@/lib/therapist-data"
import { MapPin, Clock, Globe, CreditCard } from "lucide-react"
import Image from "next/image"

interface TherapistCardProps {
  therapist: Therapist
}

const availabilityConfig = {
  accepting: { label: "Accepting New Clients", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  waitlist: { label: "Waitlist Available", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
  full: { label: "Not Accepting", color: "bg-red-500/10 text-red-500 border-red-500/20" },
}

export function TherapistCard({ therapist }: TherapistCardProps) {
  const availabilityStyle = availabilityConfig[therapist.availability]

  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-colors">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
            <Image src={therapist.image || "/placeholder.svg"} alt={therapist.name} fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-1">{therapist.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{therapist.credentials}</p>
            <Badge className={availabilityStyle.color}>{availabilityStyle.label}</Badge>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground leading-relaxed">{therapist.bio}</p>

        {/* Specialties */}
        <div>
          <p className="text-xs font-medium text-foreground mb-2">Specialties</p>
          <div className="flex flex-wrap gap-2">
            {therapist.specialty.map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>{therapist.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>{therapist.experience} years experience</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Globe className="w-4 h-4 flex-shrink-0" />
            <span>{therapist.languages.join(", ")}</span>
          </div>
          {therapist.insurance && (
            <div className="flex items-center gap-2 text-green-500">
              <CreditCard className="w-4 h-4 flex-shrink-0" />
              <span>Accepts Insurance</span>
            </div>
          )}
        </div>

        {/* Approach */}
        <div className="pt-2 border-t border-border">
          <p className="text-xs font-medium text-foreground mb-1">Therapeutic Approach</p>
          <p className="text-sm text-muted-foreground">{therapist.approach}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button className="flex-1" disabled={therapist.availability === "full"}>
            {therapist.availability === "full" ? "Not Available" : "Request Appointment"}
          </Button>
          <Button variant="outline">View Profile</Button>
        </div>
      </div>
    </Card>
  )
}
