import { ref } from 'vue'
import { projectAuth } from '../firebase/config'
import getUser from '@/composables/getUser'

const error = ref(null)
const isPending = ref(false)
const { user } = getUser()

async function login(email, password) {
  // error.value = null
  isPending.value = true

  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password)
    if (!res) {
      throw new Error('Could not complete the log in')
    }
    error.value = null
    isPending.value = false
    // console.log(user)
    return res
  } catch (err) {
    console.log(err.message)
    error.value = 'Invalid login credentials'
    isPending.value = false
  }
}

function useLogin() {
  return { error, isPending, login }
}

export default useLogin
