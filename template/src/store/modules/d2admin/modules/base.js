/*
 * @Author: limin
 * @Date: 2019-09-01 17:56:57
 * @Last Modified by: chenwq
 * @Last Modified time: 2021-01-01 17:55:54
 */
export default {
  namespaced: true,
  state: {},
  actions: {
    /**
     * 初始化获取 基础数据 并 前端持久化
     * 每次登录会强制 初始化
     * @param {*} param0
     */
    init({
      state,
      dispatch,
      commit
    }) {
      return new Promise(async resolve => {
        // Promise.all().then(async() => {
        // await dispatch('save2db', {
        //   name: '',
        //   value: state
        // })
        resolve(state)
        // })
      })
    },
    // 重置
    clear({
      state,
      dispatch
    }) {
      return new Promise(async resolve => {
        // await dispatch('save2db', {
        //   name: '',
        //   value: state
        // })
        resolve(state)
      })
    },
    /**
     * 根据名字获取基础数据
     * 获取步骤:
     * 内存 -> 前端持久化数据库 -> 后台接口
     * @param {*} param0
     * @param {*} name  名称 state 中的任意一个 强烈建议 使用 @/common/constants/BaseData 中的常量 便于灵活修改
     */
    get({
      state,
      dispatch
    }, name) {
      return new Promise(async resolve => {
        let __data = state[name]
        if (__data) {
          __data = await dispatch('getFromdb', `base.${name}`) || await dispatch('getFromAjax', name)
          state[name] = __data
          await dispatch('save2db', {
            name,
            value: __data
          })
        }
        resolve(__data)
      })
    },
    set({
      state,
      dispatch
    }, {
      name,
      value
    }) {
      return new Promise(async resolve => {
        state[name] = value
        await dispatch('save2db', {
          name,
          value
        })
        resolve(value)
      })
    },
    /**
     * 获取所有基础数据
     * 获取步骤:
     * 内存 -> 前端持久化数据库 -> 后台接口
     * @param {*} param0
     */
    load({
      state,
      dispatch
    }) {
      return new Promise(async resolve => {
        resolve()
      })
    },
    /**
     * 内部方法 从前端持久化数据库 获取指定数据
     * @param {*} param0
     * @param {*} path  数据 路径
     */
    getFromdb({
      dispatch
    }, path) {
      return new Promise(async resolve => {
        const value = await dispatch('d2admin/db/get', {
          dbName: 'database',
          path,
          user: false
        }, {
          root: true
        })
        resolve(value)
      })
    },

    /**
     * 内部方法 前端持久化 一个 数据
     * @param {*} param0
     * @param {*} param1 value 需要持久化的数据  path 需要持久化的数据路径
     */
    save2db({
      dispatch
    }, {
      value,
      name
    }) {
      return new Promise(async resolve => {
        await dispatch('d2admin/db/set', {
          dbName: 'database',
          path: name ? `base.${name}` : 'base',
          value,
          user: false
        }, {
          root: true
        })
        resolve(value)
      })
    },
    /**
     * 从后端获取一个数据
     * @param {*} param0
     * @param {*} name  @/common/constants/BaseData 中的常量
     */
    getFromAjax({
      state,
      dispatch,
      commit
    }, name) {
      return new Promise(async resolve => {
        // const value = await map[name]({ [TYPE_NAME]: Object.values(BaseData).find(data => data.KEY === name).TYPE })
        resolve()
      })
    },
    async reset({
      dispatch
    }) {
      await dispatch('clear')
    }
  }
}
