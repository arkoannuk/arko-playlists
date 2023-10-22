<template>
  <nav class="navbar navbar-expand-md bg-body-secondary border-bottom">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" :to="{ name: 'Home' }"
        ><span
          v-if="!isNavbarCollapsed"
          data-bs-target="#navbar"
          data-bs-toggle="collapse"
          >Playlists</span
        >
        <span v-else>Playlists</span>
      </RouterLink>
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
          <RouterLink
            class="nav-link py-0"
            active-class="active"
            :to="{ name: 'Create' }"
            v-if="user"
            ><span data-bs-target="#navbar" data-bs-toggle="collapse" class="d-flex py-2"
              >Create Playlist</span
            ></RouterLink
          >
          <RouterLink
            class="nav-link py-0"
            active-class="active"
            :to="{ name: 'UserPlaylists' }"
            v-if="user"
            ><span data-bs-target="#navbar" data-bs-toggle="collapse" class="d-flex py-2"
              >My Playlists</span
            ></RouterLink
          >
          <div
            type="button"
            class="nav-link py-0"
            active-class="active"
            @click="handleClick"
            v-if="user"
          >
            <span data-bs-target="#navbar" data-bs-toggle="collapse" class="d-flex py-2"
              >Logout</span
            >
          </div>
          <RouterLink
            class="nav-link py-0"
            active-class="active"
            :to="{ name: 'Login' }"
            v-if="!user"
            ><span data-bs-target="#navbar" data-bs-toggle="collapse" class="d-flex py-2"
              >Login</span
            ></RouterLink
          >
          <RouterLink
            class="nav-link py-0"
            active-class="active"
            :to="{ name: 'Signup' }"
            v-if="!user"
            ><span data-bs-target="#navbar" data-bs-toggle="collapse" class="d-flex py-2"
              >Signup</span
            ></RouterLink
          >
        </div>
      </div>
    </div>
  </nav>
  <RouterLink
    v-if="user"
    :to="{}"
    class="text-decoration-none form-text text-center"
    style="pointer-events: none"
  >
    Logged in as <span class="fw-bold">{{ user.displayName }}</span>
  </RouterLink>
</template>

<script setup>
import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const { user } = getUser()
const router = useRouter()
const { logout } = useLogout()
const isNavbarCollapsed = ref(true)

onMounted(() => {
  const navbar = document.getElementById('navbar')
  if (navbar) {
    navbar.addEventListener('shown.bs.collapse', () => {
      isNavbarCollapsed.value = false
    })
    navbar.addEventListener('hidden.bs.collapse', () => {
      isNavbarCollapsed.value = true
    })
  }
})

async function handleClick() {
  await logout()
  // console.log('user logged out')
  router.push({ name: 'Login' })
}
</script>
