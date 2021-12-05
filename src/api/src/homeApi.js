import { requestAxios } from '@/utils'
// import qs from 'qs'

export default {
  /**
   * 数据概览
   * @param {*} params
   */
  dataView(params) {
    return requestAxios({
      url: `/auth/running_account_new/date_view`,
      method: 'GET',
      params: params
    })
  },
  /**
   * 业务员发展商户占比
   * @param {*} params
   */
  runAccountNewDataView(params) {
    return requestAxios({
      url: `/auth/running_account_new/data_statistics_right`,
      method: 'GET',
      params: params
    })
  },
  /**
   * 交易数据
   * @param {*} params
   */
  dataTransaction(params) {
    return requestAxios({
      url: `/auth/running_account_new/date_transaction`,
      method: 'GET',
      params: params
    })
  },
  /**
   * 交易流水
   * @param {*} params
   */
  getOrderList(params) {
    return requestAxios({
      url: `/auth/running_account/merchant_running_account_list_for_company`,
      method: 'GET',
      params: params
    })
  },
  /**
   * 分润设置
   * @param {*} params
   */
  commissionMoney(params) {
    return requestAxios({
      url: `/auth/current/running_account/date_transaction_app`,
      method: 'GET',
      params: params
    })
  }
}
