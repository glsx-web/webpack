/*
 * @Author: limin
 * @Date: 2019-08-26 18:02:49
 * @Last Modified by: chenwq
 * @Last Modified time: 2020-11-27 22:22:25
 */
import sha1 from 'sha1'
import qs from 'qs'
const secret = window.location.href.includes('dj.glsx.com.cn') ? '4bc07f8868374c49a4661d603377e3106fc9a45bccaaa353' : 'c24619ed7fef02a0ae16328146bca5f97cc6493957a2137b'
const sign = (params, noSignAttr = []) => {
  delete params.sign
  var objStr = qs.stringify(_.cloneDeep(params), { arrayFormat: 'indices', encode: false, allowDots: true })
  var objVal = objStr.split('&')
  var realObj = {}
  objVal.forEach(item => {
    realObj[item.split('=')[0]] = item.split('=')[1]
  })
  const keys = Object.keys(realObj).sort()
  var str = []
  var obj = null
  for (const key in realObj) {
    obj = realObj[key]
    if (obj === null) {
      obj = ''
    } else if (typeof obj === 'object') {
      obj = JSON.stringify(obj)
    }
    realObj[key] = obj
  }
  keys.forEach(e => {
    !noSignAttr.includes(e) && str.push(e + realObj[e])
  })
  realObj.sign = sha1(secret + str.join('') + secret).toUpperCase()
  return realObj
}
export default sign
