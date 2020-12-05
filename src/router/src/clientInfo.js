import * as types from '../types'

export default [{
  path: '/client_info',
  name: types.CLIENT_INFO,
  component: resolve => require(['@/pages/clientInfo/index'], resolve),
  meta: {
    isShowFooter: true,
    title: '进件',
    keepAlive: true
  }
}, {
  path: '/client_info_detail',
  name: types.CLIENT_INFO_DETAIL,
  component: resolve => require(['@/pages/clientInfo/clientInfoDetail'], resolve),
  meta: {
    isShowFooter: false,
    title: '进件'
  }
}, {
  path: '/client_info_record',
  name: types.CLIENT_INFO_RECORD,
  component: resolve => require(['@/pages/clientInfo/clientInfoRecord'], resolve),
  meta: {
    isShowFooter: false,
    title: '进件'
  }
}, {
  path: '/client_info_record_next',
  name: types.CLIENT_INFO_RECORD_NEXT,
  component: resolve => require(['@/pages/clientInfo/clientInfoRecordNext'], resolve),
  meta: {
    isShowFooter: false,
    title: '进件'
  }
}, {
  path: '/client_info_record_last',
  name: types.CLIENT_INFO_RECORD_LAST,
  component: resolve => require(['@/pages/clientInfo/clientInfoRecordLast'], resolve),
  meta: {
    isShowFooter: false,
    title: '进件'
  }
}, {
  path: '/client_info_base',
  name: types.CLIENT_INFO_BASE,
  component: resolve => require(['@/pages/clientInfo/clientInfoBase'], resolve),
  meta: {
    isShowFooter: false,
    title: '进件'
  }
}]
