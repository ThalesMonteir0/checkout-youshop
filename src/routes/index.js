import {createRouter,createWebHistory } from 'vue-router'
import FormDataClient from '../views/FormDataClient.vue'

const routes = [
  { path: '/:id', component: FormDataClient },
  // { path: '/', component: Bar }
]

const router = createRouter({
    history: createWebHistory(),
  routes
})

export default router;