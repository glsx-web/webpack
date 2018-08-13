import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout'

// const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

const routers = [
  { path: '/', redirect: 'layout' },
  { path: '/layout', component: Layout }
]

const router = new Router({
  routes: routers
})

export default router
