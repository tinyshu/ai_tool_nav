<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getNewsList } from '@/api/news'
import { useSiteStore } from '@/stores'
import { imgUrl } from '@/utils/url'

const router = useRouter()
const siteStore = useSiteStore()
const s = computed(() => siteStore.settings || {})
const list = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = 8

const load = async () => {
  const res = await getNewsList({ page: page.value, pageSize, status: 1 }).catch(() => null)
  list.value = res?.data?.list || []
  total.value = res?.data?.total || 0
}

onMounted(load)

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))

const changePage = (p) => {
  if (p < 1 || p > totalPages.value) return
  page.value = p
  load()
}
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <div class="crumb mb-3">
          <router-link to="/">首页</router-link>
          <i class="fa-solid fa-chevron-right mx-2 small"></i>
          <span>新闻资讯</span>
        </div>
        <h1>{{ s.news_hero_title || '新闻资讯' }}</h1>
        <p class="mt-3 mb-0 opacity-75">{{ s.news_hero_desc || '' }}</p>
      </div>
    </section>

    <section class="section-sm bg-soft" style="padding-bottom: 4rem;">
      <div class="container">
        <div v-if="list.length === 0" class="text-center py-5 text-muted">
          <i class="fa-regular fa-newspaper fa-3x mb-3 opacity-50"></i>
          <p>暂无资讯</p>
        </div>
        <div class="row g-4">
          <div v-for="item in list" :key="item.id" class="col-md-6">
            <div class="news-card" @click="router.push('/news/' + item.id)">
              <div class="n-image">
                <img :src="imgUrl(item.cover_image)" :alt="item.title">
              </div>
              <div class="n-body">
                <div class="n-title">{{ item.title }}</div>
                <div class="n-summary">{{ item.summary }}</div>
                <div class="n-meta d-flex align-items-center">
                  <i class="fa-regular fa-calendar me-1"></i>
                  {{ new Date(item.created_at).toLocaleDateString() }}
                  <span class="ms-3"><i class="fa-regular fa-eye me-1"></i>{{ item.views }}</span>
                  <span class="ms-auto text-brand fw-semibold small">阅读全文 <i class="fa-solid fa-arrow-right ms-1"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav class="mt-5" v-if="totalPages > 1">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: page === 1 }">
              <a class="page-link" href="javascript:;" @click="changePage(page - 1)">
                <i class="fa-solid fa-chevron-left"></i>
              </a>
            </li>
            <li class="page-item" v-for="p in totalPages" :key="p" :class="{ active: p === page }">
              <a class="page-link" href="javascript:;" @click="changePage(p)">{{ p }}</a>
            </li>
            <li class="page-item" :class="{ disabled: page === totalPages }">
              <a class="page-link" href="javascript:;" @click="changePage(page + 1)">
                <i class="fa-solid fa-chevron-right"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  </div>
</template>
