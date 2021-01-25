// Vue
import Vue from 'vue'
import axios from 'axios'
// import i18n from './i18n'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'

// import D2Crud from '@d2-projects/d2-crud'
// 菜单和路由设置
import router from './router'
import 'default-passive-events'
import notice from '@/common/notice'

// 核心插件
Vue.use(d2Admin)
Vue.prototype.notice = notice
// Vue.use(D2Crud)
var baseConfig = ''
axios({
  baseURL: process.env.VUE_APP_REPO + '/{{ config }}',
  method: 'get'
}).then(({
  data: config
}) => {
  baseConfig = config
  new Vue({
    router,
    store,
    // i18n,
    render: h => {
      Vue.prototype.baseConfig = config
      return h(App)
    },
    created() {
      // 系统配置
      Vue.config.devtools = true
      // 展示系统信息
      this.$store.commit('d2admin/releases/versionShow')
      // 用户登录后从数据库加载一系列的设置
      this.$store.dispatch('d2admin/account/load')
      // 获取并记录用户 UA
      // this.$store.commit('d2admin/ua/get')
      // 初始化全屏监听
      this.$store.dispatch('d2admin/fullscreen/listen')
    },
    mounted() {}
  }).$mount('#app')
})

export {
  baseConfig
}
