import { createRouter, createWebHashHistory } from 'vue-router'

export const constantRoutes = [
  {
    path: '/', // svg 基础
    component: () => import('../components/HelloWorld'),
    hidden: true
  },
  {
    path: '/bar', // 柱状图相关demo
    component: () => import('../components/bar'),
    hidden: true
  },
  {
    path: '/radial', // 饼图雷达图相关demo
    component: () => import('../components/radial'),
    hidden: true
  },
  {
    path: '/area', // 饼图雷达图相关demo
    component: () => import('../components/area'),
    hidden: true
  },
  {
    path: '/line', // 折线图
    component: () => import('../components/line'),
    hidden: true
  },
  {
    path: '/selection', // selection 的使用
    component: () => import('../components/selection'),
    hidden: true
  },
  {
    path: '/dayjs', // dayjs 时间插件的使用
    component: () => import('../components/dayjs'),
    hidden: true
  },
  {
    path: '/interpolators', // dayjs 时间插件的使用
    component: () => import('../components/Interpolators'),
    hidden: true
  },
  {
    path: '/scaleTime', // scaleTime 的使用
    component: () => import('../components/scaleTime'),
    hidden: true
  }

]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
