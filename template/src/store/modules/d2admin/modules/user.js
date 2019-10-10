const SESSION_NAME = `${process.env.VUE_APP_STORAGE_PREFIX}-${process.env.VUE_APP_VERSION}-user`

export default {
  namespaced: true,
  state: {
    // 用户信息 采用sessionStorage管理 方便判断用户是否关闭浏览器
    info: ''
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
        // 持久化
        // await dispatch('d2admin/db/set', {
        //   dbName: 'sys',
        //   path: 'user.info',
        //   value: info,
        //   user: true
        // }, { root: true })
        sessionStorage.setItem(SESSION_NAME, escape(JSON.stringify(info)))
        // end
        resolve()
      })
    },
    /**
     * @description 从数据库取用户数据
     * @param {Object} context
     */
    load({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        // state.info = await dispatch('d2admin/db/get', {
        //   dbName: 'sys',
        //   path: 'user.info',
        //   defaultValue: {},
        //   user: true
        // }, { root: true })
        state.info = JSON.parse(unescape(sessionStorage.getItem(SESSION_NAME)))
        // end
        resolve()
      })
    },

    clear({ state }) {
      return new Promise(async resolve => {
        // await dispatch('d2admin/db/set', {
        //   dbName: 'database',
        //   path: 'user',
        //   value: {},
        //   user: true
        // }, { root: true })
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
