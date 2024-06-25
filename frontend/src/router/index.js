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
      path: "/factories",
      name: "factories",

      component: () => import("../views/FactoriesView.vue")
    },
    {
      path: '/factory/:id',
      name: 'factory-details',
      component: () => import('../components/DetailedFactory.vue')
    },
    {
      path: '/factory/:id/add-chocolate',
      name : 'add-chocolates',
      component: () => import('../components/AddChocolateToFactory.vue')

    },
    {
      path: '/factory/:id/update',
      name: 'update-factory',
      component: () => import('../components/UpdateFactory.vue')
    },
    {
      path: '/chocolate/:id/update',
      name: 'update-chocolate',
      component: () => import('../components/UpdateChocolate.vue')
    },
    {
      path: '/factory/:id/comments',
      name: 'factory-comments',
      component: () => import('../components/CommentsView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/LogIn.vue')
    },
    {
      path: '/factories/create',
      name: 'create-factory',
      component: () => import('../components/CreateFactory.vue')
    }

  ]
})

export default router
