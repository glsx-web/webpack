/*
 * @Author: limin
 * @Date: 2019-08-26 18:02:55
 * @Last Modified by: chenwq
 * @Last Modified time: 2019-09-29 10:15:46
 */

import request from './request'
import RequestMethods from './request.methods'
// 用户相关
const USER_PATH = 'fims.user.'
// 角色相关
const ROLE_PATH = 'fims.role.'

export const LOGIN_URL = `${USER_PATH}loginTem`
export const REG_URL = `${USER_PATH}register`
export const ROLE_LIST_URL = `${ROLE_PATH}list`

/**
 * 用户登录
 * @param {*} data 参数
 */
export function AccountLogin(data) {
  data.method = LOGIN_URL
  return request(data, RequestMethods.POST)
}

/**
 * 注册
 * @param {*} data 参数
 */
export function Reg(data = {}) {
  data.method = REG_URL
  data.refreshTable = true
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

/**
 * 获取用户列表
 * @param {*} data 参数
 */
export function UserList(data = {}) {
  data.method = `${USER_PATH}search`
  return request(data, RequestMethods.GET)
}

/**
 * 重置密码
 * @param {*} data 参数
 */
export function PassWordReset(data = {}) {
  data.refreshTable = true
  data.method = `${USER_PATH}password.reset`
  return request(data, RequestMethods.GET)
}

/**
 * 帐户编辑
 * @param {*} data 参数
 */
export function AccountModify(data = {}) {
  data.refreshTable = true
  data.method = `${USER_PATH}modify`
  return request(data, RequestMethods.GET)
}

/**
 * 帐户延期
 * @param {*} data 参数
 */
export function AccountIncrease(data = {}) {
  data.refreshTable = true
  data.method = `${USER_PATH}validity.increase`
  return request(data, RequestMethods.GET)
}

/**
 * 帐户禁用
 * @param {*} data 参数
 */
export function AccountForbidden(data = {}) {
  data.refreshTable = true
  data.method = `${USER_PATH}forbidden`
  return request(data, RequestMethods.GET)
}

/**
 * 帐户激活
 * @param {*} data 参数
 */
export function AccountActived(data = {}) {
  data.refreshTable = true
  data.method = `${USER_PATH}actived`
  return request(data, RequestMethods.GET)
}

/**
 * 帐户审核
 * @param {*} data 参数
 */
export function AccountValidate(data = {}) {
  data.refreshTable = true
  data.method = `${USER_PATH}check`
  return request(data, RequestMethods.GET)
}

/**
 * 获取登录日志
 * @param {} data
 */
export function getLoginlogs(data) {
  data.method = `${USER_PATH}search.loginlog`
  return request(data)
}

/**
 * 获取角色权限资源列表
 * @param {*} data 参数
 */
export function RoleAuthData(data = {}) {
  data.method = `${ROLE_PATH}authority.data`
  return request(data, RequestMethods.GET)
}

/**
 * 创建角色
 * @param {*} data 参数
 */
export function RoleReg(data = {}) {
  data.refreshTable = true
  data.method = `${ROLE_PATH}register`
  return request(data, RequestMethods.GET)
}

/**
 * 权限修改
 * @param {*} data 参数
 */
export function RoleModify(data = {}) {
  data.refreshTable = true
  data.method = `${ROLE_PATH}modify`
  return request(data, RequestMethods.GET)
}

/**
 * 权限列表
 * @param {*} data 参数
 */
export function RoleList(data = {}) {
  data.method = ROLE_LIST_URL
  return request(data, RequestMethods.GET)
}

/**
 * 角色详情
 * @param {*} data 参数
 */
export function RoleDetail(data = {}) {
  data.method = `${ROLE_PATH}detail`
  return request(data, RequestMethods.GET)
}
