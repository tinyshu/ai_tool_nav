"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import NextImage from "next/image"
import {
  Search,
  ChevronDown,
  Briefcase,
  Image,
  Code,
  Pencil,
  MessageSquare,
  Terminal,
  Search as SearchIcon,
  Languages,
  Video,
  Palette,
  Volume2,
  Gamepad2,
  Wrench,
  Sparkles,
  MoreHorizontal,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchPopover } from "@/components/search-popover"
import { cn } from "@/lib/utils"
import ThemeToggle from "@/components/theme-toggle"

const categories = [
  { id: "entertainment", label: "AI娱乐工具", icon: Gamepad2 },
  { id: "convenience", label: "便民工具", icon: Wrench },
  { id: "magic", label: "神奇网站", icon: Sparkles },
  { id: "office", label: "AI办公工具", icon: Briefcase },
  { id: "image", label: "AI图像工具", icon: Image },
  { id: "coding", label: "AI编程工具", icon: Code },
  { id: "writing", label: "AI写作工具", icon: Pencil },
  { id: "chat", label: "AI对话工具", icon: MessageSquare },
  { id: "platform", label: "AI开发平台", icon: Terminal },
  { id: "search", label: "AI搜索引擎", icon: SearchIcon },
  { id: "translate", label: "AI翻译工具", icon: Languages },
  { id: "video", label: "AI视频工具", icon: Video },
  { id: "design", label: "AI设计工具", icon: Palette },
  { id: "audio", label: "AI音频工具", icon: Volume2 },
  { id: "other", label: "其他AI工具", icon: MoreHorizontal },
]

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchAnchorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Logo - 点击返回首页 */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="text-xl font-bold inline-flex items-center gap-2">
            <NextImage
              src="/ai_dh.png"
              alt="工具导航"
              width={28}
              height={28}
              className="h-7 w-7"
              priority
            />
            <span className="text-foreground">工具导航</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {/* AI Tools Category Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="ghost"
              className={cn(
                "text-sm gap-1",
                isDropdownOpen && "bg-muted"
              )}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>≡</span> AI工具分类
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                isDropdownOpen && "rotate-180"
              )} />
            </Button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-background border rounded-lg shadow-lg py-2 z-50">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <Link
                      key={category.id}
                      href={`/category/${category.id}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <span>{category.label}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          <Link href="/contact">
            <Button variant="ghost" className="text-sm gap-1">
              <User className="h-4 w-4" /> 联系站长
            </Button>
          </Link>
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
            <span>Ctrl+D或⌘+D收藏本站</span>
            <span className="text-primary font-medium">「每周更新最新AI工具」</span>
          </div>
          <ThemeToggle />
          <div className="relative" ref={searchAnchorRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="站内搜索"
            >
              <Search className="h-5 w-5" />
            </Button>
            <SearchPopover
              open={searchOpen}
              onClose={() => setSearchOpen(false)}
              anchorRef={searchAnchorRef}
            />
          </div>
        </div>
      </div>
    </header>
  )
}
