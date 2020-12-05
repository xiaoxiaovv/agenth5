
/**
 * 1、底部tab切换
 */
export default {
  data() {
    return {

    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.state.isShowFooter = to.meta.isShowFooter
      document.title = vm.$route.meta.title
    })
  }
}
