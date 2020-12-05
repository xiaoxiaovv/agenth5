import axios from 'axios'
import Toast from 'muse-ui-toast'
import MessageBox from 'muse-ui-message'
import loading from '@/components/libs/loading'
import * as base64 from '@/utils/src/base64Encode.js'
import * as configInfo from '@/config/version.js'

// export const url = window.location.protocol+"//"+window.location.host
// export const url = 'http://pay-adm.vmajy.com'
// export const url = 'http://51ytpay.com/'
export const url = 'https://hbpay.vip'
// export const url = 'http://192.168.0.102:3000'

const instance = axios.create({
  baseURL: url,
  timeout: 10000
  /*headers: {
    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
  }*/
  // withCredentials: true
})

// 添加请求拦截器
instance.interceptors.request.use((config) => {
  if (sessionStorage.token) {
    config.headers['authorized'] = sessionStorage.token
  }
  if (config.jsonHeader) {
    config.headers['Content-type'] = 'application/json; charset=utf-8'
  } else {
    config.headers['Content-type'] = 'application/x-www-form-urlencoded; charset=utf-8'
  }
  // 版本号
  // let headerVersion = base64.baseEncode('AGENTAPP-' + configInfo.version)
  // config.headers['version'] = headerVersion
  loading.show()
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(response => {
  loading.hide()
  // 对返回的数据进行预处理
  if (response.headers.accesstoken) {
    sessionStorage.token = response.headers.authorized
  }
  const res = response.data
  if (res.code !== 200) {
    if (res.code === 401 || res.code === 422) {
      MessageBox.alert('您尚未登录', '前往登录').then(res => {
        sessionStorage.clear()
        location.reload()
      })
    } else if (res.code === 432) {
      Toast.error(res.msg)
      setTimeout(() => {
        if (sessionStorage.token) {
          sessionStorage.clear()
          location.reload()
        }
      }, 1500)
    } else {
      Toast.error('该手机号已注册')
    }
    // 返回 resolved 或者 rejected状态，供后续操作
    return Promise.reject(new Error('error'))
  } else {
    return res
  }
}, error => {
  loading.hide()
  // 响应错误
  if (error.request) {
    Toast.error('请求超时')
  } else {
    Toast.error(error.message)
  }
  // 响应错误
  return Promise.reject(error)
})

export default instance
