<script setup>
import { ref, onMounted, computed } from 'vue'
import { getMessages, replyMessage, deleteMessage } from '@/api/message'

const list = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = 10
const statusFilter = ref('')

const noteForm = ref({ id: null, reply: '', message: null })

const load = async () => {
  const params = { page: page.value, pageSize }
  if (statusFilter.value !== '') params.status = statusFilter.value
  const res = await getMessages(params).catch(() => ({ data: { list: [], total: 0 } }))
  list.value = res.data?.list || []
  total.value = res.data?.total || 0
}

onMounted(load)

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))

const changePage = (p) => {
  if (p < 1 || p > totalPages.value) return
  page.value = p
  load()
}

const changeFilter = (v) => {
  statusFilter.value = v
  page.value = 1
  load()
}

const openNote = (item) => {
  noteForm.value = { id: item.id, reply: item.reply || '', message: item }
}

const closeNote = () => {
  noteForm.value = { id: null, reply: '', message: null }
}

const saveNote = async () => {
  const res = await replyMessage(noteForm.value.id, { reply: noteForm.value.reply })
  if (res.code === 200) {
    closeNote()
    load()
  } else {
    alert(res.message || '保存失败')
  }
}

const markProcessed = async (item) => {
  if (item.status) return
  const res = await replyMessage(item.id, { reply: item.reply || '' })
  if (res.code === 200) load()
}

const remove = async (id) => {
  if (!confirm('确定删除该留言吗？删除后不可恢复。')) return
  const res = await deleteMessage(id)
  if (res.code === 200) load()
}

const formatDate = (s) => {
  if (!s) return ''
  const d = new Date(s)
  return d.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-4">
      <div>
        <h4 class="mb-1">用户留言</h4>
        <div class="small text-muted">
          前台 <b>联系我们</b> 页面提交的用户留言, 在这里查看与处理
        </div>
      </div>
      <div class="btn-group" role="group">
        <button class="btn btn-sm"
                :class="statusFilter === '' ? 'btn-brand' : 'btn-outline-brand'"
                @click="changeFilter('')">全部</button>
        <button class="btn btn-sm"
                :class="statusFilter === '0' ? 'btn-brand' : 'btn-outline-brand'"
                @click="changeFilter('0')">
          <i class="fa-regular fa-circle me-1"></i>待处理
        </button>
        <button class="btn btn-sm"
                :class="statusFilter === '1' ? 'btn-brand' : 'btn-outline-brand'"
                @click="changeFilter('1')">
          <i class="fa-solid fa-circle-check me-1"></i>已处理
        </button>
      </div>
    </div>

    <div class="alert alert-warning d-flex align-items-start gap-2 py-2 px-3 mb-4"
         style="border:1px solid #fde68a; background:#fffbeb; color:#92400e; font-size:.88rem;">
      <i class="fa-solid fa-circle-exclamation mt-1"></i>
      <div>
        <b>提示:</b> 本页的"处理备注"<strong>仅管理员内部可见</strong>, 用户在前台不会收到任何通知或看到回复内容。
        如需真正回复客户, 请通过下方展示的 <i class="fa-solid fa-phone"></i> 电话 或 <i class="fa-solid fa-envelope"></i> 邮箱 主动联系。
      </div>
    </div>

    <table class="table align-middle">
      <thead>
        <tr>
          <th style="width:60px;">ID</th>
          <th style="width:200px;">联系人</th>
          <th>留言内容 / 处理备注</th>
          <th style="width:140px;">提交时间</th>
          <th style="width:110px;">状态</th>
          <th style="width:180px;">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.id }}</td>
          <td>
            <div class="fw-semibold">
              <i class="fa-regular fa-user me-1 text-muted"></i>{{ item.name }}
            </div>
            <div v-if="item.phone" class="small">
              <a :href="'tel:' + item.phone" class="text-decoration-none">
                <i class="fa-solid fa-phone me-1 text-brand"></i>{{ item.phone }}
              </a>
            </div>
            <div v-if="item.email" class="small">
              <a :href="'mailto:' + item.email" class="text-decoration-none">
                <i class="fa-solid fa-envelope me-1 text-brand"></i>{{ item.email }}
              </a>
            </div>
          </td>
          <td>
            <div class="mb-1">
              <span class="badge bg-secondary bg-opacity-10 text-secondary me-1">留言</span>
              {{ item.content }}
            </div>
            <div v-if="item.reply" class="small p-2 rounded"
                 style="background:#ecfdf5; border-left:3px solid #10b981; color:#065f46;">
              <i class="fa-solid fa-bookmark me-1"></i>
              <b>内部备注:</b> {{ item.reply }}
            </div>
          </td>
          <td class="small text-muted">{{ formatDate(item.created_at) }}</td>
          <td>
            <span v-if="item.status" class="badge bg-success bg-opacity-10 text-success">
              <i class="fa-solid fa-circle-check me-1"></i>已处理
            </span>
            <span v-else class="badge bg-warning bg-opacity-10 text-warning">
              <i class="fa-regular fa-circle me-1"></i>待处理
            </span>
          </td>
          <td>
            <button v-if="!item.status" class="btn btn-sm btn-outline-success me-1"
                    title="标记为已处理" @click="markProcessed(item)">
              <i class="fa-solid fa-check"></i>
            </button>
            <button class="btn btn-sm btn-outline-primary me-1"
                    :title="item.reply ? '编辑内部备注' : '添加内部备注'" @click="openNote(item)">
              <i class="fa-solid fa-bookmark"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" title="删除" @click="remove(item.id)">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
        <tr v-if="list.length === 0">
          <td colspan="6" class="text-center text-muted py-4">
            <i class="fa-regular fa-comment-dots fa-2x mb-2 opacity-50 d-block"></i>
            暂无留言
          </td>
        </tr>
      </tbody>
    </table>

    <nav v-if="totalPages > 1" class="mt-3">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: page === 1 }">
          <a class="page-link" href="javascript:;" @click="changePage(page - 1)">
            <i class="fa-solid fa-chevron-left"></i>
          </a>
        </li>
        <li class="page-item" v-for="p in totalPages" :key="p" :class="{ active: p === page }">
          <a class="page-link" href="javascript:;" @click="changePage(p)">{{ p }}</a>
        </li>
        <li class="page-item" :class="{ disabled: page === totalPages }">
          <a class="page-link" href="javascript:;" @click="changePage(page + 1)">
            <i class="fa-solid fa-chevron-right"></i>
          </a>
        </li>
      </ul>
    </nav>

    <!-- Internal note modal -->
    <div v-if="noteForm.id !== null" class="msg-modal-backdrop" @click.self="closeNote">
      <div class="msg-modal">
        <div class="msg-modal-header">
          <div>
            <h5 class="mb-0">
              <i class="fa-solid fa-bookmark me-1 text-brand"></i>内部处理备注
            </h5>
            <div class="small text-muted mt-1">备注仅管理员可见, 用户不会收到</div>
          </div>
          <button class="btn-close" @click="closeNote"></button>
        </div>
        <div class="msg-modal-body">
          <div v-if="noteForm.message" class="mb-3 p-3 rounded" style="background:#f8fafc;">
            <div class="small text-muted mb-1">
              来自 <b>{{ noteForm.message.name }}</b>
              <span v-if="noteForm.message.phone" class="ms-2"><i class="fa-solid fa-phone"></i> {{ noteForm.message.phone }}</span>
              <span v-if="noteForm.message.email" class="ms-2"><i class="fa-solid fa-envelope"></i> {{ noteForm.message.email }}</span>
            </div>
            <div style="color:#334155;">{{ noteForm.message.content }}</div>
          </div>
          <label class="form-label">处理备注</label>
          <textarea v-model="noteForm.reply" class="form-control" rows="4"
                    placeholder="例如：已电话联系，发送报价单；或：已加微信，客户考虑中…"></textarea>
          <div class="small text-muted mt-2">
            <i class="fa-solid fa-info-circle me-1"></i>
            保存后该留言会被标记为 <b class="text-success">已处理</b>
          </div>
        </div>
        <div class="msg-modal-footer">
          <button class="btn btn-secondary me-2" @click="closeNote">取消</button>
          <button class="btn btn-brand" @click="saveNote">
            <i class="fa-solid fa-check me-1"></i>保存备注并标记已处理
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.msg-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  animation: fade-in 0.15s ease;
}

.msg-modal {
  background: #fff;
  width: 100%;
  max-width: 560px;
  border-radius: 14px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  animation: pop-in 0.2s ease;
}

.msg-modal-header {
  padding: 18px 22px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.msg-modal-body {
  padding: 22px;
}

.msg-modal-footer {
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
