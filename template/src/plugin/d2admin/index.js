// Element
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// flex 布局库
import 'flex.css'
// 组件
import '@/components'
// svg 图标
import '@/assets/svg-icons'
// 指令
import '@/directives'

// 过滤器
import '@/filters'

// 功能插件
import pluginError from '@/plugin/error'
import pluginOpen from '@/plugin/open'

export default {
  async install(Vue, options) {
    // 设置为 false 以阻止 vue 在启动时生成生产提示
    // https://cn.vuejs.org/v2/api/#productionTip
    Vue.config.productionTip = false
    // 当前环境
    Vue.prototype.$env = process.env.NODE_ENV
    // 当前的 baseUrl
    // Vue.prototype.$baseUrl = process.env.BASE_URL
    // 当前版本
    Vue.prototype.$version = process.env.VUE_APP_VERSION
    // 构建时间
    Vue.prototype.$buildTime = process.env.VUE_APP_BUILD_TIME
    // 事件传递
    Vue.prototype.$event = new Vue()
    // Element
    Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
    // 插件
    Vue.use(pluginError)
    Vue.use(pluginOpen)
  }
}
