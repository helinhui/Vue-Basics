// 封装的axios请求模块
import axios from 'axios'
import router from '@/router'
import { getToken } from '@/utils/auth'

// 配置基础路径
const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

http.interceptors.request.use(function (config) {
  console.log('3:请求拦截器,统一加 token', config)
  if (config.url !== '/login') {
    // config.headers.Authorization = window.localStorage.getItem('token')
    config.headers.Authorization = getToken()
  }
  return config // 如果不return,请求不会发出去
}, function (error) {
  return Promise.reject(error)
})

http.interceptors.response.use(function (response) {
  console.log('4:响应拦截,判断响应码,正确放行.401回login')
  if (response.data.meta.status === 401) {
    router.replace('/login')
  }
  return response // return的reponse会作为你真正的响应结果
}, function (error) {
  return Promise.reject(error)
})
export default http
