import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import SignupView from '../views/auth/SignupView.vue'
import CreatePlaylistView from '../views/playlists/CreatePlaylistView.vue'
import PlaylistDetailsView from '../views/playlists/PlaylistDetailsView.vue'
import { projectAuth } from '../firebase/config'

// eslint-disable-next-line no-unused-vars
function requireAuth(to, from) {
  let user = projectAuth.currentUser
  if (!user) return { name: 'Home' }
}

function requireNoAuth() {
  let user = projectAuth.currentUser
  if (user) return { name: 'Home' }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      beforeEnter: requireNoAuth
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignupView,
      beforeEnter: requireNoAuth
    },
    {
      path: '/playlists/create',
      name: 'Create',
      component: CreatePlaylistView,
      beforeEnter: requireAuth
    },
    {
      path: '/playlists/:id',
      name: 'PlaylistDetails',
      component: PlaylistDetailsView,
      // beforeEnter: requireAuth,
      props: true
      // Add alert: 'log in to view details'
    }
  ]
})

export default router
