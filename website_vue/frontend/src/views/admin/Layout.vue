<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore, useSiteStore } from '@/stores'
import { getProfile } from '@/api/auth'
import { getSettings } from '@/api/site'
import { clearThemeForAdmin } from '@/themes/applyTheme'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const siteStore = useSiteStore()
const userInfo = ref(null)

const siteName = computed(() => siteStore.settings.site_name || '企业官网')
const siteIcon = computed(() => siteStore.settings.site_icon || 'fa-building')
const adminBrand = computed(() => {
  const name = siteName.value
  return name.length > 8 ? name.slice(0, 8) + '…后台' : name + '后台'
})

const menus = [
  { path: '/admin/dashboard', title: '仪表盘', icon: 'fa-gauge-high' },
  { path: '/admin/site', title: '网站配置', icon: 'fa-gear' },
  { path: '/admin/banners', title: '轮播管理', icon: 'fa-images' },
  { path: '/admin/company', title: '公司信息', icon: 'fa-building' },
  { path: '/admin/product-categories', title: '产品分类', icon: 'fa-folder-tree' },
  { path: '/admin/products', title: '产品管理', icon: 'fa-box' },
  { path: '/admin/news', title: '新闻管理', icon: 'fa-newspaper' },
  { path: '/admin/jobs', title: '招聘管理', icon: 'fa-briefcase' },
  { path: '/admin/messages', title: '留言管理', icon: 'fa-envelope' },
  { path: '/admin/links', title: '友情链接', icon: 'fa-link' },
  { path: '/admin/admins', title: '管理员', icon: 'fa-user-shield' }
]

const currentTitle = computed(() => {
  const m = menus.find(x => route.path.startsWith(x.path))
  return m?.title || '管理后台'
})

onMounted(async () => {
  clearThemeForAdmin()
  try {
    const s = await getSettings()
    if (s?.code === 200) siteStore.setSettings(s.data || {})
  } catch (e) {}
  try {
    const res = await getProfile()
    if (res.code === 200) {
      userInfo.value = res.data
    } else {
      redirectLogin()
    }
  } catch (e) {
    redirectLogin()
  }
})

const redirectLogin = () => {
  userStore.clearToken()
  router.push('/admin/login')
}

const logout = () => {
  userStore.clearToken()
  router.push('/admin/login')
}

const go = (path) => router.push(path)
</script>

<template>
  <div class="admin-shell">
    <aside class="admin-sidebar">
      <div class="sidebar-brand">
        <span class="brand-mark"><i class="fa-solid" :class="siteIcon"></i></span>
        <span>{{ adminBrand }}</span>
      </div>
      <nav class="sidebar-nav">
        <a v-for="m in menus" :key="m.path" href="javascript:;"
           :class="{ 'is-active': route.path.startsWith(m.path) }"
           @click="go(m.path)">
          <i class="fa-solid" :class="m.icon"></i>
          <span>{{ m.title }}</span>
        </a>
      </nav>
      <div class="sidebar-foot">
        <div class="user-info small mb-2" style="color:#94a3b8;">
          <i class="fa-solid fa-user-circle me-1"></i>
          {{ userInfo?.nickname || userInfo?.username || '…' }}
        </div>
        <button class="btn btn-sm w-100"
                style="background:rgba(255,255,255,.08); color:#fff; border:1px solid rgba(255,255,255,.15); border-radius:8px;"
                @click="logout">
          <i class="fa-solid fa-right-from-bracket me-1"></i>退出登录
        </button>
      </div>
    </aside>

    <section class="admin-main">
      <header class="admin-topbar">
        <div>
          <div class="page-title">{{ currentTitle }}</div>
          <div class="small text-muted">{{ new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }) }}</div>
        </div>
        <div class="d-flex align-items-center gap-3">
          <a href="/" target="_blank" class="text-muted small text-decoration-none">
            <i class="fa-solid fa-globe me-1"></i>访问网站
          </a>
          <div class="d-flex align-items-center">
            <div class="d-inline-flex align-items-center justify-content-center me-2"
                 style="width:36px;height:36px;border-radius:50%;background:var(--brand-gradient);color:#fff;font-weight:600;">
              {{ (userInfo?.nickname || userInfo?.username || 'A').charAt(0).toUpperCase() }}
            </div>
            <div class="small">
              <div class="fw-semibold" style="line-height:1.2;">{{ userInfo?.nickname || userInfo?.username }}</div>
              <div class="text-muted" style="line-height:1.2;">{{ userInfo?.role }}</div>
            </div>
          </div>
        </div>
      </header>

      <main class="admin-content">
        <router-view />
      </main>
    </section>
  </div>
</template>
