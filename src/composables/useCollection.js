import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

function useCollection(collection) {
  const error = ref(null)
  const isPending = ref(false)

  async function addDoc(doc) {
    error.value = null
    isPending.value = true

    try {
      await projectFirestore.collection(collection).add(doc)
      isPending.value = false
    } catch (err) {
      console.log(err.message)
      error.value = 'could not add document'
      isPending.value = false
    }
  }

  return { error, isPending, addDoc }
}

export default useCollection
