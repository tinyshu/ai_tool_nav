<script setup>
import { ref, computed } from 'vue'
import { useSiteStore } from '@/stores'
import { createMessage } from '@/api/message'

const siteStore = useSiteStore()
const form = ref({ name: '', phone: '', email: '', content: '' })
const successMsg = ref('')
const errorMsg = ref('')
const loading = ref(false)

const phone = computed(() => siteStore.settings.contact_phone || '')
const email = computed(() => siteStore.settings.contact_email || '')
const address = computed(() => siteStore.settings.contact_address || '')
const s = computed(() => siteStore.settings || {})

const submit = async () => {
  errorMsg.value = ''
  successMsg.value = ''
  if (!form.value.name || !form.value.content) {
    errorMsg.value = '请填写姓名和留言内容'
    return
  }
  loading.value = true
  try {
    const res = await createMessage(form.value)
    if (res.code === 200) {
      successMsg.value = '留言提交成功，我们会尽快回复您！'
      form.value = { name: '', phone: '', email: '', content: '' }
    } else {
      errorMsg.value = res.message || '提交失败'
    }
  } catch (e) {
    errorMsg.value = '网络错误，请稍后再试'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <div class="crumb mb-3">
          <router-link to="/">首页</router-link>
          <i class="fa-solid fa-chevron-right mx-2 small"></i>
          <span>联系我们</span>
        </div>
        <h1>{{ s.contact_hero_title || '联系我们' }}</h1>
        <p class="mt-3 mb-0 opacity-75">{{ s.contact_hero_desc || '' }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="row g-4 mb-5">
          <div class="col-md-4">
            <div class="bg-white p-4 rounded-4 h-100 text-center"
                 style="box-shadow: var(--brand-shadow-sm);">
              <div class="d-inline-flex align-items-center justify-content-center mb-3"
                   style="width:64px;height:64px;border-radius:18px;background:var(--brand-gradient);color:#fff;font-size:1.5rem;">
                <i class="fa-solid fa-phone"></i>
              </div>
              <h6 class="fw-bold">电话咨询</h6>
              <p class="text-muted mb-2">工作时间 09:00 - 18:00</p>
              <a :href="'tel:' + phone" class="fw-semibold text-brand" style="font-size:1.15rem;">{{ phone }}</a>
            </div>
          </div>
          <div class="col-md-4">
            <div class="bg-white p-4 rounded-4 h-100 text-center"
                 style="box-shadow: var(--brand-shadow-sm);">
              <div class="d-inline-flex align-items-center justify-content-center mb-3"
                   style="width:64px;height:64px;border-radius:18px;background:var(--brand-gradient);color:#fff;font-size:1.5rem;">
                <i class="fa-solid fa-envelope"></i>
              </div>
              <h6 class="fw-bold">邮件联系</h6>
              <p class="text-muted mb-2">我们会在 24 小时内回复</p>
              <a :href="'mailto:' + email" class="fw-semibold text-brand" style="font-size:1.05rem;">{{ email }}</a>
            </div>
          </div>
          <div class="col-md-4">
            <div class="bg-white p-4 rounded-4 h-100 text-center"
                 style="box-shadow: var(--brand-shadow-sm);">
              <div class="d-inline-flex align-items-center justify-content-center mb-3"
                   style="width:64px;height:64px;border-radius:18px;background:var(--brand-gradient);color:#fff;font-size:1.5rem;">
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <h6 class="fw-bold">公司地址</h6>
              <p class="text-muted mb-2">欢迎莅临参观洽谈</p>
              <div class="fw-semibold" style="color:var(--brand-dark);">{{ address }}</div>
            </div>
          </div>
        </div>

        <div class="row g-5 align-items-stretch">
          <div class="col-lg-5">
            <div class="rounded-4 p-4 p-md-5 text-white h-100"
                 style="background: linear-gradient(135deg, var(--brand-dark) 0%, var(--brand-dark-2) 50%, var(--brand-primary-dark) 100%); position:relative; overflow:hidden;">
              <div style="position:absolute; inset:0; background: radial-gradient(400px 300px at 80% 20%, var(--brand-glow), transparent 60%);"></div>
              <div style="position:relative;">
                <h3 class="fw-bold mb-3">让我们一起聊聊</h3>
                <p class="opacity-90 mb-4" style="line-height:1.8;">
                  {{ s.contact_hero_desc || '欢迎通过以下方式与我们取得联系，我们将尽快回复您。' }}
                </p>
                <ul class="list-unstyled">
                  <li class="d-flex align-items-center mb-3">
                    <i class="fa-solid fa-clock me-3" style="color:var(--brand-accent);"></i>
                    周一至周六 09:00 - 18:00
                  </li>
                  <li class="d-flex align-items-center mb-3">
                    <i class="fa-solid fa-handshake me-3" style="color:var(--brand-accent);"></i>
                    支持到厂参观、样品寄送
                  </li>
                  <li class="d-flex align-items-center mb-3">
                    <i class="fa-solid fa-shield-halved me-3" style="color:var(--brand-accent);"></i>
                    企业级采购专属折扣
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-7">
            <div class="bg-white rounded-4 p-4 p-md-5" style="box-shadow: var(--brand-shadow);">
              <h4 class="fw-bold mb-4"><i class="fa-solid fa-paper-plane text-brand me-2"></i>在线留言</h4>
              <div v-if="successMsg" class="alert alert-success"><i class="fa-solid fa-circle-check me-2"></i>{{ successMsg }}</div>
              <div v-if="errorMsg" class="alert alert-danger"><i class="fa-solid fa-circle-exclamation me-2"></i>{{ errorMsg }}</div>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label small fw-semibold">姓名 <span class="text-danger">*</span></label>
                  <input v-model="form.name" type="text" class="form-control" placeholder="请输入姓名">
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-semibold">电话</label>
                  <input v-model="form.phone" type="text" class="form-control" placeholder="可选">
                </div>
                <div class="col-12">
                  <label class="form-label small fw-semibold">邮箱</label>
                  <input v-model="form.email" type="email" class="form-control" placeholder="可选">
                </div>
                <div class="col-12">
                  <label class="form-label small fw-semibold">留言内容 <span class="text-danger">*</span></label>
                  <textarea v-model="form.content" class="form-control" rows="5" placeholder="请简要描述您的需求"></textarea>
                </div>
                <div class="col-12">
                  <button class="btn btn-brand px-4" :disabled="loading" @click="submit">
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                    <i v-else class="fa-solid fa-paper-plane me-2"></i>提交留言
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
