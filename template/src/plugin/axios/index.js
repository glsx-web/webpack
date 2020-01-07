import store from '@/store'
import axios from 'axios'
import {
  Message
} from 'element-ui'
import util from '@/libs/util'
import router from '@/router'
import {
  LogExternals
} from '@/common/constants'
import Qs from 'qs'
axios.defaults.withCredentials = true
const expiresMinute = 60 // 过期时间(分钟)
// var refreshTable = false // 标记是否刷新表格
// 创建一个错误
export function errorCreate(msg) {
  const error = new Error(msg)
  errorLog(error)
  throw error
}
// 记录和显示错误
function errorLog(error) {
  // 添加到日志
  store.dispatch('d2admin/log/push', {
    message: '数据请求异常',
    type: 'danger',
    meta: {
      error
    }
  })
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>')
    console.log(error)
  }
  // 显示提示
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
}
// 网络请求公用地址 http://192.168.3.171:7300/mock/5d638b3b6fbe9a0ac59d872e/tFIMS
//  VUE_APP_API=http://192.168.3.191:8944/router
// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 5000, // 请求超时时间
  transformRequest: [function(data) {
    return Qs.stringify(data)
  }]
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    return new Promise(async resolve => {
      const { url, params } = config
      // params.refreshTable && (refreshTable = true)
      await store.commit('d2admin/loading/set', true)
      const uuid = util.cookies.get('uuid')
      // 如果请求链接不在排除列表 (排除列表: 登录 基础数据) 并且cookie 过期(判断是否长时间未操作)
      if (!LogExternals.some(u => u === url || (params && u === params.method)) && !uuid) {
        await store.dispatch('d2admin/account/logout')
        router.replace('/login')
      }
      if (uuid) { // 判断 cookie 是否存在 存在则更新时间 避免登出时 记录空值
        const inExpiresMinutes = new Date(new Date().getTime() + expiresMinute * 60 * 1000)
        util.cookies.set('uuid', uuid, {
          expires: inExpiresMinutes
        })
      }
      resolve(config)
    })
  },
  error => {
    store.commit('d2admin/loading/set', false)
    // 发送失败
    console.log(error)
    Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  response => {
    store.commit('d2admin/loading/set', false)
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const { code, data } = dataAxios
    // 有 code 代表这是一个后端接口 可以进行进一步的判断
    switch (+code) {
      case 0:
        // [ 示例 ] code === 0 代表没有错误
        // if (refreshTable) {
        //   store.commit('d2admin/refreshtable/set', !store.state.d2admin.refreshtable.value)
        //   refreshTable = false
        // }
        return data
      default:
        // 不是正确的 code
        errorCreate(`${dataAxios.message}`)
        break
    }
    // refreshTable = false
  },

  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权，请登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          break
      }
    }
    store.commit('d2admin/loading/set', false)
    errorLog(error)
    return Promise.reject(error)
  }
)
export default service
