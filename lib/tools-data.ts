/**
 * 全站工具数据与分类：单一数据源，供首页、分类页、侧栏、站内搜索使用。
 */

export type ToolItem = {
  name: string
  description: string
  icon: string
  color: string
  url: string
  featured?: boolean
  /** 可选：真图片文件名（位于 public/tools/ 下，如 "lingdong.png"） */
  image?: string
}

export type ToolWithCategory = ToolItem & { category: string }

export const subCategories: Record<string, string[]> = {
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

export const categoryOrder = [
  "AI办公工具", "AI图像工具", "AI编程工具", "AI写作工具", "AI对话工具",
  "AI开发平台", "AI搜索引擎", "AI翻译工具", "AI视频工具", "AI设计工具",
  "AI音频工具", "AI娱乐工具", "其他AI工具",
] as const

export const categories = [
  { id: "office", name: "AI办公工具" },
  { id: "image", name: "AI图像工具" },
  { id: "coding", name: "AI编程工具" },
  { id: "writing", name: "AI写作工具" },
  { id: "chat", name: "AI对话工具" },
  { id: "platform", name: "AI开发平台" },
  { id: "search", name: "AI搜索引擎" },
  { id: "translate", name: "AI翻译工具" },
  { id: "video", name: "AI视频工具" },
  { id: "design", name: "AI设计工具" },
  { id: "audio", name: "AI音频工具" },
  { id: "entertainment", name: "AI娱乐工具" },
  { id: "other", name: "其他AI工具" },
] as const

/** 分类 id -> 中文名，供分类页使用 */
export const categoryMap: Record<string, string> = Object.fromEntries(
  categories.map((c) => [c.id, c.name])
)

/** 分类中文名 -> id，供搜索跳转分类页等 */
export const categoryNameToId: Record<string, string> = Object.fromEntries(
  categories.map((c) => [c.name, c.id])
)

export const toolsData: Record<string, ToolItem[]> = {
  AI办公工具: [
    { name: "凌动AI", description: "免费上传PDF，支持真AI总结...", icon: "PDF", color: "bg-gradient-to-br from-pink-500 to-red-500", url: "https://lingdong.ai", featured: true, image: "lingdong.png" },
    { name: "玫瑰克隆工具", description: "AI图文笔记一键生成创作并自...", icon: "玫", color: "bg-gradient-to-br from-pink-400 to-rose-500", url: "https://meigui.ai", featured: true, image: "meigui.png" },
    { name: "PicDoc", description: "PicDoc是一款AI驱动的文本...", icon: "P", color: "bg-gradient-to-br from-purple-500 to-violet-600", url: "https://picdoc.ai" ,image:"picdoc.png"},
    { name: "萝卜简历", description: "萝卜简历（www.luobojl.cn）...", icon: "萝", color: "bg-gradient-to-br from-orange-400 to-amber-500", url: "https://www.luobojl.cn", image:"luobojl.png" },
    { name: "标探长AI标书", description: "标探长AI标书智能体，10分...", icon: "标", color: "bg-gradient-to-br from-blue-500 to-cyan-500", url: "https://biaotanzhang.com" ,image:"biaotanzhang.png"},
    { name: "小图钉Excel助手", description: "还在被Excel复杂公式和VLO...", icon: "钉", color: "bg-gradient-to-br from-green-500 to-emerald-500", url: "https://xiaotuding.com", featured: true, image:"xiaotuding.png" },
    { name: "知犀AI", description: "AI思维导图生成工具", icon: "犀", color: "bg-gradient-to-br from-blue-400 to-indigo-500", url: "https://www.zhixi.com", image:"zhixi.png" },
    { name: "印象图记", description: "在线思维导图工具与流程图...", icon: "印", color: "bg-gradient-to-br from-teal-400 to-cyan-500", url: "https://www.yinxiang.com", image: "yinxiang.png" },
    { name: "妙办画板", description: "AI一键生成流程图，免费在...", icon: "妙", color: "bg-gradient-to-br from-blue-500 to-purple-500", url: "https://miaoban.cn" ,image:"miaoban.png"},
    { name: "亿图脑图", description: "AI跨端思维导图软件", icon: "亿", color: "bg-gradient-to-br from-cyan-400 to-blue-500", url: "https://www.edrawsoft.cn/mindmaster",image:"yitu.png" },
    { name: "自由画布", description: "百度文库和百度网盘联合推...", icon: "du", color: "bg-gradient-to-br from-blue-600 to-blue-700", url: "https://wenku.baidu.com",image:"ziyouwenku.png" },
    { name: "ProcessOn", description: "AI免费在线流程图思维导图", icon: "on", color: "bg-gradient-to-br from-red-500 to-orange-500", url: "https://www.processon.com" ,image:"processon.png"},
    { name: "博思白板", description: "博思云创推出的AI多功能白...", icon: "博", color: "bg-gradient-to-br from-blue-400 to-blue-600", url: "https://boardmix.cn",image:"bosiban.png" },
    { name: "TreeMind树图", description: "AI一句话生成思维导图，支持...", icon: "树", color: "bg-gradient-to-br from-green-400 to-teal-500", url: "https://www.treemind.cn",image:"treemind.png" },
    { name: "百度文库AI助手", description: "一站式智能文档助手", icon: "du", color: "bg-gradient-to-br from-blue-500 to-blue-600", url: "https://wenku.baidu.com" ,image:"baiduwenkuaijian.png"},
    { name: "万知", description: "零一万物推出的一站式AI文档...", icon: "万", color: "bg-gradient-to-br from-teal-500 to-emerald-500", url: "https://www.wanzhi.com",image:"wanzhi.png" },
    { name: "办公小浣熊", description: "AI数据文件处理助手", icon: "熊", color: "bg-gradient-to-br from-gray-600 to-gray-700", url: "https://raccoon.sensetime.com",image:"xiaohuanxiong.png" },
    { name: "百度 GBI", description: "AI商业智能平台", icon: "GBI", color: "bg-gradient-to-br from-blue-500 to-indigo-600", url: "https://gbi.baidu.com",image:"baidugbi.png" },
    { name: "WPS AI", description: "WPS推出的AI智能办公助手", icon: "W", color: "bg-gradient-to-br from-red-500 to-rose-600", url: "https://ai.wps.cn",image:"wpsai.png" },
    { name: "包阅AI", description: "即时提炼总结，高效获取答案", icon: "阅", color: "bg-gradient-to-br from-blue-400 to-cyan-500", url: "https://baoyue.ai",image:"baoyueai.png" },
  ],
  AI图像工具: [
    { name: "Bing Image Editor", description: "BING图片生成器", icon: "B", color: "bg-gradient-to-br from-blue-500 to-cyan-500", url: "https://www.bing.com/images/create", featured: true ,image:"bingimageeditor.png"},
    { name: "MoPNG设计助手", description: "MoPNG设计助手，AI图片编...", icon: "Mo", color: "bg-gradient-to-br from-purple-500 to-pink-500", url: "https://mopng.com", featured: true ,image:"mopng.png"},
    { name: "妙图设计", description: "妙图设计（MagiqSight）是...", icon: "妙", color: "bg-gradient-to-br from-gray-600 to-gray-700", url: "https://magiqsight.com" },
    { name: "face swap ai", description: "Create stunning face swaps i...", icon: "F", color: "bg-gradient-to-br from-cyan-400 to-blue-500", url: "https://faceswap.ai" ,image:"faceswapai.png"},
    { name: "潮际好麦", description: "潮际好麦是一款专为电商平...", icon: "潮", color: "bg-gradient-to-br from-red-500 to-orange-500", url: "https://chaojimai.com" ,image:"chaojimai.png"},
    { name: "稿定AI", description: "稿定AI-更懂设计师的AI创意...", icon: "稿", color: "bg-gradient-to-br from-red-400 to-rose-500", url: "https://www.gaoding.com",image:"gaodingai.png" },
    { name: "PicDoc", description: "PicDoc是一款AI驱动的文本...", icon: "P", color: "bg-gradient-to-br from-purple-500 to-violet-600", url: "https://picdoc.ai",image:"picdoc.png" },
    { name: "风车AI翻译", description: "风车AI翻译-AI跨境图片翻译...", icon: "风", color: "bg-gradient-to-br from-blue-400 to-indigo-500", url: "https://fengcheai.com",image:"fengcheai.png" },
    { name: "Glambase", description: "用于创建超现实AI影响者并...", icon: "G", color: "bg-gradient-to-br from-teal-400 to-cyan-500", url: "https://glambase.app",image:"glambase.png" },
    { name: "换脸科技", description: "换脸科技提供人脸api支持图...", icon: "换", color: "bg-gradient-to-br from-purple-400 to-pink-500", url: "https://huanlian.ai",image:"huanlian.png" },
    { name: "小易AI", description: "易企秀推出的AI办公工具", icon: "易", color: "bg-gradient-to-br from-blue-500 to-purple-500", url: "https://www.eqxiu.com",image:"xiaoyi.png" },
    { name: "博思白板", description: "博思云创推出的AI多功能白...", icon: "博", color: "bg-gradient-to-br from-blue-400 to-blue-600", url: "https://boardmix.cn" ,image:"bosiban.png"},
    { name: "360智图", description: "360智图是一个专业的图片版...", icon: "360", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://zhitu.360.cn" ,image:"zhitu.png"},
    { name: "Stable Diffusion", description: "Stable Diffusion是一款先进...", icon: "S", color: "bg-gradient-to-br from-purple-600 to-indigo-600", url: "https://stability.ai",image:"stablediffusion.png" },
    { name: "Midjourney", description: "Midjourney是'文生图'届的扛...", icon: "M", color: "bg-gradient-to-br from-gray-700 to-gray-800", url: "https://www.midjourney.com",image:"midjourney.png" },
    { name: "DALL-E 3", description: "OpenAI推出的AI图像生成工具", icon: "D", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://openai.com/dall-e-3",image:"dalle3.png" },
    { name: "Leonardo AI", description: "专业AI图像生成平台", icon: "L", color: "bg-gradient-to-br from-purple-500 to-indigo-600", url: "https://leonardo.ai" ,image:"leonardoai.png"},
    { name: "Firefly", description: "Adobe推出的AI图像生成工具", icon: "Ff", color: "bg-gradient-to-br from-orange-500 to-red-500", url: "https://firefly.adobe.com",image:"firefly.png" },
  ],
  AI编程工具: [
    { name: "GitHub Copilot", description: "AI代码补全工具", icon: "GH", color: "bg-gradient-to-br from-gray-700 to-gray-900", url: "https://github.com/features/copilot", featured: true ,image:"githubcopilot.png"},
    { name: "Cursor", description: "AI驱动的代码编辑器", icon: "C", color: "bg-gradient-to-br from-purple-500 to-indigo-600", url: "https://cursor.sh", featured: true,image:"cursor.png" },
    { name: "Tabnine", description: "AI代码自动补全", icon: "T", color: "bg-gradient-to-br from-orange-400 to-red-500", url: "https://www.tabnine.com",image:"tabnine.png" },
    { name: "CodeWhisperer", description: "Amazon AI编程助手", icon: "A", color: "bg-gradient-to-br from-orange-500 to-amber-500", url: "https://aws.amazon.com/codewhisperer",image:"codewhisperer.png" },
    { name: "Codeium", description: "免费AI代码补全工具", icon: "Ci", color: "bg-gradient-to-br from-teal-500 to-cyan-500", url: "https://codeium.com",image:"codeium.png" },
    { name: "Replit AI", description: "在线AI编程环境", icon: "R", color: "bg-gradient-to-br from-orange-400 to-amber-500", url: "https://replit.com",image:"replitai.png" },
    { name: "v0", description: "Vercel推出的AI前端开发助手", icon: "v0", color: "bg-gradient-to-br from-gray-800 to-gray-900", url: "https://v0.dev",image:"v0.png" },
    { name: "Bolt", description: "AI全栈开发助手", icon: "B", color: "bg-gradient-to-br from-blue-500 to-indigo-600", url: "https://bolt.new",image:"bolt.png" },
  ],
  AI写作工具: [
    { name: "ChatGPT", description: "OpenAI推出的AI对话助手", icon: "G", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://chat.openai.com", featured: true, image: "chatgpt.png" },
    { name: "Claude", description: "Anthropic推出的AI助手", icon: "C", color: "bg-gradient-to-br from-orange-400 to-amber-500", url: "https://claude.ai", featured: true, image: "claude.png" },
    { name: "文心一言", description: "百度推出的AI写作助手", icon: "文", color: "bg-gradient-to-br from-blue-500 to-indigo-600", url: "https://yiyan.baidu.com",image:"wenxin.png" },
    { name: "通义千问", description: "阿里推出的AI大模型", icon: "通", color: "bg-gradient-to-br from-purple-500 to-violet-600", url: "https://tongyi.aliyun.com" ,image:"tongyiqianwen.png"},
    { name: "Jasper", description: "AI营销内容写作工具", icon: "J", color: "bg-gradient-to-br from-blue-400 to-cyan-500", url: "https://www.jasper.ai", image: "jasper.png" },
    { name: "Copy.ai", description: "AI文案生成工具", icon: "Co", color: "bg-gradient-to-br from-purple-400 to-pink-500", url: "https://www.copy.ai" ,image:"copy.png"},
    { name: "Writesonic", description: "AI内容创作平台", icon: "W", color: "bg-gradient-to-br from-blue-500 to-purple-500", url: "https://writesonic.com" ,image:"writesonic.png"},
    { name: "秘塔写作猫", description: "AI中文写作助手", icon: "秘", color: "bg-gradient-to-br from-orange-400 to-red-500", url: "https://xiezuocat.com", image:"xiezuocat.png" },
  ],
  AI对话工具: [
    { name: "ChatGPT", description: "OpenAI推出的AI对话助手", icon: "G", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://chat.openai.com", featured: true, image: "chatgpt.png" },
    { name: "Claude", description: "Anthropic推出的AI助手", icon: "C", color: "bg-gradient-to-br from-orange-400 to-amber-500", url: "https://claude.ai", featured: true,image:"claude.png" },
    { name: "Gemini", description: "Google推出的AI助手", icon: "G", color: "bg-gradient-to-br from-blue-400 to-cyan-500", url: "https://gemini.google.com" ,featured: true,image:"gemini.png"},
    { name: "Kimi", description: "月之暗面推出的AI助手", icon: "K", color: "bg-gradient-to-br from-purple-500 to-indigo-600", url: "https://kimi.moonshot.cn",image:"kimi.png" },
    { name: "豆包", description: "字节跳动推出的AI助手", icon: "豆", color: "bg-gradient-to-br from-blue-500 to-purple-500", url: "https://www.doubao.com" ,image:"doubao.png"},
    { name: "智谱清言", description: "智谱AI推出的AI助手", icon: "智", color: "bg-gradient-to-br from-blue-400 to-blue-600", url: "https://chatglm.cn",image:"zhipuqingyan.png" },
  ],
  AI开发平台: [
    { name: "OpenAI API", description: "OpenAI开放API平台", icon: "O", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://platform.openai.com", featured: true, image: "chatgpt.png" },
    { name: "Hugging Face", description: "AI模型和数据集平台", icon: "HF", color: "bg-gradient-to-br from-yellow-400 to-orange-500", url: "https://huggingface.co", featured: true, image: "huggingface.png" },
    { name: "Replicate", description: "AI模型部署平台", icon: "R", color: "bg-gradient-to-br from-gray-700 to-gray-900", url: "https://replicate.com", image: "replicate.png" },
    { name: "Together AI", description: "开源AI模型平台", icon: "T", color: "bg-gradient-to-br from-blue-500 to-indigo-600", url: "https://www.together.ai", image: "togetherai.png" },
  ],
  AI搜索引擎: [
    { name: "Perplexity", description: "AI驱动的搜索引擎", icon: "P", color: "bg-gradient-to-br from-teal-400 to-cyan-500", url: "https://www.perplexity.ai", featured: true, image:"perplexity.png" },
    { name: "秘塔搜索", description: "AI智能搜索引擎", icon: "秘", color: "bg-gradient-to-br from-blue-500 to-indigo-600", url: "https://metaso.cn", featured: true, image:"metaso.png" },
    { name: "天工AI搜索", description: "昆仑万维推出的AI搜索", icon: "天", color: "bg-gradient-to-br from-purple-500 to-pink-500", url: "https://www.tiangong.cn", image:"tiangong.png" },
    { name: "360AI搜索", description: "360推出的AI搜索引擎", icon: "360", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://so.360.com", image:"360ai.png" },
  ],
  AI翻译工具: [
    { name: "DeepL", description: "AI驱动的翻译工具", icon: "D", color: "bg-gradient-to-br from-blue-500 to-indigo-600", url: "https://www.deepl.com", featured: true,image:"deepl.png" },
    { name: "Google翻译", description: "Google翻译服务", icon: "G", color: "bg-gradient-to-br from-blue-400 to-cyan-500", url: "https://translate.google.com",image:"googletranslate.png" },
    { name: "有道翻译", description: "网易有道AI翻译", icon: "有", color: "bg-gradient-to-br from-red-500 to-rose-600", url: "https://fanyi.youdao.com",image:"youdao.png" },
    { name: "百度翻译", description: "百度AI翻译服务", icon: "百", color: "bg-gradient-to-br from-blue-500 to-blue-600", url: "https://fanyi.baidu.com",image:"baidu.png" },
  ],
  AI视频工具: [
    { name: "Runway", description: "AI视频生成和编辑平台", icon: "R", color: "bg-gradient-to-br from-purple-500 to-pink-500", url: "https://runwayml.com", featured: true,image:"runway.png" },
    { name: "Pika", description: "AI视频生成工具", icon: "P", color: "bg-gradient-to-br from-pink-400 to-rose-500", url: "https://pika.art", featured: true,image:"pika.png" },
    { name: "剪映", description: "字节跳动推出的视频编辑工具", icon: "剪", color: "bg-gradient-to-br from-gray-700 to-gray-900", url: "https://www.capcut.cn",image:"capcut.png" },
    { name: "可灵AI", description: "快手推出的AI视频生成工具", icon: "可", color: "bg-gradient-to-br from-orange-500 to-red-500", url: "https://klingai.kuaishou.com",image:"klingai.png" },
    { name: "Sora", description: "OpenAI推出的AI视频生成工具", icon: "S", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://openai.com/sora",image:"sora.png" },
    { name: "Luma AI", description: "AI 3D视频生成工具", icon: "L", color: "bg-gradient-to-br from-purple-400 to-indigo-500", url: "https://lumalabs.ai",image:"lumalabs.png" },
  ],
  AI设计工具: [
    { name: "Canva AI", description: "Canva的AI设计功能", icon: "C", color: "bg-gradient-to-br from-cyan-400 to-blue-500", url: "https://www.canva.com", featured: true ,image:"canva.png"},
    { name: "即时AI", description: "即时设计的AI功能", icon: "即", color: "bg-gradient-to-br from-purple-500 to-indigo-600", url: "https://js.design", featured: true ,image:"jsdesign.png"},
    { name: "Figma AI", description: "Figma的AI设计功能", icon: "F", color: "bg-gradient-to-br from-purple-400 to-pink-500", url: "https://www.figma.com" ,image:"figma.png"},
    { name: "美图设计室", description: "美图推出的AI设计工具", icon: "美", color: "bg-gradient-to-br from-pink-500 to-rose-500", url: "https://www.designkit.com" ,image:"designkit.png"},
  ],
  AI音频工具: [
    { name: "Suno AI", description: "AI音乐生成工具", icon: "S", color: "bg-gradient-to-br from-purple-500 to-pink-500", url: "https://suno.ai", featured: true,image:"suno.png" },
    { name: "剪映", description: "AI配音和音频处理", icon: "剪", color: "bg-gradient-to-br from-gray-700 to-gray-900", url: "https://www.capcut.cn" ,image:"capcut.png"},
    { name: "Udio", description: "AI音乐创作平台,目前免费", icon: "U", color: "bg-gradient-to-br from-blue-500 to-indigo-600", url: "https://www.udio.com" ,image:"udio.png"},
    { name: "ElevenLabs", description: "AI语音合成工具", icon: "11", color: "bg-gradient-to-br from-gray-800 to-gray-900", url: "https://elevenlabs.io" ,image:"elevenlabs.png"},
  ],
  AI娱乐工具: [
    { name: "Character.AI", description: "可以创建虚拟机器人的对话平台", icon: "C", color: "bg-gradient-to-br from-purple-500 to-indigo-600", url: "https://character.ai", featured: true,image:"character.png" },
    { name: "Replika", description: "AI虚拟伴侣应用", icon: "R", color: "bg-gradient-to-br from-pink-400 to-rose-500", url: "https://replika.ai" ,image:"replika.png"},
    { name: "AI Dungeon", description: "AI驱动的文字冒险游戏", icon: "AD", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://aidungeon.com" ,image:"aidungeon.png"},
  ],
  其他AI工具: [
    { name: "Notion AI", description: "Notion的AI写作助手", icon: "N", color: "bg-gradient-to-br from-gray-700 to-gray-900", url: "https://www.notion.so", featured: true ,image:"notion.png"},
    { name: "Zapier AI", description: "AI自动化工作流程", icon: "Z", color: "bg-gradient-to-br from-orange-500 to-amber-500", url: "https://zapier.com" ,image:"zapier.png"},
    { name: "Arc AI", description: "腾出旗下ARC实验室推出免费AI图片处理工具", icon: "A", color: "bg-gradient-to-br from-blue-400 to-purple-500", url: "https://arc.tencent.com" ,image:"arc.png"},
  ],
}

/** 扁平化：所有工具带上分类，供站内搜索使用 */
export function getAllTools(): ToolWithCategory[] {
  return categoryOrder.flatMap((cat) =>
    (toolsData[cat] || []).map((t) => ({ ...t, category: cat }))
  )
}

const MAX_SEARCH_RESULTS = 20

/** 按关键词过滤工具（名称、描述、分类），返回最多 MAX_SEARCH_RESULTS 条 */
export function searchTools(query: string): ToolWithCategory[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const all = getAllTools()
  return all
    .filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    )
    .slice(0, MAX_SEARCH_RESULTS)
}
