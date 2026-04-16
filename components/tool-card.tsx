import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { isInternalToolUrl } from "@/lib/outbound-redirect"

interface ToolCardProps {
  name: string
  description: string
  icon: string
  color: string
  url: string
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
  image,
}: ToolCardProps) {
  const imageSrc = image ? `${TOOLS_IMAGE_BASE}/${image}` : null
  const internal = isInternalToolUrl(url)
  const href = internal ? url : `/go?url=${encodeURIComponent(url)}`

  const className = "block w-full self-start"

  const inner = (
      <Card className="group relative overflow-hidden p-3 md:p-3.5 hover:shadow-lg transition-all duration-300 cursor-pointer border hover:border-primary/20">
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
              <p className="font-medium text-sm md:text-base text-foreground truncate">{name}</p>
            </div>
            <p className="mt-0.5 text-xs md:text-sm leading-snug text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </Card>
  )

  if (internal) {
    return (
      <Link href={href} className={className} title={url}>
        {inner}
      </Link>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={url}
      className={className}
    >
      {inner}
    </a>
  )
}
