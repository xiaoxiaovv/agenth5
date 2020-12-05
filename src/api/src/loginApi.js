import { requestAxios } from '@/utils'
import qs from 'qs'

export default {
  /**
   * 登录
   * @param {*} params
   */
  login(params) {
    return requestAxios({
      url: `/auth/admin/login`,
      method: 'POST',
      data: qs.stringify(params)
    })
  },
  /**
   * 修改密码
   * @param {*} params
   */
  resetPsw(params) {
    return requestAxios({
      url: `/auth/user/modify_password`,
      method: 'POST',
      data: qs.stringify(params)
    })
  },
  /**
   * 获取我--信息
   * @param {*} params
   */
  getUserInfo(params) {
    return requestAxios({
      url: `/auth/running_account_new/my`,
      method: 'GET',
      params: params
    })
  },
  /**
   * 获取我--信息
   * @param {*} params
   */
  getUserInfoByToken() {
    return requestAxios({
      url: `/auth/admin/login_by_token`,
      method: 'POST'
    })
  }

}
