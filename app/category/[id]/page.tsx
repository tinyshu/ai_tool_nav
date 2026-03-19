"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import ToolCard from "@/components/tool-card"
import { categoryMap, toolsData } from "@/lib/tools-data"

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const categoryName = categoryMap[id] || "未知分类"
  const tools = toolsData[categoryName] || []

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-3 py-5 sm:px-4 sm:py-6 md:px-6 md:py-8">
        {/* Back Button & Title */}
        <div className="mb-5 md:mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3 md:mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <div className="w-1.5 h-7 md:h-8 bg-primary rounded-full" />
            <h1 className="text-xl md:text-2xl font-bold text-foreground">{categoryName}</h1>
            <span className="text-sm md:text-base text-muted-foreground">({tools.length} 个工具)</span>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {tools.map((tool, index) => (
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

        {tools.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            该分类暂无工具
          </div>
        )}
      </main>
    </div>
  )
}
