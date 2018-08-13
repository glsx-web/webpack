{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from '@/router/index.js'
{{/router}}
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import GlsxVueCommon from 'glsx-vue-common'

Vue.use(ElementUI)
Vue.use(GlsxVueCommon)

var mixin = {
  mounted () {
    const theme = new this.$Theme()
    const connection = this.$Penpal.connectToParent({
      methods: {
        setTheme (color) {
          theme.change(color)
        },
        height () {
          return document.height || document.body.offsetHeight // document.documentElement.clientHeight || document.body.clientHeight //
        }
      }
    })
    connection.promise.then(parent => {
      parent.onload()
    })
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  mixins: [mixin],
  {{#router}}
  router,
  {{/router}}
  render: h => h(App)
})
