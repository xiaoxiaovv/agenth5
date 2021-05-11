import { requestAxios } from '@/utils'
export default {
 /* /!**
   * 当前月交易流水佣金数据接口和总佣金数据
   *!/

   findCommissionCurrentMonth () {
    return requestAxios({
      url: '/auth/current/running_account/date_transaction_app',
      method: 'get',
      params: {

      }
    })
  },*/
 /* /!**
   * 获取当天佣金
   *!/
  getCommCurrentDay () {
    return requestAxios({
      url: '/auth/current/running_account/date_transaction_app',
      method: 'get',
      params: {

      }
    })
  },*/
  /**
   * 获取总佣金
   */
  getCommTotal (dayNum) {
    return requestAxios({
      url: `/api/supervision/api/busicommissionitem/commTotal`,
      method: 'get',
    })
  },
  /**
   * 获取到当前日期天数佣金
   */
  getCommDayNum (dayNum) {
    return requestAxios({
      url: `/api/supervision/api/busicommissionitem/commDayNum/${dayNum}`,
      method: 'get',
    })
  },
  /**
   * 获取当月佣金
   */
  getCommMonth () {
    return requestAxios({
      url: '/api/supervision/api/busicommissionitem/commMonth',
      method: 'get',
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
   * 通过银行卡卡号获取(银行名称、联行号、开户行信息)
   */

  getBankCardInfoByCardNo (bankCardNo) {
    return requestAxios({
      url: '/api/supervision/api/public/bankCnapsByCardNo',
      method: 'get',
      params: {
        bankName: '',
        bankCardNo
      }
    })
  },
  /**
   * 绑定佣金提现卡
   */

  commissionAddBankCard (params) {
    return requestAxios({
      url: '/api/supervision/api/databandreceivecard',
      method: 'post',
      data:params,
      jsonHeader: true
    })
  },
  /**
   * 修改佣金提现卡
   */

  commissionEditBankCard (params) {
    return requestAxios({
      url: '/api/supervision/api/databandreceivecard',
      method: 'put',
      data:params,
      jsonHeader: true
    })
  },
  /**
   *  查询佣金提现卡
   */
  commissionGetBankCard (companyId) {
    return requestAxios({
      url: '/api/supervision/api/databandreceivecard',
      method: 'get'
    })
  },
  // 佣金提现参数查询
   getCommissionConfig (serviceId) {
    serviceId = serviceId || "1186094988932800555"
    return requestAxios({
      // url: '/pay/pay_config/find_cash_out_config',
      url: `/api/scoffold/data/cashoutconfig/${serviceId}`,
      method: 'get'
      // params: params
    })
  }
}



