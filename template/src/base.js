// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import GlsxVueComponents from 'glsx-vue-components'
import 'glsx-vue-components/dist/glsx-vue-components.css'
import { Request as request } from 'glsx-vue-common'

{{#lodash}}
// import _ from 'lodash'
{{/lodash}}
{{#axios}}
// import axios from 'axios'
{{/axios}}

Vue.use(GlsxVueComponents)

var mixin = {
  mounted() {
    const _this = this
    const theme = new this.$Theme()
    const connection = this.$Penpal.connectToParent({
      methods: {
        setTheme(color) {
          theme.change(color)
        },
        height() {
          return document.height || document.body.offsetHeight // document.documentElement.clientHeight || document.body.clientHeight //
        }
      }
    })
    connection.promise.then(parent => {
      const cfg = _this.$get_session_config()
      if (cfg) return
      parent.getResources().then(config => {
        _this.$set_session_config(config)
      })
    })
  }
}
const URL = 'http://oss-config.test.glsx.com.cn/mock/5be17454f31545347559d499/config'
const getConfig = (url = URL + '{{ config }}') => {
  return new Promise((resolve, reject) => {
    request({ url }).then(res => {
      if (res.status === 'success') {
        resolve({ 'vue': Vue, 'config': JSON.parse(res.data) })
      } else {
        reject('ERROR.')
      }
    })
  })
}
/* eslint-disable no-new */
const render = App => {
  new Vue({
    el: '#app',
    mixins: [mixin],
    render: h => h(App)
  })
}

export default { render, getConfig }
