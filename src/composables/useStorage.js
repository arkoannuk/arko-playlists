import { projectStorage } from '../firebase/config'
import getUser from '../composables/getUser'
import { ref } from 'vue'

const { user } = getUser()

function useStorage() {
  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)

  async function uploadImage(file) {
    filePath.value = `covers/${user.value.uid}/${file.name}`
    const storageRef = projectStorage.ref(filePath.value)

    try {
      const res = await storageRef.put(file)
      url.value = await res.ref.getDownloadURL()
    } catch (err) {
      console.log(err.message)
      error.value = err.message
    }
  }

  async function deleteImage(path) {
    const storageRef = projectStorage.ref(path)

    try {
      storageRef.delete()
    } catch (err) {
      console.log(err.message)
      error.value = err.message
    }
  }

  return { url, filePath, error, uploadImage, deleteImage }
}

export default useStorage
