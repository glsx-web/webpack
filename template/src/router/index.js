import Vue from 'vue'
import VueRouter from 'vue-router'

// 进度条
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

import store from '@/store/index'

import util from '@/libs/util.js'

// 路由数据
import routes from './routes'

const originalPush = VueRouter.prototype.push // 解决连续点击路由异常问题 limin
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location) && originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  routes
})

const setCurrent = path => {
  return new Promise(async resolve => {
    path !== '/login' && await store.dispatch('d2admin/page/currentSet', path)
    resolve()
  })
}

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async(to, from, next) => {
  const source = store.state.d2admin.auth.source
  // 确认已经加载多标签页数据 https://github.com/d2-projects/d2-admin/issues/201
  // await store.dispatch('d2admin/page/isLoaded')
  // 确认已经加载组件尺寸设置 https://github.com/d2-projects/d2-admin/issues/198
  // await store.dispatch('d2admin/size/isLoaded')
  // 设置当前页 下次登录 默认打开此页面
  await setCurrent(to.fullPath)
  // 进度条
  NProgress.start()
  // 关闭搜索面板
  store.commit('d2admin/search/set', false)
  if (from.name === null && to.path !== '/login' && !source) { // 页面刷新 动态路由会失效 初始化路由与左侧菜单栏
    await store.dispatch('d2admin/auth/init')
    await store.dispatch('d2admin/account/load')
    next(to.path)
  } else {
    if (store.state.d2admin.user.info) { // sessionstorage 用户存在继续当前路由 不存在 跳转登录 防止页面关闭还可以打开页面
      next()
    } else {
      if (to.path === '/login') { // 如果是登录页面路径，就直接next()
        next()
      } else { // 不然就跳转到登录；
        await store.dispatch('d2admin/account/logout')
        next('/login')
      }
    }
  }
})

router.afterEach(to => {
  // 进度条
  NProgress.done()
  // 多页控制 打开新的页面
  store.dispatch('d2admin/page/open', to)
  // 更改标题
  util.title(to.meta.title)
  // 保存当前页面meta信息
  store.dispatch('d2admin/auth/setCurrentPageMeta', to.meta)
})

export const ResetRouter = () => new VueRouter({
  routes
})

export default router
