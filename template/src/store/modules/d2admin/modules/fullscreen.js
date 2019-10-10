import screenfull from 'screenfull'

export default {
  namespaced: true,
  state: {
    // 全屏激活
    active: false
  },
  actions: {
    /**
     * @description 初始化监听
     * @param {Object} context
     */
    listen({ commit }) {
      return new Promise(resolve => {
        screenfull.enabled && screenfull.on('change', () => !screenfull.isFullscreen && commit('set', false))
        // end
        resolve()
      })
    },
    /**
     * @description 切换全屏
     * @param {Object} context
     */
    toggle({ commit }) {
      return new Promise(resolve => {
        if (screenfull.isFullscreen) {
          screenfull.exit()
          commit('set', false)
        } else {
          screenfull.request()
          commit('set', true)
        }
        // end
        resolve()
      })
    },
    reset({ state }) {
      state.active = false
    }
  },
  mutations: {
    /**
     * @description 设置 store 里的全屏状态
     * @param {Object} state state
     * @param {Boolean} active active
     */
    set(state, active) {
      state.active = active
    }
  }
}
