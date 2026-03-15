"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const CONTACT_EMAIL = "2690540630@qq.com"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>

          <h1 className="text-2xl font-bold text-foreground mb-6">联系我们</h1>

          <div className="space-y-6 text-foreground leading-relaxed">
            <p>
              感谢你成为 AI 导航站大家庭的一员，我们可以一起参与和塑造人工智能的未来！
            </p>
            <p className="text-muted-foreground">
              若你有任何意见和建议，无论是网站排版改进、AI 工具提交，还是文章投稿、观点分享和商务合作，欢迎随时联系站长的邮箱
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary hover:underline ml-1"
              >
                {CONTACT_EMAIL}
              </a>
              进行交流和沟通。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
