{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
import './assets/icons'
import 'element-ui/lib/theme-chalk/index.css'
import 'glsx-vue-admin/dist/glsx-vue-admin.css'
{{#normalize}}
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
{{/normalize}}
import ElementUI from 'element-ui'
import GlsxVueAdmin from 'glsx-vue-admin'
import config from './config'
import i18n from './lang'
import store from './store'
{{#router}}
import router from './router'
{{/router}}
Vue.use(ElementUI)
Vue.use(GlsxVueAdmin, config)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  store,
  i18n,
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
