import * as types from '../types'

export default [{
  path: '/agency',
  name: types.AGENCY,
  component: resolve => require(['@/pages/agencyOrClient/agency'], resolve),
  meta: {
    isShowFooter: true,
    title: '代理',
    keepAlive: true
  }
}, {
  path: '/agency_detail',
  name: types.AGENCY_DETAIL,
  component: resolve => require(['@/pages/agencyOrClient/agencyDetail'], resolve),
  meta: {
    isShowFooter: false,
    title: '代理详情'
  }
}, {
  path: '/agency_edit',
  name: types.AGENCY_EDIT,
  component: resolve => require(['@/pages/agencyOrClient/agencyEdit'], resolve),
  meta: {
    isShowFooter: false,
    title: '代理编辑'
  }
}, {
  path: '/client',
  name: types.CLIENT,
  component: resolve => require(['@/pages/agencyOrClient/client'], resolve),
  meta: {
    isShowFooter: true,
    title: '商户'
  }
}, {
  path: '/clientDetail',
  name: types.CLIENT_DETAIL,
  component: resolve => require(['@/pages/agencyOrClient/clientDetail'], resolve),
  meta: {
    isShowFooter: false,
    title: '商户详情'
  }
}, {
  path: '/clientEdit',
  name: types.CLIENT_EDIT,
  component: resolve => require(['@/pages/agencyOrClient/clientEdit'], resolve),
  meta: {
    isShowFooter: false,
    title: '商户编辑'
  }
}, {
  path: '/addMerchant',
  name: types.ADD_MERCHANT,
  component: resolve => require(['@/pages/agencyOrClient/addMerchant'], resolve),
  meta: {
    isShowFooter: false,
    title: '添加商户'
  }
}]
