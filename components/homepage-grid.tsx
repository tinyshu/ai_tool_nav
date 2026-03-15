import CategorySection from "@/components/category-section"
import FeaturedSection from "@/components/featured-section"
import { toolsData, categories } from "@/lib/tools-data"

// 热门推荐工具
const hotTools = [
  { name: "魔搭社区", description: "阿里达摩院推出...", icon: "魔", color: "bg-gradient-to-br from-purple-500 to-indigo-600", url: "https://www.modelscope.cn" },
  { name: "GPT-4", description: "OpenAI旗下最新...", icon: "G", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://chat.openai.com" },
  { name: "Midjourney", description: "AI图像和插画生成...", icon: "M", color: "bg-gradient-to-br from-gray-700 to-gray-800", url: "https://www.midjourney.com" },
  { name: "一帧秒创", description: "简单好用的AI智能...", icon: "一", color: "bg-gradient-to-br from-teal-400 to-cyan-500", url: "https://aigc.yizhentv.com" },
  { name: "文心一言", description: "百度推出的基于...", icon: "文", color: "bg-gradient-to-br from-blue-500 to-indigo-600", url: "https://yiyan.baidu.com" },
  { name: "Stable Diffusion", description: "StabilityAI推出的...", icon: "S", color: "bg-gradient-to-br from-purple-600 to-indigo-600", url: "https://stability.ai" },
  { name: "文心一格", description: "AI艺术和创意辅助...", icon: "格", color: "bg-gradient-to-br from-purple-400 to-pink-500", url: "https://yige.baidu.com" },
  { name: "造梦日记", description: "AI一下，妙笔生画", icon: "造", color: "bg-gradient-to-br from-gray-600 to-gray-700", url: "https://zmrj.art" },
  { name: "秒画", description: "商汤科技推出的...", icon: "秒", color: "bg-gradient-to-br from-blue-400 to-indigo-500", url: "https://miaohua.sensetime.com" },
  { name: "堆友AI反应堆", description: "阿里旗下堆友推...", icon: "堆", color: "bg-gradient-to-br from-red-500 to-rose-600", url: "https://d.design" },
  { name: "网易AI创意工坊", description: "网易云课堂推出...", icon: "网", color: "bg-gradient-to-br from-red-400 to-rose-500", url: "https://ke.study.163.com/ai" },
  { name: "稿定抠图", description: "稿定设计推出的AI...", icon: "稿", color: "bg-gradient-to-br from-blue-500 to-cyan-500", url: "https://www.gaoding.com/koutu" },
]

// 最新收录工具
const newTools = [
  { name: "ComfyUI", description: "ComfyUI - 可视化...", icon: "C", color: "bg-gradient-to-br from-green-500 to-emerald-500", url: "https://github.com/comfyanonymous/ComfyUI" },
  { name: "TapNow", description: "AI视觉内容创作平...", icon: "T", color: "bg-gradient-to-br from-pink-400 to-cyan-400", url: "https://tapnow.ai" },
  { name: "Solo", description: "Mozilla推出的零...", icon: "S", color: "bg-gradient-to-br from-purple-500 to-indigo-500", url: "https://solo.mozilla.org" },
  { name: "Audiobox", description: "Meta推出的免费...", icon: "A", color: "bg-gradient-to-br from-blue-400 to-indigo-500", url: "https://audiobox.metademolab.com" },
  { name: "Logo Diffusion", description: "AI驱动的Logo和...", icon: "L", color: "bg-gradient-to-br from-green-400 to-teal-500", url: "https://logodiffusion.com" },
  { name: "Remini", description: "AI智能将模糊照片...", icon: "R", color: "bg-gradient-to-br from-red-500 to-rose-600", url: "https://remini.ai" },
  { name: "Ollama", description: "本地运行Llama和...", icon: "O", color: "bg-gradient-to-br from-gray-600 to-gray-700", url: "https://ollama.ai" },
  { name: "JetBrains AI", description: "JetBrains推出的AI...", icon: "J", color: "bg-gradient-to-br from-purple-500 to-pink-500", url: "https://www.jetbrains.com/ai" },
  { name: "快转字幕", description: "AI语音视频转文字...", icon: "快", color: "bg-gradient-to-br from-green-400 to-cyan-400", url: "https://kuaizimu.com" },
  { name: "LongShot", description: "AI长文章写作工具", icon: "LS", color: "bg-gradient-to-br from-blue-500 to-indigo-600", url: "https://longshot.ai" },
  { name: "Jounce", description: "无限制免费AI文案...", icon: "Jn", color: "bg-gradient-to-br from-blue-400 to-cyan-500", url: "https://www.jounce.ai" },
  { name: "Reword", description: "AI文章写作", icon: "Rw", color: "bg-gradient-to-br from-purple-500 to-violet-600", url: "https://reword.co" },
]

export default function HomepageGrid() {
  return (
    <div className="space-y-10">
      {/* 热门推荐 */}
      <FeaturedSection type="hot" tools={hotTools} />

      {/* 最新收录 */}
      <FeaturedSection type="new" tools={newTools} />

      {/* 分类工具列表 */}
      {categories.map((category) => (
        <CategorySection
          key={category.id}
          categoryId={category.id}
          categoryName={category.name}
          tools={toolsData[category.name] || []}
          maxItems={16}
        />
      ))}
    </div>
  )
}
