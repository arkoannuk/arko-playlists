<template>
  <div class="container d-flex justify-content-center pt-5 mt-5">
    <main class="form-signup w-100">
      <form @submit.prevent="handleSubmit">
        <h1 class="h3 mb-3 fw-normal">Please sign up</h1>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="signupUsername"
            placeholder=""
            required
            v-model="username"
          />
          <label for="signupUsername">Username</label>
        </div>
        <div class="form-floating">
          <input
            type="email"
            class="form-control"
            id="signupEmail"
            placeholder=""
            required
            v-model="email"
          />
          <label for="signupEmail">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control mb-2"
            id="signupPassword"
            placeholder=""
            required
            v-model="password"
          />
          <label for="signupPassword">Password</label>
        </div>
        <button class="btn btn-primary w-100 py-2" type="submit" v-if="!isPending">
          Sign up
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
import useSignup from '@/composables/useSignup'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const username = ref('arkoannuk')
const email = ref('arkoannuk@gmail.com')
const password = ref('arkoannuk')
const { error, isPending, signup } = useSignup()

async function handleSubmit() {
  await signup(email.value, password.value, username.value)
  if (!error.value) {
    console.log('user signed up')
    router.push({ name: 'Home' })
  }
}
</script>

<style scoped>
.form-signup {
  max-width: 360px;
}
.form-signup .form-floating:focus-within {
  z-index: 2;
}
.form-signup input[type='text'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signup input[type='email'] {
  margin-bottom: -1px;
  border-radius: 0;
}
.form-signup input[type='password'] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
