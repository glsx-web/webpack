/*
 * @Author: limin
 * @Date: 2019-09-01 19:06:01
 * @Last Modified by: chenwq
 * @Last Modified time: 2021-01-02 15:56:36
 */

// import { LOGIN_URL, REG_URL, ROLE_LIST_URL } from '@/api/sys.account'
// import { BASE_DATA_URL } from '@/api/sys.base'
export const TYPE_NAME = 'confType'

/**
 * 前端基础数据管理对应的接口名称的key
 */
export const BaseData = {}
/**
 * 注册类型
 */
export const RegistType = {
  BY_SELF: '1', // 自注册
  BY_ADMIN: '2' // 管理员创建
}
/**
 * 前端免登录验证接口名
 */
// export const LogExternals = [
//   'fims.user.login', // 登录
//   'fims.user.register', // 注册
//   'fims.configuration.from.conftype', // 基础数据
//   'fims.role.list' // 角色列表
// ]
/**
 * 登录来源
 */
// export const LOGIN_TYPE = 1 // 1pc,2小程序
/**
 * 超级管理员类型
 */
export const SUPPER_ADMIN = 1 //

// 新值，旧值，整数部分位数，小数部分位数，最小值，最大值，规则
export function limitPrice(newValue, oldValue, intergerDigit, pointDigit, minValue, maxValue, regRule) {
  var reg = {
    priceReg: /^\d[\d\.]*$/,
    numReg: /^[1-9]\d*$/
  }
  regRule = regRule || 'priceReg'
  if (newValue && (minValue && (newValue < minValue)) || (maxValue && (newValue > maxValue))) {
    return oldValue || ''
  }
  if (newValue && reg[regRule].test(newValue + '')) {
    if ((/\./).test(newValue)) {
      newValue = newValue + ''
      var interger = newValue.split('.')[0]
      var point = newValue.split('.')[1]
      var intergerNum = interger.length > intergerDigit ? oldValue.split('.')[0] : interger
      var pointNum = point.length > pointDigit ? point.slice(0, pointDigit) : point
      newValue = pointDigit ? intergerNum + '.' + pointNum : newValue.split('.')[0]
    } else {
      newValue = newValue.length > intergerDigit ? oldValue.slice(0, intergerDigit) : newValue
    }
    return newValue
  } else {
    return newValue ? oldValue : ''
  }
}
