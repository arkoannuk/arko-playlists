<template>
  <div class="vh-100 d-flex flex-column">
    <NavBar />
    <RouterView class="flex-grow-1" />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<style scoped>
.content {
  height: 100vh;
}
/* .test {
  flex: 1;
} */
</style>
