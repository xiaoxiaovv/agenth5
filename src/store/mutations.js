import * as types from './mutation-types'
import { isShowFooterLocal } from '@/storage'
export default {
  [types.DEMO](state) {
    console.log('state.demo change')
  },
  /**
   * 是否显示底部
   * @param state
   * @param val
   */
  [types.IS_SHOW_FOOTER](state, val) {
    // 获取左侧菜单数据
    let params = {
      isShowFooter: val
    }
    isShowFooterLocal.setJSON(params)
    state.isShowFooter = val
  }
}
