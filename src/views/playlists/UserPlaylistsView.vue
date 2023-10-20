<template>
  <div class="container d-flex flex-column pt-3 mt-3 align-items-center">
    <div class="text-danger" v-if="error">{{ error }}</div>
    <div
      class="w-100 row justify-content-center"
      v-else
      v-for="playlist in documents"
      :key="playlist.id"
    >
      <div class="card mb-3 p-2" style="max-width: 540px">
        <RouterLink
          :to="{ name: 'PlaylistDetails', params: { id: playlist.id } }"
          style="text-decoration: none; color: inherit"
        >
          <div class="hstack">
            <img class="card-img bg-body-tertiary" :src="playlist.coverUrl" />
            <div class="card-body overflow-hidden py-0 pe-0">
              <h5
                class="card-title text-nowrap overflow-hidden text-decoration-none"
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
        </RouterLink>
      </div>
    </div>
  </div>

  <div
    class="position-fixed bottom-0 py-2 w-100 ps-md-0 bg-body-secondary border-top"
    style="padding-left: 12px"
  >
    <div class="d-flex gap-2 justify-content-start justify-content-md-center">
      <RouterLink
        class="btn btn-success py-2"
        style="min-width: 200px"
        :to="{ name: 'Create' }"
      >
        <i class="bi bi-music-note-beamed px-1"></i> Add Playlist
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import getCollection from '@/composables/getCollection'
import getUser from '@/composables/getUser'

const { user } = getUser()
const { error, documents } = getCollection('playlists', ['userId', '==', user.value.uid])

// console.log(documents)
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
  min-width: 260px;
}
.card-title {
  font-size: calc(0.9rem + 0.4vw);
  text-decoration: none;
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
