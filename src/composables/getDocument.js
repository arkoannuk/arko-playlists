import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

function getDocument(collection, id) {
  const error = ref(null)
  const document = ref([])

  const documentRef = projectFirestore.collection(collection).doc(id)

  const unsub = documentRef.onSnapshot(
    (snap) => {
      if (snap.data()) {
        document.value = { ...snap.data(), id: snap.id }
        error.value = null
      } else {
        error.value = 'that document does not exist'
      }
    },
    (err) => {
      console.log(err.message)
      document.value = null
      error.value = 'could not fetch data'
    }
  )

  watchEffect((onInvalidate) => {
    // unsub from prev collection when watcher is stopped (component unmounted)
    onInvalidate(() => unsub())
  })

  return { error, document }
}

export default getDocument
