export default {
  namespaced: true,
  state: {
    // 列表搜索框状态
    active: true
  },
  mutations: {
    /**
     * @description 切换状态
     * @param {Object} state state
     */
    toggle(state) {
      state.active = !state.active
    },
    /**
     * @description 设置搜索框状态
     * @param {Object} state state
     * @param {Boolean} active active
     */
    set(state, active) {
      state.active = active
    }

  },
  actions: {
    reset({ state }) {
      state.active = true
    }
  }
}
