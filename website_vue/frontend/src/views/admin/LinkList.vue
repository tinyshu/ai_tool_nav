<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getLinks, deleteLink } from '@/api/link'
import { imgUrl } from '@/utils/url'

const router = useRouter()
const list = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = 10

const load = async () => {
  const res = await getLinks({ page: page.value, pageSize }).catch(() => null)
  list.value = res?.data?.list || []
  total.value = res?.data?.total || 0
}

onMounted(load)

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))

const remove = async (id, name) => {
  if (!confirm(`确定删除「${name}」吗？`)) return
  const res = await deleteLink(id)
  if (res.code === 200) load()
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
      <div>
        <h4 class="mb-1">友情链接</h4>
        <div class="small text-muted">管理前台页脚展示的合作伙伴 / 友情链接</div>
      </div>
      <button class="btn btn-brand" @click="router.push('/admin/links/form')">
        <i class="fa-solid fa-plus me-1"></i>新增链接
      </button>
    </div>

    <table class="table align-middle">
      <thead>
        <tr>
          <th style="width:60px;">ID</th>
          <th style="width:90px;">Logo</th>
          <th>名称</th>
          <th>URL</th>
          <th style="width:90px;">排序</th>
          <th style="width:100px;">状态</th>
          <th style="width:140px;">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.id }}</td>
          <td>
            <img v-if="item.logo" :src="imgUrl(item.logo)" height="36" alt="" class="rounded">
            <span v-else class="text-muted small">—</span>
          </td>
          <td class="fw-semibold">
            <i class="fa-solid fa-link me-1" style="color:var(--brand-primary);"></i>
            {{ item.name }}
          </td>
          <td class="text-truncate" style="max-width:320px;">
            <a :href="item.url" target="_blank" rel="noopener" class="text-decoration-none small">
              {{ item.url }}
              <i class="fa-solid fa-arrow-up-right-from-square ms-1 small"></i>
            </a>
          </td>
          <td>{{ item.sort_order }}</td>
          <td>
            <span v-if="item.status" class="badge bg-success bg-opacity-10 text-success">
              <i class="fa-solid fa-eye me-1"></i>显示
            </span>
            <span v-else class="badge bg-secondary bg-opacity-10 text-secondary">
              <i class="fa-solid fa-eye-slash me-1"></i>隐藏
            </span>
          </td>
          <td>
            <button class="btn btn-sm btn-outline-primary me-1"
                    @click="router.push('/admin/links/form/' + item.id)">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="remove(item.id, item.name)">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
        <tr v-if="list.length === 0">
          <td colspan="7" class="text-center text-muted py-4">
            <i class="fa-solid fa-link-slash fa-2x mb-2 opacity-50 d-block"></i>
            暂无友情链接, 点击右上角「新增链接」创建
          </td>
        </tr>
      </tbody>
    </table>

    <nav v-if="totalPages > 1" class="mt-3">
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
</template>
