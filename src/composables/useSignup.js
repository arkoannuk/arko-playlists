import { ref } from "vue"
import { projectAuth } from "../firebase/config"

const error = ref(null)

async function signup(email, password, displayName) {
  error.value = null

  try {
    const res = await projectAuth.createUserWithEmailAndPassword(email, password)
    if (!res) {
      throw new Error("Could not complete the signup")
    }
    await res.user.updateProfile({ displayName })
    error.value = null
    // console.log(res)
    return res
  } catch (err) {
    console.log(err.message)
    error.value = err.message
  }
}

function useSignup() {
  return { error, signup }
}

export default useSignup
