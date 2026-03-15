"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import ToolCard from "@/components/tool-card"
import { toolsData, subCategories } from "@/lib/tools-data"

interface ToolsGridProps {
  activeCategory: string
}

export default function ToolsGrid({ activeCategory }: ToolsGridProps) {
  const [activeSubCategory, setActiveSubCategory] = useState(0)
  const currentSubCategories = subCategories[activeCategory] || []
  const tools = toolsData[activeCategory] || []

  return (
    <div className="space-y-6">
      {/* Category Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">{activeCategory}</span>
        </div>
        <a href="#" className="text-sm text-muted-foreground hover:text-primary">
          更多{">>"}
        </a>
      </div>

      {/* Sub Categories */}
      <div className="flex flex-wrap items-center gap-2">
        {currentSubCategories.map((sub, index) => (
          <button
            key={sub}
            onClick={() => setActiveSubCategory(index)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm transition-colors",
              activeSubCategory === index
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {tools.map((tool, index) => (
          <ToolCard
            key={index}
            name={tool.name}
            description={tool.description}
            icon={tool.icon}
            color={tool.color}
            url={tool.url}
            featured={tool.featured}
          />
        ))}
      </div>
    </div>
  )
}
