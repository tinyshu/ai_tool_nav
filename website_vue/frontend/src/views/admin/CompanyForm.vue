<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCompany, createCompany, updateCompany } from '@/api/company'
import RichEditor from '@/components/RichEditor.vue'

const route = useRoute()
const router = useRouter()
const form = ref({ title: '', content: '', type: 'about', sort_order: 0 })
const isEdit = ref(false)

onMounted(async () => {
  if (route.params.id) {
    isEdit.value = true
    const res = await getCompany(route.params.id).catch(() => ({ data: null }))
    if (res.data) form.value = res.data
  }
})

const save = async () => {
  const res = isEdit.value
    ? await updateCompany(route.params.id, form.value)
    : await createCompany(form.value)
  if (res.code === 200) {
    alert('保存成功')
    router.push('/admin/company')
  } else {
    alert(res.message || '保存失败')
  }
}
</script>

<template>
  <div>
    <h4 class="mb-4">{{ isEdit ? '编辑公司信息' : '新增公司信息' }}</h4>
    <div class="card">
      <div class="card-body">
        <div class="mb-3">
          <label class="form-label">标题</label>
          <input v-model="form.title" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">类型</label>
          <select v-model="form.type" class="form-select">
            <option value="about">关于我们</option>
            <option value="culture">企业文化</option>
            <option value="history">发展历程</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">内容</label>
          <RichEditor v-model="form.content" />
        </div>
        <div class="mb-3">
          <label class="form-label">排序</label>
          <input v-model.number="form.sort_order" type="number" class="form-control">
        </div>
        <button class="btn btn-primary me-2" @click="save">保存</button>
        <button class="btn btn-secondary" @click="router.back()">返回</button>
      </div>
    </div>
  </div>
</template>
