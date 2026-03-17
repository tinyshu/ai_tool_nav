import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "关于我们 - AI工具导航",
  description: "了解 AI工具导航的使命、功能与使用说明",
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
