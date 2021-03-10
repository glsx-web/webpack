import Vue from 'vue'

// 注意 有些组件使用异步加载会有影响
Vue.component('d2-table', () => import('./d2-table/index.vue'))
