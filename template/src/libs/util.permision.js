/*
 * @Author: limin
 * @Date: 2019-08-27 19:16:26
 * @Last Modified by: limin
 * @Last Modified time: 2019-09-17 17:20:53
 */
const permision = {}
/**
 * 打包如有与按钮
 * resources 所有资源集合
 * idsInPermision 返回的权限id集合
 */
permision.packRoutesBtns = function(resources, idsInPermision) {
  if (!resources || !idsInPermision || !idsInPermision.length) {
    throw new Error('参数错误')
  }
  const __aRouteInPermision = []
  const __oBtnInPermision = {}
  let __objResource = null
  let __obj = null
  idsInPermision.forEach(obj => {
    __objResource = resources[obj.authId]
    if (__objResource) { // 直接能取到的为路由  (也可以在routes 中定标识变量)
      __aRouteInPermision.push(resources[obj.authId]) // push 进 路由数组
    } else { // 如果取不到 判断是否有父节点 并且父节点是否有auth属性 有 则视为按钮 (同样可以定义标识变量)
      __objResource = resources[obj.parentId]
      if (__objResource && __objResource.auth) {
        __obj = __objResource.auth.find(o => +o.authId === +obj.authId)
        if (__oBtnInPermision[obj.parentId] && __oBtnInPermision[obj.parentId].length) {
          __oBtnInPermision[obj.parentId].push(__obj)
        } else {
          __oBtnInPermision[obj.parentId] = [__obj]
        }
      // __oBtnInPermision[obj.parentId] = __objResource.auth
      // __aBtnIdAll = __aBtnIdAll.concat([...__objResource.auth.action.map(o=>o.authId),...__objResource.auth.operation.map(o=>o.authId)])
      }
    }
  })
  return {
    'route': __aRouteInPermision,
    'btn': __oBtnInPermision
  }
}

/**
 * 打包菜单
 * resources 所有资源集合
 * idsInPermision 返回的权限id集合
 */
permision.packAsideMenus = function(resources, idsInPermision) {
  if (!resources || !idsInPermision || !idsInPermision.length) {
    throw new Error('参数错误')
  }
  return _loop(idsInPermision, obj => permision.format2Menu(resources[obj.authId]))
}

/**
 * 打包菜单
 * resources 所有资源集合
 * idsInPermision 返回的权限id集合
 */
permision.packMenusBtns = function(resources) {
  if (!resources) {
    throw new Error('参数错误')
  }
  const menus = _loop(resources, obj => permision.format2ResourceMenu(obj))
  return { menus, all: [] }
}

const _loop = function(res, fnGetMenu) {
  const __aParent = []
  const __aSub = []
  /**
   * 第一次循环 分出一级菜单与所有子菜单
   */
  res.forEach(obj => {
    const __oMenu = fnGetMenu(obj)
    if (!__oMenu) { // 不存在 可能是 按钮  直接继续循环
      return true
    }
    if (+(__oMenu.parentId) === 0) { // 取出1级菜单
      __aParent.push(__oMenu)
    } else { // 取出子菜单
      __aSub.push(__oMenu)
    }
  })
  /**
     * 第二次循环所有子菜单 ,然后挂载到对应的一级菜单
     */
  let __parent = null
  __aSub.forEach(obj => {
    __parent = __aParent.find(menu => +(menu.authId) === +(obj.parentId))
    if (__parent) {
      if (__parent.children) {
        __parent.children.push(obj)
      } else {
        __parent.children = [obj]
      }
    }
  })
  return __aParent
}

/**
 * 格式化菜单 封装成系统所需格式
 */
permision.format2Menu = function(oMenu) {
  if (!oMenu) return null
  const { icon, path, meta } = oMenu
  const { title, authId, parentId } = meta
  return {
    title,
    icon,
    path,
    authId,
    parentId }
}

/**
 * 格式化菜单 封装成系统所需格式
 */
permision.format2ResourceMenu = function(oMenu) {
  if (!oMenu) return null
  const { icon, meta, auth } = oMenu
  const { title, authId, parentId } = meta
  return {
    label: title,
    icon,
    authId,
    parentId,
    auth }
}

/**
 * 扁平化 routes (@/router/routes)
 */
permision.flatten = function(arr) {
  return arr.reduce((result, item) => {
    item.authId = item.authId || item.meta.authId
    item.parentId = item.parentId || item.meta.parentId
    const cloneItem = _.cloneDeep(item)
    delete cloneItem.auth
    return result.concat(item.auth ? permision.flatten([...item.auth, cloneItem]) : item)
  }, [])
}
export default permision
