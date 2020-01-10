{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
import './assets/icons'
// import 'glsx-vue-components/dist/glsx-vue-components.css'
import 'glsx-vue-admin/dist/glsx-vue-admin.css'
{{#normalize}}
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
{{/normalize}}
import GlsxVueComponets from 'glsx-vue-components'
import GlsxVueAdmin from 'glsx-vue-admin'
import GlsxVueCommon from 'glsx-vue-common'
// import { admin, common } from '@/config'
import axios from 'axios'
import store from './store'
import i18n from './lang'
{{#router}}
import router from './router'
{{/router}}

// Vue.use(GlsxVueComponets)
// Vue.use(GlsxVueCommon, common)
// Vue.use(GlsxVueAdmin, admin)
// Vue.config.productionTip = false

/* eslint-disable no-new */
(async () => {
  const URL = 'https://oss-config.test.glsx.com.cn/mock/5be17454f31545347559d499/config'
  const admin = await axios.get(URL + '/admin')
  const common = await axios.get(URL + '/admin_common')
  Vue.use(GlsxVueComponets)
  Vue.use(GlsxVueCommon, common.data)
  Vue.use(GlsxVueAdmin, admin.data)
  new Vue({
    el: '#app',
    {{#router}}
    router,
    {{/router}}
    store,
    i18n,
    render: h => h(App)
  })
})()
