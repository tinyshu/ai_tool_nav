import { resolveThemeId } from './index'

/**
 * 将站点主题应用到 documentElement。
 * default：移除 data-theme，使用 :root 令牌。
 */
export function applyTheme(raw) {
  if (typeof document === 'undefined') return 'default'
  const id = resolveThemeId(raw)
  const root = document.documentElement
  if (id === 'default') {
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', id)
  }
  return id
}

/** 进入后台时清除主题属性，避免前台残留污染 Admin */
export function clearThemeForAdmin() {
  if (typeof document === 'undefined') return
  document.documentElement.removeAttribute('data-theme')
}
