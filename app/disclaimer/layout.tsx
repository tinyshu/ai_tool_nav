import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "免责声明 - AI导航",
  description: "AI导航网站服务与使用免责声明",
}

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
