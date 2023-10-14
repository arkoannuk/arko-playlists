<template>
  <div class="container d-flex justify-content-center pt-5 mt-5">
    <main class="form-signin w-100">
      <form @submit.prevent="handleSubmit">
        <h1 class="h3 mb-3 fw-normal">Create New Playlist</h1>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="playlistTitle"
            placeholder=""
            v-model="username"
          />
          <label for="playlistTitle">Title</label>
        </div>
        <div class="form-floating">
          <textarea
            class="form-control"
            id="playlistDescription"
            placeholder=""
            style="height: 100px"
            v-model="email"
          ></textarea>
          <label for="playlistDescription">Description</label>
        </div>
        <div class="my-3">
          <label for="formFile" class="form-label form-text"
            >Upload playlist cover image</label
          >
          <input class="form-control" type="file" id="formFile" />
        </div>
        <button class="btn btn-primary w-100 py-2" type="submit" v-if="!isPending">
          Create
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
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const errorText = ref(' ')
const username = ref('90s Norwegian Family Folk')
const email = ref(
  `Dive into the chilling legacy of early '90s Norwegian black metal with Mayhem, Burzum, and Darkthrone.`
)
const password = ref('')
const { error, isPending, signup } = useSignup()

async function handleSubmit() {
  await signup(email.value, password.value, username.value)
  if (!error.value) {
    errorText.value = ' '
    console.log('user signed up')
    router.push({ name: 'Home' })
  } else {
    errorText.value = error.value
  }
}
</script>

<style scoped>
.form-signin {
  max-width: 360px;
}
#playlistTitle {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
#playlistDescription {
  margin-bottom: -1px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}

::-webkit-resizer {
  background: var(--bs-tertiary-bg);
  outline: 1px solid var(--bs-border-color);
  border-radius: 1px;
}
</style>
