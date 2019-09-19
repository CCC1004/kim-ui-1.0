
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import {beforeRequest} from './request/beforeRequest'
import {errorRequest} from './request/error'
import {afterResponse} from './response/afterResponse'
import {errorResponse} from './response/error'

Vue.use(VueAxios, axios);

//axios的实例对象
const service = axios.create({
  // baseURL: process.env.BASE_API,
  timeout: 5000   //请求超时时间
});


//请求拦截器
service.interceptors.request.use(
  //请求发送前要做的事情
  config => {
    beforeRequest(config);
    return config; //返回执行请求
  },
  //请求发送发生错误要做的事情
  error => {
    errorRequest(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  //对响应数据做点什么
  response => {
    //提取后端获取到的数据
    const res = response.data;
    // 对返回数据进行一些操作
    afterResponse(res);
    // 返回除状态信息之外的数据
    return res; //返回结果
  },
  //对响应错误做点什么
  error => {
    errorResponse(error);
  }
);

export default service;
