import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "关于我们 - AI导航",
  description: "了解 AI 导航的使命、功能与使用说明",
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
