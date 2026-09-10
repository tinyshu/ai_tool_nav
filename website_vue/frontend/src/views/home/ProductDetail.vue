<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getProduct } from '@/api/product'
import { imgUrl } from '@/utils/url'

const route = useRoute()
const item = ref(null)

onMounted(async () => {
  const res = await getProduct(route.params.id).catch(() => null)
  item.value = res?.data || null
})
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <div class="crumb mb-3">
          <router-link to="/">首页</router-link>
          <i class="fa-solid fa-chevron-right mx-2 small"></i>
          <router-link to="/products">产品中心</router-link>
          <i class="fa-solid fa-chevron-right mx-2 small"></i>
          <span class="opacity-75">产品详情</span>
        </div>
        <h1 v-if="item">{{ item.name }}</h1>
      </div>
    </section>

    <section class="section" v-if="item">
      <div class="container">
        <div class="row g-5">
          <div class="col-lg-6">
            <div class="bg-white rounded-4 p-3" style="box-shadow: var(--brand-shadow);">
              <img :src="imgUrl(item.image)" class="w-100 rounded-3" :alt="item.name"
                   style="aspect-ratio: 1/1; object-fit: cover;">
            </div>
          </div>
          <div class="col-lg-6">
            <router-link v-if="item.category_name && item.category_id"
                         :to="{ path: '/products', query: { category: item.category_id } }"
                         class="badge rounded-pill mb-3 px-3 py-2 text-decoration-none"
                         style="background:var(--brand-gradient-soft); color:var(--brand-primary); font-weight:600;">
              <i class="fa-solid fa-folder me-1"></i>{{ item.category_name }}
            </router-link>
            <h2 class="fw-bold mb-3">{{ item.name }}</h2>
            <p class="text-muted lead" style="font-size:1.05rem;">{{ item.description }}</p>
            <div class="d-flex align-items-baseline my-4">
              <span class="fw-bold" style="font-size:2.5rem; color:var(--brand-primary);">¥{{ item.price }}</span>
              <span class="ms-2 text-muted">起</span>
            </div>
            <div class="d-flex gap-2 mb-4 flex-wrap">
              <router-link to="/contact" class="btn btn-brand">
                <i class="fa-solid fa-phone me-2"></i>咨询采购
              </router-link>
              <router-link to="/products" class="btn btn-outline-brand">
                <i class="fa-solid fa-arrow-left me-2"></i>返回列表
              </router-link>
            </div>
            <div class="d-flex gap-4 pt-3 border-top">
              <div class="d-flex align-items-center small text-muted">
                <i class="fa-solid fa-shield-halved me-2 text-brand"></i>品质保证
              </div>
              <div class="d-flex align-items-center small text-muted">
                <i class="fa-solid fa-truck me-2 text-brand"></i>全国配送
              </div>
              <div class="d-flex align-items-center small text-muted">
                <i class="fa-solid fa-arrows-rotate me-2 text-brand"></i>售后无忧
              </div>
            </div>
          </div>
        </div>

        <div class="mt-5">
          <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item"><a class="nav-link active fw-semibold" data-bs-toggle="tab" href="#detail-tab">产品详情</a></li>
          </ul>
          <div class="tab-content p-4 bg-white rounded-bottom" style="border:1px solid #e5e7eb; border-top:0;">
            <div class="tab-pane fade show active" id="detail-tab">
              <div v-html="item.detail" class="product-detail-content"></div>
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
.product-detail-content :deep(p) {
  line-height: 1.85;
  color: #475569;
  margin-bottom: 1rem;
}

.product-detail-content :deep(img) {
  max-width: 100%;
  border-radius: 10px;
}

.nav-tabs .nav-link {
  color: #475569;
  border: none;
  border-bottom: 3px solid transparent;
  border-radius: 0;
  padding: .75rem 1.5rem;
}

.nav-tabs .nav-link.active {
  color: var(--brand-primary);
  background: transparent;
  border-bottom-color: var(--brand-primary);
}
</style>
