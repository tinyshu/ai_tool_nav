<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getJob, createJob, updateJob } from '@/api/job'

const route = useRoute()
const router = useRouter()
const form = ref({ title: '', department: '', location: '', salary: '', requirements: '', description: '', sort_order: 0, status: 1 })
const isEdit = ref(false)

onMounted(async () => {
  if (route.params.id) {
    isEdit.value = true
    const res = await getJob(route.params.id).catch(() => ({ data: null }))
    if (res.data) form.value = res.data
  }
})

const save = async () => {
  const res = isEdit.value
    ? await updateJob(route.params.id, form.value)
    : await createJob(form.value)
  if (res.code === 200) {
    alert('保存成功')
    router.push('/admin/jobs')
  } else {
    alert(res.message || '保存失败')
  }
}
</script>

<template>
  <div>
    <h4 class="mb-4">{{ isEdit ? '编辑招聘' : '新增招聘' }}</h4>
    <div class="card">
      <div class="card-body">
        <div class="mb-3"><label class="form-label">职位</label><input v-model="form.title" class="form-control"></div>
        <div class="mb-3"><label class="form-label">部门</label><input v-model="form.department" class="form-control"></div>
        <div class="mb-3"><label class="form-label">地点</label><input v-model="form.location" class="form-control"></div>
        <div class="mb-3"><label class="form-label">薪资</label><input v-model="form.salary" class="form-control"></div>
        <div class="mb-3"><label class="form-label">职位要求</label><textarea v-model="form.requirements" class="form-control" rows="4"></textarea></div>
        <div class="mb-3"><label class="form-label">职位描述</label><textarea v-model="form.description" class="form-control" rows="3"></textarea></div>
        <div class="mb-3"><label class="form-label">排序</label><input v-model.number="form.sort_order" type="number" class="form-control"></div>
        <div class="mb-3">
          <label class="form-label">状态</label>
          <select v-model.number="form.status" class="form-select">
            <option :value="1">招聘中</option>
            <option :value="0">已关闭</option>
          </select>
        </div>
        <button class="btn btn-primary me-2" @click="save">保存</button>
        <button class="btn btn-secondary" @click="router.back()">返回</button>
      </div>
    </div>
  </div>
</template>
