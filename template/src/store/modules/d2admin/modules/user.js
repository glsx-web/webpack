const SESSION_NAME = `${process.env.VUE_APP_STORAGE_PREFIX}-${process.env.VUE_APP_VERSION}-info`

export default {
  namespaced: true,
  state: {
    // 用户信息 采用sessionStorage管理 方便判断用户是否关闭浏览器
    info: {}
  },
  actions: {
    /**
     * @description 设置用户数据
     * @param {Object} context
     * @param {*} info info
     */
    set({ state, dispatch }, info) {
      return new Promise(async resolve => {
        // store 赋值
        state.info = info
        sessionStorage.setItem(SESSION_NAME, escape(JSON.stringify(info)))
        resolve()
      })
    },
    /**
     * @description 从数据库取用户数据
     * @param {Object} context
     */
    load({ state, dispatch }) {
      return new Promise(async resolve => {
        state.info = JSON.parse(unescape(sessionStorage.getItem(SESSION_NAME)))
        resolve(state.info)
      })
    },

    clear({ state }) {
      return new Promise(async resolve => {
        state.info = null
        sessionStorage.removeItem(SESSION_NAME)
        resolve()
      })
    },
    reset({ dispatch }) {
      dispatch('clear')
    }
  }
}
