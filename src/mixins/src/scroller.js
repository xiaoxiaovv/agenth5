/**
 * 外部引入：
 * 1、不是list方法
 *  async list() {
      const datalist = await this.methods()
      return datalist
    }
    2、加载更多 vue-scroller
    3、https://github.com/wangdahoo/vue-scroller
 */
export default {
  data() {
    return {
      noData: false,
      params: {
        pageNum: 1,
        pageSize: 10
      },
      dataList: []
    }
  },
  mounted() {
    // 组件渲染后首次统一调用
    this.list()
  },
  methods: {
    infinite(done) {
      if (this.noData) {
        setTimeout(() => {
          done(true)
        })
        return
      }
      setTimeout(() => {
        this.params.pageNum += 1
        this.list().then((data) => {
          if (data.length <= 0) {
            this.noData = true
          }
          this.$nextTick(() => {
            done()
            this.$refs.myscroller.resize()
          })
        })
      }, 0)
    },
    listInit() {
      this.dataList = []
      this.params.pageNum = 1
      // 一定要重置noData为false,不然切换页面的时候会无法取到更多数据；因为noData=true时，会直接执行没有更多数据的方法
      this.noData = false
      this.list()
    }
  }
}
