import { requestAxios } from '@/utils'
import { afterLoginInfoLocal } from '@/storage'
// import qs from 'qs'

export default {
  /**
   * 获取进件商户列表
   * @param {*} pageNumber
   * @param {*} pageSize
   * @param {*} status
   */
  getMerchantList(pageNumber, pageSize, status) {
    return requestAxios({
      url: '/merchant/mch_info/find_by_fuwushang',
      method: 'get',
      params: {
        pageNumber,
        pageSize,
        status
      }
    })
  },

  /**
   * 获取进件商户详情
   * @param {*} id
   */
  getMerchantDetail(id) {
    return requestAxios({
      url: `/merchant/mch_info/detail?id=${id}`,
      method: 'get'
    })
  },

  /**
   * 获取资源图片
   * @param {*} id
   */
  getPic(id) {
    return requestAxios({
      url: `/fms/upload/resource/thumbnail/${id}`,
      method: 'get'
    })
  },

  /**
   * 上传图片
   * @param {*} file
   */
  uploadImage(file) {
    let formData = new FormData()
    formData.append('module', 'image')
    formData.append('files', file)
    return requestAxios({
      url: `/fms/upload/files_upload/file/user`,
      method: 'post',
      data: formData,
      header: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  /**
   * 身份证识别
   * @param {*} id
   */
  getIdCard(params) {
    return requestAxios({
      url: `/batchFeed/cert/idCard`,
      method: 'get',
      params
    })
  },
  /**
   * 营业执照识别复制
   * @param {*} id
   */
  getLicense(params) {
    return requestAxios({
      url: `/batchFeed/cert/license`,
      method: 'get',
      params
    })
  },

  // 获取随行付MccCd树复制
  getMccCdList(params) {
    return requestAxios({
      url: `/batchFeed/sxf/findMccCdTree`,
      method: 'get',
      params
    })
  },
  // 获取乐刷MccCd树复制
  getLsMccLists() {
    return requestAxios({
      url: `/batchFeed/le/queryMccTree`,
      method: 'get'
    })
  },
  // 获取威富通MccCd树复制
  getYsMccList() {
    return requestAxios({
      url: `/batchFeed/ys/queryFirstMcc`,
      method: 'get'
    })
  },
  // 获取传化MccCd树复制
  getChMccList() {
    console.log('获取传化MccCd树复制')
    return requestAxios({
      url: `batchFeed/ch/queryMcc`,
      method: 'get'
    })
  },
 /* // 获取银联MccCd树复制
  getChMccList() {
    console.log('获取传化MccCd树复制')
    return requestAxios({
      url: `batchFeed/ch/queryMcc`,
      method: 'get'
    })
  },*/
  // 获取支付宝MccCd树复制
  getZfbMccList() {
    return requestAxios({
      url: `/batchFeed/ali/get_ali_mcccodetree`,
      method: 'get'
    })
  },
  // 获取富友MccCd树类目列表
  getFyMccList() {
    return requestAxios({
      url: `/batchFeed/fuiou/get_fuiou_mcctree`,
      method: 'get'
    })
  },
  // 获取富友费率列表
  getFyRateList() {
    return requestAxios({
      url: `/batchFeed/fuiou/get_fuiou_transaction_rate`,
      method: 'get'
    })
  },
  // 获取拉卡拉MccCd树类目列表
 /* getLklMccList() {
    return requestAxios({
      url: `/batchFeed/lakala/get_lkl_mcctree`,
      method: 'get'
    })
  },*/
  // 获取拉卡拉费率列表
  /*getLklRateList() {
    return requestAxios({
      url: `/batchFeed/lkl/get_lkl_transaction_rate`,
      method: 'get'
    })
  },*/

  // 获取开店宝MccCd树类目列表
  getKdbMccList() {
    // console.log('afterLoginInfoLocal.getJSON().companyId22222222222',afterLoginInfoLocal.getJSON().companyId)
    return requestAxios({
      url: `/batchFeed/kdb/findAnyBusiness`,
      method: 'get',
      params:{
        // companyId: afterLoginInfoLocal.getJSON().companyId || sessionStorage.companyId
      }
    })
  },
  // 获取开店宝区域列表
  getKdbAddressList() {
    // console.log('afterLoginInfoLocal.getJSON().companyId33333333333',afterLoginInfoLocal.getJSON().companyId)
    return requestAxios({
      url: `/batchFeed/kdb/findAnyArea`,
      method: 'get',
      params:{
        // companyId: afterLoginInfoLocal.getJSON().companyId || sessionStorage.companyId
      }
    })
  },

  // 获取畅捷MccCd树类目列表
  getCjMccList() {
    // console.log('afterLoginInfoLocal.getJSON().companyId22222222222',afterLoginInfoLocal.getJSON().companyId)
    return requestAxios({
      url: `/batchFeed/chanpay/findMccArray`,
      method: 'get',
      params:{
        // companyId: afterLoginInfoLocal.getJSON().companyId || sessionStorage.companyId
      }
    })
  },
  // 获取畅捷区域列表
  getCjAddressList() {
    // console.log('afterLoginInfoLocal.getJSON().companyId33333333333',afterLoginInfoLocal.getJSON().companyId)
    return requestAxios({
      url: `/batchFeed/chanpay/findAreaArray`,
      method: 'get',
      params:{
        // companyId: afterLoginInfoLocal.getJSON().companyId || sessionStorage.companyId
      }
    })
  },

  // 获取列表信息（已填写过的信息）
  getMchInfo(params) {
    return requestAxios({
      url: `/merchant/mch_info/feedDetail`,
      method: 'get',
      params
    })
  },
  // 提交列表信息
  submitMchIfo(data) {
    return requestAxios({
      url: `/merchant/mch_info/set`,
      method: 'post',
      data,
      jsonHeader: true
    })
  },

  /**
   * 提交
   * @param {*} params
   */
  submit(params) {
    let formData = new FormData()
    for (let i in params) {
      formData.append(i, params[i])
    }
    return requestAxios({
      url: `/merchant/mch_info/update`,
      method: 'post',
      data: formData
    })
  },
  /**
   * 银行卡识别
   * @param {*} pathId
   */
  getBankCard(pathId) {
    return requestAxios({
      url: `/batchFeed/cert/bankCard`,
      method: 'get',
      params: {
        pathId
      }
    })
  },
  /**
   * 开户许可证识别
   * @param {*} pathId
   */
  getOpenBankCard(pathId) {
    return requestAxios({
      url: `/batchFeed/cert/openBank`,
      method: 'get',
      params: {
        pathId
      }
    })
  },
  /**
   * 获取银行编码
   * @param {*} pathId
   */
  getBankCode(pathId) {
    return requestAxios({
      url: '/batchFeed/sxf/findBankCode',
      method: 'get'
    })
  },
  /**
   * 获取银行省市树
   * @param {*} pathId
   */
  getCodeList(pathId) {
    return requestAxios({
      url: '/batchFeed/sxf/findBankAreaTree',
      method: 'get'
    })
  },
  /**
   * 获取支行编码
   * @param {*} params
   */
  getBranchCode(params) {
    return requestAxios({
      url: '/batchFeed/sxf/findBankBranchCode',
      method: 'get',
      params
    })
  },
  /**
  * 获取支行编码
  * @param {*} params
  */
  getBranchCodeNew(params) {
    return requestAxios({
      url: '/batchFeed/wx/get_bank_list_new',
      method: 'get',
      params
    })
  },
  /**
   * 查询随行付进件状态
   * @param {*} params
   */
  getSxfcode(params) {
    return requestAxios({
      url: '/batchFeed/sxf/feedInfo',
      method: 'get',
      params
    })
  },
  /**
   * 查询随行付进件状态
   * @param {*} params
   */
  getWxcode(params) {
    return requestAxios({
      url: '/batchFeed/wx/getwxfeedstatus',
      method: 'get',
      params
    })
  },
  /**
   * 获取银行开户名完整提示
   * @param {*} params
   */
  getubbankname(params) {
    return requestAxios({
      url: '/batchFeed/wx/getsubbankname',
      method: 'get',
      params
    })
  },
  /**
   * 乐刷-查询进件状态
   * @param {*} params
   */
  getLsCode(params) {
    return requestAxios({
      url: '/batchFeed/le/feedInfo',
      method: 'get',
      params
    })
  },
  /**
   * 威富通-查询进件状态
   * @param {*} params
   */
  getYsCode(params) {
    return requestAxios({
      url: '/batchFeed/ys/feedInfo',
      method: 'get',
      params
    })
  },
  /**
   * 传化-查询进件状态
   * @param {*} params
   */
  getChCode(params) {
    return requestAxios({
      url: '/batchFeed/ch/feedInfo',
      method: 'get',
      params
    })
  },
  /**
   * 富友-查询进件状态
   * @param {*} params
   */
  getFyCode(params) {
    return requestAxios({
      url: '/batchFeed/fuiou/get_fuiou_feedstatus',
      method: 'get',
      params
    })
  },
  /**
   * 支付宝-查询进件状态
   * @param {*} params
   */
  getZfbCode(params) {
    return requestAxios({
      url: '/batchFeed/ali/get_ali_feedstatus',
      method: 'get',
      params
    })
  },
  /**
   * 拉卡拉-查询进件状态
   * @param {*} params
   */
  getLklCode(params) {
    return requestAxios({
      url: '/batchFeed/ali/get_lkl_feedstatus',
      method: 'get',
      params
    })
  },

  /**
   * 手机pos&网联-查询进件状态
   * @param {*} params
   */
  getSjPosCode(params) {
    return requestAxios({
      url: '/batchFeed/pos/get_pos_feedstatus',
      method: 'get',
      params
    })
  },

  /**
   * 开店宝-查询进件状态
   * @param {*} params
   */
  getKdbCode(params) {
    return requestAxios({
      url: '/batchFeed/kdb/get_kdb_feedstatus',
      method: 'get',
      params
    })
  },
  /**
   * 畅捷-查询进件状态
   * @param {*} params
   */
  getCjCode(params) {
    return requestAxios({
      url: '/batchFeed/chanpay/get_cj_feedstatus',
      method: 'get',
      params
    })
  },

  /**
   * 查询通道开关状态
   * @param {*} params
   */
  getStatus() {
    return requestAxios({
      url: '/pay/pay_channel/find_pay_channel_system_config',
      method: 'get'
    })
  }

}
