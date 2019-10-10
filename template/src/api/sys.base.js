/*
 * @Author: limin
 * @Date: 2019-08-26 18:02:55
 * @Last Modified by: chenwq
 * @Last Modified time: 2019-09-30 10:57:13
 */

import request from './request'
import RequestMethods from './request.methods'

export const BASE_DATA_URL = 'fims.configuration.from.conftype'

/**
 * 获取角色列表
 * @param {*} data 参数
 */
export function FetchRoleList(data = {}) {
  data.method = 'fims.role.list'
  return request(data, RequestMethods.GET)
}

/**
 * 获取基础数据
 * @param {*} data 参数
 */
export function BaseDataApi(data = {}) {
  data.method = BASE_DATA_URL
  return request(data, RequestMethods.GET)
}
