import {createRouter,createWebHistory } from 'vue-router'
import FormDataClient from '../views/FormDataClient.vue'
import FormDataPayment from '../views/FormDataPayment.vue'

const routes = [
  { path: '/:id', component: FormDataClient },
  { path: '/:id/payment', component: FormDataPayment }
]

const router = createRouter({
    history: createWebHistory(),
  routes
})

export default router;