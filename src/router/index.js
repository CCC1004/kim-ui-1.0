import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
	{
		path: '/login',
		component: () => import('@/views/frame/login/index')
	},
]

/* 动态路由对象集合，由权限限制 */
export const dynamicRouterMap = [
  {
    path: "/",
    name: "frame-dynamic",
    component: import('@/views/frame/home/index'), // 指定到这个组件下面的路由上
    children: [
      {
        path: 'home',
        name: 'home',
        component: (resolve) => require(['@/views/frame/home/index'],resolve)
      },
      {
        path: 'menu',
        name: 'menu',
        component: (resolve) => require(['@/views/frame/menu/index'],resolve)
      }
    ]
  }
]



export default new Router({
	routes: constantRouterMap
});
