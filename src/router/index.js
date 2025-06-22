import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
  path: '/',
  name: 'new',
  component: () => import('../views/new.vue'),
  children: [
    {
      path: 'middle', // 注意这里是相对路径
      name: 'Middle',
      component: () => import('../views/middle/index.vue')
    }
  ]
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
