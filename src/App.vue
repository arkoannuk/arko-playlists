<template>
  <div class="d-flex flex-column">
    <NavBar />
    <ThemeSwitcher />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
</script>
