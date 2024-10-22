import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/base',
      name: 'base',
      component: () => import('../components/products/BaseSlot.vue')
    },
    {
      path: '/productCard',
      name: 'productCard',
      component: () => import('../components/products/ProductCard.vue')
    },
    {
      path: '/productList',
      name: 'productList',
      component: () => import('../components/products/ProductList.vue')
    },
  ]
})

export default router
