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
      data: params
    })
  }
}
