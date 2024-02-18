import {createRouter,createWebHistory } from 'vue-router'
import FormDataClient from '../views/FormDataClient.vue'
import FormDataPayment from '../views/FormDataPayment.vue'
import Sucess from '../views/Success.vue'

const routes = [
  { path: '/:id', component: FormDataClient, name: 'form-data-client' },
  { path: '/:id/payment', component: FormDataPayment, name: 'form-data-payment' },
  { path: '/sucess', component: Sucess, name: 'sucess' }

]

const router = createRouter({
    history: createWebHistory(),
  routes
})

export default router;