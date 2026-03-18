"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

type ThemeMode = "light" | "dark"

const THEME_STORAGE_KEY = "ai-tool-nav-theme"

function applyTheme(theme: ThemeMode) {
  if (typeof document === "undefined") return
  const root = document.documentElement
  root.classList.remove("dark")
  if (theme === "dark") {
    root.classList.add("dark")
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("light")

  useEffect(() => {
    if (typeof window === "undefined") return

    const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null

    if (stored === "light" || stored === "dark") {
      setTheme(stored)
      applyTheme(stored)
      return
    }

    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches
    const initial: ThemeMode = prefersDark ? "dark" : "light"
    setTheme(initial)
    applyTheme(initial)
  }, [])

  const toggleTheme = () => {
    const next: ThemeMode = theme === "dark" ? "light" : "dark"
    setTheme(next)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, next)
    }
    applyTheme(next)
  }

  const isDark = theme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? "切换到日间模式" : "切换到夜间模式"}
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  )
}

