import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

function useDocument(collection, id) {
  const error = ref(null)
  const isPending = ref(false)
  const docRef = projectFirestore.collection(collection).doc(id)

  async function deleteDoc() {
    error.value = null
    isPending.value = true

    try {
      const res = await docRef.delete()
      isPending.value = false
      return res
    } catch (err) {
      console.log(err.message)
      isPending.value = false
      error.value = 'could not delete the document'
    }
  }

  async function updateDoc(updates) {
    isPending.value = true
    error.value = null

    try {
      const res = await docRef.update(updates)
      isPending.value = false
      return res
    } catch (err) {
      console.log(err.message)
      isPending.value = false
      error.value = 'could not update the document'
    }
  }

  return { error, isPending, deleteDoc, updateDoc }
}

export default useDocument
