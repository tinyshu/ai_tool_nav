import type { Metadata } from "next"
import HomeClient from "@/app/page-client"

export const metadata: Metadata = {
  title: "AI工具导航 - 免费AI工具推荐与导航",
  description:
    "AI工具导航收录并持续更新AI办公、图像、编程、写作、对话等工具。快速发现热门推荐与最新收录，轻松找到适合你的AI工具。",
}

export default function Home() {
  return <HomeClient />
}
