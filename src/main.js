import './assets/main.scss'
import './assets/color-modes.js'
// eslint-disable-next-line no-unused-vars
import * as bootstrap from 'bootstrap'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
