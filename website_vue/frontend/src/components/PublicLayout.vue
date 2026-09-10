<script setup>
import { onMounted, computed, watch } from 'vue'
import { useSiteStore } from '@/stores'
import { getSettings } from '@/api/site'
import { getLinks } from '@/api/link'
import { applyTheme } from '@/themes/applyTheme'
import { ref } from 'vue'

const siteStore = useSiteStore()
const links = ref([])

const menus = [
  { path: '/', title: '首页' },
  { path: '/about', title: '关于我们' },
  { path: '/products', title: '产品中心' },
  { path: '/news', title: '新闻资讯' },
  { path: '/jobs', title: '人才招聘' },
  { path: '/contact', title: '联系我们' }
]

const siteName = computed(() => siteStore.settings.site_name || '企业官网')
const siteIcon = computed(() => siteStore.settings.site_icon || 'fa-building')
const icp = computed(() => siteStore.settings.site_icp || '')
const phone = computed(() => siteStore.settings.contact_phone || '')
const email = computed(() => siteStore.settings.contact_email || '')
const address = computed(() => siteStore.settings.contact_address || '')
const seoDesc = computed(() => siteStore.settings.seo_description || '')

watch(
  () => siteStore.settings.site_theme,
  (theme) => applyTheme(theme),
  { immediate: true }
)

onMounted(async () => {
  try {
    const s = await getSettings()
    if (s?.code === 200) {
      siteStore.setSettings(s.data || {})
      applyTheme(s.data?.site_theme)
    }
  } catch (e) {}
  try {
    const l = await getLinks({ status: 1 })
    links.value = Array.isArray(l?.data) ? l.data : (l?.data?.list || [])
  } catch (e) {}
})
</script>

<template>
  <div class="public-shell">
    <!-- Navigation -->
    <nav class="site-nav navbar navbar-expand-lg">
      <div class="container">
        <router-link to="/" class="navbar-brand d-flex align-items-center">
          <span class="brand-mark"><i class="fa-solid" :class="siteIcon"></i></span>
          <span>{{ siteName }}</span>
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav ms-auto align-items-lg-center">
            <li v-for="m in menus" :key="m.path" class="nav-item">
              <router-link :to="m.path" class="nav-link" active-class="is-active" :exact-active-class="m.path === '/' ? 'is-active' : ''">
                {{ m.title }}
              </router-link>
            </li>
            <li class="nav-item ms-lg-3 mt-2 mt-lg-0">
              <a href="/admin/login" class="btn btn-brand btn-sm">
                <i class="fa-solid fa-user-lock me-1"></i>后台登录
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Routed content -->
    <main class="public-main">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-4 col-md-6">
            <h5>
              <span class="d-inline-flex align-items-center justify-content-center me-2"
                    style="width:32px;height:32px;border-radius:8px;background:var(--brand-gradient);">
                <i class="fa-solid" :class="siteIcon"></i>
              </span>
              {{ siteName }}
            </h5>
            <p style="max-width: 320px; line-height: 1.7;">{{ seoDesc }}</p>
          </div>
          <div class="col-lg-2 col-md-6 col-6">
            <h5>快速导航</h5>
            <ul class="footer-links">
              <li><router-link to="/about">关于我们</router-link></li>
              <li><router-link to="/products">产品中心</router-link></li>
              <li><router-link to="/news">新闻资讯</router-link></li>
              <li><router-link to="/jobs">人才招聘</router-link></li>
              <li><router-link to="/contact">联系我们</router-link></li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-6 col-6">
            <h5>联系方式</h5>
            <ul class="footer-links">
              <li v-if="phone"><i class="fa-solid fa-phone me-2"></i>{{ phone }}</li>
              <li v-if="email"><i class="fa-solid fa-envelope me-2"></i>{{ email }}</li>
              <li v-if="address"><i class="fa-solid fa-location-dot me-2"></i>{{ address }}</li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-6">
            <h5>友情链接</h5>
            <div>
              <a v-for="item in links" :key="item.id" :href="item.url" target="_blank" rel="noopener"
                 class="friend-link">{{ item.name }}</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom text-center">
          <span>© {{ new Date().getFullYear() }} {{ siteName }} · {{ icp }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>
