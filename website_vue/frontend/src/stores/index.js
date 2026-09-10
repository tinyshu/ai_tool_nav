import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('admin_token') || '')
  const userInfo = ref(null)

  function setToken(t) {
    token.value = t
    localStorage.setItem('admin_token', t)
  }

  function clearToken() {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('admin_token')
  }

  return { token, userInfo, setToken, clearToken }
})

export const useSiteStore = defineStore('site', () => {
  const settings = ref({})
  function setSettings(data) {
    settings.value = data
  }
  return { settings, setSettings }
})
