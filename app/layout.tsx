import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    '工具导航｜免费AI工具大全与分类导航，收录办公图像编程写作等热门应用',
  description:
    '工具导航每周更新免费 AI 工具与在线站点，涵盖 OpenAI、对话、图像、编程、写作、办公等分类；热门推荐与最新收录一站式检索。',
  /** 建议 6～12 组关键词，供部分检测工具与历史爬虫读取 */
  keywords: [
    '工具导航',
    'AI工具导航',
    'OpenAI',
    '免费AI工具',
    'AI工具推荐',
    '人工智能工具',
    'AI办公工具',
    'AI图像工具',
    'AI编程工具',
    'AI写作工具',
    'AI对话工具',
    '在线工具导航',
  ],
  generator: 'AIToolsNav',
  icons: {
    icon: [
      { url: '/ai_dh.png', type: 'image/png' },
    ],
    apple: '/ai_dh.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
