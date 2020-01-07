/*
 * @Author: limin
 * @Date: 2019-08-26 18:02:41
 * @Last Modified by: chenwq
 * @Last Modified time: 2020-01-07 15:59:32
 */

import axios from '@/plugin/axios'
import sign from './sign'
import RequestMethods from './request.methods'
const request = (params = {}, method = RequestMethods.GET, noSignAttr = []) => {
  params.source = '{{ name }}'
  params.app_key = '48e5e13229b82c1b4e6e8c96151f0637'
  params.timestamp = new Date().getTime()
  params.v = '1.0.0'
  params.format = 'json'
  const url = '' // params.method // ''
  var reqData = (method === RequestMethods.POST) ? {
    baseURL: process.env.VUE_APP_API + '?method=' + params.method,
    data: sign(params, noSignAttr)
  } : {
    params: sign(params, noSignAttr)
  }
  return axios({
    url,
    method,
    ...reqData
  })
}
export default request
