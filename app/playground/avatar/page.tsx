import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AvatarCanvasPlayground from "@/components/avatar-canvas-playground"

export const metadata: Metadata = {
  title: "呆萌头像实验室 - 工具导航",
  description:
    "用 Canvas 随机生成简笔画风呆萌头像，支持一键换一张与下载 PNG。",
}

export default function PlaygroundAvatarPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 sm:py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>

          <h1 className="text-2xl font-bold text-foreground mb-8">
            呆萌头像实验室
          </h1>

          <AvatarCanvasPlayground />
        </div>
      </main>
      <Footer />
    </div>
  )
}
