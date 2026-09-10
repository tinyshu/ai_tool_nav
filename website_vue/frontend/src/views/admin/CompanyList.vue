<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCompanyList, deleteCompany } from '@/api/company'

const router = useRouter()
const list = ref([])

const load = async () => {
  const res = await getCompanyList().catch(() => ({ data: [] }))
  list.value = res.data || []
}

onMounted(load)

const remove = async (id) => {
  if (!confirm('确定删除吗？')) return
  await deleteCompany(id)
  load()
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="m-0">公司信息</h4>
      <button class="btn btn-primary" @click="router.push('/admin/company/form')">新增</button>
    </div>
    <table class="table table-bordered bg-white">
      <thead class="table-light">
        <tr><th>ID</th><th>标题</th><th>类型</th><th>排序</th><th>操作</th></tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.sort_order }}</td>
          <td>
            <button class="btn btn-sm btn-outline-primary me-2" @click="router.push('/admin/company/form/' + item.id)">编辑</button>
            <button class="btn btn-sm btn-outline-danger" @click="remove(item.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
