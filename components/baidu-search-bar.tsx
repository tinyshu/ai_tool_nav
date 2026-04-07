"use client"

import type { FormEvent } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function BaiduSearchBar() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const input = form.elements.namedItem("wd") as HTMLInputElement | null
    const q = input?.value?.trim() ?? ""
    if (!q) {
      input?.focus()
      return
    }
    const url = `https://www.baidu.com/s?ie=utf-8&wd=${encodeURIComponent(q)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <section className="mb-6 md:mb-8" aria-label="百度搜索">
      <form
        onSubmit={handleSubmit}
        className={cn(
          "mx-auto flex max-w-2xl items-center gap-2 rounded-full border border-border bg-card",
          "py-1.5 pl-4 pr-1.5 shadow-sm transition-shadow",
          "focus-within:border-ring focus-within:ring-ring/40 focus-within:ring-[3px]"
        )}
      >
        <span
          className="shrink-0 select-none text-sm font-semibold tracking-tight text-[#3385ff]"
          aria-hidden
        >
          百度
        </span>
        <input
          id="baidu-search-wd"
          name="wd"
          type="search"
          enterKeyHint="search"
          placeholder="输入关键词，使用百度搜索"
          autoComplete="off"
          className={cn(
            "min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none",
            "placeholder:text-muted-foreground"
          )}
        />
        <Button
          type="submit"
          size="icon"
          className="h-9 w-9 shrink-0 rounded-full bg-[#3385ff] hover:bg-[#2b6fd6]"
          aria-label="百度搜索"
        >
          <Search className="h-4 w-4 text-white" />
        </Button>
      </form>
    </section>
  )
}
