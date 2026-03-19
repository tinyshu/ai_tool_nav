import { Flame, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import ToolCard from "@/components/tool-card"

interface Tool {
  name: string
  description: string
  icon: string
  color: string
  url: string
  featured?: boolean
  image?: string
}

interface FeaturedSectionProps {
  type: "hot" | "new"
  tools: Tool[]
}

export default function FeaturedSection({ type, tools }: FeaturedSectionProps) {
  const isHot = type === "hot"
  
  return (
    <section className="mb-7 md:mb-10">
      {/* Section Header Badge */}
      <div className="mb-4 md:mb-5">
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-white text-xs md:text-sm font-medium",
            isHot 
              ? "bg-gradient-to-r from-orange-500 to-red-500" 
              : "bg-gradient-to-r from-blue-500 to-cyan-500"
          )}
        >
          {isHot ? (
            <Flame className="h-4 w-4" />
          ) : (
            <Clock className="h-4 w-4" />
          )}
          <span>{isHot ? "热门推荐" : "最新收录"}</span>
        </div>
      </div>

      {/* Tools Grid - 与分类区保持一致 */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        {tools.slice(0, 12).map((tool, index) => (
          <ToolCard
            key={index}
            name={tool.name}
            description={tool.description}
            icon={tool.icon}
            color={tool.color}
            url={tool.url}
            featured={tool.featured}
            image={tool.image}
          />
        ))}
      </div>
    </section>
  )
}
