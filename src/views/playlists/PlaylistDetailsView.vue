<template>
  <h1>Playlist Details</h1>
  <h2>{{ id }}</h2>
  <h3>{{ document }}</h3>
</template>

<script setup>
import getDocument from '@/composables/getDocument'

const props = defineProps(['id'])
const { error, document } = getDocument('playlists', props.id)
</script>
