import Vue from 'vue'
import Vuex from 'vuex'

import d2admin, { storeResets } from './modules/d2admin'
Vue.prototype.$StoreReset = function() {
  return new Promise(resolve => {
    storeResets.forEach(reset => this.dispatch(reset))
    resolve()
  })
}
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    d2admin
  }
})
