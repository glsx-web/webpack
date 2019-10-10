/*
 * @Author: limin
 * @Date: 2019-08-31 12:44:08
 * @Last Modified by:   limin
 * @Last Modified time: 2019-08-31 12:44:08
 */

export default {
  name: 'focus',
  inserted: function(el) {
    el.querySelector('input').focus()
  }
}
