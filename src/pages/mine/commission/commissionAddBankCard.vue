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
           @click="onBack">
      </div>
      <div class="title">
        <!-- {{merchantName}} -->
        添加/编辑提现卡
      </div>
      <div class="text"
           @click="onBack">
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
              <div>{{detail.bnkCdName}}</div>
              <div class="icon iconfont iconenter ml-10"></div>
            </div>
          </div> -->
          <div class="match-left-space align-right">
            <div class="input align-right">
              <input placeholder="请与卡面名称保持一致"
                     v-model="detail.bnkCdName" />
            </div>
          </div>
        </div>
        <div class="item">
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
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>开户姓名
          </div>
          <div class="match-left-space align-right">
            <div class="input align-right">
              <input placeholder="请输入内容"
                     v-model="detail.accountHolder" />
            </div>
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>开户账号
          </div>
          <div class="match-left-space align-right">
            <div class="input align-right">
              <input placeholder="请输入内容"
                     v-model="detail.accountNumber" />
            </div>
          </div>
        </div>
        <!--<div class="item">
          <div class="subtitle">
            <span class="star">*</span>开户预留手机号
          </div>
          <div class="match-left-space align-right">
            <div class="input align-right">
              <input placeholder="请输入内容"
                     v-model="detail.bankPhone" />
            </div>
          </div>
        </div>-->
      </div>
      <div class="match-width box align-center">
        <div class="next box align-center"
             @click="openAlertDialog">
          下一步
        </div>
      </div>

      <!-- action-sheet 编码 -->
      <mu-bottom-sheet :open.sync="open">
        <div class="action-sheet box align-default">

          <div class="title box align-hor-bet plr-30">
            <div @click="onActionSheetClose">
              返回
            </div>
            <div class="confirm"
                 @click="onActionSheetConfirm">
              确定
            </div>
          </div>
          <div class="input-wrap plr-60">
            <i class="iconfont iconsearch pre-icon"></i>
            <input v-model="keyword"
                   class="input"
                   :placeholder="codeType === 'branch'?'例：浦发银行北京富丰路支行':'请输入关键字搜索'"
                   @keyup.enter="handleSearch" />
          </div>
          <div class="max-sheet-height">
            <!-- 银行编码 -->
            <div class="match-width"
                 v-for="(item, index) in searchResultList"
                 :key="index"
                 v-if="codeType === 'bank'">
              <div :class="['item align-hor-bet plr-30 ptb-30', item.bnkCode==curBnkCode?'active':'']"
                   @click="changeItem(item)">
                <div class="flex-1">
                  <div>{{item.bnkName}}</div>
                  <div>{{item.bnkCode}}</div>
                </div>
                <div v-if="item.bnkCode==curBnkCode"
                     class="icon iconfont iconcheck">
                </div>
                <div class="pass"
                     v-else></div>
              </div>
            </div>
            <!-- 省编码 -->
            <div class="match-width"
                 v-for="(item, index) in searchResultList"
                 :key="index"
                 v-if="codeType === 'province'">
              <div :class="['item align-hor-bet plr-30 ptb-30', item.provinceCode==curProvinceCode?'active':'']"
                   @click="changeItem(item)"
                   style="height:auto;">
                <div class="flex-1">
                  <div>{{item.provinceName}}</div>
                  <!-- <div>{{item.provinceCode}}</div> -->
                </div>
                <div v-if="item.provinceCode==curProvinceCode"
                     class="icon iconfont iconcheck">
                </div>
                <div class="pass"
                     v-else></div>
              </div>
            </div>
            <!-- 市编码 -->
            <div class="match-width"
                 v-for="(item, index) in searchResultList"
                 :key="index"
                 v-if="codeType === 'city'">
              <div :class="['item align-hor-bet plr-30 ptb-30', item.cityCode==curCityCode?'active':'']"
                   @click="changeItem(item)"
                   style="height:auto;">
                <div class="flex-1">
                  <div>{{item.cityName}}</div>
                  <!-- <div>{{item.cityCode}}</div> -->
                </div>
                <div v-if="item.cityCode==curCityCode"
                     class="icon iconfont iconcheck">
                </div>
                <div class="pass"
                     v-else></div>
              </div>
            </div>
            <!-- 支行编码 -->
            <div class="match-width"
                 v-for="(item, index) in searchResultList"
                 :key="index"
                 v-if="codeType === 'branch'">
              <div :class="['item align-hor-bet plr-30 ptb-30', item.lbnkNo==curBranchCode?'active':'']"
                   @click="changeItem(item)"
                   style="height:auto;">
                <div class="flex-1">
                  <div>{{item.lbnkNm}}</div>
                  <div>{{item.lbnkNo}}</div>
                </div>
                <div v-if="item.lbnkNo==curBranchCode"
                     class="icon iconfont iconcheck">
                </div>
                <div class="pass"
                     v-else></div>
              </div>
            </div>
          </div>
          <!-- 补脚 -->
          <div class="action-sheet__padding"></div>

        </div>
      </mu-bottom-sheet>

      <!-- action-sheet -->
      <mu-bottom-sheet :open.sync="openMenu">
        <div class="action-sheet box align-default menu">

          <div class="item align-center"
               @click="onTakePhoto(1)">
            拍照
          </div>

          <div class="item align-center"
               @click="onTakePhoto(2)">
            从手机相册选择
          </div>

          <div class="item align-center cancel"
               @click="onActionMenuShow(2)">
            取消
          </div>

          <!-- 补脚 -->
          <div class="action-sheet__padding"></div>

        </div>
      </mu-bottom-sheet>
      <!-- 隐藏获取图片 -->
      <div class="file">
        <input type="file"
               ref="fileCamera"
               capture="camera"
               accept="image/*"
               @change="onFileChange" />
        <div class="cover"></div>
      </div>
      <!-- 隐藏获取图片 -->
      <div class="file">
        <input type="file"
               ref="file"
               accept="image/*"
               @change="onFileChange" />
        <div class="cover"></div>
      </div>

    </div>

    <!-- 图片预览 -->
    <vmaImagePreview :dialog="previewDialog"></vmaImagePreview>
    <mu-dialog title="提示"
               width="600"
               max-width="80%"
               :esc-press-close="false"
               :overlay-close="false"
               :open.sync="openAlert">
      请核对当前页面信息
      <mu-button slot="actions"
                 flat
                 color="primary"
                 @click="closeAlertDialog">需要修改</mu-button>
      <mu-button slot="actions"
                 flat
                 color="primary"
                 @click="onNext">确认无误</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
import { url } from '@/utils/src/request'
import { CLIENT_INFO_RECORD, CLIENT_INFO_BASE } from '@/router/types'
import { clientInfoApi } from '@/api'
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
        commissionProvName: '',
        commissionProvCode: '',
        commissionCityName: '',
        commissionCityCode: '',
        openBank: '',
        openBankCode: '',
        bankAccount: '', //户名
        bankName: '',
        cardNo: '',
        companyId: '',


        bankCardPositivePicId: '',
        bnkCd: '',
        bankPhotoId:'',
        accountHolder: '',
        accountNumber: '',
        bankPhone: ''
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
    onBack() {
      // TODO
      this.$router.push({
        name: CLIENT_INFO_RECORD,
        query: {
          id: this.detail.id
        }
      })
    },
    openAlertDialog() {
      this.openAlert = true
    },
    closeAlertDialog() {
      this.openAlert = false
    },
    getProvinceList () {
      clientInfoApi.getCodeList().then(res => {
        this.provinceCodeList = res.obj
        this.searchResultList = res.obj
      })
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
      if (!this.detail.bnkCdName) {
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
        bankName: this.detail.bnkCdName,
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
        this.detail.bnkCdName = this.curBnkName
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
    // 下一步
    onNext() {
      let requiredData = ['bnkCdName', 'commissionProvCode', 'commissionCityCode', 'openBankCode', 'accountHolder', 'accountNumber', 'bankPhone', 'bankPhotoId']
      if (Number(this.detail.businessType) === 1) { // 个体
        requiredData.push('openingAccountLicensePicId')
      } else { // 企业
        requiredData.push('bankCardPositivePicId')
      }
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
        clientInfoApi.submitMchIfo(this.detail).then(res => {
          this.$router.push({
            name: CLIENT_INFO_BASE,
            query: {
              id: this.detail.id
            }
          })
        })
      } else {
        this.$toast.error('有内容未填入')
      }
    },
    // 获取对公账户
    getOpenAccountInfo(pathId) {
      clientInfoApi.getOpenBankCard(pathId).then(res => {
        this.detail.accountHolder = res.obj.name || ''
        this.detail.accountNumber = res.obj.bankNo || ''
      })
    },
    // 获取银行卡信息
    getBankInfo(pathId) {
      this.loading = true
      clientInfoApi.getBankCard(pathId).then(res => {
        this.detail.bnkCd = res.obj.bnkCd || '' // 开户行总行行(银行编码)
        this.detail.bnkCdName = res.obj.bankInfo || ''
        if (!res.obj.bankAreaBO) {
          this.detail.commissionProvCode = '' // 开户支行所在省编码
          this.detail.commissionProvName = ''

          this.detail.commissionCityCode = '' // 开户支行所在市编码
          this.detail.commissionCityName = ''
        } else {
          this.detail.commissionProvCode = res.obj.bankAreaBO.provinceCode || '' // 开户支行所在省编码
          this.curProvinceCode = res.obj.bankAreaBO.provinceCode || ''
          this.detail.commissionProvName = res.obj.bankAreaBO.provinceName || ''
          if (res.obj.bankAreaBO.cityCode && res.obj.bankAreaBO.cityName) {
            this.detail.commissionCityCode = res.obj.bankAreaBO.cityCode // 开户支行所在市编码
            this.detail.commissionCityName = res.obj.bankAreaBO.cityName
          } else {
            this.detail.commissionCityCode = '' // 开户支行所在市编码
            this.detail.commissionCityName = ''
          }
        }

        this.detail.openBankCode = '' // 开户支行行号编码
        this.detail.openBank = '' // 开户支行行号编码
        this.detail.accountNumber = res.obj.cardNo
      }).finally(() => {
        this.loading = false
      })
    },
    // 文件改变
    onFileChange(file, type) {
      if (file) {
        clientInfoApi.uploadImage(file).then(res => {
          if (res.code === 200) {
            this.$toast.success('图片上传成功')
            this.$refs[type].$refs.file.value = ''
            let photoId = res.obj
            if (type === 'bank') { // 获取银行卡照片
              if (Number(this.detail.businessType) === 1) { // 对公账户
                this.$set(this.detail, 'openingAccountLicensePicId', photoId)
                this.getOpenAccountInfo(photoId)
              } else {
                this.$set(this.detail, 'bankCardPositivePicId', photoId)
                this.getBankInfo(photoId)
              }
            }else if (type === 'back') { // 获取银行卡背面照片
              this.$set(this.detail, 'bankPhotoId', photoId)
            }
          } else {
            this.$toast.error(res.msg)
          }
        }, (err) => {
          this.$toast.error(err.msg)
        })
      }
    },
    // 获取列表详情
    getMchInfo(id) {
      clientInfoApi.getMchInfo({ id }).then(res => {
        // res.obj.accountHolder = res.obj.accountHolder || res.obj.representativeName
        this.detail = Object.assign({}, this.detail, res.obj)
      })
    },

    // 证件持有证件人类型
    transferRepType(type) {
      return type === 1 || type === '1' || !type ? 0 : 1
    },
    // 证件类型
    transferCerType(type) {
      return type === 1 || type === '1' || !type ? 0 : 1
    }
  },

  filters: {
    // 获取图片
    loadImage(id) {
      return id ? url + `/fms/upload/resource/thumbnail/${id}` : ''
    },
    previewLoadImage(id) {
      return id ? url + `/fms/upload/resource/${id}` : ''
    },
    // 证件持有人类型
    representativeTypeFilter(type) {
      return type === 1 ? '法人' : (type === 2 ? '经办人' : '')
    },
    // 证件类型
    certificateFilter(type) {
      return type === 1 ? '身份证' : (type === 2 ? '护照' : '')
    }
  },

  mounted() {
    this.getProvinceList()
    /*this.detail.id = this.$route.query.id
    if (this.detail.id) {
      this.getMchInfo(this.detail.id)
      this.getProvinceList()
    } else {
      this.$toast.error('详情数据丢失')
    }*/
  }
}
</script>
