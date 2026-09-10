<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getProducts } from '@/api/product'
import { getNewsList } from '@/api/news'
import { getJobs } from '@/api/job'
import { getMessages } from '@/api/message'

const router = useRouter()

const stats = ref([
  { key: 'products', label: '产品总数', num: 0, icon: 'fa-box', color: 'linear-gradient(135deg,#6366f1,#8b5cf6)', path: '/admin/products' },
  { key: 'news', label: '新闻资讯', num: 0, icon: 'fa-newspaper', color: 'linear-gradient(135deg,#10b981,#06b6d4)', path: '/admin/news' },
  { key: 'jobs', label: '招聘职位', num: 0, icon: 'fa-briefcase', color: 'linear-gradient(135deg,#f59e0b,#f97316)', path: '/admin/jobs' },
  { key: 'messages', label: '留言消息', num: 0, icon: 'fa-envelope', color: 'linear-gradient(135deg,#ef4444,#ec4899)', path: '/admin/messages' }
])

const recentMessages = ref([])
const recentNews = ref([])

onMounted(async () => {
  const [p, n, j, m] = await Promise.all([
    getProducts({ pageSize: 1 }).catch(() => null),
    getNewsList({ pageSize: 5 }).catch(() => null),
    getJobs({ pageSize: 1 }).catch(() => null),
    getMessages({ pageSize: 5 }).catch(() => null)
  ])
  stats.value[0].num = p?.data?.total || 0
  stats.value[1].num = n?.data?.total || 0
  stats.value[2].num = j?.data?.total || 0
  stats.value[3].num = m?.data?.total || 0
  recentNews.value = n?.data?.list || []
  recentMessages.value = m?.data?.list || []
})

const shortcuts = [
  { icon: 'fa-plus', title: '新增产品', desc: '发布一个新的产品', path: '/admin/products/form' },
  { icon: 'fa-pen-to-square', title: '发布新闻', desc: '撰写一篇新闻资讯', path: '/admin/news/form' },
  { icon: 'fa-image', title: '管理轮播', desc: '更新首页轮播图', path: '/admin/banners' },
  { icon: 'fa-gear', title: '网站配置', desc: '修改 SEO / 联系方式', path: '/admin/site' }
]
</script>

<template>
  <div>
    <!-- Welcome banner -->
    <div class="p-4 p-md-5 rounded-4 mb-4 position-relative overflow-hidden"
         style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #b91c1c 100%); color:#fff;">
      <div style="position:absolute; inset:0; background: radial-gradient(600px 400px at 90% 10%, rgba(249,115,22,.25), transparent 60%);"></div>
      <div style="position:relative; z-index:1;">
        <h3 class="fw-bold mb-2">欢迎回来 👋</h3>
        <p class="mb-0 opacity-90">今天也是充满活力的一天！以下是您的网站概览。</p>
      </div>
    </div>

    <!-- Stats -->
    <div class="row g-3 mb-4">
      <div v-for="s in stats" :key="s.key" class="col-sm-6 col-lg-3">
        <div class="admin-stat" style="cursor:pointer;" @click="router.push(s.path)">
          <div class="icon" :style="{ background: s.color }">
            <i class="fa-solid" :class="s.icon"></i>
          </div>
          <div class="label">{{ s.label }}</div>
          <div class="num">{{ s.num }}</div>
          <div class="small text-muted mt-2">
            <i class="fa-solid fa-arrow-up me-1" style="color:#10b981;"></i>查看详情
          </div>
        </div>
      </div>
    </div>

    <!-- Shortcuts -->
    <div class="admin-card mb-4">
      <h6 class="fw-bold mb-3">快捷入口</h6>
      <div class="row g-3">
        <div v-for="s in shortcuts" :key="s.title" class="col-sm-6 col-lg-3">
          <div class="d-flex align-items-center p-3 rounded-3 h-100"
               style="background:var(--brand-gradient-soft); cursor:pointer; transition: transform .2s;"
               @click="router.push(s.path)"
               @mouseover="$event.currentTarget.style.transform='translateY(-2px)'"
               @mouseout="$event.currentTarget.style.transform='translateY(0)'">
            <div class="d-inline-flex align-items-center justify-content-center me-3"
                 style="width:42px;height:42px;border-radius:10px;background:var(--brand-gradient);color:#fff;">
              <i class="fa-solid" :class="s.icon"></i>
            </div>
            <div>
              <div class="fw-semibold">{{ s.title }}</div>
              <div class="small text-muted">{{ s.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent items -->
    <div class="row g-3">
      <div class="col-lg-6">
        <div class="admin-card h-100">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="fw-bold mb-0"><i class="fa-regular fa-newspaper text-brand me-2"></i>最新资讯</h6>
            <router-link to="/admin/news" class="small text-brand">查看全部</router-link>
          </div>
          <div v-if="recentNews.length === 0" class="text-center py-4 text-muted small">暂无数据</div>
          <div v-for="n in recentNews" :key="n.id" class="d-flex justify-content-between align-items-center py-2"
               style="border-bottom:1px solid #f1f5f9;">
            <div class="text-truncate me-2" style="font-size:.925rem;">{{ n.title }}</div>
            <span class="small text-muted flex-shrink-0">{{ new Date(n.created_at).toLocaleDateString() }}</span>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="admin-card h-100">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="fw-bold mb-0"><i class="fa-regular fa-envelope text-brand me-2"></i>最新留言</h6>
            <router-link to="/admin/messages" class="small text-brand">查看全部</router-link>
          </div>
          <div v-if="recentMessages.length === 0" class="text-center py-4 text-muted small">暂无留言</div>
          <div v-for="m in recentMessages" :key="m.id" class="d-flex justify-content-between align-items-center py-2"
               style="border-bottom:1px solid #f1f5f9;">
            <div class="text-truncate me-2" style="font-size:.925rem;">
              <span class="fw-semibold">{{ m.name }}</span>
              <span class="text-muted ms-2">{{ m.content }}</span>
            </div>
            <span class="small flex-shrink-0">
              <span v-if="m.status === 1" class="badge bg-success bg-opacity-10 text-success">已处理</span>
              <span v-else class="badge bg-warning bg-opacity-10 text-warning">待处理</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
