/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context('./modules', false, /\.js$/)
const modules = {}
const resets = []
let _default = null
files.keys().forEach(key => {
  _default = files(key).default
  key = key.replace(/(\.\/|\.js)/g, '')
  modules[key] = _default
  _default.actions && _default.actions.reset && resets.push(`d2admin/${key}/reset`)
})
export const storeResets = resets
export default {
  namespaced: true,
  modules
}
