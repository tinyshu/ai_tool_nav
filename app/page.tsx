import type { Metadata } from "next"
import HomeClient from "@/app/page-client"
import HomepageGrid from "@/components/homepage-grid"

export const metadata: Metadata = {
  title:
    "工具导航｜免费AI工具与OpenAI等收录｜办公图像编程写作推荐",
  description:
    "工具导航网站持续收录免费 AI 工具与在线站点，涵盖 OpenAI 生态、对话、图像、编程、写作、办公等分类；提供热门推荐与最新收录，便于一站式检索与收藏。",
}

export default function Home() {
  return (
    <HomeClient>
      <HomepageGrid />
    </HomeClient>
  )
}
