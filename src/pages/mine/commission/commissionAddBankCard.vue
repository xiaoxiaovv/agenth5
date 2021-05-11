<!-- 结算信息 -->
<template>
  <div class="client-info-detail frame-container box align-default short"
       v-loading="loading"
       data-mu-loading-text="拼命加载中"
       data-mu-loading-overlay-color="rgba(0, 0, 0, .6)">

    <!-- 补白 -->
    <div class="client-info-detail__padding"></div>

    <!-- 导航栏 -->
    <div class="client-info-detail__nav box plr-30 align-hor-bet">
      <div class="icon iconfont  iconreturn"
           @click="$router.back(-1)">
      </div>
      <div class="title">
        <!-- {{merchantName}} -->
        添加/编辑提现卡
      </div>
      <div class="text"
           @click="$router.back(-1)">
      </div>
    </div>

    <!-- 信息主体 -->
    <div class="client-info-detail__content box match-left-space">

      <div class="match-width box align-default">


        <!--<div class="item"
             style="color:red;background:#fff;border-bottom:none;"
             v-if="Number(detail.businessType) === 1">请填写对公账户信息</div>
        <div class="item"
             style="color:red;background:#fff;border-bottom:none;"
             v-else>请填写法人银行卡信息</div>-->
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>开户总行银行
          </div>
          <!-- <div class="match-left-space align-right">
            <div class="input align-right"
                 @click="callActionSheet('bank')">
              <div>{{detail.bankName}}</div>
              <div class="icon iconfont iconenter ml-10"></div>
            </div>
          </div> -->
          <div class="match-left-space align-right">
            <div class="input align-right">
              <input placeholder="请与卡面名称保持一致"
                     v-model="detail.bankName" />
            </div>
          </div>
        </div>
       <!-- <div class="item">
          <div class="subtitle">
            <span class="star">*</span>开户支行所在省行政
          </div>
          <div class="match-left-space align-right">
            <div class="input align-right"
                 @click="callActionSheet('province')">
              <div>{{detail.commissionProvName}}</div>
              <div class="icon iconfont iconenter ml-10"></div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>开户支行所在市行政
          </div>
          <div class="match-left-space align-right">
            <div class="input align-right"
                 @click="callActionSheet('city')">
              <div>{{detail.commissionCityName}}</div>
              <div class="icon iconfont iconenter ml-10"></div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>开户行所在支行
          </div>
          <div class="match-left-space align-right">
            <div class="input align-right"
                 @click="callActionSheet('branch')">
              <div>{{detail.openBank}}</div>
              <div class="icon iconfont iconenter ml-10"></div>
            </div>
          </div>
        </div>-->
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>开户账号
          </div>
          <div class="match-left-space align-right">
            <div class="input align-right">
              <input placeholder="请输入内容"
                     v-model="detail.accNo" />
            </div>
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>开户姓名
          </div>
          <div class="match-left-space align-right">
            <div class="input align-right">
              <input placeholder="请输入内容"
                     v-model="detail.realName" />
            </div>
          </div>
        </div>

      <!--  <div class="item">
          <div class="subtitle">
            <span class="star">*</span>开户预留手机号
          </div>
          <div class="match-left-space align-right">
            <div class="input align-right">
              <input placeholder="请输入内容"
                     v-model="detail.mobile" />
            </div>
          </div>
        </div>-->
      </div>
      <div class="match-width box align-center">
        <div class="next box align-center"
             @click="commissionAddBankCard">
          提交
        </div>
      </div>



    </div>

    <!-- 图片预览 -->
<!--    <vmaImagePreview :dialog="previewDialog"></vmaImagePreview>-->
    <mu-dialog title="提示"
               width="600"
               max-width="80%"
               :esc-press-close="false"
               :overlay-close="false"
               :open.sync="openAlert">
      添加银行卡成功
      <mu-button slot="actions"
                 flat
                 color="primary"
                 @click="closeAlertDialog">取消</mu-button>
      <mu-button slot="actions"
                 flat
                 color="primary"
                 @click="toApplyPage">去提现</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
import { url } from '@/utils/src/request'
import { COMMISSIONAPPLY } from '@/router/types'
// import { commissionAddBankCard, commissionGetBankCard } from '@/api/src/commissionApi'
import { commissionApi, clientInfoApi } from '@/api'
import { afterLoginInfoLocal } from '@/storage'


import vmaUploadImg from '@/components/common/vmaUploadImg'
import vmaImagePreview from '@/components/common/vmaImagePreview'
// import indexMixins from './src/mixins'

export default {
  components: { vmaUploadImg, vmaImagePreview },
  // mixins: [indexMixins],
  data() {
    return {
      openAlert: false,
      loading: false,
      detail: {
        "accNo": "",
        "bankName": "",
        "realName": "",
      },
      open: false,
      status: 0,
      scenes: ['线下', '公众号/小程序', '网站', 'APP'],
      curScene: 0,
      majors: ['企业', '个体工商户'],
      curMajor: 0,
      appStates: ['已上线', '未上线'],
      curAppState: 0,
      openMenu: false,
      photoTaker: 0,
      representativeTypes: ['法人', '经办人'],

      certificateTypes: ['身份证', '护照'],
      curCertificateType: 0,
      isImagePreview: false,
      imgUrl: '',
      merchantName: '',

      curBnkCode: '',
      curBnkName: '',
      curProvinceCode: '',
      curProvinceName: '',
      curCityCode: '',
      curCityName: '',
      curBranchCode: '',
      curBranchName: '',

      bankCodeList: [],
      provinceCodeList: [],
      cityCodeList: [],
      branchCodeList: [],
      searchResultList: [],
      codeType: '', // 编码类型
      keyword: '' // 关键字
    }
  },

  methods: {
    // 返回
    /*onBack() {
      // TODO
      this.$router.push({
        name: CLIENT_INFO_RECORD,
        query: {
          id: this.detail.id
        }
      })
    },*/
    openAlertDialog() {
      this.openAlert = true
    },
    closeAlertDialog() {
      this.openAlert = false
    },

    // 唤醒action-sheet
    callActionSheet(type) {
      this.codeType = type
      this.keyword = ''
      if (type === 'bank') {
        this.open = true
        clientInfoApi.getBankCode().then(res => {
          this.bankCodeList = res.obj
          this.searchResultList = res.obj
        })
        return
      }

      if (type === 'province') {
        this.open = true
        this.curProvinceCode = this.detail.commissionProvCode
        this.searchResultList = this.provinceCodeList
        return
      }
      if (!this.detail.commissionProvCode) {
        this.$toast.message('请选择省行政编码')
        return
      }
      if (type === 'city') {
        this.open = true
        this.provinceCodeList.forEach(res => {
          if (res.provinceCode === this.curProvinceCode) {
            this.cityCodeList = res.list
            this.searchResultList = res.list
          }
        })
        return
      }
      // if (!this.detail.bnkCd) {
      //   this.$toast.message('请选择银行编码')
      //   return
      // }
      if (!this.detail.commissionCityCode) {
        this.$toast.message('请选择市行政编码')
        return
      }
      if (!this.detail.bankName) {
        this.$toast.message('请输入开户总行银行')
        return
      }
      if (type === 'branch') {
        this.open = true
        this.getBranchCode()
      }
    },
    // 获取支行编码
    getBranchCode(keyWord) {
      // let params = {
      //   commissionProvCode: this.detail.commissionProvCode,
      //   commissionCityCode: this.detail.commissionCityCode,
      //   bnkCd: this.detail.bnkCd
      // }
      // clientInfoApi.getBranchCode(params).then(res => {
      //   this.searchResultList = res.obj
      //   this.branchCodeList = res.obj
      // })
      let params = {
        bankName: this.detail.bankName,
        province: this.detail.commissionProvName,
        city: this.detail.commissionCityName,
        appointBankName: keyWord || ''
      }
      clientInfoApi.getBranchCodeNew(params).then(res => {
        let data = res.obj.map(item => {
          return {
            lbnkNo: item.unionpayId,
            lbnkNm: item.bankName
          }
        })
        this.searchResultList = data
        this.branchCodeList = data
      })
    },
    // 关闭弹窗
    onActionSheetClose() {
      this.open = false
      this.keyword = ''
    },
    // 搜索
    handleSearch() {
      let keyword = this.keyword
      let result = []
      if (this.codeType === 'branch') {
        this.getBranchCode(keyword)
        return
      }
      if (this.codeType === 'bank') {
        result = this.bankCodeList.filter(res => res.bnkCode.indexOf(keyword) !== -1 || res.bnkName.indexOf(keyword) !== -1)
      }
      if (this.codeType === 'province') {
        result = this.provinceCodeList.filter(res => res.provinceCode.indexOf(keyword) !== -1 || res.provinceName.indexOf(keyword) !== -1)
      }
      if (this.codeType === 'city') {
        result = this.cityCodeList.filter(res => res.cityCode.indexOf(keyword) !== -1 || res.cityName.indexOf(keyword) !== -1)
      }
      this.searchResultList = result
    },
    // 确定
    onActionSheetConfirm() {
      this.onActionSheetClose()
      if (this.codeType === 'bank') {
        this.detail.bnkCd = this.curBnkCode
        this.detail.bankName = this.curBnkName
      }
      if (this.codeType === 'province') {
        if (this.detail.commissionProvCode !== this.curProvinceCode) {
          this.detail.commissionCityCode = ''
          this.detail.openBankCode = ''
          this.detail.commissionCityName = ''
          this.detail.openBank = ''
        }
        this.detail.commissionProvCode = this.curProvinceCode
        this.detail.commissionProvName = this.curProvinceName
      }
      if (this.codeType === 'city') {
        if (this.detail.commissionCityCode !== this.curCityCode) {
          this.detail.openBankCode = ''
          this.detail.openBank = ''
        }
        this.detail.commissionCityCode = this.curCityCode
        this.detail.commissionCityName = this.curCityName
      }
      if (this.codeType === 'branch') {
        this.detail.openBankCode = this.curBranchCode
        this.detail.openBank = this.curBranchName
      }
    },
    // 切换选项
    changeItem(obj) {
      if (this.codeType === 'bank') {
        this.curBnkCode = obj.bnkCode
        this.curBnkName = obj.bnkName
      }
      if (this.codeType === 'province') {
        this.curProvinceCode = obj.provinceCode
        this.curProvinceName = obj.provinceName
      }
      if (this.codeType === 'city') {
        this.curCityCode = obj.cityCode
        this.curCityName = obj.cityName
      }
      if (this.codeType === 'branch') {
        this.curBranchCode = obj.lbnkNo
        this.curBranchName = obj.lbnkNm
      }
    },
    // 控制actionSheetMenu显隐
    onActionMenuShow(status) {
      if (+status === 2) {
        this.openMenu = false
      } else if (+status === 1) {
        this.openMenu = true
      }
    },
    // 相机打开
    onTakePhoto(status) {
      if (+status === 1) {
        // 拍照
        this.$refs.fileCamera.click()
      } else if (+status === 2) {
        // 从相机打开
        this.$refs.file.click()
      }

      // console.log('相机', this.photoTaker, status)
      this.openMenu = false
    },
    //
    toApplyPage(){
      this.$router.push({
        name: COMMISSIONAPPLY,
      })
    },
    // 提交
    commissionAddBankCard() {
      let requiredData = ['bankName', 'accNo', 'realName']

      let flag = true
      for (let i in this.detail) {
        if (this.detail.hasOwnProperty(i) && requiredData.indexOf(i) !== -1) {
          if (!this.detail[i]) {
            flag = false
            break
          }
        }
      }
      if (flag) {
        if(sessionStorage.commissionBankCardId){
        //  走修改接口
          this.detail.id = sessionStorage.commissionBankCardId
          commissionApi.commissionEditBankCard(this.detail).then(res => {
            if(res.code === 0){
              this.$toast.success('提交成功')
            }
          })
        }else{
          //走新增接口
          commissionApi.commissionAddBankCard(this.detail).then(res => {
            if(res.code === 0){
              this.$toast.success('提交成功')
            }
          })
        }

        //根据卡号查联行号
        /*commissionApi.getBankCardInfoByCardNo(this.detail.accNo).then(res=>{
          this.detail.bankName = res.data.bank

          res.bankcode

        })*/


      } else {
        this.$toast.error('有内容未填入')
      }
    }
  },

  filters: {

  },

  mounted() {

  }
}
</script>
