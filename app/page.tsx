"use client"

import { useState } from "react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import HomepageGrid from "@/components/homepage-grid"
import Footer from "@/components/footer"

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("AI办公工具")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const scrollToCategory = (category: string) => {
    setActiveCategory(category)
    const categoryIdMap: Record<string, string> = {
      "AI办公工具": "office",
      "AI图像工具": "image",
      "AI编程工具": "coding",
      "AI写作工具": "writing",
      "AI对话工具": "chat",
      "AI开发平台": "platform",
      "AI搜索引擎": "search",
      "AI翻译工具": "translate",
      "AI视频工具": "video",
      "AI设计工具": "design",
      "AI音频工具": "audio",
      "AI娱乐工具": "entertainment",
      "其他AI工具": "other",
    }
    const categoryId = categoryIdMap[category]
    if (categoryId) {
      const element = document.getElementById(categoryId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar
          activeCategory={activeCategory}
          onCategoryChange={scrollToCategory}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className="flex-1 p-6 overflow-y-auto">
          <HomepageGrid />
          <Footer />
        </main>
      </div>
    </div>
  )
}
