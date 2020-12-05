import { registerRequestAxios } from '@/utils'
import qs from 'qs'

export default {

  /**
   * 提交注册信息
   * @param {*} params
   */
  register(params) {
    params.channel = 'guanJia';
    return registerRequestAxios({
      url: `/add`,
      method: 'GET',
      params: params
    })
  },


}
