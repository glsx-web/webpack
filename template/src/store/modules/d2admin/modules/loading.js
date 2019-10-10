/*
 * @Author: limin
 * @Date: 2019-09-15 17:34:41
 * @Last Modified by: limin
 * @Last Modified time: 2019-09-19 10:21:06
 */

export default {
  namespaced: true,
  state: {
    // 加载中...
    value: false
  },
  getters: {
    /**
     * 返回当前加载状态
     * @param {*} state
     */
    loading(state) {
      return state.value
    }
  },
  mutations: {
    /**
     * @description 设置加载中
     * @param {Object} state state
     * @param {Boolean} loading loading
     */
    set(state, loading) {
      return new Promise(resolve => {
        state.value = loading
        resolve()
      })
    }
  },
  actions: {
    reset({ state }) {
      state.value = false
    }
  }
}
