<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProducts } from '@/api/product'
import { getProductCategories } from '@/api/productCategory'
import { useSiteStore } from '@/stores'
import { imgUrl } from '@/utils/url'

const router = useRouter()
const route = useRoute()
const siteStore = useSiteStore()
const s = computed(() => siteStore.settings || {})
const list = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = 12
const categoryId = ref(null)
const categories = ref([])

const load = async () => {
  const params = { page: page.value, pageSize }
  if (categoryId.value) params.category_id = categoryId.value
  const res = await getProducts(params).catch(() => null)
  list.value = res?.data?.list || []
  total.value = res?.data?.total || 0
}

const loadCategories = async () => {
  const res = await getProductCategories().catch(() => null)
  const data = Array.isArray(res?.data) ? res.data : (res?.data?.list || [])
  categories.value = data
    .filter(c => c.status === 1 && (c.product_count === undefined || c.product_count > 0))
}

onMounted(async () => {
  const qCat = route.query.category
  if (qCat) categoryId.value = Number(qCat) || null
  await Promise.all([loadCategories(), load()])
})

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))

const activeCategoryName = computed(() => {
  if (!categoryId.value) return ''
  return categories.value.find(c => c.id === categoryId.value)?.name || ''
})

const changePage = (p) => {
  if (p < 1 || p > totalPages.value) return
  page.value = p
  load()
}

const filterBy = (id) => {
  categoryId.value = id
  page.value = 1
  router.replace({ query: id ? { category: id } : {} })
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
          <span>产品中心</span>
        </div>
        <h1>{{ s.products_hero_title || '产品中心' }}</h1>
        <p class="mt-3 mb-0 opacity-75" style="max-width:640px;">
          {{ s.products_hero_desc || '' }}
        </p>
      </div>
    </section>

    <section class="section-sm">
      <div class="container">
        <div v-if="categories.length" class="product-filter mb-4">
          <div class="d-flex flex-wrap align-items-center gap-2">
            <span class="text-muted small me-2"><i class="fa-solid fa-filter me-1"></i>分类筛选:</span>
            <button class="btn btn-sm"
                    :class="categoryId === null ? 'btn-brand' : 'btn-outline-brand'"
                    @click="filterBy(null)">
              全部
              <span class="badge bg-light text-dark ms-1">{{ total }}</span>
            </button>
            <button v-for="c in categories" :key="c.id" class="btn btn-sm"
                    :class="categoryId === c.id ? 'btn-brand' : 'btn-outline-brand'"
                    @click="filterBy(c.id)">
              {{ c.name }}
              <span v-if="c.product_count !== undefined"
                    class="badge bg-light text-dark ms-1">{{ c.product_count }}</span>
            </button>
          </div>
          <div v-if="categoryId" class="small text-muted mt-2">
            当前筛选: <span class="text-brand fw-semibold">{{ activeCategoryName }}</span>
            <a href="javascript:;" class="ms-2 text-decoration-none" @click="filterBy(null)">
              <i class="fa-solid fa-xmark-circle"></i> 清除
            </a>
          </div>
        </div>

        <div v-if="list.length === 0" class="text-center py-5 text-muted">
          <i class="fa-solid fa-box-open fa-3x mb-3 opacity-50"></i>
          <p v-if="categoryId">该分类下暂无产品</p>
          <p v-else>暂无产品</p>
        </div>

        <div class="row g-4">
          <div v-for="item in list" :key="item.id" class="col-6 col-md-4 col-lg-3">
            <div class="product-card" @click="router.push('/product/' + item.id)">
              <div class="p-image">
                <img :src="imgUrl(item.image)" :alt="item.name">
                <span v-if="item.category_name"
                      class="position-absolute top-0 start-0 m-2 badge rounded-pill"
                      style="background: rgba(11,18,32,.75); font-weight:500;">
                  {{ item.category_name }}
                </span>
              </div>
              <div class="p-body">
                <div class="p-title">{{ item.name }}</div>
                <div class="p-desc">{{ item.description }}</div>
                <div class="p-price">¥{{ item.price }} <small>起</small></div>
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
