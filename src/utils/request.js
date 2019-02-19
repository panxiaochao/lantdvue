import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'

// 创建axios实例
const instance = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间，5s
});

// request 请求拦截器
instance.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  return config;
}, function(error) {
  // 对请求错误做些什么
  //console.log(error); // for debug
  Message({
    message: error.message,
    type: 'error',
    duration: 3 * 1000
  })
  return Promise.reject(error);
});

// response 响应拦截器
instance.interceptors.response.use(function(response) {
  //console.log(response)
  const res = response.data;
  return res;
}, function(error) {
  // 对响应错误做点什么
  Message({
    message: error.message,
    type: 'error',
    duration: 3 * 1000
  })
  return Promise.reject(error);
});

export default instance