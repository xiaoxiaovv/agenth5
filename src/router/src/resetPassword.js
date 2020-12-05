import * as types from '../types'

export default [{
  path: '/resetPassword',
  name: types.RESETPASSWORD,
  component: resolve => require(['@/pages/resetPassword/index'], resolve),
  meta: {
    isShowFooter: false,
    title: '修改密码'
  }
}]
