import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/', //切換網頁目錄
      name:'Home',
      component:() => import('../views/Home.vue')
    },
    {
      path:'/post/:id',
      name:'Post',
      component:() => import('../views/Post.vue')
    }
  ]
})

export default router
