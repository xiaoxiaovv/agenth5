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
  path: '/orderList',
  name: types.ORDER_LIST,
  component: resolve => require(['@/pages/home/order'], resolve),
  meta: {
    isShowFooter: false,
    title: '交易流水'
  }
} ]
