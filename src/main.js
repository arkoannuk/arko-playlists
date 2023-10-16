import './assets/main.scss'
import initThemeSwitcher from './assets/themeSwitcher'
// import './assets/color-modes.js'
// eslint-disable-next-line no-unused-vars
import * as bootstrap from 'bootstrap'
import { projectAuth } from './firebase/config'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

let app
projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(router).mount('#app')
    initThemeSwitcher()
  }
})
