<template>
  <div class="container d-flex justify-content-center pt-3 mt-3">
    <main class="form-create w-100">
      <form @submit.prevent="handleSubmit">
        <h1 class="h3 mb-3 fw-normal">Create New Playlist</h1>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="playlistTitle"
            placeholder=""
            maxlength="60"
            required
            v-model="title"
          />
          <label for="playlistTitle">Title</label>
        </div>
        <div class="form-floating">
          <textarea
            class="form-control"
            id="playlistDescription"
            placeholder=""
            style="height: 130px"
            maxlength="140"
            required
            v-model="description"
          ></textarea>
          <label for="playlistDescription">Description</label>
        </div>
        <div class="my-3">
          <label for="formFile" class="form-label form-text"
            >Upload playlist cover image</label
          >
          <input
            class="form-control"
            type="file"
            id="formFile"
            required
            @change="handleChange"
          />
        </div>
        <button
          class="btn btn-primary w-100 py-2"
          type="submit"
          :disabled="fileError || isDemoUser"
          v-if="!isPending"
        >
          Create
        </button>
        <button
          class="btn btn-primary w-100 py-2 disabled"
          type="button"
          v-if="isPending"
        >
          <span class="spinner-border spinner-border-sm me-1" aria-hidden="true"></span>
          <span role="status ms-2">Loading...</span>
        </button>
        <div
          class="text-center form-text text-danger"
          role="alert"
          v-if="fileError || error"
        >
          {{ fileError || error }}
        </div>
      </form>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'
import { computed, ref } from 'vue'

const router = useRouter()
const { filePath, url, uploadImage } = useStorage()
const { error, addDoc } = useCollection('playlists')
const { user } = getUser()

const title = ref('')
const description = ref(``)
const file = ref(null)
const fileError = ref(null)
const isPending = ref(false)

const isDemoUser = computed(() => {
  return user.value.uid === '3q63qnzRfpezxqek2NrqgIsy9up1'
})

// allowed file types
const types = ['image/png', 'image/jpeg', 'image/svg+xml']

function handleChange(e) {
  const selected = e.target.files[0]
  if (selected && types.includes(selected.type)) {
    file.value = selected
    fileError.value = null
  } else {
    file.value = null
    fileError.value = 'please select an image file (.png .jpg .svg)'
  }
  // console.log(file.value)
}

async function handleSubmit() {
  if (file.value) {
    isPending.value = true
    await uploadImage(file.value)
    const res = await addDoc({
      title: title.value,
      description: description.value,
      userId: user.value.uid,
      userName: user.value.displayName,
      coverUrl: url.value,
      filePath: filePath.value,
      songs: [],
      createdAt: timestamp()
    })
    isPending.value = false
    if (!error.value) {
      // console.log('playlist added')
      // console.log(res)
      router.push({ name: 'PlaylistDetails', params: { id: res.id } })
    }
  }
}
</script>

<style scoped>
.form-create {
  max-width: 360px;
}
.form-create .form-floating:focus-within {
  z-index: 2;
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
textarea {
  resize: none;
}

/* ::-webkit-resizer {
  background: var(--bs-tertiary-bg);
  outline: 1px solid var(--bs-border-color);
  border-radius: 1px;
} */
</style>
