<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getBanners, deleteBanner } from '@/api/banner'
import { imgUrl } from '@/utils/url'

const router = useRouter()
const list = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = 10

const load = async () => {
  const res = await getBanners({ page: page.value, pageSize }).catch(() => null)
  list.value = res?.data?.list || []
  total.value = res?.data?.total || 0
}

onMounted(load)

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))

const remove = async (id) => {
  if (!confirm('确定删除吗？')) return
  await deleteBanner(id)
  load()
}

const changePage = (p) => {
  if (p < 1 || p > totalPages.value) return
  page.value = p
  load()
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4>轮播管理</h4>
      <button class="btn btn-brand" @click="router.push('/admin/banners/form')">
        <i class="fa-solid fa-plus me-1"></i>新增轮播
      </button>
    </div>
    <table class="table">
      <thead>
        <tr><th style="width:60px;">ID</th><th>标题</th><th>图片</th><th>链接</th><th>排序</th><th>状态</th><th style="width:160px;">操作</th></tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.id }}</td>
          <td class="fw-semibold">{{ item.title }}</td>
          <td><img :src="imgUrl(item.image)" height="50" alt=""></td>
          <td class="text-muted small">{{ item.link || '—' }}</td>
          <td>{{ item.sort_order }}</td>
          <td>
            <span v-if="item.status" class="badge bg-success bg-opacity-10 text-success">显示</span>
            <span v-else class="badge bg-secondary bg-opacity-10 text-secondary">隐藏</span>
          </td>
          <td>
            <button class="btn btn-sm btn-outline-primary me-1" @click="router.push('/admin/banners/form/' + item.id)">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="remove(item.id)">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
        <tr v-if="list.length === 0">
          <td colspan="7" class="text-center text-muted py-4">暂无数据</td>
        </tr>
      </tbody>
    </table>
    <nav v-if="totalPages > 1" class="mt-3">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: page === 1 }">
          <a class="page-link" href="javascript:;" @click="changePage(page - 1)"><i class="fa-solid fa-chevron-left"></i></a>
        </li>
        <li class="page-item" v-for="p in totalPages" :key="p" :class="{ active: p === page }">
          <a class="page-link" href="javascript:;" @click="changePage(p)">{{ p }}</a>
        </li>
        <li class="page-item" :class="{ disabled: page === totalPages }">
          <a class="page-link" href="javascript:;" @click="changePage(page + 1)"><i class="fa-solid fa-chevron-right"></i></a>
        </li>
      </ul>
    </nav>
  </div>
</template>
