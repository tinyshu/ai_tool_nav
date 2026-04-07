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
