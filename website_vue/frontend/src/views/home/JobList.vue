<script setup>
import { ref, onMounted, computed } from 'vue'
import { getJobs } from '@/api/job'
import { useSiteStore } from '@/stores'

const siteStore = useSiteStore()
const s = computed(() => siteStore.settings || {})
const list = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = 10

const load = async () => {
  const res = await getJobs({ page: page.value, pageSize, status: 1 }).catch(() => null)
  list.value = res?.data?.list || []
  total.value = res?.data?.total || 0
}

onMounted(load)

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))

const changePage = (p) => {
  if (p < 1 || p > totalPages.value) return
  page.value = p
  load()
}
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <div class="crumb mb-3">
          <router-link to="/">首页</router-link>
          <i class="fa-solid fa-chevron-right mx-2 small"></i>
          <span>人才招聘</span>
        </div>
        <h1>{{ s.jobs_hero_title || '人才招聘' }}</h1>
        <p class="mt-3 mb-0 opacity-75" style="max-width:640px;">
          {{ s.jobs_hero_desc || '' }}
        </p>
      </div>
    </section>

    <section class="section-sm">
      <div class="container">
        <div class="row g-4 mb-4">
          <div class="col-md-4">
            <div class="d-flex align-items-center p-4 rounded-4"
                 style="background:var(--brand-gradient-soft);">
              <i class="fa-solid fa-heart fa-2x text-brand me-3"></i>
              <div>
                <div class="fw-bold">贴心福利</div>
                <div class="small text-muted">五险一金、带薪年假、年度体检</div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="d-flex align-items-center p-4 rounded-4"
                 style="background:var(--brand-gradient-soft);">
              <i class="fa-solid fa-graduation-cap fa-2x text-brand me-3"></i>
              <div>
                <div class="fw-bold">成长体系</div>
                <div class="small text-muted">导师带教、内训认证、晋升通道</div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="d-flex align-items-center p-4 rounded-4"
                 style="background:var(--brand-gradient-soft);">
              <i class="fa-solid fa-people-group fa-2x text-brand me-3"></i>
              <div>
                <div class="fw-bold">团队氛围</div>
                <div class="small text-muted">扁平管理、运动社团、弹性工作</div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="list.length === 0" class="text-center py-5 text-muted">
          <i class="fa-solid fa-briefcase fa-3x mb-3 opacity-50"></i>
          <p>暂无招聘职位</p>
        </div>

        <div class="row g-4">
          <div v-for="item in list" :key="item.id" class="col-md-6">
            <div class="job-card">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <div class="j-title">{{ item.title }}</div>
                  <div class="j-meta mt-2">
                    <i class="fa-solid fa-location-dot"></i>{{ item.location }}
                    <span class="ms-3"><i class="fa-solid fa-briefcase"></i>{{ item.department }}</span>
                  </div>
                </div>
                <span class="j-salary">{{ item.salary }}</span>
              </div>
              <p class="j-desc mb-2">{{ item.description }}</p>
              <div class="small mt-3 p-3 rounded-3"
                   style="background:#f8fafc; color:#475569; line-height:1.8;">
                <div class="fw-semibold mb-1 text-dark">任职要求：</div>
                <div v-html="item.requirements"></div>
              </div>
              <div class="mt-3">
                <router-link to="/contact" class="btn btn-outline-brand btn-sm">
                  <i class="fa-solid fa-paper-plane me-1"></i>投递简历
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <nav class="mt-5" v-if="totalPages > 1">
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
      </div>
    </section>
  </div>
</template>
