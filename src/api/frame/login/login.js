import ask from '@/utils/ask'

/**
 * Description :login提交登录数据的方法
 * @param
 * @return      登录成功之后的数据比如token
 * @author     :loulan
 * */
export function loginByUsername(loginForm) {

  return ask({
    url: '/dawn/security/oauth/token',
    method: 'get',
    params: loginForm
  });
}

/**
 * Description :获取用户信息，包括菜单，按钮等信息
 * @param
 * @return
 * @author     :loulan
 * */
export function getUserInfo() {
  return ask({
    url: '/dawn/master/dmUser/login/currentUserLoginInfo',
    method: 'get'
  });
}
