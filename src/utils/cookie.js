/*********************************************************
 ** 描述:  这个是操作cookie的js文件
 ** 日期： 2019/8/30 14:17
 ** 作者： 楼兰
 ** 版本： 0.0.0
 *********************************************************/
import Cookies from 'js-cookie'

const TokenKey = "kim-token";

/**
 * Description :从cookie中获取token
 * @param
 * @return
 * @author     :loulan
 * */
export function getToken() {
  return Cookies.get(TokenKey)
}

/**
 * Description :保存token
 * @param       token 要进行保存的token
 * @return
 * @author     :loulan
 * */
export function setToken(token) {
  return Cookies.set(TokenKey,token)
}

/**
 * Description :保存token并设置有效期
 * @param       token 要进行保存的token
 * @param       expire token的有效期，单位是天
 * @return
 * @author     :loulan
 * */
export function setTokenExpire(token,expire) {
  return Cookies.set(TokenKey, token,{expires:expire})
}

/**
 * Description :从cookie中移除token
 * @param
 * @return
 * @author     :loulan
 * */
export function removeToken() {
  return Cookies.remove(TokenKey)
}

