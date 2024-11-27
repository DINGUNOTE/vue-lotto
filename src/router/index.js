import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/get-numbers',
      name: 'get lotto numbers',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GetNumbersView.vue'),
    },
    // 존재하지 않는 경로로 접근했을 때 홈으로 리다이렉트(직접 상세 페이지 url 입력, 상세 페이지에서 새로고침 등)
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    },
  ],
})

export default router
