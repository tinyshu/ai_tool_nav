/** 根据网站配置与当前路由更新浏览器标签标题 / SEO meta，避免硬编码 */

function upsertMeta(name, content) {
  if (!content) return
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * @param {import('vue-router').RouteLocationNormalizedLoaded} route
 * @param {Record<string, string>} settings
 */
export function updatePageTitle(route, settings = {}) {
  const siteName = settings.site_name || '企业官网'
  const seoTitle = settings.seo_title || siteName
  const isAdmin = route.path.startsWith('/admin')
  const pageTitle = route.meta?.title

  if (isAdmin) {
    const suffix = `${siteName} · 管理后台`
    document.title = pageTitle ? `${pageTitle} · ${suffix}` : suffix
  } else if (!pageTitle || route.path === '/') {
    document.title = seoTitle
  } else {
    document.title = `${pageTitle} · ${siteName}`
  }

  upsertMeta('description', settings.seo_description || '')
  upsertMeta('keywords', settings.seo_keywords || '')
}
