import { ref } from "vue"
import { projectFirestore } from "../firebase/config"

function useCollection(collection) {
  const error = ref(null)

  async function addDoc(doc) {
    error.value = null

    try {
      await projectFirestore.collection(collection).add(doc)
    } catch (err) {
      console.log(err.message)
      error.value = "could not add document"
    }
  }

  return { error, addDoc }
}

export default useCollection
