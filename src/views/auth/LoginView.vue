<template>
  <div class="vh-100 container d-flex justify-content-center align-items-center">
    <main class="form-signin w-100">
      <form @submit.prevent="handleSubmit">
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
        <div class="form-floating">
          <input
            type="email"
            class="form-control"
            id="loginEmail"
            placeholder=""
            v-model="email"
          />
          <label for="loginEmail">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control mb-2"
            id="loginPassword"
            placeholder=""
            v-model="password"
          />
          <label for="loginPassword">Password</label>
        </div>
        <button class="btn btn-primary w-100 py-2" type="submit" v-if="!isPending">
          Sign in
        </button>
        <button
          class="btn btn-primary w-100 py-2 disabled"
          type="submit"
          v-if="isPending"
        >
          Loading
        </button>

        <div class="text-center form-text text-danger user-select-none" role="alert">
          {{ errorText }}
        </div>
      </form>
    </main>
  </div>
</template>

<script setup>
import useLogin from '@/composables/useLogin'
import { ref } from 'vue'

const errorText = ref(' ')
const email = ref('arkoannuk@gmail.com')
const password = ref('arkoannuk')
const { error, isPending, login } = useLogin()

async function handleSubmit() {
  await login(email.value, password.value)
  if (!error.value) {
    errorText.value = ' '
    console.log('user logged in')
  } else {
    errorText.value = error.value
  }
}
</script>

<style scoped>
.form-signin {
  max-width: 330px;
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
