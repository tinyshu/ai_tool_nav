import CategorySection from "@/components/category-section"
import FeaturedSection from "@/components/featured-section"
import BaiduSearchBar from "@/components/baidu-search-bar"
import { toolsData, categories, getAllTools } from "@/lib/tools-data"

// 从全站工具数据中筛选热门推荐（featured: true）
const hotTools = getAllTools()
  .filter((tool) => tool.featured)
  .slice(0, 12)

// 从全站工具数据中筛选“最新收录”：按 addedAt 时间戳倒序排列，取前 12 个
const newTools = getAllTools()
  .filter((tool) => typeof tool.addedAt === "number")
  .sort((a, b) => (b.addedAt ?? 0) - (a.addedAt ?? 0))
  .slice(0, 12)

export default function HomepageGrid() {
  return (
    <div className="space-y-7 md:space-y-10">
      <header className="space-y-3">
        <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
          工具导航｜免费AI工具大全与分类推荐
        </h1>
        <h2 className="text-sm md:text-base font-semibold text-foreground max-w-3xl leading-snug">
          在线工具导航 · 收录含 OpenAI 在内的对话、办公、图像、编程等 AI 应用
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
          本站工具导航持续整理各分类下的免费在线工具清单，支持按热门与最新浏览检索，帮助你快速发现适合的 AI 工具与常用站点。
        </p>
      </header>
      <BaiduSearchBar />
      {/* 热门推荐 */}
      <FeaturedSection type="hot" tools={hotTools} />

      {/* 最新收录 */}
      <FeaturedSection type="new" tools={newTools} />

      {/* 分类工具列表 */}
      {categories.map((category) => (
        <CategorySection
          key={category.id}
          categoryId={category.id}
          categoryName={category.name}
          tools={toolsData[category.name] || []}
          maxItems={16}
        />
      ))}
    </div>
  )
}
