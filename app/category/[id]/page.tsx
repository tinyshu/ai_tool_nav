import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import ToolCard from "@/components/tool-card"
import { categoryIntroMap, categoryMap, toolsData } from "@/lib/tools-data"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const categoryName = categoryMap[id] || "未知分类"
  const tools = toolsData[categoryName] || []

  return {
    title: `${categoryName}AI工具推荐_最新${categoryName}工具导航`,
    description: `浏览${categoryName}分类下的AI工具推荐，当前共收录${tools.length}个工具，并持续更新热门与最新收录。`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const categoryName = categoryMap[id] || "未知分类"
  const tools = toolsData[categoryName] || []
  const intro = categoryIntroMap[categoryName]

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

        {intro && (
          <section
            className="mb-6 md:mb-8 rounded-xl border border-border bg-muted/30 px-4 py-5 md:px-6 md:py-6"
            aria-labelledby="category-intro-heading"
          >
            <h2
              id="category-intro-heading"
              className="text-base md:text-lg font-semibold text-foreground mb-3"
            >
              分类简介与选择建议
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {intro.body}
            </p>
            {intro.tips && intro.tips.length > 0 && (
              <ul className="mt-4 list-disc list-inside space-y-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                {intro.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            )}
          </section>
        )}

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
