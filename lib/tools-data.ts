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
  /** 可选：收录时间，使用整型时间戳（秒） */
  addedAt?: number
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
  便民工具: ["常用便民工具"],
}

export const categoryOrder = [
  "AI办公工具", "AI图像工具", "AI编程工具", "AI写作工具", "AI对话工具",
  "AI开发平台", "AI搜索引擎", "AI翻译工具", "AI视频工具", "AI设计工具",
  "AI音频工具", "AI娱乐工具", "便民工具",
  "其他AI工具",
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
  { id: "convenience", name: "便民工具" },
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

/** 分类页 SEO 与可读性：可索引简介（正文约 100–300 字）+ 可选要点 */
export type CategoryIntro = {
  body: string
  tips?: string[]
}

export const categoryIntroMap: Record<string, CategoryIntro> = {
  AI办公工具: {
    body:
      "AI办公工具面向日常办公、协作与效率提升场景，覆盖文档撰写、演示制作、思维导图、表格数据处理、会议与效率类应用。无论你是职场新人还是团队负责人，都可以借助AI减少重复劳动、加快信息整理与内容产出。选择时建议优先关注：是否支持中文与工作流集成、数据隐私与权限、以及是否提供免费额度或团队版。本页持续收录并更新常用AI办公工具，便于你按场景对比与试用。",
    tips: [
      "适合：文员、运营、产品、管理者及需要高频写文档、做PPT、开会的团队。",
      "入门建议：先明确痛点（写稿、总结、制表、会议记录），再选 1–2 款深度试用。",
      "选择技巧：看输出质量、模板与协作、导出格式及与企业微信/飞书等衔接。",
    ],
  },
  AI图像工具: {
    body:
      "AI图像工具帮助用户完成文生图、商品图、插画、修图、抠图、放大与背景移除等任务，适合设计师、电商运营与内容创作者。不同产品在风格控制、商用授权与分辨率上差异较大，建议根据用途（社交媒体、印刷、电商主图）筛选。关注是否支持参考图、局部重绘、批量处理与API，以便与现有工作流对接。本站汇总主流与新兴AI图像工具，方便你一站式浏览与对比。",
    tips: [
      "适合：设计师、电商、自媒体及需要快速出图或批量修图的用户。",
      "入门建议：从「文生图 + 简单后期」开始，再尝试商品图、抠图等垂直能力。",
      "选择技巧：商用授权、生成速度、中文提示词友好度与社区案例。",
    ],
  },
  AI编程工具: {
    body:
      "AI编程工具聚焦代码补全、生成、审查与在线协作环境，可显著提升开发与学习效率，适合软件工程师、全栈开发者及计算机专业学生。选型时可对比：支持的IDE与语言、是否理解项目上下文、隐私与代码是否本地/企业可控。部分工具侧重补全，部分侧重从需求到脚手架的生成，可按团队规范与安全要求组合使用。本分类持续更新国内外主流AI编程助手与平台。",
    tips: [
      "适合：开发者、技术负责人及需要写脚本、Review 或快速原型的人。",
      "入门建议：在真实小需求上对比补全准确率与重构建议质量。",
      "选择技巧：IDE 插件体验、企业合规、离线/私有化与定价模型。",
    ],
  },
  AI写作工具: {
    body:
      "AI写作工具覆盖文章生成、营销文案、改写润色与多语言内容，适合新媒体、市场、品牌与需要高频文字产出的岗位。优质工具通常提供语气、受众与长度控制，并支持大纲与分段修订。建议结合人工审核事实与合规，避免直接发布未校验内容。你可在此按场景（长文、短文案、SEO）浏览不同产品，找到与品牌调性匹配的写作助手。",
    tips: [
      "适合：运营、编辑、市场及自媒体创作者。",
      "入门建议：固定同一类稿件（如周报、推文）做 A/B 对比。",
      "选择技巧：中文流畅度、事实引用策略、模板库与导出格式。",
    ],
  },
  AI对话工具: {
    body:
      "AI对话工具提供多轮问答、角色扮演、客服与知识助手等能力，适合个人学习、客服场景与内部知识库对接。选择时关注上下文长度、多模态（图文）、插件与联网搜索，以及是否满足企业数据隔离要求。不同模型在推理、创意与严谨性上各有侧重，可按任务类型（闲聊、解题、写代码说明）分别尝试。本站收录多款对话类产品，便于横向比较。",
    tips: [
      "适合：学生、客服、产品经理及需要快速答疑与头脑风暴的用户。",
      "入门建议：用同一组问题测试不同产品的回答深度与引用习惯。",
      "选择技巧：上下文窗口、插件生态、隐私政策与订阅价格。",
    ],
  },
  AI开发平台: {
    body:
      "AI开发平台面向模型训练、推理部署与API服务，适合算法工程师、ML工程师及需要自建AI能力的企业。平台通常提供算力、数据集管理、实验跟踪与一键部署，降低从实验到上线的门槛。评估时可关注：支持的框架、区域与合规、SLA与计费方式，以及是否提供微调与私有化选项。本页汇总常见云与开源友好型开发平台，助力选型。",
    tips: [
      "适合：算法团队、技术公司及需要模型服务化的产品团队。",
      "入门建议：用最小数据集跑通训练—部署闭环再扩大规模。",
      "选择技巧：算力性价比、合规认证、监控与弹性扩缩容能力。",
    ],
  },
  AI搜索引擎: {
    body:
      "AI搜索引擎结合大模型与传统检索，提供摘要式答案、引用来源与追问能力，适合研究、学习与需要快速整合信息的用户。与传统搜索相比，更强调答案可读性与多步推理，但仍需核对引用与时效。选择时可看：是否展示来源、是否支持学术/垂直领域、以及是否混淆广告与结果。本站整理多款AI搜索产品，方便按习惯切换。",
    tips: [
      "适合：学生、研究员、媒体及需要快速调研的职场用户。",
      "入门建议：对同一主题对比「摘要+引用」是否可靠、可追溯。",
      "选择技巧：联网实时性、引用透明度、中文网页覆盖度。",
    ],
  },
  AI翻译工具: {
    body:
      "AI翻译工具覆盖网页、文档与实时对话翻译，适合外贸、学术、跨国协作与内容本地化。神经机器翻译在长句与术语上表现更好，但专业领域仍需术语表与人审。选型时关注：支持文件格式、是否保留排版、离线能力及团队术语库。本分类收录常用AI翻译服务，帮助你按场景（邮件、论文、会议）挑选合适工具。",
    tips: [
      "适合：外贸、法务、学术及多语言内容团队。",
      "入门建议：用同一段专业文本对比术语一致性与语气。",
      "选择技巧：文档批量、术语库、API 与数据驻留区域。",
    ],
  },
  AI视频工具: {
    body:
      "AI视频工具涵盖文生视频、剪辑、增强与特效，适合短视频创作者、广告与影视前期探索。不同产品在时长、分辨率、角色一致性与版权政策上差异明显，商用前务必确认授权条款。建议从短镜头、简单分镜开始试用，再评估批量与协作需求。本站持续更新AI视频相关工具，便于你把握行业新动向。",
    tips: [
      "适合：短视频作者、市场创意及需要快速出片预览的团队。",
      "入门建议：先测生成稳定性与人物一致性，再考虑长镜头。",
      "选择技巧：商用授权、导出规格、是否支持音画同步与字幕。",
    ],
  },
  AI设计工具: {
    body:
      "AI设计工具辅助UI、平面、品牌与3D等创意流程，适合设计师与需要快速出稿的非设计岗位。常见能力包括智能排版、素材生成、设计稿转代码与协作评审。选择时关注：与Figma/即时设计等工作流的衔接、团队组件库与版本管理，以及生成素材的版权说明。本页汇总AI设计方向工具，支持按工作流筛选。",
    tips: [
      "适合：UI/UX、平面设计师及需要快速物料的运营。",
      "入门建议：在真实品牌规范下试做一版海报或落地页。",
      "选择技巧：协作与交付链路、素材版权、设计系统兼容性。",
    ],
  },
  AI音频工具: {
    body:
      "AI音频工具包括语音合成、克隆、音乐生成与播客后期，适合内容创作者、教育与无障碍场景。关注发音自然度、多语言与情感控制，以及是否允许商用与署名要求。音乐类工具需注意版权与平台分发规则。本站收录多款AI音频应用，方便你按「配音、配乐、降噪」等需求浏览。",
    tips: [
      "适合：播客、视频创作者、教育产品与无障碍产品团队。",
      "入门建议：用同一段文案对比多说话人与情感表现。",
      "选择技巧：商用授权、采样率、批量导出与API。",
    ],
  },
  AI娱乐工具: {
    body:
      "AI娱乐工具聚焦虚拟角色、互动叙事、游戏辅助与创意玩法，适合喜欢尝鲜的用户与轻度内容创作。此类产品迭代快、玩法多样，建议注意适龄内容与数据隐私设置。可结合社区活跃度与UGC生态选择长期使用的应用。本分类收录趣味与创意向AI产品，供休闲娱乐与灵感激发参考。",
    tips: [
      "适合：游戏玩家、二次元爱好者及喜欢互动叙事的用户。",
      "入门建议：先体验免费额度与社区模板，再决定是否订阅。",
      "选择技巧：内容审核、隐私选项、是否支持导出与分享。",
    ],
  },
  便民工具: {
    body:
      "便民工具汇集证件照、格式转换、密码与DNS检测、条码与实用小工具等日常高频需求，适合普通网民与运维、办公人员随手使用。这类站点通常即开即用，选型时留意是否HTTPS、是否有广告干扰与数据是否本地处理。本站挑选常用便民类在线工具，减少你在搜索引擎里反复筛选的时间。",
    tips: [
      "适合：日常办公、学生及需要轻量小工具快速解决问题的用户。",
      "入门建议：敏感操作（密码、证件）优先选无上传或开源说明清晰的产品。",
      "选择技巧：是否需注册、广告密度、移动端适配与加载速度。",
    ],
  },
  其他AI工具: {
    body:
      "其他AI工具收录学习、生活自动化与难以归入单一垂类的创新应用，适合希望拓宽AI使用边界的探索者。该分类跨度大，建议结合个人目标（学习路径、效率插件、生活助手）逐一试用。我们会随行业变化补充新站点，避免你错过小而美的工具。若你有优质站点推荐，也可通过本站联系渠道反馈。",
    tips: [
      "适合：AI爱好者、终身学习者及喜欢尝试新产品的用户。",
      "入门建议：每月固定试用 1–2 款，记录使用场景与留存价值。",
      "选择技巧：更新频率、文档与社区、是否与现有工具链互补。",
    ],
  },
}

export const toolsData: Record<string, ToolItem[]> = {
  AI办公工具: [
    { name: "OpenClaw", description: "开源的、AI Agent自动化框架", icon: "O", color: "bg-gradient-to-br from-pink-500 to-red-500", url: "https://openclaw.ai", featured: true, image: "openclaw.png" ,addedAt:1773724360},
    { name: "AiPPT", description: "创新的全智能AI PPT生成平台", icon: "PPT", color: "bg-gradient-to-br from-pink-500 to-red-500", url: "https://www.aippt.cn", featured: true, image: "pptai.png" ,addedAt:1773724361},
    { name: "凌动AI", description: "免费上传PDF，支持真AI总结...", icon: "PDF", color: "bg-gradient-to-br from-pink-500 to-red-500", url: "https://aipdfl.com/", featured: true, image: "lingdong.png" ,addedAt:1773724362},
    { name: "玫瑰克隆工具", description: "AI图文笔记一键生成创作并自...", icon: "玫", color: "bg-gradient-to-br from-pink-400 to-rose-500", url: "https://www.meiguikelong.cn", image: "meigui.png" ,addedAt:1773724365},
    { name: "PicDoc", description: "PicDoc是一款AI驱动的文本...", icon: "P", color: "bg-gradient-to-br from-purple-500 to-violet-600", url: "https://picdoc.ai" ,image:"picdoc.png"},
    { name: "萝卜简历", description: "萝卜简历（www.luobojl.cn）...", icon: "萝", color: "bg-gradient-to-br from-orange-400 to-amber-500", url: "https://www.luobojl.cn", image:"luobojl.png" },
    { name: "标探长AI标书", description: "标探长AI标书智能体，10分...", icon: "标", color: "bg-gradient-to-br from-blue-500 to-cyan-500", url: "https://www.biaotanzhang.cn" ,image:"biaotanzhang.png"},
    { name: "小图钉Excel助手", description: "还在被Excel复杂公式和VLO...", icon: "钉", color: "bg-gradient-to-br from-green-500 to-emerald-500", url: "https://xtd.pro", featured: true, image:"xiaotuding.png" },
    { name: "知犀AI", description: "AI思维导图生成工具", icon: "犀", color: "bg-gradient-to-br from-blue-400 to-indigo-500", url: "https://www.zhixi.com", image:"zhixi.png" },
    { name: "印象图记", description: "在线思维导图工具与流程图...", icon: "印", color: "bg-gradient-to-br from-teal-400 to-cyan-500", url: "https://www.yinxiang.com", image: "yinxiang.png" },
    { name: "妙办画板", description: "AI一键生成流程图，免费在...", icon: "妙", color: "bg-gradient-to-br from-blue-500 to-purple-500", url: "https://imiaoban.com" ,image:"miaoban.png"},
    { name: "亿图脑图", description: "AI跨端思维导图软件", icon: "亿", color: "bg-gradient-to-br from-cyan-400 to-blue-500", url: "https://www.edrawsoft.cn/mindmaster",image:"yitu.png" },
    { name: "自由画布", description: "百度文库和百度网盘联合推...", icon: "du", color: "bg-gradient-to-br from-blue-600 to-blue-700", url: "https://wenku.baidu.com/pcactivity/freeBoard",image:"ziyouwenku.png" },
    { name: "ProcessOn", description: "AI免费在线流程图思维导图", icon: "on", color: "bg-gradient-to-br from-red-500 to-orange-500", url: "https://www.processon.com" ,image:"processon.png"},
    { name: "博思白板", description: "博思云创推出的AI多功能白...", icon: "博", color: "bg-gradient-to-br from-blue-400 to-blue-600", url: "https://boardmix.cn",image:"bosiban.png" },
    { name: "TreeMind树图", description: "AI一句话生成思维导图，支持...", icon: "树", color: "bg-gradient-to-br from-green-400 to-teal-500", url: "https://shutu.cn",image:"treemind.png" },
    { name: "百度文库AI助手", description: "一站式智能文档助手", icon: "du", color: "bg-gradient-to-br from-blue-500 to-blue-600", url: "https://wenku.baidu.com/ndlaunch/browse/chat" ,image:"baiduwenkuaijian.png"},
    { name: "万知", description: "零一万物推出的一站式AI文档...", icon: "万", color: "bg-gradient-to-br from-teal-500 to-emerald-500", url: "https://www.wanzhi.com",image:"wanzhi.png" },
    { name: "办公小浣熊", description: "AI数据文件处理助手", icon: "熊", color: "bg-gradient-to-br from-gray-600 to-gray-700", url: "https://raccoon.sensetime.com",image:"xiaohuanxiong.png" },
    { name: "WPS AI", description: "WPS推出的AI智能办公助手", icon: "W", color: "bg-gradient-to-br from-red-500 to-rose-600", url: "https://ai.wps.cn",featured: true,image:"wpsai.png" ,addedAt:1773724366},
  ],
  AI图像工具: [
    { name: "MoPNG设计助手", description: "MoPNG设计助手，AI图片编...", icon: "Mo", color: "bg-gradient-to-br from-purple-500 to-pink-500", url: "https://mopng.cn/tools", featured: true ,image:"mopng.png"},
    { name: "妙图设计", description: "妙图设计（MagiqSight）是...", icon: "妙", color: "bg-gradient-to-br from-gray-600 to-gray-700", url: "https://magiqsight.com" },
    { name: "潮际好麦", description: "潮际好麦是一款专为电商平...", icon: "潮", color: "bg-gradient-to-br from-red-500 to-orange-500", url: "https://marketing.k-fashionshop.com/" ,image:"chaojimai.png",addedAt:1773724369},
    { name: "稿定AI", description: "稿定AI-更懂设计师的AI创意...", icon: "稿", color: "bg-gradient-to-br from-red-400 to-rose-500", url: "https://www.gaoding.com",image:"gaodingai.png" },
    { name: "PicDoc", description: "PicDoc是一款AI驱动的文本...", icon: "P", color: "bg-gradient-to-br from-purple-500 to-violet-600", url: "https://picdoc.ai",image:"picdoc.png" },
    { name: "风车AI翻译", description: "风车AI翻译-AI跨境图片翻译...", icon: "风", color: "bg-gradient-to-br from-blue-400 to-indigo-500", url: "https://www.fengchefanyi.com/",image:"fengcheai.png" },
    { name: "Glambase", description: "用于创建超现实AI影响者并...", icon: "G", color: "bg-gradient-to-br from-teal-400 to-cyan-500", url: "https://glambase.app",image:"glambase.png" },
    { name: "FaceSwapper", description: "一款AI换脸工具", icon: "换", color: "bg-gradient-to-br from-purple-400 to-pink-500", url: "https://faceswapperapp.com/zh-CN",image:"faceswapai.png" },
    { name: "小易AI", description: "易企秀推出的AI办公工具", icon: "易", color: "bg-gradient-to-br from-blue-500 to-purple-500", url: "https://www.eqxiu.com",image:"xiaoyi.png" },
    { name: "博思白板", description: "博思云创推出的AI多功能白...", icon: "博", color: "bg-gradient-to-br from-blue-400 to-blue-600", url: "https://boardmix.cn" ,image:"bosiban.png"},
    { name: "360智图", description: "360智图是一个专业的图片版...", icon: "360", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://pic.360.com/home" ,image:"zhitu.png"},
    { name: "Stable Diffusion", description: "Stable Diffusion是一款先进...", icon: "S", color: "bg-gradient-to-br from-purple-600 to-indigo-600", url: "https://stability.ai",image:"stablediffusion.png" },
    { name: "Midjourney", description: "Midjourney是'文生图'届的扛...", icon: "M", color: "bg-gradient-to-br from-gray-700 to-gray-800", url: "https://www.midjourney.com",image:"midjourney.png" ,addedAt:1773724367},
    { name: "DALL-E 3", description: "OpenAI推出的AI图像生成工具", icon: "D", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://openai.com/dall-e-3",image:"dalle3.png" },
    { name: "Leonardo AI", description: "专业AI图像生成平台", icon: "L", color: "bg-gradient-to-br from-purple-500 to-indigo-600", url: "https://leonardo.ai" ,image:"leonardoai.png"},
    { name: "Firefly", description: "Adobe推出的AI图像生成工具", icon: "Ff", color: "bg-gradient-to-br from-orange-500 to-red-500", url: "https://firefly.adobe.com",image:"firefly.png" },
    { name: "哼哼猫去水印", description: "可以去掉几乎任何网页上的音乐和视频水印", icon: "X", color: "bg-gradient-to-br from-orange-500 to-red-500", url: "https://firefly.adobe.com",image:"henhenmao.png" },
  ],
  AI编程工具: [
    { name: "GitHub Copilot", description: "AI代码补全工具", icon: "GH", color: "bg-gradient-to-br from-gray-700 to-gray-900", url: "https://github.com/features/copilot", featured: true ,image:"githubcopilot.png"},
    { name: "Cursor", description: "AI驱动的代码编辑器", icon: "C", color: "bg-gradient-to-br from-purple-500 to-indigo-600", url: "https://cursor.sh", featured: true,image:"cursor.png" ,addedAt:1773724370},
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
    { name: "ChatGPT", description: "OpenAI推出的AI对话助手", icon: "G", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://chat.openai.com", image: "chatgpt.png" },
    { name: "Claude", description: "Anthropic推出的AI助手", icon: "C", color: "bg-gradient-to-br from-orange-400 to-amber-500", url: "https://claude.ai",image:"claude.png" },
    { name: "Gemini", description: "Google推出的AI助手", icon: "G", color: "bg-gradient-to-br from-blue-400 to-cyan-500", url: "https://gemini.google.com" ,featured: true,image:"gemini.png"},
    { name: "Kimi", description: "月之暗面推出的AI助手", icon: "K", color: "bg-gradient-to-br from-purple-500 to-indigo-600", url: "https://kimi.moonshot.cn",image:"kimi.png" },
    { name: "豆包", description: "字节跳动推出的AI助手", icon: "豆", color: "bg-gradient-to-br from-blue-500 to-purple-500", url: "https://www.doubao.com" ,image:"doubao.png"},
    { name: "智谱清言", description: "智谱AI推出的AI助手", icon: "智", color: "bg-gradient-to-br from-blue-400 to-blue-600", url: "https://chatglm.cn",image:"zhipuqingyan.png" },
  ],
  AI开发平台: [
    { name: "OpenAI API", description: "OpenAI开放API平台", icon: "O", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://platform.openai.com", image: "chatgpt.png" },
    { name: "Hugging Face", description: "AI模型和数据集平台", icon: "HF", color: "bg-gradient-to-br from-yellow-400 to-orange-500", url: "https://huggingface.co", featured: true, image: "huggingface.png" },
    { name: "Replicate", description: "AI模型部署平台", icon: "R", color: "bg-gradient-to-br from-gray-700 to-gray-900", url: "https://replicate.com", image: "replicate.png" },
    { name: "Together AI", description: "开源AI模型平台", icon: "T", color: "bg-gradient-to-br from-blue-500 to-indigo-600", url: "https://www.together.ai", image: "togetherai.png" },
  ],
  AI搜索引擎: [
    { name: "Perplexity", description: "Perplexity是一个ChatGPT和谷歌结合的超级工具", icon: "P", color: "bg-gradient-to-br from-teal-400 to-cyan-500", url: "https://www.perplexity.ai", featured: true, image:"perplexity.png" },
    { name: "秘塔搜索", description: "AI智能搜索引擎", icon: "秘", color: "bg-gradient-to-br from-blue-500 to-indigo-600", url: "https://metaso.cn", featured: true, image:"metaso.png" },
    { name: "天工AI搜索", description: "昆仑万维推出的AI搜索", icon: "天", color: "bg-gradient-to-br from-purple-500 to-pink-500", url: "https://www.tiangong.cn", image:"tiangong.png" },
    { name: "纳米AI", description: "360推出的AI搜索引擎", icon: "360", color: "bg-gradient-to-br from-green-500 to-teal-500", url: "https://so.360.com", image:"360ai.png" },
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
    { name: "美图设计室", description: "美图推出的AI设计工具", icon: "美", color: "bg-gradient-to-br from-pink-500 to-rose-500", url: "https://www.designkit.cn" ,image:"designkit.png"},
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
    { name: "Arc AI", description: "腾出ARC免费AI图片工具", icon: "A", color: "bg-gradient-to-br from-blue-400 to-purple-500", url: "https://arc.tencent.com" ,image:"arc.png"},
  ],
  便民工具: [
    { name: "证件照在线制作", description: "在线制作证件照", icon: "证", color: "bg-gradient-to-br from-blue-500 to-cyan-500", url: "https://www.zheyings.cn",image:"zhenjianzhao.png"},
    { name: "支付宝音效", description: "一键生成支付宝导致音效", icon: "赞", color: "bg-gradient-to-br from-pink-500 to-rose-500", url: "https://toolwa.com/receipt" ,image:"zhifubaoyx.png"},
    { name: "可赞AI", description: "文字一键可视化生成海报/配图", icon: "赞", color: "bg-gradient-to-br from-pink-500 to-rose-500", url: "https://kezign.cn" ,image:"kezhanai.png"},
    { name: "全景故宫", description: "在线浏览故宫全景与展馆导览", icon: "宫", color: "bg-gradient-to-br from-amber-500 to-orange-500", url: "https://pano.dpm.org.cn" ,image:"gongjing.png"},
    { name: "迷宫生成器", description: "随机生成迷宫可用于游戏", icon: "迷", color: "bg-gradient-to-br from-purple-500 to-indigo-600", url: "https://toolwa.com/maze",image:"mijun.png" },
    { name: "丑萌头像生成器", description: "生成趣味头像，简单有趣", icon: "丑", color: "bg-gradient-to-br from-emerald-500 to-teal-600", url: "https://toolwa.com/ugly-avatar",image:"choumeng.png" },
    { name: "让我帮你百度一下", description: "生成“让我帮你百度一下”链接", icon: "度", color: "bg-gradient-to-br from-blue-600 to-blue-700", url: "https://btfy.ur1.fun",image:"wobang.png" },

    { name: "英文大小写转换", description: "英文大小写快速转换", icon: "Aa", color: "bg-gradient-to-br from-slate-600 to-slate-800", url: "https://toolwa.com/case-convert",image:"yingwen.png" },
    { name: "特殊符号大全", description: "常用特殊符号、表情与字符合集", icon: "∞", color: "bg-gradient-to-br from-cyan-500 to-blue-600", url: "https://toolwa.com/symbol",image:"teshu.png"  },
    { name: "DNS检测", description: "查询域名解析与 DNS 记录信息", icon: "DNS", color: "bg-gradient-to-br from-violet-500 to-purple-600", url: "https://toolwa.com/dns",image:"dns.png" },
    { name: "密码安全检测", description: "检测密码强度与安全性提示", icon: "盾", color: "bg-gradient-to-br from-green-500 to-emerald-600", url: "https://toolwa.com/pwcheck",image:"mima.png"},
    { name: "随机密码生成", description: "一键生成强随机密码", icon: "钥", color: "bg-gradient-to-br from-orange-500 to-red-500", url: "https://toolwa.com/password-gen",image:"suijimima.png" },
    { name: "2FA 双重验证码", description: "在线生成/校验2FA动态验证码", icon: "2FA", color: "bg-gradient-to-br from-sky-500 to-indigo-600", url: "https://toolwa.com/totp",image:"2fa.png" },

    { name: "手机号码归属地查询", description: "查询手机号归属地与运营商信息", icon: "机", color: "bg-gradient-to-br from-blue-500 to-indigo-600", url: "https://toolwa.com/phone",image:"shouji.png" },
    { name: "汽车 VIN码/车架号", description: "查询 VIN/车架号信息", icon: "车", color: "bg-gradient-to-br from-gray-700 to-gray-900", url: "https://toolwa.com/vin",image:"chevin.png"},
    { name: "MAC 地址查询厂商", description: "通过MAC地址前缀查询设备厂商", icon: "MAC", color: "bg-gradient-to-br from-teal-500 to-cyan-600", url: "https://toolwa.com/mac",image:"macshangcha.png"},
    { name: "菊花文生成器", description: "生成“菊花文/火星文”风格文本", icon: "菊", color: "bg-gradient-to-br from-pink-500 to-purple-600", url: "https://toolwa.com/juhua",image:"juhua.png" },

    { name: "鱼缸测试", description: "测试显示器坏点/色彩", icon: "鱼", color: "bg-gradient-to-br from-cyan-500 to-teal-600", url: "https://toolwa.com/fish",image:"yugang.png" },
    { name: "毒蘑菇测试", description: "测试显示器响应/拖影", icon: "菇", color: "bg-gradient-to-br from-lime-500 to-emerald-600", url: "https://toolwa.com/vsbm",image:"dumogu.png" },
    { name: "条码生成工具", description: "在线生成条形码/二维码", icon: "码", color: "bg-gradient-to-br from-zinc-600 to-zinc-800", url: "https://toolwa.com/barcode",image:"tiaoxingma.png" },
    { name: "图片加水印", description: "给图片批量添加文字/图片水印", icon: "印", color: "bg-gradient-to-br from-rose-500 to-orange-500", url: "https://toolwa.com/watermark",image:"tupianshuiyin.png" },
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
