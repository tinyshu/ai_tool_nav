<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getJobs, deleteJob } from '@/api/job'

const router = useRouter()
const list = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = 10

const load = async () => {
  const res = await getJobs({ page: page.value, pageSize }).catch(() => ({ data: { list: [], total: 0 } }))
  list.value = res.data?.list || []
  total.value = res.data?.total || 0
}

onMounted(load)

const remove = async (id) => {
  if (!confirm('确定删除吗？')) return
  await deleteJob(id)
  load()
}

const changePage = (p) => { page.value = p; load() }
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="m-0">招聘管理</h4>
      <button class="btn btn-primary" @click="router.push('/admin/jobs/form')">新增招聘</button>
    </div>
    <table class="table table-bordered bg-white">
      <thead class="table-light">
        <tr><th>ID</th><th>职位</th><th>部门</th><th>地点</th><th>薪资</th><th>状态</th><th>操作</th></tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.department }}</td>
          <td>{{ item.location }}</td>
          <td>{{ item.salary }}</td>
          <td>{{ item.status ? '招聘中' : '已关闭' }}</td>
          <td>
            <button class="btn btn-sm btn-outline-primary me-2" @click="router.push('/admin/jobs/form/' + item.id)">编辑</button>
            <button class="btn btn-sm btn-outline-danger" @click="remove(item.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <nav v-if="total > pageSize">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: page === 1 }"><a class="page-link" href="javascript:;" @click="changePage(page - 1)">上一页</a></li>
        <li class="page-item" v-for="p in Math.ceil(total / pageSize)" :key="p" :class="{ active: p === page }"><a class="page-link" href="javascript:;" @click="changePage(p)">{{ p }}</a></li>
        <li class="page-item" :class="{ disabled: page === Math.ceil(total / pageSize) }"><a class="page-link" href="javascript:;" @click="changePage(page + 1)">下一页</a></li>
      </ul>
    </nav>
  </div>
</template>
