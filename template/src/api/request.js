/*
 * @Author: limin
 * @Date: 2019-08-26 18:02:41
 * @Last Modified by: chenwq
 * @Last Modified time: 2019-09-29 10:14:21
 */

import axios from '@/plugin/axios'
import sign from './sign'
import RequestMethods from './request.methods'
const request = (params = {}, method = RequestMethods.GET, noSignAttr = []) => {
  params.source = '1'
  params.app_key = '48e5e13229b82c1b4e6e8c96151f0637'
  params.timestamp = new Date().getTime()
  params.v = '1.0.0'
  params.format = 'json'
  const url = params.method // ''
  return axios({
    url,
    method,
    params: sign(params, noSignAttr)
  })
}
export default request
