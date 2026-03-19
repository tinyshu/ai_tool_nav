import Link from "next/link"
import Image from "next/image"
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
  /** 可选：真图片文件名（位于 public/tools/ 下，如 "lingdong.png"） */
  image?: string
}

const TOOLS_IMAGE_BASE = "/tools"

export default function ToolCard({
  name,
  description,
  icon,
  color,
  url,
  featured,
  image,
}: ToolCardProps) {
  const imageSrc = image ? `${TOOLS_IMAGE_BASE}/${image}` : null

  return (
    <Link href={url} target="_blank" rel="noopener noreferrer" className="block h-full">
      <Card className="group relative overflow-hidden p-3 md:p-4 hover:shadow-lg transition-all duration-300 cursor-pointer border hover:border-primary/20 h-full">
        <div className="flex items-start gap-3">
          {/* Icon / Image */}
          {imageSrc ? (
            <div className="shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-xl overflow-hidden bg-muted flex items-center justify-center">
              <Image
                src={imageSrc}
                alt={name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className={cn(
                "shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm",
                color
              )}
            >
              {icon}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm md:text-base text-foreground truncate">{name}</h3>
            </div>
            <p className="mt-1 text-xs md:text-sm text-muted-foreground line-clamp-2">
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
