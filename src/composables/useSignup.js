import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)
const isPending = ref(false)

async function signup(email, password, displayName) {
  error.value = null
  isPending.value = true

  try {
    const res = await projectAuth.createUserWithEmailAndPassword(email, password)
    if (!res) {
      throw new Error('Could not complete the signup')
    }
    await res.user.updateProfile({ displayName })
    error.value = null
    isPending.value = false
    // console.log(res)
    return res
  } catch (err) {
    console.log(err.message)
    error.value = err.message
    isPending.value = false
  }
}

function useSignup() {
  return { error, isPending, signup }
}

export default useSignup
