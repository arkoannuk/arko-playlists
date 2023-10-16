<template>
  <div class="container pt-5 my-5">
    <div class="row bg-body mx-auto rounded border p-2" style="max-width: 1080px">
      <img class="bg-body-tertiary rounded col col-md-4 px-0" :src="playlist.coverUrl" />
      <div class="col col-md-8 py-3 mb-lg-4 mt-md-auto ps-0 ps-md-4">
        <div class="hstack">
          <h1 class="fs-3 fs-lg-1">
            Nommu Nommu no Fruit It a long title to be had asd iasd asda dida
          </h1>
        </div>
        <p class="text-body-secondary">by {{ playlist.userName }} • ... songs</p>
        <div v-if="ownership">Test</div>
        <p>{{ playlist.description }}</p>
      </div>
    </div>
    <div class="mt-4 mb-5">
      <div class="row bg-body mx-auto rounded border p-2 mb-2" style="max-width: 1080px">
        <div class="hstack p-0">
          <div>
            <h6 class="fw-normal m-0 fs-lg-5 fs-6">On the Road Again</h6>
            <small>
              <p class="text-body-secondary m-0">Baba O Reily</p>
            </small>
          </div>
          <button class="ms-auto btn btn-danger btn-sm" v-if="ownership">
            <i class="bi bi-trash-fill"></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="position-fixed bottom-0 py-2 w-100 ms-2 ms-md-0 bg-body-secondary border-top"
    v-if="ownership"
  >
    <div class="d-flex gap-2 justify-content-start justify-content-md-center">
      <button class="btn btn-success" style="min-width: 98px">
        <i class="bi bi-music-note"></i> Add
      </button>
      <button class="btn btn-danger py-2" style="min-width: 98px">
        <i class="bi bi-trash-fill"></i> Playlist
      </button>
    </div>
  </div>
</template>

<script setup>
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import { computed } from 'vue'

const props = defineProps(['id'])
const { user } = getUser()
const { error, document: playlist } = getDocument('playlists', props.id)

const ownership = computed(() => {
  return playlist.value && user.value && user.value.uid === playlist.value.userId
})
</script>

<style scoped>
img {
  aspect-ratio: 1/1;
  object-fit: cover;
  /* max-width: 340px;
  max-height: 340px;
  min-width: 60px;
  min-height: 60px;*/
}
</style>
