<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSiteStore } from '@/stores'
import { getBanners } from '@/api/banner'
import { getProducts } from '@/api/product'
import { getNewsList } from '@/api/news'
import { getJobs } from '@/api/job'
import { getCompanyList } from '@/api/company'
import { imgUrl } from '@/utils/url'

const router = useRouter()
const siteStore = useSiteStore()
const s = computed(() => siteStore.settings || {})
const banners = ref([])
const products = ref([])
const newsList = ref([])
const jobs = ref([])
const company = ref(null)

const stats = computed(() => [1, 2, 3, 4].map(i => ({
  num: s.value[`stat_${i}_num`] || '',
  label: s.value[`stat_${i}_label`] || '',
  icon: s.value[`stat_${i}_icon`] || 'fa-circle'
})).filter(x => x.num || x.label))

const features = computed(() => [1, 2, 3, 4].map(i => ({
  icon: s.value[`feature_${i}_icon`] || 'fa-circle',
  title: s.value[`feature_${i}_title`] || '',
  desc: s.value[`feature_${i}_desc`] || ''
})).filter(x => x.title))

const companyExcerpt = computed(() => {
  if (!company.value?.content) return ''
  const txt = company.value.content.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
  return txt.length > 160 ? txt.slice(0, 160) + '…' : txt
})

onMounted(async () => {
  const [b, p, n, j, c] = await Promise.all([
    getBanners({ status: 1, pageSize: 10 }).catch(() => null),
    getProducts({ pageSize: 8 }).catch(() => null),
    getNewsList({ pageSize: 3 }).catch(() => null),
    getJobs({ pageSize: 4, status: 1 }).catch(() => null),
    getCompanyList().catch(() => null)
  ])
  banners.value = b?.data?.list || b?.data || []
  products.value = p?.data?.list || []
  newsList.value = n?.data?.list || []
  jobs.value = j?.data?.list || []
  const cList = Array.isArray(c?.data) ? c.data : (c?.data?.list || [])
  company.value = cList.find(item => item.type === 'about') || cList[0] || null
})

const goProduct = (id) => router.push('/product/' + id)
const goNews = (id) => router.push('/news/' + id)
</script>

<template>
  <div>
    <section class="hero-carousel">
      <div id="homeCarousel" class="carousel slide" data-bs-ride="carousel" v-if="banners.length">
        <div class="carousel-indicators">
          <button v-for="(item, index) in banners" :key="'ind-' + item.id" type="button"
                  data-bs-target="#homeCarousel" :data-bs-slide-to="index" :class="{ active: index === 0 }"
                  :aria-label="'Slide ' + (index + 1)"></button>
        </div>
        <div class="carousel-inner">
          <div v-for="(item, index) in banners" :key="item.id" class="carousel-item" :class="{ active: index === 0 }">
            <img :src="imgUrl(item.image)" :alt="item.title">
            <div class="carousel-caption">
              <div v-if="s.home_badge" class="badge rounded-pill mb-3 px-3 py-2"
                   style="background: var(--brand-primary); opacity:.95; font-size:.8rem; letter-spacing:2px;">
                {{ s.home_badge }}
              </div>
              <h2>{{ item.title }}</h2>
              <p>{{ s.home_slogan }}</p>
              <div class="mt-4">
                <router-link to="/products" class="btn btn-brand me-2">
                  <i class="fa-solid fa-arrow-right me-2"></i>了解产品
                </router-link>
                <router-link to="/about" class="btn btn-ghost">了解我们</router-link>
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>
    </section>

    <section class="section-sm bg-soft" v-if="features.length">
      <div class="container">
        <div class="row g-4">
          <div v-for="f in features" :key="f.title" class="col-md-6 col-lg-3">
            <div class="d-flex align-items-start bg-white rounded-3 p-4 h-100"
                 style="box-shadow: var(--brand-shadow-sm);">
              <div class="flex-shrink-0 me-3 d-flex align-items-center justify-content-center"
                   style="width:48px;height:48px;border-radius:12px;background:var(--brand-gradient-soft);color:var(--brand-primary);font-size:1.2rem;">
                <i class="fa-solid" :class="f.icon"></i>
              </div>
              <div>
                <h6 class="mb-1 fw-bold">{{ f.title }}</h6>
                <p class="small text-muted mb-0">{{ f.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" v-if="company">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-6">
            <div class="position-relative">
              <img :src="imgUrl(s.home_about_image || 'uploads/体育用品公司图片素材 (1).jpg')" alt="公司"
                   class="w-100 rounded-4" style="box-shadow: var(--brand-shadow-lg);">
              <div v-if="s.home_experience_num" class="position-absolute d-none d-md-flex flex-column justify-content-center text-center"
                   style="right:-20px; bottom:-20px; width:170px; height:170px; border-radius:24px; background: var(--brand-gradient); color:#fff; box-shadow: 0 20px 40px var(--brand-glow);">
                <div style="font-size:2.4rem;font-weight:800;">{{ s.home_experience_num }}</div>
                <div style="font-size:.9rem;opacity:.9;">{{ s.home_experience_label }}</div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="eyebrow mb-2"
                 style="color:var(--brand-primary); font-weight:600; letter-spacing:3px; font-size:.8rem; text-transform:uppercase;">
              ABOUT US
            </div>
            <h2 class="fw-bold mb-3" style="font-size:2.1rem;">{{ company.title }}</h2>
            <p class="text-muted" style="font-size:1.05rem; line-height:1.85;">
              {{ companyExcerpt }}
            </p>
            <div class="row g-3 mt-3" v-if="stats.length">
              <div v-for="item in stats" :key="item.label" class="col-6">
                <div class="d-flex align-items-center">
                  <div class="me-3 d-flex align-items-center justify-content-center"
                       style="width:42px;height:42px;border-radius:10px;background:var(--brand-gradient-soft);color:var(--brand-primary);">
                    <i class="fa-solid" :class="item.icon"></i>
                  </div>
                  <div>
                    <div class="fw-bold" style="font-size:1.2rem;color:var(--brand-dark);">{{ item.num }}</div>
                    <div class="text-muted small">{{ item.label }}</div>
                  </div>
                </div>
              </div>
            </div>
            <router-link to="/about" class="btn btn-brand mt-4">
              <i class="fa-solid fa-arrow-right me-2"></i>探索更多
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-soft">
      <div class="container">
        <div class="section-title">
          <span class="eyebrow">HOT PRODUCTS</span>
          <h2>{{ s.home_products_title || '热门产品' }}</h2>
          <p>{{ s.home_products_desc || '' }}</p>
        </div>
        <div class="row g-4">
          <div v-for="item in products" :key="item.id" class="col-6 col-md-4 col-lg-3">
            <div class="product-card" @click="goProduct(item.id)">
              <div class="p-image">
                <img :src="imgUrl(item.image)" :alt="item.name">
              </div>
              <div class="p-body">
                <div class="p-title">{{ item.name }}</div>
                <div class="p-desc">{{ item.description }}</div>
                <div class="p-price">¥{{ item.price }} <small>起</small></div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-5">
          <router-link to="/products" class="btn btn-outline-brand">
            查看全部产品 <i class="fa-solid fa-arrow-right ms-2"></i>
          </router-link>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="row g-5">
          <div class="col-lg-7">
            <div class="d-flex justify-content-between align-items-end mb-4">
              <div>
                <span class="eyebrow"
                      style="color:var(--brand-primary); font-weight:600; letter-spacing:3px; font-size:.8rem; text-transform:uppercase;">
                  LATEST NEWS
                </span>
                <h3 class="fw-bold mt-2 mb-0">新闻资讯</h3>
              </div>
              <router-link to="/news" class="text-brand fw-semibold">
                更多 <i class="fa-solid fa-arrow-right ms-1"></i>
              </router-link>
            </div>
            <div class="d-flex flex-column gap-3">
              <div v-for="item in newsList" :key="item.id" class="news-card" @click="goNews(item.id)">
                <div class="n-image">
                  <img :src="imgUrl(item.cover_image)" :alt="item.title">
                </div>
                <div class="n-body">
                  <div class="n-title">{{ item.title }}</div>
                  <div class="n-summary">{{ item.summary }}</div>
                  <div class="n-meta">
                    <i class="fa-regular fa-calendar me-1"></i>
                    {{ new Date(item.created_at).toLocaleDateString() }}
                    <span class="ms-3"><i class="fa-regular fa-eye me-1"></i>{{ item.views }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="d-flex justify-content-between align-items-end mb-4">
              <div>
                <span class="eyebrow"
                      style="color:var(--brand-primary); font-weight:600; letter-spacing:3px; font-size:.8rem; text-transform:uppercase;">
                  JOIN US
                </span>
                <h3 class="fw-bold mt-2 mb-0">人才招聘</h3>
              </div>
              <router-link to="/jobs" class="text-brand fw-semibold">
                更多 <i class="fa-solid fa-arrow-right ms-1"></i>
              </router-link>
            </div>
            <div class="d-flex flex-column gap-3">
              <router-link v-for="item in jobs" :key="item.id" to="/jobs"
                           class="job-card d-block text-decoration-none text-reset">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="j-title">{{ item.title }}</div>
                  <span class="j-salary">{{ item.salary }}</span>
                </div>
                <div class="j-meta">
                  <i class="fa-solid fa-location-dot"></i>{{ item.location }}
                  <span class="ms-3"><i class="fa-solid fa-briefcase"></i>{{ item.department }}</span>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gradient-brand py-5">
      <div class="container text-center">
        <h2 class="fw-bold mb-3">{{ s.home_cta_title || '联系我们' }}</h2>
        <p class="mb-4 opacity-90" style="max-width:620px;margin:0 auto;">
          {{ s.home_cta_desc || '' }}
        </p>
        <router-link to="/contact" class="btn btn-light px-4">
          <i class="fa-solid fa-comments me-2"></i>联系我们
        </router-link>
      </div>
    </section>
  </div>
</template>
