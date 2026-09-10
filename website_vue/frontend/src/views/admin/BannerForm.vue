<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBanner, createBanner, updateBanner } from '@/api/banner'
import { uploadFile } from '@/api/upload'

const route = useRoute()
const router = useRouter()
const form = ref({ title: '', image: '', link: '', sort_order: 0, status: 1 })
const isEdit = ref(false)

onMounted(async () => {
  if (route.params.id) {
    isEdit.value = true
    const res = await getBanner(route.params.id).catch(() => ({ data: null }))
    if (res.data) form.value = res.data
  }
})

const handleFile = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  const res = await uploadFile(file)
  if (res.code === 200) form.value.image = res.data.url
}

const save = async () => {
  const res = isEdit.value
    ? await updateBanner(route.params.id, form.value)
    : await createBanner(form.value)
  if (res.code === 200) {
    alert('保存成功')
    router.push('/admin/banners')
  } else {
    alert(res.message || '保存失败')
  }
}
</script>

<template>
  <div>
    <h4 class="mb-4">{{ isEdit ? '编辑轮播' : '新增轮播' }}</h4>
    <div class="card">
      <div class="card-body">
        <div class="mb-3">
          <label class="form-label">标题</label>
          <input v-model="form.title" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">轮播图片</label>
          <input type="file" class="form-control" accept="image/*" @change="handleFile">
          <img v-if="form.image" :src="form.image" class="mt-2" height="100" alt="">
        </div>
        <div class="mb-3">
          <label class="form-label">链接</label>
          <input v-model="form.link" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">排序</label>
          <input v-model.number="form.sort_order" type="number" class="form-control">
        </div>
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
