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
    },
     {
      path: 'order', // 注意这里是相对路径
      name: 'Ordet',
      component: () => import('../views/subject/order/index.vue')
    },
    {
      path: 'people', // 注意这里是相对路径
      name: 'people',
      component: () => import('../views/people/index.vue')
    },
    {
     path: '/profile',
     name: 'Profile',
     component: () => import('../views/own/index.vue')
   },
   {
     path: '/message',
     name: 'message',
     component: () => import('../views/message/index.vue')
   },
   // 在你的路由配置文件中添加
{
  path: '/achievements',
  name: 'achievements',
  component: () => import('../views/achievement/index.vue')
},
{
  path: '/subjectace',
  name: 'subjectace',
  component: () => import('../views/subject_ace/index.vue')
},
// 在路由配置中添加新路由
{
  path: '/permissions',
  name: 'Permissions',
  component: () => import('../views/addpermission/index.vue')
}


  ]
  }, 
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
