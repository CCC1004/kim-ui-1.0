import {
  getToken,
  setToken,
  removeToken
} from "@/utils/cookie";

import {
  loginByUsername,
  getUserInfo
} from "@/api/frame/login/login";

const users = {
  state: {
    // 用户信息
    user: {},
    // token信息
    token: getToken(),
    // 当前用户权限菜单
    menus: undefined,
    // 当前用户
    elements: undefined,
    // 全部字典信息
    dicts: [],
    // 行政分区信息
    addrs: [],
    // 组织信息
    organizes: [],
    // 用户当前打开的菜单（这个是为了，路由转到另外的页面的时候，保存要专业的页面的菜单code，然后更具menus查出其父级，进行小标题栏菜单路径的显示）
    currentMenu: ''
  },
  mutations: {
    SET_USER(state, param) {
      state.user = param;
    },
    SET_TOKEN(state, param) {
      state.token = param;
    },
    SET_MENUS(state, param) {
      state.menus = param;
    },
    SET_ELEMENTS(state, param) {
      state.elements = param;
    },
    SET_DICTS(state, param) {
      state.dicts = param;
    },
    SET_ADDRS(state, param) {
      state.addrs = param;
    },
    SET_ORGANIZES(state, param) {
      state.organizes = param;
    },
    SET_CURRENTMENU(state, param) {
      state.currentMenu = param;
    }
  },
  actions: {
    /**
     * Description :用户名登录的方式
     * @param       loginForm 用户登录的信息，包含用户名和密码，可能还有一些验证码之类的
     * @return
     * @author     :loulan
     * */
    LoginByUsername({commit}, loginForm) {
      const clientParam = {
        grant_type: 'password',
        scope: 'dawnClient',
        client_id: 'dawn-vue',
        client_secret: '123456'
      };
      const loginParam = Object.assign(loginForm, clientParam);
      // 清空token
      commit('SET_TOKEN','');
      // 清除cookie中的旧token
      removeToken();
      return new Promise((resolve, reject) => {
        loginByUsername(loginParam).then( data => {
          // 将token存储到store
          commit('SET_TOKEN', data.access_token);
          // 将token存储到cookie
          setToken(data.access_token);
          // 通过
          resolve();
        }).catch(error => {
          reject(error);
        })
      });
    },

    /**
     * Description :获取用户信息，包括菜单，按钮等信息
     * @param
     * @return
     * @author     :loulan
     * */
    GetUserInfo({commit}) {

      // 清空这几个存储器选项
      commit('SET_USER', {});
      commit('SET_MENUS', undefined);
      commit('SET_ELEMENTS', undefined);
      commit('SET_DICTS', []);
      commit('SET_ADDRS', []);
      commit('SET_ORGANIZES', []);


      return new Promise((resolve, reject) => {
        // 获取信息
        getUserInfo().then(response =>{
          const data = response.data;
          commit('SET_USER', data.user);
          commit('SET_MENUS', data.menu);
          commit('SET_ELEMENTS', data.element);
          commit('SET_ADDRS', data.addrs);
          commit('SET_ORGANIZES', data.organizes);
          commit('SET_DICTS', data.dict);
          resolve(data);
        }).catch(error => {
          reject(error);
        })
      });
    }
  }
};



export default users;
