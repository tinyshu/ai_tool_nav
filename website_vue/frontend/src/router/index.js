import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../components/PublicLayout.vue'),
    children: [
      { path: '', meta: { title: '首页' }, component: () => import('../views/home/Home.vue') },
      { path: 'about', meta: { title: '关于我们' }, component: () => import('../views/home/About.vue') },
      { path: 'products', meta: { title: '产品中心' }, component: () => import('../views/home/ProductList.vue') },
      { path: 'product/:id', meta: { title: '产品详情' }, component: () => import('../views/home/ProductDetail.vue') },
      { path: 'news', meta: { title: '新闻资讯' }, component: () => import('../views/home/NewsList.vue') },
      { path: 'news/:id', meta: { title: '新闻详情' }, component: () => import('../views/home/NewsDetail.vue') },
      { path: 'jobs', meta: { title: '人才招聘' }, component: () => import('../views/home/JobList.vue') },
      { path: 'contact', meta: { title: '联系我们' }, component: () => import('../views/home/Contact.vue') }
    ]
  },
  { path: '/admin/login', meta: { title: '登录' }, component: () => import('../views/admin/Login.vue') },
  {
    path: '/admin',
    component: () => import('../views/admin/Layout.vue'),
    redirect: '/admin/dashboard',
    children: [
      { path: 'dashboard', meta: { title: '仪表盘' }, component: () => import('../views/admin/Dashboard.vue') },
      { path: 'site', meta: { title: '网站配置' }, component: () => import('../views/admin/SiteSetting.vue') },
      { path: 'banners', meta: { title: '轮播管理' }, component: () => import('../views/admin/BannerList.vue') },
      { path: 'banners/form', meta: { title: '新增轮播' }, component: () => import('../views/admin/BannerForm.vue') },
      { path: 'banners/form/:id', meta: { title: '编辑轮播' }, component: () => import('../views/admin/BannerForm.vue') },
      { path: 'company', meta: { title: '公司信息' }, component: () => import('../views/admin/CompanyList.vue') },
      { path: 'company/form', meta: { title: '新增公司信息' }, component: () => import('../views/admin/CompanyForm.vue') },
      { path: 'company/form/:id', meta: { title: '编辑公司信息' }, component: () => import('../views/admin/CompanyForm.vue') },
      { path: 'product-categories', meta: { title: '产品分类' }, component: () => import('../views/admin/ProductCategoryList.vue') },
      { path: 'products', meta: { title: '产品管理' }, component: () => import('../views/admin/ProductList.vue') },
      { path: 'products/form', meta: { title: '新增产品' }, component: () => import('../views/admin/ProductForm.vue') },
      { path: 'products/form/:id', meta: { title: '编辑产品' }, component: () => import('../views/admin/ProductForm.vue') },
      { path: 'news', meta: { title: '新闻管理' }, component: () => import('../views/admin/NewsList.vue') },
      { path: 'news/form', meta: { title: '新增新闻' }, component: () => import('../views/admin/NewsForm.vue') },
      { path: 'news/form/:id', meta: { title: '编辑新闻' }, component: () => import('../views/admin/NewsForm.vue') },
      { path: 'jobs', meta: { title: '招聘管理' }, component: () => import('../views/admin/JobList.vue') },
      { path: 'jobs/form', meta: { title: '新增招聘' }, component: () => import('../views/admin/JobForm.vue') },
      { path: 'jobs/form/:id', meta: { title: '编辑招聘' }, component: () => import('../views/admin/JobForm.vue') },
      { path: 'messages', meta: { title: '留言管理' }, component: () => import('../views/admin/MessageList.vue') },
      { path: 'links', meta: { title: '友情链接' }, component: () => import('../views/admin/LinkList.vue') },
      { path: 'links/form', meta: { title: '新增链接' }, component: () => import('../views/admin/LinkForm.vue') },
      { path: 'links/form/:id', meta: { title: '编辑链接' }, component: () => import('../views/admin/LinkForm.vue') },
      { path: 'admins', meta: { title: '管理员' }, component: () => import('../views/admin/AdminList.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
