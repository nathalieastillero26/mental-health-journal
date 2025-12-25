import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Resource } from "@/lib/resource-data"
import { Clock, ArrowRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ResourceCardProps {
  resource: Resource
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="block">
      <Card className="overflow-hidden hover:border-primary/50 transition-colors cursor-pointer group h-full">
        <div className="relative h-48 bg-muted overflow-hidden">
          <Image
            src={resource.image || "/placeholder.svg"}
            alt={resource.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
              {resource.category}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <div className="bg-background/90 backdrop-blur-sm rounded-full p-2">
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
              {resource.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>
            <p className="text-xs text-muted-foreground/80 italic">By {resource.author}</p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{resource.readTime} min read</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
              Read Article
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
