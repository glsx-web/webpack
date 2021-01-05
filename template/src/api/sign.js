/*
 * @Author: limin
 * @Date: 2019-08-26 18:02:49
 * @Last Modified by: chenwq
 * @Last Modified time: 2021-01-03 14:34:44
 */
import MD5 from 'js-md5'
const secret = 'c24619ed7fef02a0ae16328146bca5f97cc6493957a2137b'
const sign = (params, noSignAttr = []) => {
  delete params.sign
  const keys = Object.keys(params).sort()
  var str = []
  var obj = null
  for (const key in params) {
    obj = params[key]
    if (obj === null || obj === undefined) {
      obj = ''
    } else if (typeof obj === 'object') {
      obj = JSON.stringify(obj)
    }
    params[key] = obj
  }
  keys.forEach(e => {
    !noSignAttr.includes(e) && str.push(e + params[e])
  })
  params.sign = MD5(secret + str.join('') + secret)
  return params
}
export default sign
