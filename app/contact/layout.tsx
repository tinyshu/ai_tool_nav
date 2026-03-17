import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "联系我们 - AI工具导航",
  description: "联系 AI 导航站长，反馈建议、投稿或合作",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
