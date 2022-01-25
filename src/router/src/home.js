import * as types from '../types'

export default [{
  path: '/home',
  name: types.HOME,
  component: resolve => require(['@/pages/home/index'], resolve),
  meta: {
    isShowFooter: true,
    title: '首页'
  }
}, {
  path: '/location',
  name: types.LOCATION,
  component: resolve => require(['@/pages/location'], resolve),
  meta: {
    isShowFooter: false,
    title: '定位'
  }
}, {
  path: '/orderList',
  name: types.ORDER_LIST,
  component: resolve => require(['@/pages/home/order'], resolve),
  meta: {
    isShowFooter: false,
    title: '交易流水'
  }
}, {
  path: '/notice',
  name: types.NOTICE,
  component: resolve => require(['@/pages/home/notice'], resolve),
  meta: {
    isShowFooter: false,
    title: '消息详情'
  }
} ]
