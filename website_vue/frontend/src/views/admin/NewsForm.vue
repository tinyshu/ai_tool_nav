<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getNews, createNews, updateNews } from '@/api/news'
import { uploadFile } from '@/api/upload'
import RichEditor from '@/components/RichEditor.vue'

const route = useRoute()
const router = useRouter()
const form = ref({ category_id: '', title: '', summary: '', content: '', cover_image: '', sort_order: 0, status: 1 })
const isEdit = ref(false)

onMounted(async () => {
  if (route.params.id) {
    isEdit.value = true
    const res = await getNews(route.params.id).catch(() => ({ data: null }))
    if (res.data) form.value = res.data
  }
})

const handleFile = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  const res = await uploadFile(file)
  if (res.code === 200) form.value.cover_image = res.data.url
}

const save = async () => {
  const res = isEdit.value
    ? await updateNews(route.params.id, form.value)
    : await createNews(form.value)
  if (res.code === 200) {
    alert('保存成功')
    router.push('/admin/news')
  } else {
    alert(res.message || '保存失败')
  }
}
</script>

<template>
  <div>
    <h4 class="mb-4">{{ isEdit ? '编辑新闻' : '新增新闻' }}</h4>
    <div class="card">
      <div class="card-body">
        <div class="mb-3">
          <label class="form-label">标题</label>
          <input v-model="form.title" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">分类ID</label>
          <input v-model.number="form.category_id" type="number" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">摘要</label>
          <textarea v-model="form.summary" class="form-control" rows="2"></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">封面图片</label>
          <input type="file" class="form-control" accept="image/*" @change="handleFile">
          <img v-if="form.cover_image" :src="form.cover_image" class="mt-2" height="100" alt="">
        </div>
        <div class="mb-3">
          <label class="form-label">详细内容</label>
          <RichEditor v-model="form.content" />
        </div>
        <div class="mb-3">
          <label class="form-label">排序</label>
          <input v-model.number="form.sort_order" type="number" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">状态</label>
          <select v-model.number="form.status" class="form-select">
            <option :value="1">发布</option>
            <option :value="0">草稿</option>
          </select>
        </div>
        <button class="btn btn-primary me-2" @click="save">保存</button>
        <button class="btn btn-secondary" @click="router.back()">返回</button>
      </div>
    </div>
  </div>
</template>
