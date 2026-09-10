<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useSiteStore } from '@/stores'
import { login } from '@/api/auth'
import { getSettings } from '@/api/site'
import { clearThemeForAdmin } from '@/themes/applyTheme'

const router = useRouter()
const userStore = useUserStore()
const siteStore = useSiteStore()
const form = ref({ username: '', password: '' })
const loading = ref(false)
const errorMsg = ref('')

const siteName = computed(() => siteStore.settings.site_name || '企业官网')
const siteIcon = computed(() => siteStore.settings.site_icon || 'fa-building')

onMounted(async () => {
  clearThemeForAdmin()
  try {
    const s = await getSettings()
    if (s?.code === 200) siteStore.setSettings(s.data || {})
  } catch (e) {}
})

const handleLogin = async () => {
  if (!form.value.username || !form.value.password) {
    errorMsg.value = '请输入用户名和密码'
    return
  }
  loading.value = true
  errorMsg.value = ''
  try {
    const res = await login(form.value)
    if (res.code === 200) {
      userStore.setToken(res.data.token)
      router.push('/admin/dashboard')
    } else {
      errorMsg.value = res.message || '登录失败'
    }
  } catch (e) {
    errorMsg.value = '网络错误，请稍后再试'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="admin-login">
    <div class="login-card">
      <div class="text-center mb-4">
        <div class="brand-mark"><i class="fa-solid" :class="siteIcon"></i></div>
        <h4 class="fw-bold mb-1" style="color:var(--brand-dark);">{{ siteName }} · 管理后台</h4>
        <p class="text-muted small mb-0">欢迎登录，请输入您的账号信息</p>
      </div>

      <div v-if="errorMsg" class="alert alert-danger py-2 small">
        <i class="fa-solid fa-circle-exclamation me-1"></i>{{ errorMsg }}
      </div>

      <div class="mb-3">
        <label class="form-label small fw-semibold">用户名</label>
        <div class="position-relative">
          <i class="fa-solid fa-user position-absolute"
             style="left:14px; top:50%; transform:translateY(-50%); color:#94a3b8;"></i>
          <input v-model="form.username" type="text" class="form-control ps-5"
                 placeholder="admin" @keyup.enter="handleLogin">
        </div>
      </div>

      <div class="mb-4">
        <label class="form-label small fw-semibold">密码</label>
        <div class="position-relative">
          <i class="fa-solid fa-lock position-absolute"
             style="left:14px; top:50%; transform:translateY(-50%); color:#94a3b8;"></i>
          <input v-model="form.password" type="password" class="form-control ps-5"
                 placeholder="••••••" @keyup.enter="handleLogin">
        </div>
      </div>

      <button class="btn btn-brand w-100" :disabled="loading" @click="handleLogin">
        <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
        <i v-else class="fa-solid fa-arrow-right-to-bracket me-2"></i>
        登 录
      </button>

      <div class="text-center mt-4 small text-muted">
        默认账号：<code>admin</code> / <code>admin123</code>
      </div>
      <div class="text-center mt-3">
        <router-link to="/" class="small text-muted">
          <i class="fa-solid fa-arrow-left me-1"></i>返回官网
        </router-link>
      </div>
    </div>
  </div>
</template>
