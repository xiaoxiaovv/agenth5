import { requestAxios } from '@/utils'
import qs from 'qs'

export default {

  /**
   * register
   * @param {*} params
   */
  register(params) {
    return requestAxios({
      url: `/api/supervision/api/regedit`,
      method: 'POST',
      data:params,
      jsonHeader: true
    })
  },
  /**
   * 获取验证码
   * @param {*} params
   */
  getAuthCode (mobileNo) {
  return requestAxios({
    url: `/api/supervision/api`,
    method: 'get',
    params: {mobileNo},
    jsonHeader: true
  })
},
}
