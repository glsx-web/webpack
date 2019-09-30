import util from '@/libs/util.js'
import { AccountLogin } from '@api/sys.account'
import { SUPPER_ADMIN } from '@/common/constants'
import { localRoutes } from '@/router/routes'
export default {
  namespaced: true,
  actions: {
    /**
     * @description 登录
     * @param {Object} context
     * @param {Object} payload username {String} 用户账号
     * @param {Object} payload password {String} 密码
     * @param {Object} payload route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
     */
    login({ dispatch, commit }, p) {
      // console.log(router.addRoutes);
      return new Promise((resolve, reject) => {
        // 开始请求登录接口
        AccountLogin(p).then(async(data = {}) => {
          // 设置 cookie 一定要存 uuid 和 token 两个 cookie
          // 整个系统依赖这两个数据进行校验和存储
          // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
          // token 代表用户当前登录状态 建议在网络请求中携带 token
          // 如有必要 token 需要定时更新，默认保存一天
          util.cookies.set('uuid', data.loginName)
          const authes = (+data.roleType === SUPPER_ADMIN)
            ? util.permision.flatten(Object.values(localRoutes))
              .map(obj => ({ authId: obj.authId, parentId: obj.parentId }))
            : _.cloneDeep(data.authes)
          await dispatch('d2admin/auth/set', authes, { root: true })
          // // 设置 vuex 用户信息
          delete data.authes
          await dispatch('d2admin/user/set', data, { root: true })
          // 初始化权限
          await dispatch('d2admin/auth/init', null, { root: true })
          // // 用户登录后从持久化数据加载一系列的设置
          await dispatch('load')
          // 结束
          resolve()
        })
          .catch(err => {
            console.log('err: ', err)
            reject(err)
          })
      })
    },
    /**
     * @description 注销用户并返回登录页面
     * @param {Object} context
     * @param {Object} payload confirm {Boolean} 是否需要确认
     */
    logout({ commit, dispatch }, { confirm = false } = {}) {
      /**
       * @description 注销
       */
      return new Promise(async resolve => {
        // 删除cookie
        util.cookies.remove('uuid')
        // await dispatch('d2admin/user/clear', null, { root: true })
        // await dispatch('d2admin/base/clear', null, { root: true })
        // await commit('d2admin/page/setCurrent', null, { root: true })
        // await commit('d2admin/auth/set', null, { root: true })
        resolve()
      })
    },
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} context
     */
    load({ dispatch }) {
      return new Promise(async resolve => {
        // DB -> store 加载用户名
        await dispatch('d2admin/user/load', null, { root: true })
        // DB -> store 加载主题
        await dispatch('d2admin/theme/load', null, { root: true })
        // DB -> store 加载页面过渡效果设置
        await dispatch('d2admin/transition/load', null, { root: true })
        // DB -> store 持久化数据加载上次退出时的多页列表
        await dispatch('d2admin/page/openedLoad', null, { root: true })
        // DB -> store 持久化数据加载侧边栏折叠状态
        await dispatch('d2admin/menu/asideCollapseLoad', null, { root: true })
        // DB -> store 持久化数据加载全局尺寸
        await dispatch('d2admin/size/load', null, { root: true })
        // DB - > 初始化 基础数据
        // await dispatch('d2admin/base/init', null, { root: true })
        // 后台接口 -> store
        // await dispatch('d2admin/auth/init', null, { root: true })
        // end
        resolve()
      })
    }
  }
}
