import App from './index.vue'
import base from '@/base'
import GlsxVueCommon from 'glsx-vue-common'
base.getConfig().then(data => {
  const { vue, config } = data
  vue.use(GlsxVueCommon, config)
  base.render(App)
})
