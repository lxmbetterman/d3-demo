import { createRouter, createWebHashHistory } from 'vue-router'

export const constantRoutes = [
  {
    path: '/',
    component: () => import('../components/HelloWorld'),
    hidden: true
  },
  {
    path: '/bar',
    component: () => import('../components/bar'),
    hidden: true
  },
  {
    path: '/selection',
    component: () => import('../components/selection'),
    hidden: true
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
