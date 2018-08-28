{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from '@/router/index.js'
{{/router}}
import GlsxVueComponents from 'glsx-vue-components'
import 'glsx-vue-components/dist/glsx-vue-components.css'
import GlsxVueCommon from 'glsx-vue-common'
{{#lodash}}
//import _ from 'lodash'
{{/lodash}}

Vue.use(GlsxVueComponents)
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
