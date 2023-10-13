<template>
  <div class="container d-flex justify-content-center align-items-center">
    <main class="form-signin w-100">
      <form @submit.prevent="handleSubmit">
        <h1 class="h3 mb-3 fw-normal">Please sign up</h1>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="signupUsername"
            placeholder=""
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
            v-model="password"
          />
          <label for="signupPassword">Password</label>
        </div>
        <button class="btn btn-primary w-100 py-2" type="submit" v-if="!isPending">
          Sign up
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
import useSignup from '@/composables/useSignup'
import { ref } from 'vue'

const errorText = ref(' ')
const username = ref('arkoannuk')
const email = ref('arkoannuk@gmail.com')
const password = ref('arkoannuk')
const { error, isPending, signup } = useSignup()

async function handleSubmit() {
  await signup(email.value, password.value, username.value)
  if (!error.value) {
    errorText.value = ' '
    console.log('user signed up')
  } else {
    errorText.value = error.value
  }
}
</script>

<style scoped>
.form-signin {
  max-width: 360px;
}
.form-signin input[type='text'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-radius: 0;
}
.form-signin input[type='password'] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
