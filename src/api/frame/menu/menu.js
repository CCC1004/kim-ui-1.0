import ask from '@/utils/ask'

/**
 * Description :通过用户数据获取当前用户的菜单数据,虽然没有传递数据但是这个请求之后登录之后才能访问，所以请求头里面携带token就包含了当前用户信息
 * @param
 * @return
 * @author     :loulan
 * */
export function getMenuByUser() {
  return ask({
    url: '/static/response/json/menu.json',
    method: 'get'
  });
}

/**
 * Description :获取全部菜单
 * @param
 * @return
 * @author     :loulan
 * */
export function getMenuAll() {
  return ask({
    url: '/dawn/master/dmResources/getResourcesByType',
    method: 'get',
    params: {
      types: 'dirt,menu'
    }
  });
}

/**
 * Description :通过pid获取element（指定菜单的element）
 * @param       pid element的pid，菜单的id
 * @return
 * @author     :loulan
 * */
export function getElementByPid(pid) {
  return ask({
    url: '/dawn/master/dmResources/getResourceByTypeAndPid/'+pid,
    method: 'get',
    params: {
      types: 'button'
    }
  });
}

/**
 * Description :通过pid获取uri后端资源（指定菜单的可访问资源）
 * @param       pid uri的pid，菜单的id
 * @return
 * @author     :loulan
 * */
export function getUriByPid(pid) {
  return ask({
    url: '/dawn/master/dmResources/getResourceByTypeAndPid/'+pid,
    method: 'get',
    params: {
      types: 'uri'
    }
  });
}

/**
 * Description :添加一个资源项
 * @param       resourceForm 资源数据
 * @return
 * @author     :loulan
 * */
export function add(resourceForm) {
  return ask({
    url: '/dawn/master/dmResources/base/add',
    method: 'put',
    data: resourceForm
  });
}

/**
 * Description :更新数据库指定数据
 * @param       form 要进行更新的数据
 * @return
 * @author     :loulan
 * */
export function update(resourceForm) {
  return ask({
    url: '/dawn/master/dmResources/base/update',
    method: 'put',
    data: resourceForm
  });
}

/**
 * Description :通过id获取指定的资源数据
 * @param
 * @return
 * @author     :loulan
 * */
export function getResourceById(id) {
  return ask({
    url: '/dawn/master/dmResources/base/getDataById/'+id,
    method: 'get'
  })
}

/**
 * Description :根据id删除指定的菜单数据
 * @param       id 要删除的数据的主键
 * @return
 * @author     :loulan
 * */
export function deleteResourceById(id) {
  return ask({
    url: '/dawn/master/dmResources/base/delete/'+id,
    method: 'delete'
  });
}

/**
 * Description :获取菜单通过角色id
 * @param       roleId 角色id
 * @return
 * @author     :loulan
 * */
export function getMenusByRoleId(roleId) {
  return ask({
    url: '/dawn/master/dmResources/getResourceByRoleId/' + roleId,
    method: 'get',
    params: {
      types: 'dirt,menu'
    }
  });
}

/**
 * Description :获取element通过角色id
 * @param       roleId 角色id
 * @return
 * @author     :loulan
 * */
export function getElementsByRoleId(roleId) {
  return ask({
    url: '/dawn/master/dmResources/getResourceByRoleId/' + roleId,
    method: 'get',
    params: {
      types: 'button'
    }
  });
}

/**
 * Description :获取uri通过角色id
 * @param       roleId 角色id
 * @return
 * @author     :loulan
 * */
export function getUrisByRoleId(roleId) {
  return ask({
    url: '/dawn/master/dmResources/getResourceByRoleId/' + roleId,
    method: 'get',
    params: {
      types: 'uri'
    }
  });
}
