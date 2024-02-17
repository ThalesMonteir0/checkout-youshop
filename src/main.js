import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

// vue-router
import router from './routes'

// vuex
import store from './store'

// msw
import { worker } from './mocks/browser'
if(import.meta.env.MODE === 'development'){
  worker.start();
}

createApp(App).use(vuetify).use(router).use(store).mount('#app')
