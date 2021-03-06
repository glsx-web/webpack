{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}
mport 'element-ui/lib/theme-chalk/index.css'
import 'glsx-vue-admin/dist/glsx-vue-admin.css'
import ElementUI from 'element-ui'
import GlsxVueAdmin from 'glsx-vue-admin'
import config from './config'
Vue.use(ElementUI)
Vue.use(GlsxVueAdmin, config)
import store from './store'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  store,
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
