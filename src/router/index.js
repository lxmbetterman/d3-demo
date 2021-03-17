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
    path: '/zoom', // 折线图
    component: () => import('../components/zoom'),
    hidden: true
  },
  {
    path: '/tree', // 树
    component: () => import('../components/tree'),
    hidden: true
  },
  {
    path: '/selection', // selection 的使用
    component: () => import('../components/selection'),
    hidden: true
  },
  {
    path: '/transition', // selection 的使用
    component: () => import('../components/transition'),
    hidden: true
  },
  {
    path: '/fun', // selection 的使用
    component: () => import('../components/fun'),
    hidden: true
  },
  {
    path: '/mapcolor', // 有限种颜色，地图相邻两个省份的颜色如何做到不相同
    component: () => import('../components/mapColor'),
    hidden: true
  },
  {
    path: '/interpolator', // 有限种颜色，地图相邻两个省份的颜色如何做到不相同
    component: () => import('../components/Interpolators'),
    hidden: true
  },
  {
    path: '/map', // 地图相关的
    component: () => import('../components/map'),
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
  },
  { // force
    path: '/sticky-force-layout', // scaleTime 的使用
    component: () => import('../components/force/sticky-force-layout'),
    hidden: true
  },
  // G6 的demo
  {
    path: '/g6Basic',
    component: () => import('../components/G6/g6Basic'),
    hidden: true
  },
  {
    path: '/g6Basic2',
    component: () => import('../components/G6/g6Basic2'),
    hidden: true
  },
  {
    path: '/g6Basic3',
    component: () => import('../components/G6/g6Basic3'),
    hidden: true
  },
  {
    path: '/g6RegisterNode',
    component: () => import('../components/G6/g6RegisterNode'),
    hidden: true
  },
  {
    path: '/g6RegisterNode2',
    component: () => import('../components/G6/g6RegisterNode2'),
    hidden: true
  },
  {
    path: '/g6AnchorPoint',
    component: () => import('../components/G6/g6AnchorPoint'),
    hidden: true
  },
  {
    path: '/g6RegisterNodeCustom',
    component: () => import('../components/G6/g6RegisterNodeCustom'),
    hidden: true
  },
  {
    path: '/g6RegisterNodeCustoDom',
    component: () => import('../components/G6/g6RegisterNodeCustoDom'),
    hidden: true
  },
  // -----------
  // G6的官方例子
  {
    path: '/dagre/basicDagre',
    component: () => import('../components/G6/dagre/basicDagre'),
    hidden: true
  },
  {
    path: '/dagre/LRDagre',
    component: () => import('../components/G6/dagre/LRDagre'),
    hidden: true
  },
  // g6自定义节点node
  {
    path: '/customNode/card',
    component: () => import('../components/G6/customNode/card'),
    hidden: true
  },
  {
    path: '/customNode/cardNode',
    component: () => import('../components/G6/customNode/cardNode'),
    hidden: true
  },
  // g6自定义edge
  {
    path: '/customEdge/extraShape',
    component: () => import('../components/G6/customEdge/extraShape'),
    hidden: true
  },
  // g6自定义contextMenu
  {
    path: '/contextMenu/contextMenu',
    component: () => import('../components/G6/contextMenu/contextMenu'),
    hidden: true
  },
  // g6 创建edge
  {
    path: '/createEdge/createEdge',
    component: () => import('../components/G6/createEdge/createEdge'),
    hidden: true
  },
  { // setMode 添加node/edge
    path: '/createEdge/setMode',
    component: () => import('../components/G6/createEdge/setMode'),
    hidden: true
  },
  // -----------------

  // demo relate
  {
    path: '/demo1Relate-sticky-force-layout',
    component: () => import('../demo1Relate/sticky-force-layout'),
    hidden: true
  },
  {
    path: '/sticky-force-curve-layout',
    component: () => import('../demo1Relate/sticky-force-curve-layout'),
    hidden: true
  },
  {
    path: '/spline-editor',
    component: () => import('../demo1Relate/spline-editor'),
    hidden: true
  },
  {
    path: '/dragline', // anchor 拖动出连线
    component: () => import('../demo1Relate/dragline/dragline.vue'),
    hidden: true
  }

]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
