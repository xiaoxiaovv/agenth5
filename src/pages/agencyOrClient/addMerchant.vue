
<template>
  <div class="vm-bg-white">
    <div class="vm-page-header">
      <div class="vm-page-header-container">
        <div class="vm-head">
          <div class="vm-head-icon">
            <span class="icon iconfont iconreturn" @click="goback"></span>
          </div>
          <div class="vm-head-title vm-ell">商户签约</div>
        </div>
      </div>
    </div>
    <div class="addMerchant">
      <!-- <img src="@/assets/images/common/ad.png" class="adImg" /> -->
      <button class="addMerchantBtn" @click="handleToProcess" style="margin-top:150px">填写进件信息</button>
      <button class="addMerchantBtn addMerchantBtnDefault" @click="copyClientLink()">邀请商家填写进件信息</button>
    </div>
  </div>
</template>

<script>
import * as types from '@/router/types'
import { isProd } from '../../config'
export default {
  data() {
    return {
      id: '',
      from: ''
    }
  },
  watch: {},
  created() {
    console.log('this.$route.query', this.$route.query)
    if (this.$route.query.id) {
      this.id = this.$route.query.id
    }
    if (this.$route.query.from) {
      this.from = this.$route.query.from
    }
  },
  mounted() {},
  methods: {
    /**
     * 返回上一页
     */
    goback() {
      this.$router.back(-1)
    },
    // 填写进件信息
    handleToProcess() {
      this.$router.push({name: types.CLIENT_INFO_RECORD, query: {id: this.id, from: this.from}})
    },
    // 复制链接
    copyClientLink(id) {
      let link = `${location.origin}/${isProd ? 'web/h5/index.html' : ''}#/client_info_record?from=share&id=${this.id}&token=${sessionStorage.token}`
      let dummy = document.createElement('input')
      dummy.style.opacity = '0'
      dummy.readOnly = 'readOnly'
      document.body.appendChild(dummy)
      dummy.value = link
      // dummy.select() // 选择对象
      dummy.setSelectionRange(0, link.length)
      dummy.focus()
      document.execCommand('copy') // 执行浏览器复制命令
      document.body.removeChild(dummy)
      this.$toast.message({
        position: 'top-end',
        message: '复制成功',
        close: false,
        time: 2000
      })

      console.log(link)
    }
  }
}
</script>
<style scoped>
/* @import "../cxby/mixins.scss"; */
</style>
