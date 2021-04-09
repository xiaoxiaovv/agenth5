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
        结算信息
      </div>
      <div class="text"
           @click="onBack">
        上一步
      </div>
    </div>

    <!-- 信息主体 -->
    <div class="client-info-detail__content box match-left-space">

      <div class="match-width box align-default">
        <div class="item"
             style="border:0;">
          <div class="subtitle"
               v-if="Number(detail.businessType) === 1">
            <span class="star">*</span>对公账户开户许可证
          </div>
          <div class="subtitle"
               v-else>
            <span class="star">*</span>请上传经营者银行卡
          </div>
        </div>
        <div class="item id_img_wp">
          <div class="img_wp img_wp_width">
            <vmaUploadImg ref="bank"
                          @change="onFileChange($event, 'bank')"></vmaUploadImg>
            <template v-if="(Number(detail.businessType) === 1 && detail.openingAccountLicensePicId) || (Number(detail.businessType) === 2 && detail.bankCardPositivePicId)">
              <i class="icon iconfont iconshanchu"
                 @click="deleteImg('card')"></i>
            </template>
            <div class="icon iconfont iconzhaoxiangji ml-10"
                 style="font-size:30px;"></div>
            <template v-if="Number(detail.businessType) === 1">
              <img v-if="detail.openingAccountLicensePicId"
                   :src="detail.openingAccountLicensePicId | previewLoadImage"
                   @click="previewImage(detail.openingAccountLicensePicId)" />
            </template>
            <template v-else>
              <img v-if="detail.bankCardPositivePicId"
                   :src="detail.bankCardPositivePicId | previewLoadImage"
                   @click="previewImage(detail.bankCardPositivePicId)" />
            </template>
            <p class="img_intro">银行卡正面</p>
          </div>

          <div class="img_wp img_wp_width">
            <vmaUploadImg ref="back"
                          @change="onFileChange($event, 'back')"></vmaUploadImg>
            <div>
              <i v-if="detail.bankPhotoId"
                 class="icon iconfont iconshanchu"
                 @click="deleteImg('back')"></i>
              <div class="icon iconfont iconzhaoxiangji ml-10"
                   style="font-size:30px;"></div>
              <img v-if="detail.bankPhotoId"
                   :src="detail.bankPhotoId | previewLoadImage"
                   @click="previewImage(detail.bankPhotoId)" />
            </div>
            <p class="img_intro">银行卡背面</p>
          </div>

        </div>
        <div class="item"
             style="color:red;background:#fff;border-bottom:none;"
             v-if="Number(detail.businessType) === 1">请填写对公账户信息</div>
        <div class="item"
             style="color:red;background:#fff;border-bottom:none;"
             v-else>请填写法人银行卡信息</div>
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
              <input placeholder="例：上海浦东发展银行"
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
              <div>{{detail.lbnkProvName}}</div>
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
              <div>{{detail.lbnkCityName}}</div>
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
              <div>{{detail.lbnkNoName}}</div>
              <div class="icon iconfont iconenter ml-10"></div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>结算账户类型
          </div>
          <div class="match-left-space box align-right"
               @click="callSimpleTree(1)">
            <div class="input ellipsis"
                 style="text-align: right" v-text="kdbAccountTypeText">
            </div>
            <div class="icon iconfont iconenter ml-10"></div>
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>开户人名称/企业开户名称
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
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>开户预留手机号
          </div>
          <div class="match-left-space align-right">
            <div class="input align-right">
              <input placeholder="请输入内容"
                     v-model="detail.bankPhone" />
            </div>
          </div>
        </div>
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

    <!--简单树-->
    <mu-bottom-sheet :open.sync="openSimpleTree">
      <div class="action-sheet box align-default">
        <div class="title box align-hor-bet plr-30">
          <div @click="simpleTreeBack">返回</div>
          <!-- <div class="confirm">
            <div  @click="onActionSheetConfirm(2)">确定</div>
            <div v-else @click="onNextStep">取消</div>
          </div> -->
        </div>
      </div>

      <div v-if="simpleTreeStatus === 1">
        <div class="action-sheet__header align-left box plr-30">请选择结算账户类型</div>
        <div class="action-sheet__content">
          <div class="match-width"
               v-for="(item, index) in kdbAccountTypeList"
               :key="index">
            <div :class="['item align-hor-bet plr-30 ptb-30', (item.value === detail.kdbAccountType)?'active':'']"
                 @click="simpleTreeSelect(item)">
              <div>{{item.name}}</div>
              <!-- <div v-if="item.value === threeList[curThree]" class="icon iconfont iconcheck"></div> -->
              <!-- <div class="pass" v-else></div> -->
            </div>
          </div>
        </div>
      </div>

    </mu-bottom-sheet>
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
import indexMixins from './src/mixins'

export default {
  components: { vmaUploadImg, vmaImagePreview },
  mixins: [indexMixins],
  data() {
    return {
      kdbAccountTypeText:'请选择结算账户类型',
      simpleTreeStatus: '',
      kdbAccountTypeList: [
        {
          value: 1,
          name: '对私结算'
        },
        {
          value: 2,
          name: '对公结算'
        }
      ],
      openSimpleTree:false, //简单选择树
      openAlert: false,
      loading: false,
      detail: {
        // isCommit: 0,
        bankCardPositivePicId: '',
        bnkCd: '',
        lbnkProv: '',
        lbnkCity: '',
        lbnkNo: '',
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
    setSimpleTreeText(detailData){
      if(detailData.kdbAccountType){
        this.kdbAccountTypeText = this.kdbAccountTypeList[Number(detailData.kdbAccountType)-1].name;
      }
    },
    //唤醒简单树
    callSimpleTree(status){
      this.openSimpleTree = true;
      this.simpleTreeStatus = status;
    },
    //simpleTree 选中
    simpleTreeSelect(item){
      if(this.simpleTreeStatus === 1){
        this.detail.kdbAccountType = item.value;
        this.kdbAccountTypeText = item.name;
      }
      this.openSimpleTree = false;

    },
    simpleTreeBack(){
      this.openSimpleTree = false;
    },
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
    // 删除图片
    deleteImg(type) {
      if (type === 'card') {
        if (Number(this.detail.businessType) === 1) {
          this.detail.openingAccountLicensePicId = ''
        } else {
          this.detail.bankCardPositivePicId = ''
          this.detail.accountNumber = ''
        }
        this.detail.bnkCd = ''
        this.detail.bnkCdName = ''

        this.detail.lbnkProv = ''
        this.detail.lbnkProvName = ''

        this.detail.lbnkCity = ''
        this.detail.lbnkCityName = ''

        this.detail.lbnkNo = ''
        this.detail.lbnkNoName = ''
      }else if (type === 'back'){
        this.detail.bankPhotoId = ''
      }
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
        this.curProvinceCode = this.detail.lbnkProv
        this.searchResultList = this.provinceCodeList
        return
      }
      if (!this.detail.lbnkProv) {
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
      if (!this.detail.lbnkCity) {
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
      //   lbnkProv: this.detail.lbnkProv,
      //   lbnkCity: this.detail.lbnkCity,
      //   bnkCd: this.detail.bnkCd
      // }
      // clientInfoApi.getBranchCode(params).then(res => {
      //   this.searchResultList = res.obj
      //   this.branchCodeList = res.obj
      // })
      let params = {
        bankName: this.detail.bnkCdName,
        province: this.detail.lbnkProvName,
        city: this.detail.lbnkCityName,
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
        if (this.detail.lbnkProv !== this.curProvinceCode) {
          this.detail.lbnkCity = ''
          this.detail.lbnkNo = ''
          this.detail.lbnkCityName = ''
          this.detail.lbnkNoName = ''
        }
        this.detail.lbnkProv = this.curProvinceCode
        this.detail.lbnkProvName = this.curProvinceName
      }
      if (this.codeType === 'city') {
        if (this.detail.lbnkCity !== this.curCityCode) {
          this.detail.lbnkNo = ''
          this.detail.lbnkNoName = ''
        }
        this.detail.lbnkCity = this.curCityCode
        this.detail.lbnkCityName = this.curCityName
      }
      if (this.codeType === 'branch') {
        this.detail.lbnkNo = this.curBranchCode
        this.detail.lbnkNoName = this.curBranchName
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
      let requiredData = ['bnkCdName', 'lbnkProv', 'lbnkCity', 'lbnkNo', 'accountHolder', 'accountNumber', 'bankPhone', 'bankPhotoId']
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
          this.detail.lbnkProv = '' // 开户支行所在省编码
          this.detail.lbnkProvName = ''

          this.detail.lbnkCity = '' // 开户支行所在市编码
          this.detail.lbnkCityName = ''
        } else {
          this.detail.lbnkProv = res.obj.bankAreaBO.provinceCode || '' // 开户支行所在省编码
          this.curProvinceCode = res.obj.bankAreaBO.provinceCode || ''
          this.detail.lbnkProvName = res.obj.bankAreaBO.provinceName || ''
          if (res.obj.bankAreaBO.cityCode && res.obj.bankAreaBO.cityName) {
            this.detail.lbnkCity = res.obj.bankAreaBO.cityCode // 开户支行所在市编码
            this.detail.lbnkCityName = res.obj.bankAreaBO.cityName
          } else {
            this.detail.lbnkCity = '' // 开户支行所在市编码
            this.detail.lbnkCityName = ''
          }
        }

        this.detail.lbnkNo = '' // 开户支行行号编码
        this.detail.lbnkNoName = '' // 开户支行行号编码
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
                this.$set(this.detail, 'bankCardPositivePicId', photoId)  //临时解决方案，添加企业开户证的时候，给个人银行卡正面字段也赋上相同的值，后台取了这个字段作为企业开户证字段
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
        this.setSimpleTreeText(this.detail)
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
    this.detail.id = this.$route.query.id
    if (this.detail.id) {
      this.getMchInfo(this.detail.id)
      this.getProvinceList()
    } else {
      this.$toast.error('详情数据丢失')
    }
  }
}
</script>
