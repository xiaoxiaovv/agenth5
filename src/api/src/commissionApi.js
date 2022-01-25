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

  commissionApplySuccessList (params) {
    return requestAxios({
      url: '/order/cash/out/apply_Success_list',
      method: 'get',
      params
    })
  },
  /**
   * 佣金提现申请列表
   */

  commissionApplyAllList (pageNumber,pageSize) {
    return requestAxios({
      url: '/order/cash/out/apply_list',
      method: 'get',
      params:{
        pageNumber,
        pageSize
      }
    })
  },
  /**
   * 佣金提现申请密码验证
   */

  commissionApplyAuth (password) {
    return requestAxios({
      url: '/order/cash/out/valid_password',
      method: 'post',
      params: {
        password
      }
      // jsonHeader: true
    })
  },
  /**
   * 佣金提现申请提交
   *validCode  密码得到的确认码
   *accountType 提现方式
   */

  commissionApplyCommit (validCode, accountType, applyAmount) {
    return requestAxios({
      url: '/order/cash/out/apply_cash_out',
      method: 'post',
      data: {
        validCode,
        accountType,
        applyAmount
      },
      jsonHeader: true
    })
  },
  /**
   * 奖励提现申请提交
   *
   */
  
  khcommissionApplyCommit (agentId, applyAmount) {
    return requestAxios({
      url: '/pay/code_card/cash_item',
      method: 'post',
      data: {
        agentId,
        applyAmount
      },
      jsonHeader: true
    })
  },
  /**
   * 绑定佣金提现卡
   */

  commissionAddBankCard (params) {
    return requestAxios({
      url: '/auth/user/do_band',
      method: 'post',
      data:params,
      jsonHeader: true
    })
  },
  /**
   *  查询佣金提现卡
   */
  commissionGetBankCard (companyId) {
    return requestAxios({
      url: '/auth/user/find_band',
      method: 'get',
      params:{
        companyId
      }
    })
  },
  // 佣金提现参数查询
   getCommissionConfig () {
    return requestAxios({
      url: '/pay/pay_config/find_cash_out_config',
      method: 'get'
      // params: params
    })
  },
  /**
   * 开户奖励总额查询
   */

   getCollect () {
    return requestAxios({
      url: 'pay/code_card/cash_collect/collect',
      method: 'get',
      params: {

      }
    })
  },
  /**
   * 佣金提现申请列表
   */

  detailApplyAllList (pageNumber,pageSize) {
    return requestAxios({
      url: 'pay/code_card/cash_item/detail',
      method: 'get',
      params:{
        pageNumber,
        pageSize
      }
    })
  },
}
