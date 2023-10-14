import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBgBXhEBjNHYH4raNDr9hY1cu0IQKdfEjE',
  authDomain: 'arko-playlists.firebaseapp.com',
  projectId: 'arko-playlists',
  storageBucket: 'arko-playlists.appspot.com',
  messagingSenderId: '979414496160',
  appId: '1:979414496160:web:cf5c6b6e0ef0befcf32ac5'
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectAuth, projectFirestore, projectStorage, timestamp }
