# AI 导航 - 发现最新 AI 工具

一个面向中文用户的 AI 工具导航网站，按分类整理并推荐各类 AI 工具（办公、图像、编程、写作、对话等），方便快速发现与访问。

## 功能特点

- **分类浏览**：AI 办公、图像、编程、写作、对话、开发平台、搜索、翻译、视频、设计、音频、娱乐等分类
- **首页宫格**：首页展示各分类精选工具，侧边栏快速跳转到对应区块
- **分类详情页**：`/category/[id]` 查看某分类下的全部工具
- **响应式布局**：侧边栏可折叠，适配不同屏幕
- **深色/浅色**：支持系统主题与图标切换

## 技术栈

- **框架**：Next.js 16（App Router）、React 19
- **样式**：Tailwind CSS 4、Radix UI 组件
- **图标**：lucide-react
- **语言**：TypeScript
- **分析**：Vercel Analytics（可选）

## 环境要求

- Node.js 18+
- npm / pnpm / yarn

## 快速开始

### 安装依赖

```bash
npm install
# 或
pnpm install
# 或
yarn
```

### 本地开发

```bash
npm run dev
# 或
pnpm dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)。

### 构建与生产运行

```bash
# 构建
npm run build

# 启动生产服务（需先执行 build）
npm run start
```

### 代码检查

```bash
npm run lint
```

## 项目结构概览

```
├── app/
│   ├── layout.tsx          # 全局布局与 metadata
│   ├── page.tsx             # 首页（侧边栏 + 工具宫格）
│   ├── category/[id]/       # 分类详情页
│   └── globals.css
├── components/
│   ├── header.tsx           # 顶部导航
│   ├── sidebar.tsx          # 左侧分类导航
│   ├── homepage-grid.tsx   # 首页工具宫格
│   ├── tools-grid.tsx       # 工具数据与分类定义
│   ├── tool-card.tsx       # 工具卡片
│   ├── category-section.tsx # 分类区块
│   ├── footer.tsx          # 页脚
│   └── ui/                  # 通用 UI 组件（Radix + Tailwind）
├── public/                  # 静态资源（图标等）
├── package.json
└── next.config.mjs
```

- **工具与分类数据**：在 `components/tools-grid.tsx` 中维护，新增/修改工具或分类时编辑该文件。
- **首页逻辑**：`app/page.tsx` 控制侧边栏高亮与滚动到对应分类。

## 部署

- **Vercel**：将仓库导入 [Vercel](https://vercel.com)，自动识别 Next.js，一键部署。
- **其他平台**：执行 `npm run build` 后使用 `npm run start`，或配置为静态导出（若仅用静态能力）。

## 许可证

Private / 可依据项目需要自行约定。
