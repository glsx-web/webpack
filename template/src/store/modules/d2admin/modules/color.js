import client from 'webpack-theme-color-replacer/client'
import forElementUI from 'webpack-theme-color-replacer/forElementUI'

export default {
  namespaced: true,
  state: {
    // 颜色
    value: process.env.VUE_APP_ELEMENT_COLOR
  },
  getters: {
    /**
     * @description 返回当前颜色值
     * @param {Object} state state
     */
    color(state, dispatch) {
      return state.value
    }
  },
  actions: {
    /**
     * @description 设置颜色
     * @param {Object} context
     * @param {String} color 尺寸
     */
    set({ state, dispatch, commit }, color) {
      return new Promise(async resolve => {
        // 记录上个值
        const old = state.value
        // store 赋值
        state.value = color || process.env.VUE_APP_ELEMENT_COLOR
        // 持久化
        await dispatch('d2admin/db/set', {
          dbName: 'sys',
          path: 'color.value',
          value: state.value,
          user: true
        }, { root: true })
        // 应用
        commit('apply', {
          oldColor: old,
          newColor: state.value
        })
        // end
        resolve()
      })
    },
    /**
     * @description 从持久化数据读取颜色设置
     * @param {Object} context
     */
    load({ state, dispatch, commit }) {
      return new Promise(async resolve => {
        // 记录上个值
        const old = state.value
        // store 赋值
        state.value = await dispatch('d2admin/db/get', {
          dbName: 'sys',
          path: 'color.value',
          defaultValue: process.env.VUE_APP_ELEMENT_COLOR,
          user: true
        }, { root: true })
        // 应用
        commit('apply', {
          oldColor: old,
          newColor: state.value
        })
        // end
        resolve()
      })
    },
    loadFromDB({ state, dispatch, commit }) {
      return new Promise(async resolve => {
        const color = await dispatch('d2admin/db/get', {
          dbName: 'sys',
          path: 'color.value',
          defaultValue: '',
          user: true
        }, { root: true })
        resolve(color)
      })
    }
    // reset({ state, dispatch, commit }) {
    //   return new Promise(async resolve => {
    //     await dispatch('set', '')
    //     resolve()
    //   })
    // }
  },
  mutations: {
    /**
     * @description 将 vuex 中的主题颜色设置应用到系统中
     * @param {Object} context
     * @param {Object} payload oldColor {String} 旧的颜色
     * @param {Object} payload newColor {String} 新颜色
     */
    apply(state, { oldColor, newColor }) {
      var options = {
        oldColors: [...forElementUI.getElementUISeries(oldColor)],
        newColors: [...forElementUI.getElementUISeries(newColor)]
      }
      client.changer.changeColor(options)
    }
  }
}
