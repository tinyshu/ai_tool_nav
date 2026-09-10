<script setup>
import { ref, onMounted } from 'vue'
import {
  getProductCategories,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory
} from '@/api/productCategory'

const list = ref([])
const loading = ref(false)

const showModal = ref(false)
const editing = ref(null)
const form = ref({ name: '', sort_order: 0, status: 1 })

const load = async () => {
  loading.value = true
  const res = await getProductCategories().catch(() => null)
  list.value = Array.isArray(res?.data) ? res.data : (res?.data?.list || [])
  loading.value = false
}

onMounted(load)

const openCreate = () => {
  editing.value = null
  form.value = { name: '', sort_order: 0, status: 1 }
  showModal.value = true
}

const openEdit = (row) => {
  editing.value = row
  form.value = { name: row.name, sort_order: row.sort_order || 0, status: row.status }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editing.value = null
}

const save = async () => {
  if (!form.value.name.trim()) {
    alert('请输入分类名称')
    return
  }
  const payload = {
    name: form.value.name.trim(),
    sort_order: Number(form.value.sort_order) || 0,
    status: Number(form.value.status)
  }
  const res = editing.value
    ? await updateProductCategory(editing.value.id, payload)
    : await createProductCategory(payload)
  if (res.code === 200) {
    closeModal()
    load()
  } else {
    alert(res.message || '保存失败')
  }
}

const remove = async (row) => {
  if (row.product_count > 0) {
    alert(`该分类下仍有 ${row.product_count} 个产品, 请先移除或修改这些产品的分类`)
    return
  }
  if (!confirm(`确定删除分类「${row.name}」吗？`)) return
  const res = await deleteProductCategory(row.id)
  if (res.code === 200) {
    load()
  } else {
    alert(res.message || '删除失败')
  }
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="mb-1">产品分类</h4>
        <div class="small text-muted">管理产品所属分类, 录入/编辑产品时可直接选择</div>
      </div>
      <button class="btn btn-brand" @click="openCreate">
        <i class="fa-solid fa-plus me-1"></i>新增分类
      </button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th style="width:80px;">ID</th>
          <th>分类名称</th>
          <th style="width:120px;">排序</th>
          <th style="width:140px;">产品数量</th>
          <th style="width:100px;">状态</th>
          <th style="width:160px;">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in list" :key="row.id">
          <td>{{ row.id }}</td>
          <td class="fw-semibold">
            <i class="fa-solid fa-folder me-2" style="color:var(--brand-primary);"></i>
            {{ row.name }}
          </td>
          <td>{{ row.sort_order }}</td>
          <td>
            <span class="badge bg-primary bg-opacity-10 text-primary">
              <i class="fa-solid fa-box me-1"></i>{{ row.product_count || 0 }}
            </span>
          </td>
          <td>
            <span v-if="row.status" class="badge bg-success bg-opacity-10 text-success">启用</span>
            <span v-else class="badge bg-secondary bg-opacity-10 text-secondary">禁用</span>
          </td>
          <td>
            <button class="btn btn-sm btn-outline-primary me-1" @click="openEdit(row)">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="remove(row)">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
        <tr v-if="!loading && list.length === 0">
          <td colspan="6" class="text-center text-muted py-4">暂无分类, 点击右上角「新增分类」创建</td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="showModal" class="cat-modal-backdrop" @click.self="closeModal">
      <div class="cat-modal">
        <div class="cat-modal-header">
          <h5 class="mb-0">{{ editing ? '编辑分类' : '新增分类' }}</h5>
          <button class="btn-close" @click="closeModal"></button>
        </div>
        <div class="cat-modal-body">
          <div class="mb-3">
            <label class="form-label">分类名称 <span class="text-danger">*</span></label>
            <input v-model="form.name" class="form-control" placeholder="例如：球类用品" maxlength="100">
          </div>
          <div class="mb-3">
            <label class="form-label">排序 <small class="text-muted">(数字越小越靠前)</small></label>
            <input v-model.number="form.sort_order" type="number" class="form-control">
          </div>
          <div class="mb-0">
            <label class="form-label">状态</label>
            <select v-model.number="form.status" class="form-select">
              <option :value="1">启用</option>
              <option :value="0">禁用</option>
            </select>
          </div>
        </div>
        <div class="cat-modal-footer">
          <button class="btn btn-secondary me-2" @click="closeModal">取消</button>
          <button class="btn btn-brand" @click="save">
            <i class="fa-solid fa-check me-1"></i>保存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cat-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  animation: fade-in 0.15s ease;
}

.cat-modal {
  background: #fff;
  width: 100%;
  max-width: 480px;
  border-radius: 14px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  animation: pop-in 0.2s ease;
}

.cat-modal-header {
  padding: 18px 22px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cat-modal-body {
  padding: 22px;
}

.cat-modal-footer {
  padding: 14px 22px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  background: #f8fafc;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes pop-in {
  from { opacity: 0; transform: translateY(-8px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
