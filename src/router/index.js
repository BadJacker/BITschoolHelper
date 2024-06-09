import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutPage.vue'),
      redirect: '/layout/home',
      children: [
        {
          path: '/layout/home',
          component: () => import('@/views/layout/HomePage.vue')
        },
        {
          path: '/layout/order',
          component: () => import('@/views/layout/OrderPage.vue')
        },
        {
          path: '/layout/post',
          component: () => import('@/views/layout/PostPage.vue')
        },
        {
          path: '/layout/message',
          component: () => import('@/views/layout/MessagePage.vue')
        },
        {
          path: '/layout/user',
          component: () => import('@/views/layout/UserPage.vue')
        }
      ]
    },
    {
      path: '/search',
      component: () => import('@/views/search/SearchPage.vue')
    },
    {
      path: '/list',
      component: () => import('@/views/search/ListPage.vue')
    },
    {
      path: '/product',
      component: () => import('@/views/product/ProductPage.vue')
    },
    {
      path: '/order',
      component: () => import('@/views/order/OrderDetail.vue')
    },
    {
      path: '/pay',
      component: () => import('@/views/order/PayPage.vue')
    },
    {
      path: '/comment',
      component: () => import('@/views/order/CommentPage.vue')
    }
  ]
})

export default router
