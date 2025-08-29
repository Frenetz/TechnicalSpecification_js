import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import { createBootstrap } from 'bootstrap-vue-next/plugins/createBootstrap'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(createBootstrap())
app.use(pinia)

app.mount('#app')