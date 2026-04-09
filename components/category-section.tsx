import Link from "next/link"
import { ChevronRight } from "lucide-react"
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

interface CategorySectionProps {
  categoryName: string
  categoryId: string
  tools: Tool[]
  maxItems?: number
}

export default function CategorySection({
  categoryName,
  categoryId,
  tools,
  maxItems = 16,
}: CategorySectionProps) {
  const displayedTools = tools.slice(0, maxItems)
  const hasMore = tools.length > maxItems

  return (
    <section id={categoryId} className="scroll-mt-20 md:scroll-mt-24">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-4 md:mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 bg-primary rounded-full" />
          <h2 className="text-base md:text-lg font-semibold text-foreground">{categoryName}</h2>
        </div>
        <Link 
          href={`/category/${categoryId}`}
          className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          更多
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Tools Grid - 4 columns max, 4 rows = 16 items */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        {displayedTools.map((tool, index) => (
          <ToolCard
            key={index}
            name={tool.name}
            description={tool.description}
            icon={tool.icon}
            color={tool.color}
            url={tool.url}
            image={tool.image}
          />
        ))}
      </div>

      {/* Read More Button */}
      {hasMore && (
        <div className="mt-3 md:mt-4 flex justify-center">
          <Link
            href={`/category/${categoryId}`}
            className="inline-flex items-center gap-2 px-4 md:px-6 py-2 text-xs md:text-sm text-primary border border-primary/30 rounded-full hover:bg-primary/5 transition-colors"
          >
            查看全部 {tools.length} 个工具
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </section>
  )
}
