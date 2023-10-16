<template>
  <nav class="navbar navbar-expand-md bg-body-secondary border-bottom">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" :to="{ name: 'Home' }">Arko Playlists</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar"
        aria-controls="navbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar">
        <div class="navbar-nav ms-auto gap-0 gap-md-3">
          <RouterLink class="nav-link" active-class="active" :to="{ name: 'Home' }"
            >Home</RouterLink
          >
          <RouterLink
            class="nav-link"
            active-class="active"
            :to="{ name: 'Create' }"
            v-if="user"
            >Create Playlist</RouterLink
          >
          <div class="nav-link" active-class="active" @click="handleClick" v-if="user">
            Logout
          </div>
          <RouterLink
            class="nav-link"
            active-class="active"
            :to="{ name: 'Login' }"
            v-if="!user"
            >Login</RouterLink
          >
          <RouterLink
            class="nav-link"
            active-class="active"
            :to="{ name: 'Signup' }"
            v-if="!user"
            >Signup</RouterLink
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'

const { user } = getUser()
const router = useRouter()
const { logout } = useLogout()

async function handleClick() {
  await logout()
  console.log('user logged out')
  router.push({ name: 'Home' })
}
</script>
