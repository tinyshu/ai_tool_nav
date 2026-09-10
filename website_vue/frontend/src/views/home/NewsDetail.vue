<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getNews, getNewsList } from '@/api/news'
import { imgUrl } from '@/utils/url'

const route = useRoute()
const item = ref(null)
const related = ref([])

const load = async () => {
  const res = await getNews(route.params.id).catch(() => null)
  item.value = res?.data || null
  const list = await getNewsList({ pageSize: 5, status: 1 }).catch(() => null)
  related.value = (list?.data?.list || []).filter(n => n.id !== +route.params.id).slice(0, 4)
}

onMounted(load)
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <div class="crumb mb-3">
          <router-link to="/">首页</router-link>
          <i class="fa-solid fa-chevron-right mx-2 small"></i>
          <router-link to="/news">新闻资讯</router-link>
          <i class="fa-solid fa-chevron-right mx-2 small"></i>
          <span class="opacity-75">详情</span>
        </div>
        <h1 v-if="item">{{ item.title }}</h1>
        <div v-if="item" class="mt-3 opacity-75">
          <i class="fa-regular fa-calendar me-1"></i>
          {{ new Date(item.created_at).toLocaleDateString() }}
          <span class="ms-3"><i class="fa-regular fa-eye me-1"></i>{{ item.views }} 阅读</span>
        </div>
      </div>
    </section>

    <section class="section" v-if="item">
      <div class="container">
        <div class="row g-5">
          <div class="col-lg-8">
            <article class="bg-white rounded-4 p-4 p-md-5"
                     style="box-shadow: var(--brand-shadow-sm);">
              <img v-if="item.cover_image" :src="imgUrl(item.cover_image)" class="w-100 rounded-3 mb-4"
                   style="aspect-ratio: 16/7; object-fit: cover;" :alt="item.title">
              <div v-if="item.summary" class="p-3 mb-4 rounded-3"
                   style="background:var(--brand-gradient-soft); color:#475569; font-size:1rem; line-height:1.8;">
                <i class="fa-solid fa-quote-left text-brand me-2"></i>{{ item.summary }}
              </div>
              <div v-html="item.content" class="article-content"></div>
              <div class="mt-4 pt-4 border-top d-flex justify-content-between">
                <router-link to="/news" class="btn btn-outline-brand">
                  <i class="fa-solid fa-arrow-left me-2"></i>返回列表
                </router-link>
                <div class="text-muted small align-self-center">
                  分享到：
                  <i class="fa-brands fa-weixin ms-2 text-success"></i>
                  <i class="fa-brands fa-weibo ms-2 text-danger"></i>
                  <i class="fa-brands fa-qq ms-2 text-primary"></i>
                </div>
              </div>
            </article>
          </div>
          <div class="col-lg-4">
            <div class="bg-white rounded-4 p-4" style="box-shadow: var(--brand-shadow-sm); position:sticky; top:88px;">
              <h5 class="fw-bold mb-3">相关资讯</h5>
              <div class="d-flex flex-column gap-3">
                <router-link v-for="n in related" :key="n.id" :to="'/news/' + n.id"
                             class="d-flex gap-3 text-decoration-none text-reset"
                             style="padding-bottom: 1rem; border-bottom: 1px solid #eef2f7;">
                  <img :src="imgUrl(n.cover_image)" :alt="n.title"
                       style="width:80px; height:60px; object-fit:cover; border-radius:8px; flex-shrink:0;">
                  <div style="min-width:0;">
                    <div class="fw-semibold small"
                         style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
                      {{ n.title }}
                    </div>
                    <div class="small text-muted mt-1">
                      {{ new Date(n.created_at).toLocaleDateString() }}
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div v-else class="container py-5 text-center text-muted">
      <i class="fa-solid fa-spinner fa-spin fa-2x"></i>
      <p class="mt-3">加载中…</p>
    </div>
  </div>
</template>

<style scoped>
.article-content :deep(p) {
  line-height: 1.9;
  font-size: 1.02rem;
  color: #334155;
  margin-bottom: 1.2rem;
}

.article-content :deep(img) {
  max-width: 100%;
  border-radius: 10px;
  margin: 1rem 0;
}
</style>
