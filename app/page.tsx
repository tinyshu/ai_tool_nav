"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import HomepageGrid from "@/components/homepage-grid"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("AI办公工具")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false)

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
      "便民工具": "convenience",
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
        <div className="hidden md:block">
          <Sidebar
            activeCategory={activeCategory}
            onCategoryChange={scrollToCategory}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>
        <main className="flex-1 px-3 py-4 sm:px-4 sm:py-5 md:p-6 overflow-y-auto">
          <div className="mb-4 md:hidden">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => setMobileCategoryOpen(true)}
            >
              <Menu className="h-4 w-4" />
              分类导航
            </Button>
          </div>
          <HomepageGrid />
          <Footer />
        </main>
      </div>

      <Sheet open={mobileCategoryOpen} onOpenChange={setMobileCategoryOpen}>
        <SheetContent side="left" className="w-[82vw] max-w-[320px] p-4">
          <SheetHeader>
            <SheetTitle>分类导航</SheetTitle>
            <SheetDescription>选择分类后自动跳转对应区块</SheetDescription>
          </SheetHeader>
          <div className="mt-4 h-[calc(100%-4.5rem)]">
            <Sidebar
              activeCategory={activeCategory}
              onCategoryChange={scrollToCategory}
              collapsed={false}
              onToggleCollapse={() => {}}
              mobileMode
              onSelect={() => setMobileCategoryOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
