"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { Search, ExternalLink } from "lucide-react"
import { searchTools, categoryNameToId, type ToolWithCategory } from "@/lib/tools-data"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const DEBOUNCE_MS = 250
const PLACEHOLDER = "搜索 AI 工具名称、描述或分类"

interface SearchPopoverProps {
  open: boolean
  onClose: () => void
  anchorRef: React.RefObject<HTMLElement | null>
}

export function SearchPopover({ open, onClose, anchorRef }: SearchPopoverProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<ToolWithCategory[]>([])
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => {
      setDebouncedQuery(query)
    }, DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [query, open])

  useEffect(() => {
    setResults(debouncedQuery ? searchTools(debouncedQuery) : [])
  }, [debouncedQuery])

  useEffect(() => {
    if (open) {
      setQuery("")
      setDebouncedQuery("")
      setResults([])
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !containerRef.current?.contains(e.target as Node) &&
        !anchorRef.current?.contains(e.target as Node)
      ) {
        onClose()
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, onClose, anchorRef])

  const handleSelect = (tool: ToolWithCategory) => {
    window.open(tool.url, "_blank", "noopener")
    onClose()
  }

  if (!open) return null

  return (
    <div
      ref={containerRef}
      className="absolute top-full right-0 mt-2 w-[min(400px,calc(100vw-2rem))] rounded-xl border bg-background shadow-lg z-50 overflow-hidden"
      onKeyDown={handleKeyDown}
    >
      <div className="p-2 border-b flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
        <Input
          ref={inputRef}
          type="search"
          placeholder={PLACEHOLDER}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-9"
          autoComplete="off"
        />
      </div>
      <div className="max-h-[min(60vh,400px)] overflow-y-auto">
        {!debouncedQuery && (
          <p className="p-4 text-sm text-muted-foreground text-center">
            输入关键词搜索工具名称、描述或分类
          </p>
        )}
        {debouncedQuery && results.length === 0 && (
          <p className="p-4 text-sm text-muted-foreground text-center">
            未找到相关工具
          </p>
        )}
        {results.length > 0 && (
          <ul className="py-2">
            {results.map((tool, i) => (
              <li
                key={`${tool.url}-${i}`}
                className={cn(
                  "flex items-start gap-3 px-4 py-2.5 hover:bg-muted transition-colors"
                )}
              >
                <button
                  type="button"
                  className="flex min-w-0 flex-1 items-start gap-3 text-left"
                  onClick={() => handleSelect(tool)}
                >
                  <span
                    className={cn(
                      "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-medium",
                      tool.color
                    )}
                  >
                    {tool.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground truncate">
                        {tool.name}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {tool.description}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                </button>
                {categoryNameToId[tool.category] ? (
                  <Link
                    href={`/category/${categoryNameToId[tool.category]}`}
                    className="text-xs text-muted-foreground hover:text-primary shrink-0 pt-1"
                    onClick={() => onClose()}
                  >
                    {tool.category}
                  </Link>
                ) : (
                  <span className="text-xs text-muted-foreground shrink-0 pt-1">
                    {tool.category}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
