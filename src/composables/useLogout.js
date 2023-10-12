import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)
const isPending = ref(false)

async function logout() {
  error.value = null
  isPending.value = true

  try {
    await projectAuth.signOut()
    isPending.value = false
  } catch (err) {
    console.log(err.message)
    error.value = err.message
    isPending.value = false
  }
}

function useLogout() {
  return { error, isPending, logout }
}

export default useLogout
