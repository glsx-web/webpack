{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
import './assets/icons'
import 'glsx-vue-components/dist/glsx-vue-components.css'
import 'glsx-vue-admin/dist/glsx-vue-admin.css'
{{#normalize}}
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
{{/normalize}}
import GlsxVueComponets from 'glsx-vue-components'
import GlsxVueAdmin from 'glsx-vue-admin'
import GlsxVueCommon from 'glsx-vue-common'
import config from './config'
import store from './store'
{{#router}}
import router from './router'
{{/router}}

Vue.use(GlsxVueComponets)
Vue.use(GlsxVueCommon)
Vue.use(GlsxVueAdmin, config)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#if_eq build "runtime"}}
  render: h => h(App),
  {{/if_eq}}
  store,
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
