import Link from "next/link"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ToolCardProps {
  name: string
  description: string
  icon: string
  color: string
  url: string
  featured?: boolean
}

export default function ToolCard({
  name,
  description,
  icon,
  color,
  url,
  featured,
}: ToolCardProps) {
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <Card className="group relative overflow-hidden p-4 hover:shadow-lg transition-all duration-300 cursor-pointer border hover:border-primary/20 h-full">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div
            className={cn(
              "shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm",
              color
            )}
          >
            {icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-foreground truncate">{name}</h3>
              {featured && (
                <Badge variant="secondary" className="bg-primary/10 text-primary text-xs shrink-0">
                  常用
                </Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </Card>
    </Link>
  )
}
