/*
 * @Author: chenwq
 * @Date: 2019-09-27 11:39:49
 * @Last Modified by: chenwq
 * @Last Modified time: 2020-01-07 11:15:33
 */

export default {
  namespaced: true,
  state: {
    // 刷新表格
    // noFresh - 不需要刷新；fresh - 需要刷新； needFresh - 刷新前标记
    value: 'noFresh'
  },
  getters: {
    /**
     * 返回刷新表格状态
     * @param {*} state
     */
    refresh(state) {
      return state.value
    }
  },
  mutations: {
    /**
     * @description 设置表格刷新
     * @param {Object} state state
     * @param {Boolean} refresh refresh
     */
    set(state, refresh) {
      return new Promise(resolve => {
        state.value = refresh
        resolve(true)
      })
    }
  },
  actions: {
    reset({
      state
    }) {
      state.value = false
    }
  }
}
