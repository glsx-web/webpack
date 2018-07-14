import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout'
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
Vue.use(Router)
const views = 'views'
/* Layout */

export const routers = [
  // { path: '/login', component: () => import(`@/${views}/login/index`), hidden: true },
  // { path: '/404', component: () => import(`@/${views}/errorPage/404`), hidden: true },
  // { path: '/401', component: () => import(`@/${views}/errorPage/401`), hidden: true },
  {
    path: '',
    component: Layout,
    children: [{
      path: 'dashboard',
      component: () => import(`@/${views}/dashboard/index`),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'form', keepAlive: true }
    }]
  },
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: 'example',
    meta: { title: 'example', icon: 'example', permission: '/example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import(`@/${views}/table/index`),
        meta: { title: 'table', icon: 'table', permission: '/example/table', keepAlive: false }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import(`@/${views}/tree/index`),
        meta: { title: 'tree', icon: 'tree', permission: '/example/tree', keepAlive: false }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'gl-form',
        component: () => import(`@/${views}/form/index`),
        meta: { title: 'form', icon: 'form', permission: '/form/index', keepAlive: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: routers
})
