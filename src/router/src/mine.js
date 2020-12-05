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
}]
