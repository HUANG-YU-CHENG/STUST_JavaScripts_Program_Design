<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { store } from './store'

onMounted(async () => {
  await store.fetchPosts()
})
</script>

<template>
  <Header />
  <RouterView />
  <Footer />
</template>

