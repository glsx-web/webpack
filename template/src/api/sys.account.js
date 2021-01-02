/*
 * @Author: limin
 * @Date: 2019-08-26 18:02:55
 * @Last Modified by: chenwq
 * @Last Modified time: 2021-01-02 15:55:07
 */

import request from './request'
import RequestMethods from './request.methods'
// 用户相关
const USER_PATH = 'dj.api.'

export const LOGIN_URL = `${USER_PATH}user.login`
export const REG_URL = `${USER_PATH}register`

/**
 * 用户登录
 * @param {*} data 参数
 */
export function AccountLogin(data) {
  data.method = LOGIN_URL
  // return request(data, RequestMethods.POST)
  return new Promise(resolve => {
    resolve({
      roleType: 1,
      userName: 'admin',
      loginName: 'foutouren',
      authes: []
    })
  })
}

/**
 * 注册
 * @param {*} data 参数
 */
export function Reg(data = {}) {
  data.method = REG_URL
  return request(data, RequestMethods.GET)
}

/**
 * 修改密码
 * @param {*} data
 */
export function ModifyPassword(data) {
  data.method = `${USER_PATH}password.modify`
  return request(data, RequestMethods.POST)
}
