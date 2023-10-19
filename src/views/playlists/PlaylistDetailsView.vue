<template>
  <div class="container pt-5 my-5">
    <div v-if="error" class="text-center">
      <p class="text-danger">{{ error }}</p>
    </div>
    <div v-if="playlist">
      <div class="row bg-body mx-auto rounded border p-2" style="max-width: 1080px">
        <img
          class="bg-body-tertiary rounded col col-md-4 px-0"
          :src="playlist.coverUrl"
        />
        <div class="col col-md-8 py-3 mb-lg-4 mt-md-auto ps-0 ps-md-4">
          <div class="hstack">
            <h1 class="fs-3 fs-lg-1">{{ playlist.title }}</h1>
          </div>
          <p class="text-body-secondary">by {{ playlist.userName }} • 0 songs</p>
          <p>{{ playlist.description }}</p>
        </div>
      </div>
      <div class="mt-4 mb-5">
        <div
          class="row bg-body mx-auto rounded border p-2 mb-2"
          style="max-width: 1080px"
          v-if="!songsExist"
        >
          <div class="hstack p-0">
            <div>
              <h6 class="fw-normal m-0 fs-lg-5 fs-6">No Songs Added Yet</h6>
              <small>
                <p class="text-body-secondary m-0">Sample Artist</p>
              </small>
            </div>
            <button class="ms-auto btn btn-danger btn-sm" v-if="ownership">
              <i class="bi bi-trash-fill"></i>
            </button>
          </div>
        </div>
        <div
          class="row bg-body mx-auto rounded border p-2 mb-2"
          style="max-width: 1080px"
          v-for="song in playlist.songs"
          :key="song.id"
        >
          <div class="hstack p-0">
            <div>
              <h6 class="fw-normal m-0 fs-lg-5 fs-6">{{ song.title }}</h6>
              <small>
                <p class="text-body-secondary m-0">{{ song.artist }}</p>
              </small>
            </div>
            <button class="ms-auto btn btn-danger btn-sm" v-if="ownership">
              <i class="bi bi-trash-fill"></i>
            </button>
          </div>
        </div>
      </div>
      <AddSong :playlist="playlist" @submit="toggleModal" />
    </div>
  </div>

  <div
    class="position-fixed bottom-0 py-2 w-100 ps-md-0 bg-body-secondary border-top"
    v-if="ownership"
    style="padding-left: 12px"
  >
    <div class="d-flex gap-2 justify-content-start justify-content-md-center">
      <button
        class="btn btn-success"
        style="min-width: 98px"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        @click="showPopup"
      >
        <i class="bi bi-music-note"></i> Add
      </button>
      <button class="btn btn-danger py-2" style="min-width: 98px" @click="handleDelete">
        <i class="bi bi-trash-fill"></i> Playlist
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import getDocument from '@/composables/getDocument'
import useDocument from '@/composables/useDocument'
import useStorage from '@/composables/useStorage'
import getUser from '@/composables/getUser'
import AddSong from '../../components/AddSong.vue'
import { computed, onMounted, ref } from 'vue'
import * as bootstrap from 'bootstrap'

const myModal = ref(null)
const router = useRouter()
const props = defineProps(['id'])
const { user } = getUser()
const { error, document: playlist } = getDocument('playlists', props.id)
const { deleteDoc } = useDocument('playlists', props.id)
const { deleteImage } = useStorage()

onMounted(() => {
  myModal.value = new bootstrap.Modal(document.getElementById('exampleModal'))
})

function toggleModal() {
  myModal.value.toggle()
}

const ownership = computed(() => {
  return playlist.value && user.value && user.value.uid === playlist.value.userId
})

async function handleDelete() {
  await deleteImage(playlist.value.filePath)
  await deleteDoc()
  router.push({ name: 'Home' })
}

const songsExist = computed(() => {
  return playlist.value.songs && playlist.value.songs.length > 0
})
</script>

<style scoped>
img {
  aspect-ratio: 1/1;
  object-fit: cover;
}
</style>
