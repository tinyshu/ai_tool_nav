import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"
import {
  Briefcase,
  Image,
  Code,
  Pencil,
  MessageSquare,
  Terminal,
  Search,
  Languages,
  Video,
  Palette,
  Volume2,
  Gamepad2,
  Wrench,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
} from "lucide-react"

export const sidebarCategories = [
  { id: "AI办公工具", label: "AI办公工具", icon: Briefcase },
  { id: "AI图像工具", label: "AI图像工具", icon: Image },
  { id: "AI编程工具", label: "AI编程工具", icon: Code },
  { id: "AI写作工具", label: "AI写作工具", icon: Pencil },
  { id: "AI对话工具", label: "AI对话工具", icon: MessageSquare },
  { id: "AI开发平台", label: "AI开发平台", icon: Terminal },
  { id: "AI搜索引擎", label: "AI搜索引擎", icon: Search },
  { id: "AI翻译工具", label: "AI翻译工具", icon: Languages },
  { id: "AI视频工具", label: "AI视频工具", icon: Video },
  { id: "AI设计工具", label: "AI设计工具", icon: Palette },
  { id: "AI音频工具", label: "AI音频工具", icon: Volume2 },
  { id: "AI娱乐工具", label: "AI娱乐工具", icon: Gamepad2 },
  { id: "便民工具", label: "便民工具", icon: Wrench },
  { id: "其他AI工具", label: "其他AI工具", icon: MoreHorizontal },
]

type SidebarCategory = {
  id: string
  label: string
  icon: LucideIcon
}

interface SidebarProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
  mobileMode?: boolean
  onSelect?: () => void
}

export default function Sidebar({
  activeCategory,
  onCategoryChange,
  collapsed,
  onToggleCollapse,
  mobileMode = false,
  onSelect,
}: SidebarProps) {
  const categoryListClasses = mobileMode ? "space-y-1 px-0" : "space-y-1 px-2"
  const categoryItemClasses = mobileMode
    ? "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors"
    : "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"

  const renderCategories = (categories: SidebarCategory[]) => (
    <ul className={categoryListClasses}>
      {categories.map((category) => {
        const Icon = category.icon
        const isActive = activeCategory === category.id

        return (
          <li key={category.id}>
            <button
              onClick={() => {
                onCategoryChange(category.id)
                onSelect?.()
              }}
              className={cn(
                categoryItemClasses,
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{category.label}</span>}
            </button>
          </li>
        )
      })}
    </ul>
  )

  if (mobileMode) {
    return (
      <div className="h-full">
        <nav className="h-full overflow-y-auto py-2">
          {renderCategories(sidebarCategories)}
        </nav>
      </div>
    )
  }

  return (
    <aside
      className={cn(
        "sticky top-16 h-[calc(100vh-4rem)] border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-52"
      )}
    >
      <div className="flex flex-col h-full">
        <nav className="flex-1 overflow-y-auto py-4">
          {renderCategories(sidebarCategories)}
        </nav>
        <div className="border-t p-2">
          <Button
            variant="ghost"
            className="w-full justify-center gap-2"
            onClick={onToggleCollapse}
          >
            {collapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <>
                <ChevronUp className="h-4 w-4" />
                <span>收起</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </aside>
  )
}
