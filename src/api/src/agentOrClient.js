import { requestAxios } from '@/utils'
import qs from 'qs'

export default {
  /**
   * 登录
   * @param {*} params
   */
  /*
  login(params) {
    return requestAxios({
      url: `/auth/admin/login`,
      method: 'POST',
      data: qs.stringify(params)
    })
  },
  */
  /**
   * 获取--一级代理列表
   * @param {*} params
   */
  getOneAgentList(params) {
    return requestAxios({
      url: `/auth/company/opera/list_rewrite`,
      method: 'GET',
      params: params
    })
  },
  /**
   * 获取--二级代理列表
   * @param {*} params
   */
  getAgentList(params) {
    return requestAxios({
      url: `/auth/company/distribute/list_rewrite`,
      method: 'GET',
      params: params
    })
  },
  /**
   * 获取--三级代理列表
   * @param {*} params
   */
  getTreeAgentList(params) {
    return requestAxios({
      url: `/auth/company/third_agent/list_rewrite`,
      method: 'GET',
      params: params
    })
  },
  /**
   * 获取-一级代理--详情
   * @param {*} params
   */
  getAgentOperaDetail(params) {
    return requestAxios({
      url: `/auth/company/opera/detail`,
      method: 'GET',
      params: params
    })
  },
  /**
   * 获取-二级代理--详情
   * @param {*} params
   */
  getAgentDistributeDetail(params) {
    return requestAxios({
      url: `/auth/company/distribute/detail`,
      method: 'GET',
      params: params
    })
  },
  /**
   * 获取-三级代理--详情
   * @param {*} params
   */
  getAgentThirdAgentDetail(params) {
    return requestAxios({
      url: `/auth/company/distribute/detail`,
      method: 'GET',
      params: params
    })
  },
  /**
   * 获取--级代理--提交审核
   * @param {*} params
   */
  submitAgentViewOpera(params) {
    return requestAxios({
      url: `/auth/company/opera/audit`,
      method: 'post',
      params: params
    })
  },
  /**
   * 获取-二级代理--提交审核
   * @param {*} params
   */
  submitAgentViewDistribute(params) {
    return requestAxios({
      url: `/auth/company/distribute/audit`,
      method: 'post',
      params: params
    })
  },
  /**
   * 获取-三级代理--提交审核
   * @param {*} params
   */
  submitAgentViewThirdAgent(params) {
    return requestAxios({
      url: `/auth/company/third_agent/audit`,
      method: 'post',
      params: params
    })
  },
  /**
   * 获取-一级代理--修改
   * @param {*} params
   */
  editAgentViewOpera(params) {
    return requestAxios({
      url: `/auth/company/opera/update`,
      method: 'post',
      data: qs.stringify(
        params
      )
    })
  },
  /**
   * 获取-二级代理--修改
   * @param {*} params
   */
  editAgentViewDistribute(params) {
    return requestAxios({
      url: `/auth/company/distribute/update`,
      method: 'post',
      data: qs.stringify(
        params
      )
    })
  },
  /**
   * 获取-三级代理--修改
   * @param {*} params
   */
  editAgentViewThirdAgent(params) {
    return requestAxios({
      url: `/auth/company/third_agent/update`,
      method: 'post',
      data: qs.stringify(
        params
      )
    })
  },
  /**
   * 新增代理-一级
   * @param {*} params
   */
  addAgentViewOne(params) {
    return requestAxios({
      url: '/auth/company/opera/save_rewrite',
      method: 'post',
      data: qs.stringify(
        params
      )
    })
  },
  /**
   * 新增代理-二级
   * @param {*} params
   */
  addAgentViewTwo(params) {
    return requestAxios({
      url: '/auth/company/distribute/save_rewrite',
      method: 'post',
      data: qs.stringify(
        params
      )
    })
  },
  /**
   * 新增代理-三级
   * @param {*} params
   */
  addAgentViewThree(params) {
    return requestAxios({
      url: '/auth/company/third_agent/save_rewrite',
      method: 'post',
      data: qs.stringify(
        params
      )
    })
  },
  /**
   * 获取--商户列表
   * @param {*} params
   */
  getClientList(params) {
    return requestAxios({
      url: `/merchant/merchant/find_by_company_id`,
      method: 'GET',
      params: params
    })
  },
  /**
   * 获取--商户列表(新)
   * @param {*} params
   */
  getClientListNew(params) {
    return requestAxios({
      url: `/merchant/merchant/re_list`,
      method: 'GET',
      params: params
    })
  },
  /**
   * 获取--商户详情
   * @param {*} params
   */
  getClienDetail(params) {
    return requestAxios({
      url: '/merchant/merchant/find_one',
      method: 'get',
      params: params
    })
  },
  /**
   * 获取--商户详情--编辑
   * @param {*} params
   */
  editClienDetail(params) {
    return requestAxios({
      url: '/merchant/merchant/update',
      method: 'post',
      data: qs.stringify(
        params
      )
    })
  },
  /**
   * 新增商户
   * @param {*} paramst
   */
  addClient(params) {
    return requestAxios({
      url: '/api/supervision/api/dataregeditmerchant',
      method: 'post',
      data: params ,
      jsonHeader:true
    })
  },
  /**
   * 获取--商户详情--重置密码
   * @param {*} params
   */
  resetPswClienDetail(params) {
    return requestAxios({
      url: '/merchant/merchant/default/reset_password',
      method: 'post',
      params: params
    })
  },
  /**
   * 获取--获取省市区
   * @param {*} params
   */
  getProvice(params) {
    return requestAxios({
      url: `/api/supervision/api/public/cityTree`,
      method: 'GET',
      params: params,
      jsonHeader: true
    })
  },
  /**
   * 获取--获取省市区(新)
   * @param {*} params
   */
  getProviceNew(params) {
    return requestAxios({
      url: `/common/province/tree_new`,
      method: 'GET',
      params: params,
      jsonHeader: true
    })
  },
  /**
   * 获取--获取银行省市区
   * @param {*} params
   */
  getBankProvice() {
    return requestAxios({
      url: `/batchFeed/sxf/findBankAreaTree`,
      method: 'GET',
      jsonHeader: true
    })
  },
  /**
   * 获取--获取经营行业
   * @param {*} params
   */
  getBusiness(params) {
    return requestAxios({
      url: `/batchFeed/wx/getbusiness`,
      method: 'GET',
      jsonHeader: true,
      params
    })
  },
  /**
   * 获取--获取经营描述
   */
  getProductDesc() {
    return requestAxios({
      url: `/batchFeed/wx/getproductdesc`,
      method: 'GET',
      jsonHeader: true
    })
  },
  /**
   * 富友-查询额外地区补充列表
   * @param {*} params
   */
  getFyAreaList(params) {
    return requestAxios({
      url: '/batchFeed/fuiou/get_fuiou_arealist',
      method: 'get',
      params
    })
  },
  // 获取高德秘钥
   getGaoDeKey (serviceId) {
    return requestAxios({
      url: '/auth/gaode_map_config',
      method: 'get',
      params: {
        companyId:serviceId
      }
    })
  }
}
