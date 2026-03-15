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
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button & Title */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-primary rounded-full" />
            <h1 className="text-2xl font-bold text-foreground">{categoryName}</h1>
            <span className="text-muted-foreground">({tools.length} 个工具)</span>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

        {tools.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            该分类暂无工具
          </div>
        )}
      </main>
    </div>
  )
}
