/*
 * @Author: limin
 * @Date: 2019-09-06 10:12:23
 * @Last Modified by: limin
 * @Last Modified time: 2019-09-06 13:23:25
 */

import Vue from 'vue'
import * as filters from './src'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
