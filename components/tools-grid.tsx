"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import ToolCard from "@/components/tool-card"

const subCategories: Record<string, string[]> = {
  AI办公工具: ["常用AI办公工具", "AI幻灯片和演示", "AI思维导图", "AI文档工具", "AI表格数据处理", "AI会议工具", "AI效率提升"],
  AI图像工具: ["常用AI图像工具", "AI图片插画生成", "AI商品图片生成", "AI图片优化修复", "AI图片无损放大", "AI图片背景移除", "AI图片物体抹除"],
  AI编程工具: ["常用AI编程工具", "AI代码生成", "AI代码补全", "AI代码审查"],
  AI写作工具: ["常用AI写作工具", "AI文章生成", "AI文案创作", "AI内容改写"],
  AI对话工具: ["常用AI对话工具", "AI聊天机器人", "AI客服助手"],
  AI开发平台: ["常用AI开发平台", "AI模型训练", "AI API服务"],
  AI搜索引擎: ["常用AI搜索引擎", "AI智能搜索", "AI问答搜索"],
  AI翻译工具: ["常用AI翻译工具", "AI文档翻译", "AI实时翻译"],
  AI视频工具: ["常用AI视频工具", "AI视频生成", "AI视频编辑", "AI视频增强"],
  AI设计工具: ["常用AI设计工具", "AI平面设计", "AI3D设计"],
  AI音频工具: ["常用AI音频工具", "AI语音合成", "AI音乐生成"],
  AI娱乐工具: ["常用AI娱乐工具", "AI游戏", "AI创意"],
  其他AI工具: ["常用其他工具", "AI学习", "AI生活"],
}

const toolsData: Record<string, Array<{
  name: string
  description: string
  icon: string
  color: string
  url: string
  featured?: boolean
}>> = {
  AI办公工具: [
    { name: "凌动AI", description: "免费上传PDF，支持真AI总结...", icon: "PDF", color: "bg-gradient-to-br from-pink-500 to-red-500", url: "https://lingdong.ai", featured: true },
    { name: "玫瑰克隆工具", description: "AI图文笔记一键生成创作并自...", icon: "玫", color: "bg-gradient-to-br from-pink-400 to-rose-500", url: "https://meigui.ai", featured: true },
    { name: "PicDoc", description: "PicDoc是一款AI驱动的文本...", icon: "P", color: "bg-gradient-to-br from-purple-500 to-violet-600", url: "https://picdoc.ai" },
    { name: "萝卜简历", description: "萝卜简历（www.luobojl.cn）...", icon: "萝", color: "bg-gradient-to-br from-orange-400 to-amber-500", url: "https://www.luobojl.cn" },
    { name: "标探长AI标书", description: "标探长AI标书智能体，10分...", icon: "标", color: "bg-gradient-to-br from-blue-500 to-cyan-500", url: "https://biaotanzhang.com" },
    { name: "小图钉Excel助手", description: "还在被Excel复杂公式和VLO...", icon: "钉", color: "bg-gradient-to-br from-green-500 to-emerald-500", url: "https://xiaotuding.com", featured: true },
    { name: "知犀AI", description: "AI思维导图生成工具", icon: "犀", color: "bg-gradient-to-br from-blue-400 to-indigo-500", url: "https://www.zhixi.com" },
    { name: "印象图记", description: "在线思维导图工具与流程图...", icon: "印", color: "bg-gradient-to-br from-teal-400 to-cyan-500", url: "https://www.yinxiang.com" },
    { name: "妙办画板", description: "AI一键生成流程图，免费在...", icon: "妙", color: "bg-gradient-to-br from-blue-500 to-purple-500", url: "https://miaoban.cn" },
    { name: "亿图脑图", description: "AI跨端思维导图软件", icon: "亿", color: "bg-gradient-to-br from-cyan-400 to-blue-500", url: "https://www.edrawsoft.cn/mindmaster" },
    { name: "自由画布", description: "百度文库和百度网盘联合推...", icon: "du", color: "bg-gradient-to-br from-blue-600 to-blue-700", url: "https://wenku.baidu.com" },
    { name: "ProcessOn", description: "AI免费在线流程图思维导图", icon: "on", color: "bg-gradient-to-br from-red-500 to-orange-500", url: "https://www.processon.com" },
    { name: "博思白板", description: "博思云创推出的AI多功能白...", icon: "博", color: "bg-gradient-to-br from-blue-400 to-blue-600", url: "https://boardmix.cn" },
    { name: "TreeMind树图", description: "AI一句话生成思维导图，支持...", icon: "树", color: "bg-gradient-to-br from-green-400 to-teal-500", url: "https://www.treemind.cn" },
    { name: "百度文库AI助手", description: "一站式智能文档助手", icon: "du", color: "bg-gradient-to-br from-blue-500 to-blue-600", url: "https://wenku.baidu.com" },
    { name: "万知", description: "零一万物推出的一站式AI文档...", icon: "万", color: "bg-gradient-to-br from-teal-500 to-emerald-500", url: "https://www.wanzhi.com" },
    { name: "办公小浣熊", description: "AI数据文件处理助手", icon: "熊", color: "bg-gradient-to-br from-gray-600 to-gray-700", url: "https://raccoon.sensetime.com" },
    { name: "百度 GBI", description: "AI商业智能平台", icon: "GBI", color: "bg-gradient-to-br from-blue-500 to-indigo-600", url: "https://gbi.baidu.com" },
    { name: "WPS AI", description: "WPS推出的AI智能办公助手", icon: "W", color: "bg-gradient-to-br from-red-500 to-rose-600", url: "https://ai.wps.cn" },
    { name: "包阅AI", description: "即时提炼总结，高效获取答案", icon: "阅", color: "bg-gradient-to-br from-blue-400 to-cyan-500", url: "https://baoyue.ai" },
  ],
  AI图像工具: [
    { name: "Bing Image Editor", description: "BING图片生成器", icon: "B", color: "bg-gradient-to-br from-blue-500 to-cyan-500", url: "https://www.bing.com/images/create", featured: true },
    { name: "MoPNG设计助手", description: "MoPNG设计助手，AI图片编...", icon: "Mo", color: "bg-gradient-to-br from-purple-500 to-pink-500", url: "https://mopng.com", featured: true },
    { name: "妙图设计", description: "妙图设计（MagiqSight）是...", icon: "妙", color: "bg-gradient-to-br from-gray-600 to-gray-700", url: "https://magiqsight.com" },
    { name: "face swap ai", description: "Create stunning face swaps i...", icon: "F", color: "bg-gradient-to-br from-cyan-400 to-blue-500", url: "https://faceswap.ai" },
    { name: "潮际好麦", description: "潮际好麦是一款专为电商平...", icon: "潮", color: "bg-gradient-to-br from-red-500 to-orange-500", url: "https://chaojimai.com" },
    { name: "稿定AI", description: "稿定AI-更懂设计师的AI创意...", icon: "稿", color: "bg-gradient-to-br from-red-400 to-rose-500", url: "https://www.gaoding.com" },
    { name: "PicDoc", description: "PicDoc是一款AI驱动的文本...", icon: "P", color: "bg-gradient-to-br from-purple-500 to-violet-600", url: "https://picdoc.ai" },
    { name: "风车AI翻译", description: "风车AI翻译-AI跨境图片翻译...", icon: "风", color: "bg-gradient-to-br from-blue-400 to-indigo-500", url: "https://fengcheai.com" },
    { name: "Glambase", description: "用于创建超现实AI影响者并...", icon: "G", color: "bg-gradient-to-br from-teal-400 to-cyan-500", url: "https://glambase.app" },
    { name: "换脸科技", description: "换脸科技提供人脸api支持图...", icon: "换", color: "bg-gradient-to-br from-purple-400 to-pink-500", url: "https://huanlian.ai" },
    { name: "小易AI", description: "易企秀推出的AI办公工具", icon: "易", color: "bg-gradient-to-br from-blue-500 to-purple-500", url: "https://www.eqxiu.com" },
    { name: "博思白板", description: "博思云创推出的AI多功能白...", icon: "博", color: "bg-gradient-to-br from-blue-400 to-blue-600", url: "https://boardmix.cn" },
    { name: "360智图", description: "360智图是一个专业的图片版...", icon: "360", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://zhitu.360.cn" },
    { name: "Stable Diffusion", description: "Stable Diffusion是一款先进...", icon: "S", color: "bg-gradient-to-br from-purple-600 to-indigo-600", url: "https://stability.ai" },
    { name: "Midjourney", description: "Midjourney是'文生图'届的扛...", icon: "M", color: "bg-gradient-to-br from-gray-700 to-gray-800", url: "https://www.midjourney.com" },
  ],
  AI编程工具: [
    { name: "GitHub Copilot", description: "AI代码补全工具", icon: "GH", color: "bg-gradient-to-br from-gray-700 to-gray-900", url: "https://github.com/features/copilot", featured: true },
    { name: "Cursor", description: "AI驱动的代码编辑器", icon: "C", color: "bg-gradient-to-br from-purple-500 to-indigo-600", url: "https://cursor.sh", featured: true },
    { name: "Tabnine", description: "AI代码自动补全", icon: "T", color: "bg-gradient-to-br from-orange-400 to-red-500", url: "https://www.tabnine.com" },
    { name: "CodeWhisperer", description: "Amazon AI编程助手", icon: "A", color: "bg-gradient-to-br from-orange-500 to-amber-500", url: "https://aws.amazon.com/codewhisperer" },
  ],
  AI写作工具: [
    { name: "ChatGPT", description: "OpenAI推出的AI对话助手", icon: "G", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://chat.openai.com", featured: true },
    { name: "Claude", description: "Anthropic推出的AI助手", icon: "C", color: "bg-gradient-to-br from-orange-400 to-amber-500", url: "https://claude.ai", featured: true },
    { name: "文心一言", description: "百度推出的AI写作助手", icon: "文", color: "bg-gradient-to-br from-blue-500 to-indigo-600", url: "https://yiyan.baidu.com" },
    { name: "通义千问", description: "阿里推出的AI大模型", icon: "通", color: "bg-gradient-to-br from-purple-500 to-violet-600", url: "https://tongyi.aliyun.com" },
  ],
  AI对话工具: [
    { name: "ChatGPT", description: "OpenAI推出的AI对话助手", icon: "G", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://chat.openai.com", featured: true },
    { name: "Claude", description: "Anthropic推出的AI助手", icon: "C", color: "bg-gradient-to-br from-orange-400 to-amber-500", url: "https://claude.ai", featured: true },
    { name: "Gemini", description: "Google推出的AI助手", icon: "G", color: "bg-gradient-to-br from-blue-400 to-cyan-500", url: "https://gemini.google.com" },
  ],
  AI开发平台: [
    { name: "OpenAI API", description: "OpenAI开放API平台", icon: "O", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://platform.openai.com", featured: true },
    { name: "Hugging Face", description: "AI模型和数据集平台", icon: "HF", color: "bg-gradient-to-br from-yellow-400 to-orange-500", url: "https://huggingface.co", featured: true },
  ],
  AI搜索引擎: [
    { name: "Perplexity", description: "AI驱动的搜索引擎", icon: "P", color: "bg-gradient-to-br from-teal-400 to-cyan-500", url: "https://www.perplexity.ai", featured: true },
    { name: "秘塔搜索", description: "AI智能搜索引擎", icon: "秘", color: "bg-gradient-to-br from-blue-500 to-indigo-600", url: "https://metaso.cn", featured: true },
  ],
  AI翻译工具: [
    { name: "DeepL", description: "AI驱动的翻译工具", icon: "D", color: "bg-gradient-to-br from-blue-500 to-indigo-600", url: "https://www.deepl.com", featured: true },
    { name: "Google翻译", description: "Google翻译服务", icon: "G", color: "bg-gradient-to-br from-blue-400 to-cyan-500", url: "https://translate.google.com" },
  ],
  AI视频工具: [
    { name: "Runway", description: "AI视频生成和编辑平台", icon: "R", color: "bg-gradient-to-br from-purple-500 to-pink-500", url: "https://runwayml.com", featured: true },
    { name: "Pika", description: "AI视频生成工具", icon: "P", color: "bg-gradient-to-br from-pink-400 to-rose-500", url: "https://pika.art", featured: true },
    { name: "剪映", description: "字节跳动推出的视频编辑工具", icon: "剪", color: "bg-gradient-to-br from-gray-700 to-gray-900", url: "https://www.capcut.cn" },
  ],
  AI设计工具: [
    { name: "Canva AI", description: "Canva的AI设计功能", icon: "C", color: "bg-gradient-to-br from-cyan-400 to-blue-500", url: "https://www.canva.com", featured: true },
    { name: "即时AI", description: "即时设计的AI功能", icon: "即", color: "bg-gradient-to-br from-purple-500 to-indigo-600", url: "https://js.design", featured: true },
  ],
  AI音频工具: [
    { name: "Suno", description: "AI音乐生成工具", icon: "S", color: "bg-gradient-to-br from-purple-500 to-pink-500", url: "https://suno.ai", featured: true },
    { name: "剪映", description: "AI配音和音频处理", icon: "剪", color: "bg-gradient-to-br from-gray-700 to-gray-900", url: "https://www.capcut.cn" },
  ],
  AI娱乐工具: [
    { name: "Character.AI", description: "AI角色对话平台", icon: "C", color: "bg-gradient-to-br from-purple-500 to-indigo-600", url: "https://character.ai", featured: true },
  ],
  其他AI工具: [
    { name: "Notion AI", description: "Notion的AI写作助手", icon: "N", color: "bg-gradient-to-br from-gray-700 to-gray-900", url: "https://www.notion.so", featured: true },
  ],
}

interface ToolsGridProps {
  activeCategory: string
}

export default function ToolsGrid({ activeCategory }: ToolsGridProps) {
  const [activeSubCategory, setActiveSubCategory] = useState(0)
  const currentSubCategories = subCategories[activeCategory] || []
  const tools = toolsData[activeCategory] || []

  return (
    <div className="space-y-6">
      {/* Category Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">{activeCategory}</span>
        </div>
        <a href="#" className="text-sm text-muted-foreground hover:text-primary">
          更多{">>"}
        </a>
      </div>

      {/* Sub Categories */}
      <div className="flex flex-wrap items-center gap-2">
        {currentSubCategories.map((sub, index) => (
          <button
            key={sub}
            onClick={() => setActiveSubCategory(index)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm transition-colors",
              activeSubCategory === index
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {tools.map((tool, index) => (
          <ToolCard
            key={index}
            name={tool.name}
            description={tool.description}
            icon={tool.icon}
            color={tool.color}
            url={tool.url}
            featured={tool.featured}
          />
        ))}
      </div>
    </div>
  )
}
