<template>
  <div class="vh-100 d-flex flex-column">
    <NavBar />
    <ThemeSwitcher />
    <RouterView class="flex-grow-1" />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
</script>
