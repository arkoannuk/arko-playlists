import { ref } from "vue"
import { projectAuth } from "../firebase/config"

const user = ref(null)

projectAuth.onAuthStateChanged((_user) => {
  // console.log("User state change. Current user is ", _user)
  user.value = _user
})

function getUser() {
  return { user }
}

export default getUser
