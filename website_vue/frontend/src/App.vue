<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSiteStore } from '@/stores'
import { updatePageTitle } from '@/utils/pageTitle'

const route = useRoute()
const siteStore = useSiteStore()

watch(
  () => [route.fullPath, route.meta.title, siteStore.settings],
  () => updatePageTitle(route, siteStore.settings || {}),
  { immediate: true, deep: true }
)
</script>

<template>
  <router-view />
</template>
