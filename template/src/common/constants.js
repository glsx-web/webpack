/*
 * @Author: limin
 * @Date: 2019-09-01 19:06:01
 * @Last Modified by: limin
 * @Last Modified time: 2019-09-18 20:07:42
 */

// import { LOGIN_URL, REG_URL, ROLE_LIST_URL } from '@/api/sys.account'
// import { BASE_DATA_URL } from '@/api/sys.base'
export const TYPE_NAME = 'confType'

/**
 * 后台提供一个接 通过类型获取对应数据
 * 此处定义类型
 */
export const ConfigType = {
  STATION: 'STATION_TYPE',
  POST: 'POST_TYPE',
  SUBSYS: 'SUBSYSTEM_TYPE'
}
/**
 * 前端基础数据管理对应的接口名称的key
 */
export const BaseData = {
  ROLE: { KEY: 'role', TYPE: '' },
  STATION: { KEY: 'station', TYPE: ConfigType.STATION },
  POST: { KEY: 'post', TYPE: ConfigType.POST },
  SUBSYS: { KEY: 'subsys', TYPE: ConfigType.SUBSYS }
}
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
export const LogExternals = [
  'fims.user.login', // 登录
  'fims.user.register', // 注册
  'fims.configuration.from.conftype', // 基础数据
  'fims.role.list' // 角色列表
]
/**
 * 登录来源
 */
export const LOGIN_TYPE = 1 // 1pc,2小程序
/**
 * 超级管理员类型
 */
export const SUPPER_ADMIN = 1 //

/**
 * 职务置灰选项
 */
export const POST_DISABLED = ['2001', '2002', '2003'] // 总经理 仓库 部门经理
