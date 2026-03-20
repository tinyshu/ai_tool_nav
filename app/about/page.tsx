import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "关于我们 - AI工具导航",
  description:
    "AI工具导航致力于收录并持续更新全球AI工具与学习资源，帮助你快速发现前沿人工智能项目与实用工具。",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* 左侧文案 */}
            <div className="space-y-6 text-foreground">
              <p className="text-lg leading-relaxed">
                感谢你使用 AI 导航！我们只专注在帮助您了解前沿人工智能项目。
              </p>
              <p className="text-muted-foreground leading-relaxed">
                收录了大量的国内外 AI 生成图片、AI 生成视频、AI 生成文案、文生图、AI 绘画、AI 办公、AI 聊天等网站。
              </p>
              <p className="text-muted-foreground leading-relaxed">
                简约舒适且清新的界面、强大的站内搜索及多种搜索引擎切换、网站全局自定义、素材聚合搜索等等功能，助您轻松发现与使用 AI 工具。
              </p>
              <p className="text-muted-foreground leading-relaxed">
                如果你有任何疑问和建议，欢迎在右下角客服或留言板反馈给我们。
              </p>
              <p className="text-muted-foreground leading-relaxed">
                AI 导航网站使用 HTTPS 安全传输，你将得到更安全的上网导航服务。欢迎将 AI 导航设为浏览器主页或者 Ctrl+D 键添加到浏览器收藏夹。
              </p>

              <section className="pt-4 border-t border-border">
                <h2 className="font-semibold text-foreground mb-2">版权声明</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  本网站数据及界面均受版权保护，任何公司及个人不得以任何方式复制，违者将依法追究责任。
                </p>
              </section>
            </div>

            {/* 右侧插画：AI 主题，参考图的简洁风格 */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-square">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950/30 dark:to-orange-950/30 flex items-center justify-center">
                  <svg
                    viewBox="0 0 280 280"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full p-8"
                  >
                    {/* 背景光晕 */}
                    <circle cx="140" cy="140" r="100" fill="url(#sun)" opacity="0.9" />
                    <defs>
                      <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
                        <stop stopColor="#FCD34D" stopOpacity="0.6" />
                        <stop offset="1" stopColor="#F97316" stopOpacity="0.2" />
                      </radialGradient>
                    </defs>
                    {/* 机器人 / AI 角色 */}
                    <g transform="translate(70, 60)">
                      <ellipse cx="70" cy="95" rx="45" ry="20" fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="2" />
                      <rect x="35" y="45" width="70" height="55" rx="8" fill="#F0F9FF" stroke="#0EA5E9" strokeWidth="2" />
                      <circle cx="55" cy="68" r="6" fill="#0EA5E9" />
                      <circle cx="85" cy="68" r="6" fill="#0EA5E9" />
                      <path d="M55 82 Q70 90 85 82" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" fill="none" />
                      <rect x="60" y="98" width="20" height="25" rx="4" fill="#7DD3FC" stroke="#0EA5E9" strokeWidth="1.5" />
                      <path d="M25 75 L10 95 L25 90 Z" fill="#38BDF8" stroke="#0EA5E9" strokeWidth="1.5" />
                      <path d="M115 75 L130 95 L115 90 Z" fill="#38BDF8" stroke="#0EA5E9" strokeWidth="1.5" />
                    </g>
                    {/* 上升轨迹 / 科技感线条 */}
                    <path d="M140 180 Q120 140 100 100 Q90 80 85 60" stroke="#94A3B8" strokeWidth="2" strokeDasharray="6 4" fill="none" opacity="0.7" />
                    <path d="M140 180 Q160 140 180 100 Q190 80 195 60" stroke="#94A3B8" strokeWidth="2" strokeDasharray="6 4" fill="none" opacity="0.7" />
                    {/* 小星星点缀 */}
                    <circle cx="80" cy="50" r="2.5" fill="#FBBF24" />
                    <circle cx="200" cy="70" r="2" fill="#FBBF24" />
                    <circle cx="60" cy="130" r="1.5" fill="#FBBF24" />
                    <circle cx="220" cy="100" r="1.5" fill="#FBBF24" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
