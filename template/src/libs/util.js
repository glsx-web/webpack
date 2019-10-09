import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'
import permision from './util.permision'
const util = {
  cookies,
  db,
  log,
  permision
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function(titleText) {
  const processTitle = process.env.VUE_APP_TITLE
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function(url, target) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', target || '_blank')
  a.setAttribute('id', 'd2admin-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('d2admin-link-temp'))
}
/**
* 深克隆 所有原型链上的对象和属性
* 例: const bar=deepClone(foo)
* console.log(bar===foo) false
* @param {*} obj
*/
util.deepClone = (obj) => {
  // Handle the 3 simple types, and null or undefined or function
  if (obj == null || typeof obj !== 'object') return obj
  // Handle Date
  if (obj instanceof Date) {
    const copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }
  // Handle Array or Object
  if (obj instanceof Array | obj instanceof Object) {
    const copy = (obj instanceof Array) ? [] : {}
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) { copy[attr] = util.deepClone(obj[attr]) }
    }
    return copy
  }
  throw new Error("Unable to clone obj! Its type isn't supported.")
}
/**
 * 深度递归搜索
 * @param {Array} arr 你要搜索的数组
 * @param {Function} condition 回调函数，必须返回谓词，判断是否找到了。会传入(item, index, level)三个参数
 * @param {String} children 子数组的key
 */
util.deepFind = function(menus, id) {
  const cloneMenus = util.deepClone(menus)
  for (let menu of cloneMenus) {
    if (menu.id === id) {
      delete menu.children
      return menu
    }
    if (menu.children) {
      return util.deepFind(menu.children, id)
    }
  }
  return null
}

/**
* 16进制颜色值 转换为 rgb
* @param {*} sColor  16进制颜色值
* @param {*} alpha 透明度
*/
util.colorToRgb = (sColor, alpha) => {
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  sColor = sColor.toLowerCase()
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#'
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    // 处理六位的颜色值
    var sColorChange = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    }
    if (alpha || alpha === 0 || alpha === '0') {
      return `rgba(${sColorChange.join(',')} ,${alpha})`
    }
    return `rgb(${sColorChange.join(',')})`
  } else {
    return sColor
  }
}

/**
 * 重置form
 * 用法: util.resetForm.call(this,'formName')
 */
util.resetForm = function(formName) {
  this.$nextTick(() => {
    for (var key in this[formName]) {
      if (this[formName].hasOwnProperty(key)) {
        this[formName][key] = ''
      }
    }
    this.$refs[formName] && this.$refs[formName].resetFields()
  })
}

/**
 * 格式化时间
 * @param {Array} time
 */
util.formatTime = function(time) {
  return {
    startTime: time ? time[0] + ' ' + '00:00:00' : '',
    endTime: time ? time[1] + ' ' + '23:59:59' : ''
  }
}

export default util
