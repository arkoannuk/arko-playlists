import { ref } from "vue"
import { projectAuth } from "../firebase/config"

const error = ref(null)

async function login(email, password) {
  // error.value = null

  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password)
    if (!res) {
      throw new Error("Could not complete the log in")
    }
    error.value = null
    return res
  } catch (err) {
    console.log(err.message)
    error.value = "Invalid login credentials"
  }
}

function useLogin() {
  return { error, login }
}

export default useLogin
