import util from '@/libs/util.js'

export default {
  namespaced: true,
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state state
     */
    versionShow() {
      util.log.capsule(process.env.VUE_APP_TITLE, `v${process.env.VUE_APP_VERSION}`)
      console.log('广联赛讯  http://www.glsx.com.cn')
    }
  }
}
