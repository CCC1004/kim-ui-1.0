import dawnvue from './store/dawn-vue'
import users from './store/user'

/**
 * Description :获取菜单的路径，子父级关系菜单(这个是为了小标题栏显示路径的时候使用的)
 * @param       menus 当前用户权限内菜单数组
 * @param       cruuentMenu  用户点击的菜单（路由要打开的菜单）
 * @param       pathArr 路径数组
 * @return
 * @author     :loulan
 * */
function getMenuPath(menus, cruuentMenu,pathArr) {
  pathArr.push(cruuentMenu);
  for (const menu of menus) {
    if (cruuentMenu.pid !== '-1') {
      if (cruuentMenu.pid === menu.uuid) {
        getMenuPath(menus, menu, pathArr);
      }
    } else {
      return ;
    }
  }
}

const getters = {
  // 获取框架头部高度
  headerHeightPX: state => state.dawnvue.headerHeightPX,
  // 获取框架小标题栏高度
  breadcrumbHeightPX: state => state.dawnvue.breadcrumbHeightPX,
  // 获取框架内容部分高度
  contentHeightPX: state => (state.dawnvue.screenHeightPX - state.dawnvue.headerHeightPX - state.dawnvue.breadcrumbHeightPX),
  // 获取屏幕高度
  screenHeightPX: state => state.dawnvue.screenHeightPX,

  // 获取用户菜单
  menus: state => state.users.menus,
  // 获取用户保存在store的token
  token: state => state.users.token,
  // 获取指定的字典数据
  dicts: state => state.users.dicts,
  // 获取所有得行政分区数据
  addrs: state => state.users.addrs,
  // 获取所有得组织
  organizes: state => state.users.organizes,
  // 获取当前打开菜单的路径菜单
  currentMenuPath: state => ()=>{
    const menus = state.users.menus;
    const currentMenu = state.users.currentMenu;
    let arr = new Array();
    for (const menu of menus) {
      if (menu.code == currentMenu) {
        getMenuPath(menus, menu, arr);
      }
    }
    return arr.reverse();
  }
};

export default getters;
