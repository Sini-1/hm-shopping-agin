import axios from 'axios'
import { Toast } from 'vant'

const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: { platform: 'H5' }
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // toast是单例调用，只允许一个toast存在，如需要多例模式，查官网
  Toast.loading({
    message: '加载中...',
    forbidClick: true, // 禁止点击loading后面的背景
    loadingType: 'spinner', // 配置loading图标
    duration: 0 // 不会自动消失，直到响应数据回来，在拦截器里清除loading
  })
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么（默认axios会多包装一层data)
  const res = response.data
  console.log(res)
  if (res.status !== 200) {
    Toast(res.message)
    return Promise.reject(res.message)
  } else {
    Toast.clear()
  }
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
