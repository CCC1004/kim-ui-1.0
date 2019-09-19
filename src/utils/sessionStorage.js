/*********************************************************
 ** 描述:  这个是操作sessionStorage的js文件
 ** 日期： 2019/8/30 14:18
 ** 作者： 楼兰
 ** 版本： 0.0.0
 *********************************************************/
// 外网ip
const WIP = "WIP";
// 外网ip所在地址
const WIP_CITY_NAME = "WIP_CITY_NAME";
// 内网ip
const NIP = "NIP";

/**
 * Description :从session中获取数据
 * @param       key 要获取的数据的key值
 * @return      获取到的数据
 * @author     :loulan
 * */
function get(key) {
  return sessionStorage.getItem(key);
}

/**
 * Description :向sessionStorage中写入数据
 * @param       key 键
 * @param       value 值
 * @return
 * @author     :loulan
 * */
function set(key, value) {
  sessionStorage.setItem(key,value)
}

/**
 * Description :从sessionStorage中移除掉指定的键值对
 * @param       key 键
 * @return
 * @author     :loulan
 * */
function remove(key) {
  sessionStorage.removeItem(key)
}

/**
 * Description :移除掉sessionStorage中所有的数据
 * @param
 * @return
 * @author     :loulan
 * */
function removeAll() {
  sessionStorage.remove();
}

/********************************************以上为私用方法，以下为公用方法*********************************************/

/**
 * Description :从sessionStorage中获取外网ip
 * @param
 * @return
 * @author     :loulan
 * */
export function getWIP() {
  return get(WIP);
}

/**
 * Description :向sessionStorage中写入外网ip
 * @param       ip 外网的ip
 * @return
 * @author     :loulan
 * */
export function setWIP(ip) {
  set(WIP, ip);
}

/**
 * Description :从sessionStorage中获取内网网ip
 * @param
 * @return
 * @author     :loulan
 * */
export function getNIP() {
  return get(NIP);
}

/**
 * Description :向sessionStorage中保存内网ip
 * @param       ip 内网的ip
 * @return
 * @author     :loulan
 * */
export function setNIP(ip) {
  set(NIP, ip);
}

/**
 * Description :获取外网ip所在的城市
 * @param
 * @return
 * @author     :loulan
 * */
export function getWipCity() {
  return get(WIP_CITY_NAME);
}

/**
 * Description :向sessionStorage中存储当前外网ip所在城市
 * @param       cityName 城市的名称
 * @return
 * @author     :loulan
 * */
export function setWipCity(cityName) {
  set(WIP_CITY_NAME, cityName);
}
