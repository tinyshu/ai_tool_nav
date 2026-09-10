/** 前台风格模版元数据（色板在 CSS；此处仅后台展示） */
export const THEME_IDS = ['default', 'tech', 'traditional', 'fashion']

export const THEME_LIST = [
  {
    id: 'default',
    name: '默认经典',
    desc: '当前红橙观感，适合通用演示',
    swatch: ['#e11d48', '#f97316', '#0b1220']
  },
  {
    id: 'tech',
    name: '科技蓝',
    desc: '适用：软件 / 数字化 / 智能制造',
    swatch: ['#2563eb', '#06b6d4', '#0b1220']
  },
  {
    id: 'traditional',
    name: '稳健商务',
    desc: '适用：制造 / 贸易 / 政企服务',
    swatch: ['#1e3a5f', '#b8860b', '#0f172a']
  },
  {
    id: 'fashion',
    name: '时尚活力',
    desc: '适用：消费品牌 / 设计 / 轻时尚',
    swatch: ['#db2777', '#f59e0b', '#1a0b14']
  }
]

export function isValidTheme(id) {
  return THEME_IDS.includes(id)
}

export function resolveThemeId(raw) {
  return isValidTheme(raw) ? raw : 'default'
}
