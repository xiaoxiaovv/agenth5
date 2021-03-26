import { requestAxios } from '@/utils'
export default {
  /**
   * 当前月交易流水佣金数据接口和总佣金数据
   */

   findCommissionCurrentMonth () {
    return requestAxios({
      url: '/auth/current/running_account/date_transaction_app',
      method: 'get',
      params: {

      }
    })
  },
  /**
   * 佣金提现申请成功列表
   */

  commissionApplySuccessList () {
    return requestAxios({
      url: '/auth/current/running_account/date_transaction_app',
      method: 'get',
      params: {

      }
    })
  },
  /**
   * 佣金提现申请列表
   */

  commissionApplyAllList () {
    return requestAxios({
      url: '/order/cash/out/apply_list',
      method: 'get',
      params: {

      }
    })
  }
}
