import {
  dynamicRouterMap
} from './index'


/**
 * Description :生成当前用户的路由
 * @param       
 * @return
 * @author     :loulan
 * */
export function createrCurrentUserRouter(menus) {
  /*框架下动态路由对象，将路由对象添加到children中，就只显示在框架内容部分（是动态路由对象集合的一个）*/
  const dynamicRouter = {
    path: "/",
    name: "frame",
    component: import('@/views/frame/home/index'), //指定到这个组件下面的路由上
    children: []
  }

  // 遍历这个菜单
  for (const menu of menus) {
    // 将菜单类型为menu的用作路由，dirt只是下拉文件夹
    if (menu.type === 'menu') {
      // 定义一个路由对象
      const routerObj = {
        path: '',
        name: '',
        component: ''
      };
      // 填充路由对象的各个属性
      routerObj.path = menu.code;
      routerObj.name = menu.name;
      routerObj.component = () => import('@/' + menu.uri);
      // 将这个路由对象添加到动态路由中
      dynamicRouter.children.push(routerObj);
    }
  }

  // 将动态路由添加到路由集合中
  dynamicRouterMap.push(dynamicRouter);

  // 返回这个路由集合
  return dynamicRouterMap;
}
