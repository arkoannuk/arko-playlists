import { ref } from "vue"
import { projectAuth } from "../firebase/config"

const error = ref(null)

async function logout() {
  error.value = null

  try {
    await projectAuth.signOut()
  } catch (err) {
    console.log(err.message)
    error.value = err.message
  }
}

function useLogout() {
  return { error, logout }
}

export default useLogout
