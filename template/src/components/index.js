import Vue from 'vue'

import d2Container from './d2-container'
import authButton from './d2-auth/d2-auth-btn.js'

// 注意 有些组件使用异步加载会有影响
Vue.component('d2-container', d2Container)
Vue.component('d2-icon', () => import('./d2-icon'))
Vue.component('d2-el-icon', () => import('./d2-el-icon'))
Vue.component('d2-icon-svg', () => import('./d2-icon-svg/index.vue'))
Vue.component('d2-table-header', () => import('./d2-table-header/index.vue'))
Vue.component('d2-table', () => import('./d2-table/index.vue'))
Vue.component([authButton.name], authButton)
