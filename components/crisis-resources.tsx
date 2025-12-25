import { Card } from "@/components/ui/card"
import { Phone, MessageSquare, AlertCircle } from "lucide-react"
import { crisisResources } from "@/lib/resource-data"

export function CrisisResources() {
  return (
    <Card className="p-6 bg-destructive/5 border-destructive/20">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-destructive" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">Crisis Support Available 24/7</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you're in crisis or need immediate support, please reach out to one of these resources. Help is
              available.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {crisisResources.map((resource, index) => (
                <div key={index} className="p-4 rounded-lg bg-background border border-border">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-foreground text-sm">{resource.name}</h4>
                      {resource.phone.includes("Text") ? (
                        <MessageSquare className="w-4 h-4 text-primary flex-shrink-0" />
                      ) : (
                        <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{resource.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm font-mono font-semibold text-primary">{resource.phone}</span>
                      <span className="text-xs text-muted-foreground">{resource.available}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
