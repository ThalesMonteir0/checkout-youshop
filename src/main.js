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
worker.start();

// vue-mask
import VueMask from '@devindex/vue-mask'
import { Notyf } from 'notyf';

import 'notyf/notyf.min.css';

const notyf = new Notyf({
  duration: 5000 // Configuração global do Notyf
});

createApp(App).use(vuetify).use(router).use(store).use(VueMask).provide('notyf', notyf).mount('#app')
