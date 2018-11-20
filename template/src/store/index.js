/*
 * @Author: limin
 * @Date: 2018-06-25 10:29:36
 * @Last Modified by: limin
 * @Last Modified time: 2018-07-14 03:31:43
 */
import { storeModules } from 'glsx-vue-admin'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    ...storeModules
  }
})
export default store
