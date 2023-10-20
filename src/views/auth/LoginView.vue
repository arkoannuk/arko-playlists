<template>
  <div class="container d-flex justify-content-center pt-5 mt-5">
    <main class="form-signin w-100">
      <form @submit.prevent="handleSubmit">
        <h1 class="h3 mb-3 fw-normal">Please log in</h1>
        <div class="form-floating">
          <input
            type="email"
            class="form-control"
            id="loginEmail"
            autocomplete="email"
            placeholder=""
            required
            v-model="email"
          />
          <label for="loginEmail">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control mb-2"
            id="loginPassword"
            autocomplete="current-password"
            placeholder=""
            required
            v-model="password"
          />
          <label for="loginPassword">Password</label>
        </div>
        <button class="btn btn-primary w-100 py-2" type="submit" v-if="!isPending">
          Log in
        </button>
        <button
          class="btn btn-primary w-100 py-2 disabled"
          type="button"
          v-if="isPending"
        >
          <span class="spinner-border spinner-border-sm me-1" aria-hidden="true"></span>
          <span role="status ms-2">Loading...</span>
        </button>

        <div class="text-center form-text text-danger" role="alert" v-if="error">
          {{ error }}
        </div>
      </form>
    </main>
  </div>
</template>

<script setup>
import useLogin from '@/composables/useLogin'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const email = ref('demo.user@gmail.com')
const password = ref('demo.user')
const { error, isPending, login } = useLogin()

async function handleSubmit() {
  await login(email.value, password.value)
  if (!error.value) {
    console.log('user logged in')
    router.push({ name: 'UserPlaylists' })
  }
}
</script>

<style scoped>
.form-signin {
  max-width: 360px;
}
.form-signin .form-floating:focus-within {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
