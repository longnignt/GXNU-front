import { createRouter, createWebHashHistory } from 'vue-router'
import newvieww from '../views/new.vue'

const routes = [
  {
    path: '/',
    name: 'new',
    component: newvieww
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
