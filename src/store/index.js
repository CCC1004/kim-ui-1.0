import Vue from 'vue';
//引入vuex
import Vuex from 'vuex'

import dawnvue from './store/dawn-vue'
import users from './store/user'
import getters from './getters'

Vue.use(Vuex);

/* 实例化vuex存储管理对象 */
const store = new Vuex.Store({
  modules: {
    dawnvue:dawnvue,
    users: users
  },
  getters
});

export default store;
