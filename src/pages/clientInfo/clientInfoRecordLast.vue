<template>
  <div class="client-info-detail client-info-last frame-container box align-default short">
    <!-- 补白 -->
<!--    <div class="client-info-detail__padding"></div>-->

    <!-- 导航栏 -->
    <div class="client-info-detail__nav box plr-30 align-hor-bet mt-20">
      <div class="icon iconfont iconreturn"
           @click="onBack"></div>
      <div class="title">{{detail.merchantName}}</div>
      <div class="text"
           @click="handleReset">重置</div>
    </div>

    <!-- 信息主体 -->
    <div class="client-info-detail__content box match-left-space">
      <div class="match-width box align-default">
        <div class="title">
          <p>进件信息</p >
        </div>
        <div class="item"
             v-if="from!=='share'">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.sjPos">*</span>手机pos交易费率
          </div>
          <div class="match-left-space align-right input-number">
            <input type="number"
                   placeholder="请填写真实费率"
                   v-model="detail.posTradeRate" />%
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.sjPos">*</span>手机pos提现费
          </div>
          <div class="match-left-space align-right">
            <input placeholder="请输入"
                   v-model="detail.posDrawFee" />
          </div>
        </div>
        <div class="item"
             v-if="from!=='share'">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.sjPos">*</span>网联交易费率
          </div>
          <div class="match-left-space align-right input-number">
            <input type="number"
                   placeholder="请填写真实费率"
                   v-model="detail.quickTradeRate" />%
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.sjPos">*</span>网联提现费
          </div>
          <div class="match-left-space align-right">
            <input placeholder="请输入"
                   v-model="detail.quickDrawFee" />
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.sjPos">*</span>二维码交易费率
          </div>
          <div class="match-left-space align-right input-number">
            <input type="number"
                   placeholder="请填写真实费率"
                   v-model="detail.kdbWxTradeRate" />%
          </div>
        </div>

      </div>
      <div class="match-width box align-center">
        <div class="next box align-center"
             @click="onNext">提交</div>
      </div>






    </div>
    <!-- 图片预览 -->
    <vmaImagePreview :dialog="previewDialog"></vmaImagePreview>
  </div>
</template>

<script>
import { url } from '@/utils/src/request'
import { initProvinces } from '@/utils/src/common'
import { CLIENT_INFO_BASE, CLIENT_INFO_DETAIL } from '@/router/types'
// clientInfoDetailIDLocal
import VmaCascaderTree from '@/components/common/vmaCascaderTree'

import { clientInfoDetailLocal, clientInfoDetailMerchantNameLocal, fromReactNativeLocal } from '@/storage'
import { clientInfoApi, agentOrClient } from '@/api'
import vmaUploadImg from '@/components/common/vmaUploadImg'
import vmaImagePreview from '@/components/common/vmaImagePreview'
import indexMixins from './src/mixins'
// import PROCESS from '@/constants'
import { getProcess } from '@/constants'
import { NativeAppRouter } from '../../utils/src/webviewBridgeUtils'
import { afterLoginInfoLocal} from '@/storage'


export default {
  components: {
    VmaCascaderTree,
    vmaUploadImg,
    vmaImagePreview
  },
  mixins: [indexMixins],
  data() {
    return {
      // PROCESS,
      PROCESS: {
          //所有的值会被mounted里接口请求的数据覆盖
          YL:false,
        SXF: false,
        WX: false,
        LS: false,
        YS: false,
        CH: false,
        ZFB: false,
        FY: false,
        LKL:false,
        SJPOS:false,
        KDB:false,
        CJ:false, //畅捷
        YIS:false

      },
      checkboxObj: {
        sxf: false,
        wx: false,
        zfb: false,
        ls: false,
        ys: false,
        ch: false,
        fy: false,
        lkl: false,
        sjPos: false,
        kdb:false,
        cj:false, //畅捷
        yiS:false
      },

      from: sessionStorage.from || '',
      // link: sessionStorage.link,
      // iframe: sessionStorage.iframe ? JSON.parse(sessionStorage.iframe) : false,
      options: [],
      proImgList: [], // 商家协议图片id列表
      detail: {
        //  手机pos
        posDrawFee: '', // 手机pos提现费
        posTradeRate: '', // 手机pos交易费率
        quickDrawFee: '', // 网联提现费
        quickTradeRate: '', // 网联交易费率
        bankPhotoId: '', //手机pos银行卡背面照片ID
        holdingCardId: '', //手机pos手持身份证照片
        kdbWxTradeRate:'',
      },
    }
  },
  watch: {

  },
  created() {
    // sessionStorage.fromNextPage = true;
    //已注册的话需要展示从第一页获取的信息
    this.detail = JSON.parse(sessionStorage.getItem('detail'))

  },
  methods: {





    // 重置
    handleReset() {

      //  手机pos
      this.detail.posDrawFee = '' // 手机pos提现费
      this.detail.posTradeRate = '' // 手机pos交易费率
      this.detail.quickDrawFee = '' // 网联提现费
      this.detail.quickTradeRate = '' // 网联交易费率
      this.detail.bankPhotoId = '' //手机pos银行卡背面照片ID
      this.detail.holdingCardId = '' //手机pos手持身份证照片
    },
    // 返回
    onBack() {
      // TODO
      this.$router.push({
        name: CLIENT_INFO_BASE,
        query: {
          id: this.detail.id
        }
      })
    },

    //提交进件接口
    submitMchIfo() {
      sessionStorage.setItem('detail',JSON.stringify(this.detail));
      let detail = Object.assign({},this.detail)
      for(let key in detail){
        if(key.includes('Src')){
          delete detail[key]
        }
      }
      clientInfoApi.submitMchIfo(detail).then(
        res => {
          if (res.code === 0) {
            sessionStorage.submitSuccess = true;
            this.$toast.success('提交成功')
            let from = fromReactNativeLocal.get()
            if (from === 'iframe') { // 是否为iframe内嵌的环境
              console.log('iframe内嵌的环境：触发')
              let data = {}
              window.parent.postMessage(data, '*')
              return
            }


            // this.$router.push({
            //   name: CLIENT_INFO
            // })
            // sessionStorage.setItem('detail',JSON.stringify(this.detail));
            this.$router.push({
              name: CLIENT_INFO_DETAIL
            })
          } else {
            this.$toast.error(res.msg)
          }
        },
        err => {
          this.$toast.error(err.msg)
        }
      )
    },
    // 下一步
    onNext() {
      let sjPosRequireData = ['posTradeRate', 'posDrawFee','quickTradeRate', 'quickDrawFee', 'kdbWxTradeRate']
        if (!sjPosRequireData.every(attr => this.detail[attr] !== '' && this.detail[attr] !== null)) {
          this.$toast.error('有内容未填入')
          return
        }
        this.submitMchIfo()
    },

    // 时间戳
    getTimestamp(str) {
      return str ? new Date(Date.parse(str)).getTime() : 0
    },
    // 获取年月日
    getTime(str) {
      if (str) {
        // let tmp = new Date(Date.parse(str)).toLocaleDateString()
        let date = new Date(Date.parse(str))
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        if (m < 10) {
          m = '0' + m
        }
        let d = date.getDate()
        if (d < 10) {
          d = '0' + d
        }
        // tmp = tmp.split('/').join('-')
        let tmp = y + '-' + m + '-' + d
        return tmp
      }
      return ''
    },



  },

  filters: {
    // 获取图片
    loadImage(id) {
      return id ? url + `/fms/upload/resource/thumbnail/${id}` : ''
    },
    previewLoadImage(id) {
      return id ? url + `/fms/upload/resource/${id}` : ''
    }
  },

  mounted() {



  },

}
</script>

<style scoped>
.action-sheet .item {
  height: auto;
}
</style>
<style>
.client-info-last .vm-select-tip {
  margin-left: 0;
  margin-top: 0;
  position: static;
  margin-right: 8px;
}
.client-info-last .vm-select {
  display: flex;
}
.client-info-last .vm-select-content {
  padding-left: 0 !important;
}
.fixed-height {
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
}
</style>
