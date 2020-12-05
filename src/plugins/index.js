// 插件在这里统一注册
// import vmaAssistPlugin from './src/vmaAssist'
// 引入滚动插件
import vueScrollerPlugin from './src/vueScroller'
// museUI
import museUIPlugin from './src/museUI'

export default {
  install(Vue) {
    // Vue.use(vmaAssistPlugin)
    Vue.use(vueScrollerPlugin)
    Vue.use(museUIPlugin)
  }
}
