<template>
  <div class="container pt-3 my-3">
    <div v-if="error" class="d-flex justify-content-center text-center mt-3 pt-3">
      <div class="card p-4">
        <p class="text-danger">{{ error }}</p>
        <RouterLink :to="{ name: 'Home' }" class="btn btn-primary mt-3"
          >Return Home</RouterLink
        >
      </div>
    </div>
    <div v-if="playlistExist && !error">
      <div class="row bg-body mx-auto rounded border p-2" style="max-width: 1080px">
        <img
          class="bg-body-tertiary rounded col-12 col-md-4 px-0"
          :src="playlist.coverUrl"
        />
        <div class="col-12 col-md-8 py-3 mb-lg-4 mt-md-auto ps-0 ps-md-4">
          <div class="hstack">
            <h1 class="fs-3 fs-lg-1">{{ playlist.title }}</h1>
          </div>
          <p class="text-body-secondary">
            by {{ playlist.userName }} • {{ playlist.songs.length }} songs
          </p>
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
            <button
              class="ms-auto btn btn-danger btn-sm"
              v-if="ownership"
              :disabled="isDemoUser"
            >
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
            <button
              class="ms-auto btn btn-danger btn-sm"
              v-if="ownership"
              @click="handleSongDelete(song.id)"
              :disabled="isDemoUser"
            >
              <i class="bi bi-trash-fill"></i>
            </button>
          </div>
        </div>
      </div>
      <AddSong :playlist="playlist" />
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
        :disabled="isDemoUser"
      >
        <i class="bi bi-music-note"></i> Add
      </button>
      <button
        class="btn btn-danger py-2"
        style="min-width: 98px"
        @click="handlePlaylistDelete"
        :disabled="isDemoUser"
      >
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
import { computed } from 'vue'

const router = useRouter()
const props = defineProps(['id'])
const { user } = getUser()
const { error, document: playlist } = getDocument('playlists', props.id)
const { deleteDoc, updateDoc } = useDocument('playlists', props.id)
const { deleteImage } = useStorage()
const isDemoUser = computed(() => {
  return user.value.uid === '3q63qnzRfpezxqek2NrqgIsy9up1'
})

const ownership = computed(() => {
  return playlist.value && user.value && user.value.uid === playlist.value.userId
})

async function handleSongDelete(id) {
  // console.log(id)
  const updatedSongs = playlist.value.songs.filter((song) => song.id !== id)
  // console.log(updatedSongs)
  await updateDoc({
    songs: updatedSongs
  })
}

async function handlePlaylistDelete() {
  await deleteImage(playlist.value.filePath)
  await deleteDoc()
  router.push({ name: 'Home' })
}

const playlistExist = computed(() => {
  return playlist.value.id
})

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
