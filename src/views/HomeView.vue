<template>
  <div class="container d-flex flex-column pt-5 mt-5 align-items-center">
    <div
      class="w-100 row justify-content-center"
      v-for="playlist in documents"
      :key="playlist.id"
    >
      <div class="card mb-3 p-2" type="button" style="max-width: 540px">
        <div class="hstack">
          <img class="card-img img-fluid" :src="playlist.coverUrl" />
          <div class="card-body row overflow-hidden py-0">
            <h5
              class="card-title text-nowrap overflow-hidden"
              style="text-overflow: ellipsis"
            >
              {{ playlist.title }}
            </h5>
            <p class="card-text">
              <small class="text-body-secondary"
                >by {{ playlist.userName }} • {{ playlist.songs.length }} songs</small
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import getCollection from '../composables/getCollection'

const { error, documents } = getCollection('playlists')

onMounted(() => {
  console.log(documents)
})``
</script>

<style scoped>
.card {
  transition: all ease 0.2s;
}
.card:hover {
  transform: scale(1.02);
  transition: all ease 0.2s;
}

.card-body {
  min-width: 290px;
}
.card-title {
  font-size: calc(0.9rem + 0.4vw);
}

img {
  aspect-ratio: 1/1;
  max-width: 140px;
  max-height: 140px;
  min-width: 60px;
  min-height: 60px;
  object-fit: cover;
}
</style>
