<script setup>
import { ref, onMounted } from 'vue'
import { getAdmins, createAdmin, deleteAdmin } from '@/api/admin'

const list = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = 10
const form = ref({ username: '', password: '', nickname: '', role: 'editor' })
const showForm = ref(false)

const load = async () => {
  const res = await getAdmins({ page: page.value, pageSize }).catch(() => ({ data: { list: [], total: 0 } }))
  list.value = res.data?.list || []
  total.value = res.data?.total || 0
}

onMounted(load)

const remove = async (id) => {
  if (!confirm('确定删除吗？')) return
  await deleteAdmin(id)
  load()
}

const save = async () => {
  const res = await createAdmin(form.value)
  if (res.code === 200) {
    alert('创建成功')
    showForm.value = false
    form.value = { username: '', password: '', nickname: '', role: 'editor' }
    load()
  } else {
    alert(res.message || '创建失败')
  }
}

const changePage = (p) => { page.value = p; load() }
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="m-0">管理员</h4>
      <button class="btn btn-primary" @click="showForm = true">新增管理员</button>
    </div>
    <table class="table table-bordered bg-white">
      <thead class="table-light">
        <tr><th>ID</th><th>用户名</th><th>昵称</th><th>角色</th><th>操作</th></tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.nickname }}</td>
          <td>{{ item.role }}</td>
          <td>
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
    <div class="modal d-block" tabindex="-1" v-if="showForm" style="background: rgba(0,0,0,0.5);">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">新增管理员</h5>
            <button type="button" class="btn-close" @click="showForm = false"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3"><label class="form-label">用户名</label><input v-model="form.username" class="form-control"></div>
            <div class="mb-3"><label class="form-label">密码</label><input v-model="form.password" type="password" class="form-control"></div>
            <div class="mb-3"><label class="form-label">昵称</label><input v-model="form.nickname" class="form-control"></div>
            <div class="mb-3">
              <label class="form-label">角色</label>
              <select v-model="form.role" class="form-select">
                <option value="admin">管理员</option>
                <option value="editor">编辑</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="showForm = false">取消</button>
            <button class="btn btn-primary" @click="save">保存</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
