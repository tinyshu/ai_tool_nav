<script setup>
import { ref, onMounted, computed } from 'vue'
import { getCompanyList } from '@/api/company'
import { useSiteStore } from '@/stores'
import { imgUrl } from '@/utils/url'

const siteStore = useSiteStore()
const list = ref([])
const s = computed(() => siteStore.settings || {})

const typeMap = {
  about: { icon: 'fa-building', title: '关于我们' },
  about_us: { icon: 'fa-building', title: '关于我们' },
  culture: { icon: 'fa-heart', title: '企业文化' },
  history: { icon: 'fa-clock-rotate-left', title: '发展历程' },
  honors: { icon: 'fa-trophy', title: '荣誉资质' }
}

const iconOf = (t) => typeMap[t]?.icon || 'fa-circle-info'

const coverImages = computed(() => [
  s.value.about_cover_1 || 'uploads/体育用品公司图片素材 (1).jpg',
  s.value.about_cover_2 || 'uploads/体育用品公司图片素材 (2).jpg',
  s.value.about_cover_3 || 'uploads/体育用品公司图片素材 (3).png'
])
const coverOf = (index) => coverImages.value[index % coverImages.value.length]

const orderedList = computed(() => {
  return [...list.value].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
})

onMounted(async () => {
  const res = await getCompanyList().catch(() => null)
  list.value = Array.isArray(res?.data) ? res.data : (res?.data?.list || [])
})
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <div class="crumb mb-3">
          <router-link to="/">首页</router-link>
          <i class="fa-solid fa-chevron-right mx-2 small"></i>
          <span>关于我们</span>
        </div>
        <h1>{{ s.about_hero_title || '关于我们' }}</h1>
        <p class="mt-3 mb-0 opacity-75" style="max-width:640px;">
          {{ s.about_hero_desc || '' }}
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div v-for="(item, index) in orderedList" :key="item.id"
             class="row align-items-center g-5 mb-5"
             :class="{ 'flex-lg-row-reverse': index % 2 === 1 }">
          <div class="col-lg-5">
            <div class="position-relative">
              <img :src="imgUrl(coverOf(index))"
                   :alt="item.title" class="w-100 rounded-4"
                   style="box-shadow: var(--brand-shadow-lg); aspect-ratio: 4/3; object-fit: cover;">
              <div class="position-absolute top-0 start-0 m-3 d-flex align-items-center justify-content-center"
                   style="width:52px;height:52px;border-radius:14px;background:var(--brand-gradient);color:#fff;font-size:1.2rem;box-shadow: 0 12px 30px var(--brand-glow);">
                <i class="fa-solid" :class="iconOf(item.type)"></i>
              </div>
            </div>
          </div>
          <div class="col-lg-7">
            <div class="eyebrow mb-2"
                 style="color:var(--brand-primary); font-weight:600; letter-spacing:3px; font-size:.8rem; text-transform:uppercase;">
              {{ item.type }}
            </div>
            <h2 class="fw-bold mb-3">{{ item.title }}</h2>
            <div class="company-content" v-html="item.content"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gradient-brand py-5">
      <div class="container text-center">
        <h2 class="fw-bold mb-3">{{ s.about_cta_title || '联系我们' }}</h2>
        <p class="mb-4 opacity-90">{{ s.about_cta_desc || '' }}</p>
        <router-link to="/contact" class="btn btn-light me-2">联系我们</router-link>
        <router-link to="/products" class="btn btn-ghost">产品中心</router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.company-content :deep(p) {
  color: #475569;
  line-height: 1.9;
  font-size: 1.02rem;
  margin-bottom: 1rem;
}
</style>
