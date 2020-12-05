// import { clientInfoApi } from '@/api'
export default {
  data() {
    return {
      // datail: {},
      previewDialog: { // 预览弹窗
        open: false,
        id: ''
      }
    }
  },
  methods: {
    // 获取列表详情
    // getMchInfo(id) {
    //   clientInfoApi.getMchInfo({ id }).then(res => {
    //     this.detail = Object.assign({}, this.detail, res.obj)
    //   })
    // },
    // 预览图片
    previewImage(id) {
      console.log('预览图片', id)
      if (!id) return
      this.previewDialog.open = true
      this.previewDialog.id = id
    }
  },
  mounted() {

  }
}
