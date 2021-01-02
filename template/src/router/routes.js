import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示(children 由后台返回资源点集合 从 resources 中动态过滤加载)
 */
const frameIn = [{
  path: '/',
  redirect: {
    name: 'index'
  },
  component: layoutHeaderAside,
  children: []
}]
/**
 * 首页
 * icon：element-ui
 */
export const home = {
  path: '/index',
  name: 'index',
  icon: 's-home',
  meta: {
    title: 'echats',
    authId: '101',
    parentId: '0',
    cache: true
  },
  component: _import('index')
}
export const sys = [
  // 系统 前端日志
  // {
  //   path: '/log',
  //   name: 'log',
  //   meta: {
  //     title: '前端日志',
  //   },
  //   component: _import('system/log')
  // },
  // 刷新页面 必须保留
  {
    path: '/refresh',
    name: 'refresh',
    hidden: true,
    component: _import('system/function/refresh')
  },
  // 页面重定向 必须保留
  {
    path: 'redirect/:route*',
    name: 'redirect',
    hidden: true,
    component: _import('system/function/redirect')
  }
]

/**
 * 所有需动态过滤的资源点
 */
export const resources = {
  '102': {
    path: '/bb',
    icon: 'document',
    name: '表格组件',
    meta: {
      title: '表格组件',
      authId: '102',
      parentId: '0'
    }
  },
  '10201': {
    path: '/table1',
    icon: 'document-copy',
    name: 'fimsTable1',
    meta: {
      title: '默认使用',
      authId: '10201',
      parentId: '102',
      cache: true
    },
    component: _import('table1'),
    auth: [{
      authId: '1020101',
      parentId: '10201',
      label: '编辑',
      handle: 'handleEdit'
    }, {
      authId: '1020102',
      parentId: '10201',
      label: '审核',
      color: '#FF0000',
      handle: 'handleDelete',
      ruleObj: {
        attr: 'status',
        rule: { 1: '待审核', 2: '退回', 3: '' }
      }
    }, {
      authId: '1020103',
      parentId: '10201',
      label: '添加',
      category: 'Button',
      type: 'primary',
      handle: 'handleEdit',
      icon: 'plus'
    }, {
      authId: '1020104',
      parentId: '10201',
      label: '批量操作',
      category: 'Button',
      handle: 'handleOperate'
    }]
  },
  '10202': {
    path: '/table2',
    icon: 'finished',
    name: 'fimsTable2',
    meta: {
      title: '外部数据传入',
      authId: '10202',
      parentId: '102',
      cache: true
    },
    component: _import('table2')
  }
}

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
export const errorPage = {
  path: '*',
  name: '404',
  component: _import('system/error/404')
}

// 导出需要显示菜单的
export const frameInRoutes = frameIn

export const localRoutes = {
  ...resources, [home.meta.authId]: home
}

// 重新组织后导出
export default [
  ...frameOut,
  errorPage
]
