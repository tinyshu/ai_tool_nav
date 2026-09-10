<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getLink, createLink, updateLink } from '@/api/link'
import { uploadFile } from '@/api/upload'

const route = useRoute()
const router = useRouter()
const form = ref({ name: '', url: '', logo: '', sort_order: 0, status: 1 })
const isEdit = ref(false)

onMounted(async () => {
  if (route.params.id) {
    isEdit.value = true
    const res = await getLink(route.params.id).catch(() => ({ data: null }))
    if (res.data) form.value = res.data
  }
})

const handleFile = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  const res = await uploadFile(file)
  if (res.code === 200) form.value.logo = res.data.url
}

const save = async () => {
  const res = isEdit.value
    ? await updateLink(route.params.id, form.value)
    : await createLink(form.value)
  if (res.code === 200) {
    alert('保存成功')
    router.push('/admin/links')
  } else {
    alert(res.message || '保存失败')
  }
}
</script>

<template>
  <div>
    <h4 class="mb-4">{{ isEdit ? '编辑链接' : '新增链接' }}</h4>
    <div class="card">
      <div class="card-body">
        <div class="mb-3"><label class="form-label">名称</label><input v-model="form.name" class="form-control"></div>
        <div class="mb-3"><label class="form-label">URL</label><input v-model="form.url" class="form-control"></div>
        <div class="mb-3">
          <label class="form-label">Logo</label>
          <input type="file" class="form-control" accept="image/*" @change="handleFile">
          <img v-if="form.logo" :src="form.logo" class="mt-2" height="60" alt="">
        </div>
        <div class="mb-3"><label class="form-label">排序</label><input v-model.number="form.sort_order" type="number" class="form-control"></div>
        <div class="mb-3">
          <label class="form-label">状态</label>
          <select v-model.number="form.status" class="form-select">
            <option :value="1">显示</option>
            <option :value="0">隐藏</option>
          </select>
        </div>
        <button class="btn btn-primary me-2" @click="save">保存</button>
        <button class="btn btn-secondary" @click="router.back()">返回</button>
      </div>
    </div>
  </div>
</template>
