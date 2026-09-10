<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProduct, createProduct, updateProduct } from '@/api/product'
import { getProductCategories } from '@/api/productCategory'
import { uploadFile } from '@/api/upload'
import { imgUrl } from '@/utils/url'
import RichEditor from '@/components/RichEditor.vue'

const route = useRoute()
const router = useRouter()
const form = ref({ category_id: '', name: '', description: '', detail: '', image: '', price: '', sort_order: 0, status: 1 })
const isEdit = ref(false)
const categories = ref([])

onMounted(async () => {
  const catRes = await getProductCategories().catch(() => null)
  const catList = Array.isArray(catRes?.data) ? catRes.data : (catRes?.data?.list || [])
  categories.value = catList.filter(c => c.status === 1 || (isEdit.value && c.id === form.value.category_id))

  if (route.params.id) {
    isEdit.value = true
    const res = await getProduct(route.params.id).catch(() => ({ data: null }))
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
    ? await updateProduct(route.params.id, form.value)
    : await createProduct(form.value)
  if (res.code === 200) {
    alert('保存成功')
    router.push('/admin/products')
  } else {
    alert(res.message || '保存失败')
  }
}
</script>

<template>
  <div>
    <h4 class="mb-4">{{ isEdit ? '编辑产品' : '新增产品' }}</h4>
    <div class="card">
      <div class="card-body">
        <div class="mb-3">
          <label class="form-label">名称 <span class="text-danger">*</span></label>
          <input v-model="form.name" class="form-control" placeholder="请输入产品名称">
        </div>
        <div class="mb-3">
          <label class="form-label">
            产品分类 <span class="text-danger">*</span>
            <router-link to="/admin/product-categories" target="_blank"
                         class="ms-2 small text-decoration-none">
              <i class="fa-solid fa-plus-circle me-1"></i>管理分类
            </router-link>
          </label>
          <select v-model.number="form.category_id" class="form-select">
            <option :value="''" disabled>请选择产品分类</option>
            <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
          </select>
          <div v-if="!categories.length" class="small text-muted mt-1">
            暂无分类, 请先到
            <router-link to="/admin/product-categories">产品分类</router-link>
            页面创建
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">简介</label>
          <textarea v-model="form.description" class="form-control" rows="2"></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">详细内容</label>
          <RichEditor v-model="form.detail" />
        </div>
        <div class="mb-3">
          <label class="form-label">产品图片</label>
          <input type="file" class="form-control" accept="image/*" @change="handleFile">
          <img v-if="form.image" :src="imgUrl(form.image)" class="mt-2 rounded" height="100" alt="">
        </div>
        <div class="mb-3">
          <label class="form-label">价格</label>
          <input v-model="form.price" type="number" step="0.01" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">排序</label>
          <input v-model.number="form.sort_order" type="number" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">状态</label>
          <select v-model.number="form.status" class="form-select">
            <option :value="1">上架</option>
            <option :value="0">下架</option>
          </select>
        </div>
        <button class="btn btn-primary me-2" @click="save">保存</button>
        <button class="btn btn-secondary" @click="router.back()">返回</button>
      </div>
    </div>
  </div>
</template>
