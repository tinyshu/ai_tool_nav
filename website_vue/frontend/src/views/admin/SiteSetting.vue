<script setup>
import { ref, onMounted } from 'vue'
import { getSettings, updateSettings } from '@/api/site'
import { uploadFile } from '@/api/upload'
import { useSiteStore } from '@/stores'
import { imgUrl } from '@/utils/url'
import { THEME_LIST } from '@/themes'

const siteStore = useSiteStore()
const settings = ref({})
const loading = ref(false)
const uploadingKey = ref('')
const savedTheme = ref('default')

const themeNameOf = (id) => THEME_LIST.find(t => t.id === id)?.name || id

const defaultKeys = {
  site_name: '', site_icon: 'fa-building', site_icp: '',
  seo_title: '', seo_keywords: '', seo_description: '',
  contact_phone: '', contact_email: '', contact_address: '',
  home_badge: '', home_slogan: '', home_about_image: '',
  home_experience_num: '', home_experience_label: '',
  home_products_title: '', home_products_desc: '',
  home_cta_title: '', home_cta_desc: '',
  feature_1_icon: '', feature_1_title: '', feature_1_desc: '',
  feature_2_icon: '', feature_2_title: '', feature_2_desc: '',
  feature_3_icon: '', feature_3_title: '', feature_3_desc: '',
  feature_4_icon: '', feature_4_title: '', feature_4_desc: '',
  stat_1_num: '', stat_1_label: '', stat_1_icon: '',
  stat_2_num: '', stat_2_label: '', stat_2_icon: '',
  stat_3_num: '', stat_3_label: '', stat_3_icon: '',
  stat_4_num: '', stat_4_label: '', stat_4_icon: '',
  about_hero_title: '', about_hero_desc: '',
  about_cta_title: '', about_cta_desc: '',
  about_cover_1: '', about_cover_2: '', about_cover_3: '',
  site_theme: 'default',
  products_hero_title: '', products_hero_desc: '',
  news_hero_title: '', news_hero_desc: '',
  jobs_hero_title: '', jobs_hero_desc: '',
  contact_hero_title: '', contact_hero_desc: ''
}

const aboutCovers = [
  { key: 'about_cover_1', label: '配图1 · 关于我们' },
  { key: 'about_cover_2', label: '配图2 · 企业文化' },
  { key: 'about_cover_3', label: '配图3 · 发展历程等' }
]

onMounted(async () => {
  const res = await getSettings().catch(() => ({ data: {} }))
  settings.value = { ...defaultKeys, ...(res.data || {}) }
  if (!settings.value.site_theme) settings.value.site_theme = 'default'
  savedTheme.value = settings.value.site_theme
})

const normalizeUploadUrl = (url) => {
  if (!url) return ''
  return url.startsWith('/') ? url.slice(1) : url
}

const handleCoverUpload = async (key, e) => {
  const file = e.target.files?.[0]
  e.target.value = ''
  if (!file) return
  uploadingKey.value = key
  try {
    const res = await uploadFile(file)
    if (res.code === 200 && res.data?.url) {
      settings.value[key] = normalizeUploadUrl(res.data.url)
    } else {
      alert(res.message || '上传失败')
    }
  } catch (err) {
    alert('上传失败，请重试')
  } finally {
    uploadingKey.value = ''
  }
}

const clearCover = (key) => {
  settings.value[key] = ''
}

const save = async () => {
  loading.value = true
  try {
    const res = await updateSettings(settings.value)
    loading.value = false
    if (res.code === 200) {
      siteStore.setSettings({ ...settings.value })
      savedTheme.value = settings.value.site_theme || 'default'
      alert('保存成功')
    } else {
      alert(res.message || '保存失败')
    }
  } catch (e) {
    loading.value = false
    const msg = e?.response?.data?.message || e?.message || '保存失败'
    alert(msg)
  }
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="mb-0">网站配置</h4>
      <button class="btn btn-primary" :disabled="loading" @click="save">
        <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>保存全部配置
      </button>
    </div>

    <div class="card mb-4">
      <div class="card-header fw-semibold">网站风格模版</div>
      <div class="card-body">
        <p class="text-muted small mb-3">
          仅影响前台配色，布局不变；后台保持现有风格。保存后请打开前台查看效果。
          当前已保存生效：<strong>{{ themeNameOf(savedTheme) }}</strong>
          <span v-if="settings.site_theme !== savedTheme" class="text-warning ms-2">（有未保存的更改）</span>
        </p>
        <div class="row g-3">
          <div v-for="t in THEME_LIST" :key="t.id" class="col-md-6 col-lg-3">
            <label class="theme-card border rounded-3 p-3 h-100 d-block"
                   :class="{ 'border-primary shadow-sm': settings.site_theme === t.id }"
                   style="cursor:pointer;">
              <div class="d-flex align-items-center gap-2 mb-2">
                <input type="radio" class="form-check-input m-0" :value="t.id" v-model="settings.site_theme">
                <span class="fw-semibold">{{ t.name }}</span>
              </div>
              <div class="d-flex gap-1 mb-2">
                <span v-for="(c, i) in t.swatch" :key="i"
                      class="rounded"
                      :style="{ width: '28px', height: '12px', background: c }"></span>
              </div>
              <div class="small text-muted">{{ t.desc }}</div>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-header fw-semibold">基础信息 / SEO / 联系方式</div>
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">网站名称</label>
            <input v-model="settings.site_name" class="form-control">
          </div>
          <div class="col-md-6">
            <label class="form-label">站点图标（Font Awesome 类名，如 fa-microchip）</label>
            <input v-model="settings.site_icon" class="form-control" placeholder="fa-building">
          </div>
          <div class="col-md-12">
            <label class="form-label">SEO标题</label>
            <input v-model="settings.seo_title" class="form-control">
          </div>
          <div class="col-md-12">
            <label class="form-label">SEO关键词</label>
            <input v-model="settings.seo_keywords" class="form-control">
          </div>
          <div class="col-md-12">
            <label class="form-label">SEO描述</label>
            <textarea v-model="settings.seo_description" class="form-control" rows="2"></textarea>
          </div>
          <div class="col-md-4">
            <label class="form-label">联系电话</label>
            <input v-model="settings.contact_phone" class="form-control">
          </div>
          <div class="col-md-4">
            <label class="form-label">联系邮箱</label>
            <input v-model="settings.contact_email" class="form-control">
          </div>
          <div class="col-md-4">
            <label class="form-label">备案号</label>
            <input v-model="settings.site_icp" class="form-control">
          </div>
          <div class="col-md-12">
            <label class="form-label">公司地址</label>
            <input v-model="settings.contact_address" class="form-control">
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-header fw-semibold">首页文案</div>
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-4">
            <label class="form-label">轮播角标</label>
            <input v-model="settings.home_badge" class="form-control">
          </div>
          <div class="col-md-8">
            <label class="form-label">轮播副标题</label>
            <input v-model="settings.home_slogan" class="form-control">
          </div>
          <div class="col-md-6">
            <label class="form-label">首页「关于我们」配图</label>
            <input type="file" class="form-control" accept="image/*"
                   :disabled="uploadingKey === 'home_about_image'"
                   @change="handleCoverUpload('home_about_image', $event)">
            <div v-if="settings.home_about_image" class="mt-2 d-flex align-items-start gap-2">
              <img :src="imgUrl(settings.home_about_image)" alt="首页配图"
                   style="height:80px;object-fit:cover;border-radius:8px;">
              <button type="button" class="btn btn-sm btn-outline-secondary" @click="clearCover('home_about_image')">清除</button>
            </div>
          </div>
          <div class="col-md-3">
            <label class="form-label">经验数字</label>
            <input v-model="settings.home_experience_num" class="form-control">
          </div>
          <div class="col-md-3">
            <label class="form-label">经验文案</label>
            <input v-model="settings.home_experience_label" class="form-control">
          </div>
          <div class="col-md-4">
            <label class="form-label">热门产品标题</label>
            <input v-model="settings.home_products_title" class="form-control">
          </div>
          <div class="col-md-8">
            <label class="form-label">热门产品描述</label>
            <input v-model="settings.home_products_desc" class="form-control">
          </div>
          <div class="col-md-6">
            <label class="form-label">底部 CTA 标题</label>
            <input v-model="settings.home_cta_title" class="form-control">
          </div>
          <div class="col-md-6">
            <label class="form-label">底部 CTA 描述</label>
            <input v-model="settings.home_cta_desc" class="form-control">
          </div>
        </div>

        <hr class="my-4">
        <h6 class="mb-3">首页特色（4 项）</h6>
        <div v-for="i in 4" :key="'f'+i" class="row g-2 mb-3">
          <div class="col-md-2">
            <label class="form-label small">图标{{ i }}</label>
            <input v-model="settings['feature_' + i + '_icon']" class="form-control form-control-sm">
          </div>
          <div class="col-md-3">
            <label class="form-label small">标题{{ i }}</label>
            <input v-model="settings['feature_' + i + '_title']" class="form-control form-control-sm">
          </div>
          <div class="col-md-7">
            <label class="form-label small">描述{{ i }}</label>
            <input v-model="settings['feature_' + i + '_desc']" class="form-control form-control-sm">
          </div>
        </div>

        <hr class="my-4">
        <h6 class="mb-3">首页统计（4 项）</h6>
        <div v-for="i in 4" :key="'s'+i" class="row g-2 mb-3">
          <div class="col-md-2">
            <label class="form-label small">数字{{ i }}</label>
            <input v-model="settings['stat_' + i + '_num']" class="form-control form-control-sm">
          </div>
          <div class="col-md-4">
            <label class="form-label small">标签{{ i }}</label>
            <input v-model="settings['stat_' + i + '_label']" class="form-control form-control-sm">
          </div>
          <div class="col-md-3">
            <label class="form-label small">图标{{ i }}</label>
            <input v-model="settings['stat_' + i + '_icon']" class="form-control form-control-sm">
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-header fw-semibold">关于页正文配图</div>
      <div class="card-body">
        <p class="text-muted small mb-3">
          对应前台 <code>/about</code> 正文区块旁图片：关于我们、企业文化、发展历程（及后续条目循环使用）。选择图片上传后请点击「保存全部配置」。
        </p>
        <div class="row g-3">
          <div v-for="item in aboutCovers" :key="item.key" class="col-md-4">
            <label class="form-label">{{ item.label }}</label>
            <input type="file" class="form-control" accept="image/*"
                   :disabled="uploadingKey === item.key"
                   @change="handleCoverUpload(item.key, $event)">
            <div v-if="uploadingKey === item.key" class="small text-muted mt-1">上传中…</div>
            <div v-if="settings[item.key]" class="mt-2">
              <img :src="imgUrl(settings[item.key])" :alt="item.label"
                   class="w-100 rounded border"
                   style="height:140px;object-fit:cover;">
              <button type="button" class="btn btn-sm btn-outline-secondary mt-2"
                      @click="clearCover(item.key)">清除图片</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-header fw-semibold">各频道页顶部文案 / CTA</div>
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">关于我们 · 标题</label>
            <input v-model="settings.about_hero_title" class="form-control">
          </div>
          <div class="col-md-6">
            <label class="form-label">关于我们 · 描述</label>
            <input v-model="settings.about_hero_desc" class="form-control">
          </div>
          <div class="col-md-6">
            <label class="form-label">关于我们 · 底部 CTA 标题</label>
            <input v-model="settings.about_cta_title" class="form-control">
          </div>
          <div class="col-md-6">
            <label class="form-label">关于我们 · 底部 CTA 描述</label>
            <input v-model="settings.about_cta_desc" class="form-control">
          </div>
          <div class="col-md-6">
            <label class="form-label">产品中心 · 标题</label>
            <input v-model="settings.products_hero_title" class="form-control">
          </div>
          <div class="col-md-6">
            <label class="form-label">产品中心 · 描述</label>
            <input v-model="settings.products_hero_desc" class="form-control">
          </div>
          <div class="col-md-6">
            <label class="form-label">新闻资讯 · 标题</label>
            <input v-model="settings.news_hero_title" class="form-control">
          </div>
          <div class="col-md-6">
            <label class="form-label">新闻资讯 · 描述</label>
            <input v-model="settings.news_hero_desc" class="form-control">
          </div>
          <div class="col-md-6">
            <label class="form-label">人才招聘 · 标题</label>
            <input v-model="settings.jobs_hero_title" class="form-control">
          </div>
          <div class="col-md-6">
            <label class="form-label">人才招聘 · 描述</label>
            <input v-model="settings.jobs_hero_desc" class="form-control">
          </div>
          <div class="col-md-6">
            <label class="form-label">联系我们 · 标题</label>
            <input v-model="settings.contact_hero_title" class="form-control">
          </div>
          <div class="col-md-6">
            <label class="form-label">联系我们 · 描述</label>
            <input v-model="settings.contact_hero_desc" class="form-control">
          </div>
        </div>
      </div>
    </div>

    <button class="btn btn-primary" :disabled="loading" @click="save">
      <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>保存全部配置
    </button>
  </div>
</template>
