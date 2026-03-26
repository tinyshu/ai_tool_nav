import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'AI工具导航 - 发现最新AI工具',
  description: '每周更新最新AI工具，涵盖AI办公、图像、编程、写作、对话等多种分类',
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
