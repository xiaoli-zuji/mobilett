// 封装axios
// 导入axios
import axios from 'axios'
// 导入store
import store from '../store/index.js'
// 导入json-bigint
import JSONBig from 'json-bigint'
// 导入操作本地的方法
import { localSet } from './mylocal'

// 创建一个axios实例
const http = axios.create({
  //  设置一个基地址
  baseURL: 'http://ttapi.research.itcast.cn',
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return JSON.parse(data)
    }
  }]
})

// 创建一个新的http1
const http1 = axios.create({
  //  设置一个基地址
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 给axios添加拦截器
// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 判断store中的state下的userinfo是否存在token
  if (store.state.userInfo.token) {
    config.headers.Authorization = `Bearer ${store.state.userInfo.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  if (error.response.status === 401) {
    // 说明token过期了
    const refreshToken = store.state.userInfo.refresh_token
    // 将refreshToken 提交到服务器,得到新的token
    const tokenRes = await http1({
      url: '/app/v1_0/authorizations',
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    })
    // 得到新的token
    const newToken = tokenRes.data.data.token
    // 得到新的userInfo对象
    const userInfo = {
      token: newToken,
      refresh_token: refreshToken
    }
    // 更改vuex中的token,还有本地的local
    // 覆盖store中过期的token
    store.commit('setUserInfo', userInfo)
    // 覆盖本地的token
    localSet('userinfo', userInfo)
    // 使用新的token完成未完成的请求
    return http(error.config)
  }
  return Promise.reject(error)
})

// 4.0 将 http 暴露给外界
export default http
