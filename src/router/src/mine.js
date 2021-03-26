import * as types from '../types'

export default [{
  path: '/mine',
  name: types.MINE,
  component: resolve => require(['@/pages/mine/index'], resolve),
  meta: {
    isShowFooter: true,
    title: '我的'
  }
}, {
  path: '/private',
  name: types.PRIVACY,
  component: resolve => require(['@/pages/mine/private'], resolve),
  meta: {
    isShowFooter: false,
    title: '隐私政策'
  }
}, {
  path: '/commission',
  name: types.COMMISSION,
  component: resolve => require(['@/pages/mine/commission/index'], resolve),
  meta: {
    isShowFooter: false,
    title: '分润管理'
  }
}, {
  path: '/private',
  name: types.COMMISSIONADDCARD,
  component: resolve => require(['@/pages/mine/commission/addCard'], resolve),
  meta: {
    isShowFooter: false,
    title: '分润提现加卡'
  }
}
]
