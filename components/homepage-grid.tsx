import CategorySection from "@/components/category-section"
import FeaturedSection from "@/components/featured-section"

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
    { name: "DALL-E 3", description: "OpenAI推出的AI图像生成工具", icon: "D", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://openai.com/dall-e-3" },
    { name: "Leonardo AI", description: "专业AI图像生成平台", icon: "L", color: "bg-gradient-to-br from-purple-500 to-indigo-600", url: "https://leonardo.ai" },
    { name: "Firefly", description: "Adobe推出的AI图像生成工具", icon: "Ff", color: "bg-gradient-to-br from-orange-500 to-red-500", url: "https://firefly.adobe.com" },
  ],
  AI编程工具: [
    { name: "GitHub Copilot", description: "AI代码补全工具", icon: "GH", color: "bg-gradient-to-br from-gray-700 to-gray-900", url: "https://github.com/features/copilot", featured: true },
    { name: "Cursor", description: "AI驱动的代码编辑器", icon: "C", color: "bg-gradient-to-br from-purple-500 to-indigo-600", url: "https://cursor.sh", featured: true },
    { name: "Tabnine", description: "AI代码自动补全", icon: "T", color: "bg-gradient-to-br from-orange-400 to-red-500", url: "https://www.tabnine.com" },
    { name: "CodeWhisperer", description: "Amazon AI编程助手", icon: "A", color: "bg-gradient-to-br from-orange-500 to-amber-500", url: "https://aws.amazon.com/codewhisperer" },
    { name: "Codeium", description: "免费AI代码补全工具", icon: "Ci", color: "bg-gradient-to-br from-teal-500 to-cyan-500", url: "https://codeium.com" },
    { name: "Replit AI", description: "在线AI编程环境", icon: "R", color: "bg-gradient-to-br from-orange-400 to-amber-500", url: "https://replit.com" },
    { name: "v0", description: "Vercel推出的AI前端开发助手", icon: "v0", color: "bg-gradient-to-br from-gray-800 to-gray-900", url: "https://v0.dev" },
    { name: "Bolt", description: "AI全栈开发助手", icon: "B", color: "bg-gradient-to-br from-blue-500 to-indigo-600", url: "https://bolt.new" },
  ],
  AI写作工具: [
    { name: "ChatGPT", description: "OpenAI推出的AI对话助手", icon: "G", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://chat.openai.com", featured: true },
    { name: "Claude", description: "Anthropic推出的AI助手", icon: "C", color: "bg-gradient-to-br from-orange-400 to-amber-500", url: "https://claude.ai", featured: true },
    { name: "文心一言", description: "百度推出的AI写作助手", icon: "文", color: "bg-gradient-to-br from-blue-500 to-indigo-600", url: "https://yiyan.baidu.com" },
    { name: "通义千问", description: "阿里推出的AI大模型", icon: "通", color: "bg-gradient-to-br from-purple-500 to-violet-600", url: "https://tongyi.aliyun.com" },
    { name: "Jasper", description: "AI营销内容写作工具", icon: "J", color: "bg-gradient-to-br from-blue-400 to-cyan-500", url: "https://www.jasper.ai" },
    { name: "Copy.ai", description: "AI文案生成工具", icon: "Co", color: "bg-gradient-to-br from-purple-400 to-pink-500", url: "https://www.copy.ai" },
    { name: "Writesonic", description: "AI内容创作平台", icon: "W", color: "bg-gradient-to-br from-blue-500 to-purple-500", url: "https://writesonic.com" },
    { name: "秘塔写作猫", description: "AI中文写作助手", icon: "秘", color: "bg-gradient-to-br from-orange-400 to-red-500", url: "https://xiezuocat.com" },
  ],
  AI对话工具: [
    { name: "ChatGPT", description: "OpenAI推出的AI对话助手", icon: "G", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://chat.openai.com", featured: true },
    { name: "Claude", description: "Anthropic推出的AI助手", icon: "C", color: "bg-gradient-to-br from-orange-400 to-amber-500", url: "https://claude.ai", featured: true },
    { name: "Gemini", description: "Google推出的AI助手", icon: "G", color: "bg-gradient-to-br from-blue-400 to-cyan-500", url: "https://gemini.google.com" },
    { name: "Kimi", description: "月之暗面推出的AI助手", icon: "K", color: "bg-gradient-to-br from-purple-500 to-indigo-600", url: "https://kimi.moonshot.cn" },
    { name: "豆包", description: "字节跳动推出的AI助手", icon: "豆", color: "bg-gradient-to-br from-blue-500 to-purple-500", url: "https://www.doubao.com" },
    { name: "智谱清言", description: "智谱AI推出的AI助手", icon: "智", color: "bg-gradient-to-br from-blue-400 to-blue-600", url: "https://chatglm.cn" },
  ],
  AI开发平台: [
    { name: "OpenAI API", description: "OpenAI开放API平台", icon: "O", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://platform.openai.com", featured: true },
    { name: "Hugging Face", description: "AI模型和数据集平台", icon: "HF", color: "bg-gradient-to-br from-yellow-400 to-orange-500", url: "https://huggingface.co", featured: true },
    { name: "Replicate", description: "AI模型部署平台", icon: "R", color: "bg-gradient-to-br from-gray-700 to-gray-900", url: "https://replicate.com" },
    { name: "Together AI", description: "开源AI模型平台", icon: "T", color: "bg-gradient-to-br from-blue-500 to-indigo-600", url: "https://www.together.ai" },
  ],
  AI搜索引擎: [
    { name: "Perplexity", description: "AI驱动的搜索引擎", icon: "P", color: "bg-gradient-to-br from-teal-400 to-cyan-500", url: "https://www.perplexity.ai", featured: true },
    { name: "秘塔搜索", description: "AI智能搜索引擎", icon: "秘", color: "bg-gradient-to-br from-blue-500 to-indigo-600", url: "https://metaso.cn", featured: true },
    { name: "天工AI搜索", description: "昆仑万维推出的AI搜索", icon: "天", color: "bg-gradient-to-br from-purple-500 to-pink-500", url: "https://www.tiangong.cn" },
    { name: "360AI搜索", description: "360推出的AI搜索引擎", icon: "360", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://so.360.com" },
  ],
  AI翻译工具: [
    { name: "DeepL", description: "AI驱动的翻译工具", icon: "D", color: "bg-gradient-to-br from-blue-500 to-indigo-600", url: "https://www.deepl.com", featured: true },
    { name: "Google翻译", description: "Google翻译服务", icon: "G", color: "bg-gradient-to-br from-blue-400 to-cyan-500", url: "https://translate.google.com" },
    { name: "有道翻译", description: "网易有道AI翻译", icon: "有", color: "bg-gradient-to-br from-red-500 to-rose-600", url: "https://fanyi.youdao.com" },
    { name: "百度翻译", description: "百度AI翻译服务", icon: "百", color: "bg-gradient-to-br from-blue-500 to-blue-600", url: "https://fanyi.baidu.com" },
  ],
  AI视频工具: [
    { name: "Runway", description: "AI视频生成和编辑平台", icon: "R", color: "bg-gradient-to-br from-purple-500 to-pink-500", url: "https://runwayml.com", featured: true },
    { name: "Pika", description: "AI视频生成工具", icon: "P", color: "bg-gradient-to-br from-pink-400 to-rose-500", url: "https://pika.art", featured: true },
    { name: "剪映", description: "字节跳动推出的视频编辑工具", icon: "剪", color: "bg-gradient-to-br from-gray-700 to-gray-900", url: "https://www.capcut.cn" },
    { name: "可灵AI", description: "快手推出的AI视频生成工具", icon: "可", color: "bg-gradient-to-br from-orange-500 to-red-500", url: "https://klingai.kuaishou.com" },
    { name: "Sora", description: "OpenAI推出的AI视频生成工具", icon: "S", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://openai.com/sora" },
    { name: "Luma AI", description: "AI 3D视频生成工具", icon: "L", color: "bg-gradient-to-br from-purple-400 to-indigo-500", url: "https://lumalabs.ai" },
  ],
  AI设计工具: [
    { name: "Canva AI", description: "Canva的AI设计功能", icon: "C", color: "bg-gradient-to-br from-cyan-400 to-blue-500", url: "https://www.canva.com", featured: true },
    { name: "即时AI", description: "即时设计的AI功能", icon: "即", color: "bg-gradient-to-br from-purple-500 to-indigo-600", url: "https://js.design", featured: true },
    { name: "Figma AI", description: "Figma的AI设计功能", icon: "F", color: "bg-gradient-to-br from-purple-400 to-pink-500", url: "https://www.figma.com" },
    { name: "美图设计室", description: "美图推出的AI设计工具", icon: "美", color: "bg-gradient-to-br from-pink-500 to-rose-500", url: "https://www.designkit.com" },
  ],
  AI音频工具: [
    { name: "Suno", description: "AI音乐生成工具", icon: "S", color: "bg-gradient-to-br from-purple-500 to-pink-500", url: "https://suno.ai", featured: true },
    { name: "剪映", description: "AI配音和音频处理", icon: "剪", color: "bg-gradient-to-br from-gray-700 to-gray-900", url: "https://www.capcut.cn" },
    { name: "Udio", description: "AI音乐创作平台", icon: "U", color: "bg-gradient-to-br from-blue-500 to-indigo-600", url: "https://www.udio.com" },
    { name: "ElevenLabs", description: "AI语音合成工具", icon: "11", color: "bg-gradient-to-br from-gray-800 to-gray-900", url: "https://elevenlabs.io" },
  ],
  AI娱乐工具: [
    { name: "Character.AI", description: "AI角色对话平台", icon: "C", color: "bg-gradient-to-br from-purple-500 to-indigo-600", url: "https://character.ai", featured: true },
    { name: "Replika", description: "AI虚拟伴侣应用", icon: "R", color: "bg-gradient-to-br from-pink-400 to-rose-500", url: "https://replika.ai" },
    { name: "AI Dungeon", description: "AI驱动的文字冒险游戏", icon: "AD", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://aidungeon.com" },
  ],
  其他AI工具: [
    { name: "Notion AI", description: "Notion的AI写作助手", icon: "N", color: "bg-gradient-to-br from-gray-700 to-gray-900", url: "https://www.notion.so", featured: true },
    { name: "Zapier AI", description: "AI自动化工作流程", icon: "Z", color: "bg-gradient-to-br from-orange-500 to-amber-500", url: "https://zapier.com" },
    { name: "Arc浏览器", description: "AI驱动的现代浏览器", icon: "A", color: "bg-gradient-to-br from-blue-400 to-purple-500", url: "https://arc.net" },
  ],
}

const categories = [
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
