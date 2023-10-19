<template>
  <div>
    <div
      class="modal fade modal"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Add a New Song</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="songTitle" class="form-label">Title</label>
              <input
                type="text"
                class="form-control"
                id="songTitle"
                aria-describedby="songTitle"
                v-model="title"
              />
            </div>
            <div class="mb-3">
              <label for="songArtist" class="form-label">Artist</label>
              <input type="text" class="form-control" id="songArtist" v-model="artist" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-success" @click="handleSubmit">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import useDocument from '../composables/useDocument'

const props = defineProps({
  playlist: {
    type: Object
  }
})
const emit = defineEmits(['submit'])
const title = ref('')
const artist = ref('')

async function handleSubmit() {
  const newSong = {
    title: title.value,
    artist: artist.value,
    id: uuidv4()
  }
  const { updateDoc } = useDocument('playlists', props.playlist.id)
  await updateDoc({
    songs: [...props.playlist.songs, newSong]
  })
  title.value = ''
  artist.value = ''
  emit('submit')
}
</script>
