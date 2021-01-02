import store from '@/store'
// import axios from 'axios'
import {
  Message
} from 'element-ui'
import util from '@/libs/util'
// import router from '@/router'
// import {
//   LogExternals
// } from '@/common/constants'
import {
  baseConfig
} from '@/main'
import Qs from 'qs'
axios.defaults.withCredentials = true
// const expiresMinute = 60 // 过期时间(分钟)
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
  // baseURL: baseURL,
  timeout: 100000, // 请求超时时间
  transformRequest: [function(data) {
    return Qs.stringify(data)
  }]
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    return new Promise(async resolve => {
      await store.commit('d2admin/loading/set', true)
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
    const ruleResult = baseConfig.axios.result
    // 这个状态码是和后端约定的
    // 有 code 代表这是一个后端接口 可以进行进一步的判断
    switch (+dataAxios[ruleResult.code_key]) {
      case ruleResult.code_success_value:
        // [ 示例 ] code === 0 代表没有错误
        return dataAxios[ruleResult.data_key]
      default:
        // 不是正确的 code
        errorCreate(`${dataAxios[ruleResult.message_key]}`)
        break
    }
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
