import { isShowFooterLocal } from '@/storage'
export default {
  // 是否显示底部tab
  isShowFooter: isShowFooterLocal.getJSON().isShowFooter
}
