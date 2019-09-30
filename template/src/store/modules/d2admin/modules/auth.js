/*
 * @Author: limin
 * @Date: 2019-08-27 17:25:12
 * @Last Modified by: limin
 * @Last Modified time: 2019-09-19 10:45:51
 */
import util from '@/libs/util.js'
import router, { ResetRouter } from '@/router'
import { localRoutes, frameInRoutes, sys } from '@/router/routes'

export default {
  namespaced: true,
  state: {
    source: null,
    meta: {},
    btns: {},
    btnIdAll: []
  },
  getters: {
    /**
     * @description 返回当前登录用户权限资源
     * @param {Object} state state
     */
    source(state) {
      return state.source
    },
    /**
     * @description 返回当前页面meta
     * @param {Object} state state
     */
    meta(state) {
      return state.meta
    },
    /**
     * @description 当前角色拥有的所有按钮
     * @param {Object} state state
     */
    btns(state) {
      return state.btns
    },
    /**
     * 返回当前页面的btn
     * @param {*} state
     */
    curBtns(state) {
      return state.btns[state.meta.authId]
    },
    /**
     * 返回当前页面的btn
     * @param {*} state
     */
    btnIdAll(state) {
      return state.btnIdAll
    }
  },
  actions: {
    save2db({ state, dispatch }) {
      return new Promise(async resolve => {
        // 设置数据
        dispatch('d2admin/db/set', {
          dbName: 'database',
          path: 'source',
          value: state.source,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * @description 保存当前角色权限资源
     * @param {obj} source 需要保存的权限资源
     */
    set({ state, dispatch }, source) {
      return new Promise(async resolve => {
        // 检查这个主题在主题列表里是否存在
        state.source = source
        // 持久化数据 防止刷新 数据 丢失
        await dispatch('save2db')
        // end
        resolve()
      })
    },
    /**
     * @description 保存当前角色权限资源
     * @param {obj} source 需要保存的权限资源
     */
    setCurrentPageMeta({ state }, meta) {
      return new Promise(async resolve => {
        state.meta = meta
        // end
        resolve()
      })
    },
    /**
     * @description 从持久化数据加载资源数据
     * @param {Object} context
     */
    load({ state, dispatch }) {
      return new Promise(async resolve => {
        if (!state.source) {
          state.source = await dispatch('d2admin/db/get', {
            dbName: 'database',
            path: 'source',
            user: true
          }, { root: true })
        }
        // end
        resolve(state.source)
      })
    },
    /**
     * 过滤并初始化路由与左侧菜单栏
     * @param {*} param0
     */
    init({ state, dispatch }) {
      return new Promise(async resolve => {
        // 获取权限资源点
        const __source = await dispatch('load')
        await dispatch('_initRoutes', __source)
        await dispatch('_initByRole', __source)
        // end
        resolve(state.source)
      })
    },

    _initRoutes({ state }, source) {
      return new Promise(async resolve => {
        try {
          const { route, btn } = util.permision.packRoutesBtns(localRoutes, source)
          router.matcher = ResetRouter().matcher // 重置基础路由 解决切换用户 保留上一个用户路由问题
          frameInRoutes[0].children = [...route, ...sys]
          router.addRoutes(frameInRoutes)
          state.btns = btn
        } catch (error) {
          if (error.message === '参数错误' && !source) {
            router.replace('/login')
            return false
          }
        }
        // end
        resolve()
      })
    },

    _initByRole({ commit }, source) {
      return new Promise(async resolve => {
        const __aMenus = util.permision.packAsideMenus(localRoutes, source)
        await commit('d2admin/page/init', frameInRoutes, { root: true })
        await commit('d2admin/menu/asideSet', __aMenus, { root: true })
        await commit('d2admin/search/init', __aMenus, { root: true })
        // end
        resolve()
      })
    },
    async reset({ state, dispatch }) {
      state.source = null
      state.meta = {}
      state.btns = {}
      state.btnIdAll = []
      await dispatch('save2db')
    }
  }
}
