/*
 * @Author: limin
 * @Date: 2019-08-26 18:02:41
 * @Last Modified by: chenwq
 * @Last Modified time: 2021-01-02 11:28:55
 */

import axios from '@/plugin/axios'
import sign from './sign'
import RequestMethods from './request.methods'
import {
  baseConfig
} from '@/main'
const request = (params = {}, method = RequestMethods.GET, noSignAttr = []) => {
  params.timestamp = new Date().getTime()
  /**
   * mock - url = params.method
   * 调后端接口 - url = ''
   */
  const url = baseConfig.axios.baseURL + params.method
  var reqData = (method === RequestMethods.POST) ? {
    baseURL: url,
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
