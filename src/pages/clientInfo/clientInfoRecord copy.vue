<template>
  <div class="client-info-detail frame-container box align-default">
    <!-- 补白 -->
    <div class="client-info-detail__padding"></div>

    <!-- 导航栏 -->
    <div class="client-info-detail__nav box plr-30 align-hor-bet">
      <div class="icon iconfont iconreturn" @click="onBack"></div>
      <div class="title">{{merchantName}}</div>
      <div class="pass"></div>
    </div>

    <!-- 信息主体 -->
    <div class="client-info-detail__content box match-left-space">
      <div class="match-width box align-default">
        <div class="title">可上传照片进行资料识别</div>
        <div class="item" style="border:0;">
          <div class="subtitle">
            <span class="star">*</span>上传身份证照片
          </div>
        </div>
        <div class="item id_img_wp">
          <div class="img_wp">
            <input
              class="file"
              type="file"
              ref="file"
              accept="image/*"
              @change="onFileChange($event, 'face')"
            />
            <div>
              <div class="icon iconfont iconenter ml-10"></div>
              <img
                v-if="detail.epresentativePhotoId"
                :src="detail.epresentativePhotoId | loadImage"
                @click="previewImage(detail.epresentativePhotoId)"
              />
            </div>
            <p class="img_intro">身份证正面照</p>
          </div>

          <div class="img_wp">
            <input
              class="file"
              type="file"
              ref="file"
              accept="image/*"
              @change="onFileChange($event, 'back')"
            />
            <div>
              <div class="icon iconfont iconenter ml-10"></div>
              <img
                v-if="detail.epresentativePhotoId"
                :src="detail.epresentativePhotoId | loadImage"
                @click="previewImage(detail.epresentativePhotoId2)"
              />
            </div>
            <p class="img_intro">身份证反面照</p>
          </div>
        </div>
        <div class="title">联系信息</div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>姓名
          </div>
          <div class="match-left-space align-right">
            <input placeholder="请输入姓名" v-model="detail.contact" />
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>身份证号码
          </div>
          <div class="match-left-space align-right">
            <input placeholder="请输入身份证号码" v-model="detail.certificateNum" />
          </div>
        </div>
        <!-- <div class="item">
          <div class="subtitle">
            <span class="star">*</span>有效期
          </div>
          <div class="match-left-space align-right">
            <div class="input align-default">
              <mu-date-input
                @change="onDateTimeChange(2, 1, $event)"
                v-model="detail.startBusinessTime"
                label="请输入开始时间"
                container="bottomSheet"
                label-float
                full-width
              ></mu-date-input>
              <mu-date-input
                @change="onDateTimeChange(2, 2, $event)"
                v-model="detail.endBusinessTime"
                label="请输入结束时间"
                container="bottomSheet"
                label-float
                full-width
              ></mu-date-input>
            </div>
          </div>
        </div>-->

        <div class="item" style="border:0;margin-top:15px;">
          <div class="subtitle">
            <span class="star">*</span>营业执照（小微商户请忽略）
          </div>
        </div>
        <div class="item">
          <div class="img_wp" style="width:50%;flex:none;">
            <input
              class="file"
              type="file"
              ref="file"
              accept="image/*"
              @change="onFileChange($event, 'storePhoto')"
              style="height:100%;width:100%;display:inline-block;"
            />
            <div>
              <div class="icon iconfont iconenter ml-10"></div>
              <img
                v-if="detail.epresentativePhotoId"
                :src="detail.epresentativePhotoId | loadImage"
                @click="previewImage(detail.businessLicensePhotoId)"
              />
            </div>
            <p class="img_intro">上传店铺营业执照</p>
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>注册号
          </div>
          <div class="match-left-space align-right">
            <input placeholder="请输入注册号" v-model="detail.license" />
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>名称
          </div>
          <div class="match-left-space align-right">
            <input placeholder="请输入名称" v-model="detail.businessLicenseName" />
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>类型
          </div>
          <div class="match-left-space box align-right" @click="callActionSheet(2)">
            <div
              class="input ellipsis"
              style="text-align: right"
            >{{detail.businessLevOne}}{{detail.businessLevTwo | businessLevFilter}}{{detail.businessLevThree | businessLevFilter}}</div>
            <div class="icon iconfont iconenter ml-10"></div>
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>地址
          </div>
          <div class="match-left-space align-right">
            <input placeholder="请输入地址" v-model="detail.registerAddress" />
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>法定代表人/经营者
          </div>
          <div class="match-left-space align-right">
            <input placeholder="请输入常用邮箱" v-model="detail.representativeName" />
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>营业期限
          </div>
          <div class="match-left-space align-right">
            <div class="input align-default">
              <mu-date-input
                @change="onDateTimeChange(2, 1, $event)"
                v-model="detail.startBusinessTime"
                label="请输入开始时间"
                container="bottomSheet"
                label-float
                full-width
              ></mu-date-input>
              <mu-date-input
                @change="onDateTimeChange(2, 2, $event)"
                v-model="detail.endBusinessTime"
                label="请输入结束时间"
                container="bottomSheet"
                label-float
                full-width
              ></mu-date-input>
            </div>
          </div>
        </div>
      </div>

      <div class="match-width box align-default">
        <div class="title">经营信息</div>
        <div class="item">
          <div class="subtitle">
            <span class="star">&nbsp;&nbsp;</span>商户简称
          </div>
          <div class="match-left-space align-right">
            <input class="merchant" placeholder="用于在支付完成页面向消费者展示" v-model="detail.shortName" />
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>经营类目
          </div>
          <div class="match-left-space box align-right" @click="callActionSheet(2)">
            <div
              class="input ellipsis"
              style="text-align: right"
            >{{detail.businessLevOne}}{{detail.businessLevTwo | businessLevFilter}}{{detail.businessLevThree | businessLevFilter}}</div>
            <div class="icon iconfont iconenter ml-10"></div>
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>商户名称
          </div>
          <div class="match-left-space align-right">
            <input placeholder="请输入商户名称" v-model="detail.merchantName" />
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>注册地址
          </div>
          <div class="match-left-space align-right">
            <input class="register" placeholder="注册地址需与营业执照登记住所一致" v-model="detail.registerAddress" />
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>销售商品场景
          </div>
          <div class="match-left-space align-right">
            <!-- TODO -->
            <div class="input align-right" @click="callActionSheet(1)">
              <div class="match-left-space ellipsis">{{detail.sellCheck | sellCheckFilter}}</div>
              <div class="icon iconfont iconenter ml-10"></div>
            </div>
          </div>
        </div>
        <div class="item" v-if="detail.sellCheck && detail.sellCheck.indexOf('1') != -1">
          <div class="subtitle">
            <span class="star">*</span>门店地址
          </div>
          <div class="match-left-space align-right">
            <input placeholder="请输入门店地址" v-model="detail.address" />
          </div>
        </div>
        <div class="item" v-if="detail.sellCheck && detail.sellCheck.indexOf('2') != -1">
          <div class="subtitle">
            <span class="star">*</span>公众号/小程序名称
          </div>
          <div class="match-left-space align-right">
            <input class="mini" placeholder="请输入内容" v-model="detail.miniProgramName" />
          </div>
        </div>
        <div class="item" v-if="detail.sellCheck && detail.sellCheck.indexOf('2') != -1">
          <div class="subtitle">
            <span class="star">*</span>公众号/小程序截图
          </div>
          <div class="match-left-space align-right img-file-div">
            <input
              class="img-file-input"
              type="file"
              ref="file"
              accept="image/*"
              @change="onFileChange($event, 2)"
            />
            <!--<div class="match-left-space" @click="callTakePhoto(2)">&nbsp;</div>-->
            <div class="input align-right" style="width: auto; z-index:2;">
              <img
                v-if="detail.miniProgramPhotoId"
                :src="detail.miniProgramPhotoId | loadImage"
                @click="previewImage(detail.miniProgramPhotoId)"
              />
              <!-- <div v-else class="img"></div> -->
              <div class="icon iconfont iconenter ml-10"></div>
            </div>
          </div>
        </div>
        <div class="item" v-if="detail.sellCheck && detail.sellCheck.indexOf('3') != -1">
          <div class="subtitle">
            <span class="star">*</span>公司网站
          </div>
          <div class="match-left-space align-right">
            <input placeholder="请输入公司网站" v-model="detail.companyWeb" />
          </div>
        </div>
        <div class="item" v-if="detail.sellCheck && detail.sellCheck.indexOf('4') != -1">
          <div class="subtitle">
            <span class="star">*</span>APP上线状态
          </div>
          <div class="match-left-space align-right">
            <div class="input align-right" @click="callActionSheet(3)">
              <div>{{detail.appStatus | appStatusFilter}}</div>
              <div class="icon iconfont iconenter ml-10"></div>
            </div>
          </div>
        </div>
        <div class="item" v-if="detail.sellCheck && detail.sellCheck.indexOf('4') != -1">
          <div class="subtitle">
            <span class="star">*</span>APP页面截图
          </div>
          <div class="match-left-space align-right img-file-div">
            <input
              class="img-file-input"
              type="file"
              ref="file"
              accept="image/*"
              @change="onFileChange($event, 1)"
            />
            <!--<div class="match-left-space" @click="callTakePhoto(1)">&nbsp;</div>-->
            <div class="input align-right" style="width: auto; z-index:2;">
              <img
                v-if="detail.appPhotoId"
                :src="detail.appPhotoId | loadImage"
                @click="previewImage(detail.appPhotoId)"
              />
              <!-- <div v-else class="img"></div> -->
              <div class="icon iconfont iconenter ml-10"></div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>客服电话
          </div>
          <div class="match-left-space align-right">
            <input placeholder="审核人员会对电话进行回拨确认" v-model="detail.cusServiceTel" />
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">&nbsp;&nbsp;</span>特殊资质
          </div>
          <div class="match-left-space align-right img-file-div">
            <input
              class="img-file-input"
              type="file"
              ref="file"
              accept="image/*"
              @change="onFileChange($event, 3)"
            />
            <!--<div class="match-left-space" @click="callTakePhoto(3)">&nbsp;</div>-->
            <div class="input align-right" style="width: auto; z-index:2;">
              <img
                v-if="detail.specialQualificationPhotoId"
                :src="detail.specialQualificationPhotoId | loadImage"
                @click="previewImage(detail.specialQualificationPhotoId)"
              />
              <!-- <div v-else class="img"></div> -->
              <div class="icon iconfont iconenter ml-10"></div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">&nbsp;&nbsp;</span>补充材料
          </div>
          <div class="match-left-space align-right img-file-div">
            <input
              class="img-file-input"
              type="file"
              ref="file"
              accept="image/*"
              @change="onFileChange($event, 4)"
            />
            <!--<div class="match-left-space" @click="callTakePhoto(4)">&nbsp;</div>-->
            <div class="input align-right" style="width: auto; z-index:2;">
              <img
                v-if="detail.supplementPhotoId"
                :src="detail.supplementPhotoId | loadImage"
                @click="previewImage(detail.supplementPhotoId)"
              />
              <!-- <div v-else class="img"></div> -->
              <div class="icon iconfont iconenter ml-10"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="match-width box align-center">
        <div class="next box align-center" @click="onNext">下一步</div>
      </div>

      <!-- action-sheet -->
      <mu-bottom-sheet :open.sync="open">
        <div class="action-sheet box align-default">
          <div class="title box align-hor-bet plr-30">
            <div @click="onActionSheetClose">返回</div>
            <div class="confirm" @click="onActionSheetConfirm">确定</div>
          </div>

          <!-- 销售商品场景 -->
          <div class="match-width" v-for="(item, index) in scenes" :key="index" v-if="status == 1">
            <div
              :class="['item align-hor-bet plr-30 ptb-30', item.checked?'active':'']"
              @click="changeItem(index)"
            >
              <div>{{item.name}}</div>
              <div v-if="item.checked" class="icon iconfont iconcheck"></div>
              <div class="pass" v-else></div>
            </div>
          </div>

          <!-- APP上线状态 -->
          <div
            class="match-width"
            v-for="(item, index) in appStates"
            :key="index"
            v-if="status == 3"
          >
            <div
              :class="['item align-hor-bet plr-30 ptb-30', (curAppState == index)?'active':'']"
              @click="changeItem(index)"
            >
              <div>{{item}}</div>
              <div v-if="(curAppState == index)" class="icon iconfont iconcheck"></div>
              <div class="pass" v-else></div>
            </div>
          </div>

          <!-- 补脚 -->
          <div class="action-sheet__padding"></div>
        </div>
      </mu-bottom-sheet>

      <!-- action-sheet -->
      <mu-bottom-sheet :open.sync="openMenu">
        <div class="action-sheet box align-default menu">
          <div class="item align-center" @click="onTakePhoto(1)">拍照</div>

          <div class="item align-center" @click="onTakePhoto(2)">从手机相册选择</div>

          <div class="item align-center cancel" @click="onActionMenuShow(2)">取消</div>

          <!-- 补脚 -->
          <div class="action-sheet__padding"></div>
        </div>
      </mu-bottom-sheet>

      <mu-bottom-sheet :open.sync="openThree">
        <div class="action-sheet box align-default">
          <div class="title box align-hor-bet plr-30">
            <div @click="onBackStep">返回</div>
            <div class="confirm">
              <div v-if="isEnd" @click="onActionSheetConfirm(2)">确定</div>
              <div v-else @click="onNextStep">取消</div>
            </div>
          </div>
        </div>
        <div class="action-sheet__header align-left box plr-30">请选择：{{threeList | threeListFilter}}</div>
        <div class="action-sheet__content">
          <div class="match-width" v-for="(item, index) in tmpSourceData" :key="index">
            <div
              :class="['item align-hor-bet plr-30 ptb-30', (item.value === threeList[curThree])?'active':'']"
              @click="changeItem(index, item.value)"
            >
              <div>{{item.value}}</div>
              <div v-if="item.value === threeList[curThree]" class="icon iconfont iconcheck"></div>
              <div class="pass" v-else></div>
            </div>
          </div>
        </div>
      </mu-bottom-sheet>

      <!-- 隐藏获取图片 -->
      <div class="file">
        <input
          type="file"
          ref="fileCamera"
          capture="camera"
          accept="image/*"
          @change="onFileChange"
        />
        <div class="cover"></div>
      </div>
      <!-- 隐藏获取图片 -->
      <div class="file">
        <input type="file" ref="file" accept="image/*" @change="onFileChange" />
        <div class="cover"></div>
      </div>
    </div>

    <!-- 图片预览 -->
    <div
      class="cover-x align-default"
      v-if="isImagePreview"
      @click="isImagePreview = false"
      style="z-index: 9;"
    >
      <div class="match-left-space"></div>
      <div class="image-preview" :style="{backgroundImage: 'url(\''+ createImgUrl(imgUrl) +'\')'}">
        <!--<img class="match-parent" :src="imgUrl | previewLoadImage">-->
      </div>
      <div class="match-left-space"></div>
    </div>
  </div>
</template>

<script>
import { url } from '@/utils/src/request'
import { CLIENT_INFO_DETAIL, CLIENT_INFO_RECORD_NEXT } from '@/router/types'
import {
  clientInfoDetailIDLocal,
  clientInfoDetailLocal,
  clientInfoDetailMerchantNameLocal
} from '@/storage'
import { clientInfoApi } from '@/api'
import { getCateGory } from '@/api/businessCategory'

export default {
  data() {
    return {
      detail: {
        epresentativePhotoId: '', // 身份正面
        epresentativePhotoId2: '',
        representativeName: '',
        certificateNum: '',
        bnkCd: '',
        lbnkProv: '',
        lbnkCity: '',
        lbnkNo: '',
        accountNumber: '',
        storeEntrancePicId: '',
        regProvCd: '',
        regCityCd: '',
        regDistCd: '',
        contact: '',
        phone: '',
        email: '',
        cusServiceTel: '',
        shortName: '',
        id: '',
        businessLicensePhotoId: '',
        license: '',
        businessType: '',
        registerAddress: '',
        person: '',
        startBusinessTime: '',
        endBusinessTime: '',
        openingAccountLicensePicId: '',
        bankCardPositivePicId: '',
        bnkCdName: '',
        lbnkProvName: '',
        lbnkCityName: '',
        lbnkNoName: '',
        accountHolder: '',
        indoorPicId: '',
        regProvCdName: '',
        regCityCdName: '',
        address: '',
        mccClassCd: '',
        mccCd: '',
        sxfRate: ''
      },
      open: false,
      status: 0,
      scenes: [
        {
          id: 1,
          name: '线下',
          checked: false
        },
        {
          id: 2,
          name: '公众号/小程序',
          checked: false
        },
        {
          id: 3,
          name: '网站',
          checked: false
        },
        {
          id: 4,
          name: 'APP',
          checked: false
        }
      ],
      sellCheck: [],
      appStates: ['已上线', '未上线'],
      curAppState: 0,
      openMenu: false,
      photoTaker: 0,
      isImagePreview: false,
      imgUrl: '',
      openThree: false,
      threeList: [],
      curThree: 0,
      sourceData: [],
      tmpSourceData: [],
      isEnd: false,
      merchantName: ''
    }
  },

  components: {},

  methods: {
    createImgUrl(id) {
      return id ? url + `/fms/upload/resource/${id}` : ''
    },
    // 返回
    onBack() {
      this.$router.push({
        name: CLIENT_INFO_DETAIL
      })
    },
    // 唤醒action-sheet
    // status
    // 1  销售商品场景
    // 2  经营类目
    // 3  app状态
    callActionSheet(status) {
      this.status = +status
      if (this.status === 3) {
        this.curAppState = this.transferAppStatus(this.detail.appStatus)
        this.open = true
      } else if (this.status === 1) {
        this.transferScenes(this.detail.sellCheck)
        this.sellCheck = this.detail.sellCheck
        this.open = true
      } else if (this.status === 2) {
        this.openThree = true
        this.curThree = 0
        this.tmpSourceData = this.sourceData
        this.threeList = []
        this.threeList.push(this.sourceData[0].value)
        this.isEnd = false
      }
    },
    // action-sheet取消
    onActionSheetClose() {
      this.open = false
    },
    // action-sheet确认
    onActionSheetConfirm() {
      if (this.status === 1) {
        // 销售商品场景
        // console.log(this.sellCheck)
        if (Array.isArray(this.sellCheck)) {
          if (this.sellCheck.length) {
            this.detail.sellCheck = JSON.stringify(this.sellCheck)
          } else {
            this.detail.sellCheck = ''
          }
        }
        this.open = false
        // console.log(this.detail.sellCheck)
      } else if (this.status === 2) {
        // 经营类目
        this.detail.businessLevOne = this.threeList[0]
        this.detail.businessLevTwo = this.threeList[1]
        this.detail.businessLevThree = this.threeList[2]
        this.openThree = false
      } else if (this.status === 3) {
        // app状态
        if (this.curAppState === 0) {
          this.detail.appStatus = 1
        } else {
          this.detail.appStatus = 2
        }
        this.open = false
      }
    },
    // 切换选项
    changeItem(index, value) {
      if (this.status === 1) {
        // console.log(+index)
        // 销售商品场景
        this.scenes[+index].checked = !this.scenes[+index].checked
        this.sellCheck = this.scenes
          .map(item => {
            return item.checked ? item.id + '' : ''
          })
          .filter(item => {
            return item !== ''
          })
      } else if (this.status === 2) {
        // 经营类目
        // console.log(this.curThree)
        // this.threeList[this.curThree] = value
        this.$set(this.threeList, this.curThree, value)
        // console.log(this.threeList)
        let tmp = this.tmpSourceData.filter(item => {
          return item.value === value
        })[0].children
        // console.log(this.threeList)
        if (tmp.length) {
          this.curThree++
          this.tmpSourceData = tmp
          this.threeList.push(this.tmpSourceData[0].value)
          if (this.threeList.length > 2) {
            this.isEnd = true
          }
        } else {
          this.isEnd = true
        }
      } else if (this.status === 3) {
        // app状态
        this.curAppState = +index
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
        this.$refs.fileCamera.click()
        // 拍照
      } else if (+status === 2) {
        this.$refs.file.click()
        // 从相机打开
      }
      // this.$refs.file.click()
      // console.log('相机', this.photoTaker, status)
      this.openMenu = false
    },
    // 获取图片
    callTakePhoto(index) {
      // index
      // 1 app
      // 2 公众号
      // 3 特殊资质
      // 4 补充材料
      this.photoTaker = +index
      this.openMenu = true
    },
    // 下一步
    onNext() {
      let requiredData = [
        'contact',
        'phone',
        'email',
        'businessLevOne',
        'businessLevTwo',
        'businessLevThree',
        'merchantName',
        'registerAddress',
        'sellCheck',
        'cusServiceTel'
      ]
      if (this.detail.sellCheck.indexOf('1') !== -1) {
        requiredData.push('address')
      }
      if (this.detail.sellCheck.indexOf('2') !== -1) {
        requiredData.push('miniProgramPhotoId')
        requiredData.push('miniProgramName')
      }
      if (this.detail.sellCheck.indexOf('3') !== -1) {
        requiredData.push('companyWeb')
      }
      if (this.detail.sellCheck.indexOf('4') !== -1) {
        requiredData.push('appStatus')
        requiredData.push('appPhotoId')
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
        // console.log(this.detail)
        clientInfoDetailLocal.set(JSON.stringify(this.detail))
        // 跳转到下一个页面
        this.$router.push({
          name: CLIENT_INFO_RECORD_NEXT
        })
      } else {
        this.$toast.error('有内容未填入')
      }
    },
    // 文件改变
    onFileChange(e, type) {
      if (!e.target.files) {
        return
      }
      let file = e.target.files[0]
      // let file = this.$refs.file.files[0]
      if (file) {
        // console.log(e)
        clientInfoApi.uploadImage(file).then(
          res => {
            debugger
            if (res.code === 200) {
              this.$toast.success('图片上传成功')
              let photoId = res.obj
              // console.log(photoId)
              // 1 app
              // 2 公众号
              // 3 特殊资质
              // 4 补充材料
              if (type === 1) {
                this.$set(this.detail, 'appPhotoId', photoId)
              } else if (type === 2) {
                this.$set(this.detail, 'miniProgramPhotoId', photoId)
              } else if (type === 3) {
                this.$set(this.detail, 'specialQualificationPhotoId', photoId)
              } else if (type === 4) {
                this.$set(this.detail, 'supplementPhotoId', photoId)
              } else if (type === 'face') {
                this.detail.epresentativePhotoId = photoId
                this.getIdCard({
                  pathId: photoId,
                  type
                })
              } else if (type === 'back') {
                this.detail.epresentativePhotoId2 = photoId
                // this.getIdCard({
                //   pathId: photoId,
                //   type
                // })
              } else if (type === 'storePhoto') {
                debugger
                this.detail.businessLicensePhotoId = photoId
                this.getLicense({
                  pathId: photoId
                })
              }
            } else {
              this.$toast.error(res.msg)
            }
          },
          err => {
            this.$toast.error(err.msg)
          }
        )
      }
    },
    // 获取图片
    getImage(id) {
      return id ? url + `/fms/upload/resource/thumbnail/${id}` : ''
    },
    // 身份证识别
    getIdCard(params) {
      clientInfoApi.getIdCard(params).then(res => {
        if (params.type === 'face') {
          let obj
          obj.contact = res.obj.name
          obj.certificateNum = res.obj.idNum
          this.detail = Object.assign({}, this.detail, obj)
        }
      })
    },
    // 营业执照

    getLicense(params) {
      clientInfoApi.getLicense(params).then(res => {
        console.log(res)
        let obj
        obj.registerAddress = res.obj.address
        obj.businessType = res.obj.type
        obj.businessLicenseName = res.obj.name
        obj.license = res.obj.regNum
        obj.person = res.obj.person
        obj.startBusinessTime = res.obj.establishDate
        obj.endBusinessTime = res.obj.establishDate
        this.detail = Object.assign({}, this.detail, obj)
      })
    },

    // 初始化detail对象
    initDetail() {
      this.detail = JSON.parse(clientInfoDetailLocal.get())
      this.merchantName = JSON.parse(clientInfoDetailMerchantNameLocal.get())
      this.merchantName = this.merchantName.merchantName
    },
    // 预览图片
    previewImage(id) {
      // console.log(id)
      if (id) {
        this.imgUrl = id
        this.isImagePreview = true
      }
    },
    // 转化app status
    transferAppStatus(status) {
      return status === 1 || status === '1' ? 0 : 1
    },
    // 转化销售商品场景
    transferScenes(sellCheck) {
      if (!sellCheck) {
        return
      }
      sellCheck = JSON.parse(sellCheck)
      this.scenes = this.scenes.map(item => {
        if (sellCheck.indexOf(item.id + '') !== -1) {
          item.checked = true
        } else {
          item.checked = false
        }
        return item
      })
      return this.scenes
    },
    // 下一步
    onNextStep() {
      // if (this.curThree < 3) {
      //   this.openThree++
      // }
      this.openThree = false
    },
    // 返回
    onBackStep() {
      if (this.curThree > 0) {
        this.curThree--
        this.isEnd = false
      }
      // console.log(this.threeList)
      if (this.threeList.length > 3) {
        return
      }
      if (this.threeList.length > 1) {
        this.threeList.pop()
      }
      if (this.threeList.length <= 1) {
        this.tmpSourceData = this.sourceData
      } else {
        this.tmpSourceData = this.sourceData.filter(item => {
          return item.value === this.threeList[0]
        })[0].children
      }
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
    // app状态过滤
    appStatusFilter(index) {
      return index === 1 ? '已上线' : '未上线'
    },
    // 经营类目
    businessLevFilter(businessLev) {
      if (!businessLev) {
        return ''
      }
      return '>' + businessLev
    },
    // 销售商品场景
    sellCheckFilter(sellCheck) {
      // console.log(sellCheck, typeof sellCheck)
      if (!sellCheck) {
        return ''
      }
      if (typeof sellCheck === 'string') {
        sellCheck = JSON.parse(sellCheck)
      }
      let scenes = ['线下', '公众号/小程序', '网站', 'APP']
      // console.log(66, sellCheck)
      sellCheck = sellCheck.map(x => {
        return scenes[x - 1]
      })
      let tmpStr = sellCheck.join('、')
      return tmpStr
    },
    // 三级目录
    threeListFilter(arr) {
      if (Array.isArray(arr) && arr.length) {
        return arr.join(' > ')
      }
      return ''
    }
  },

  mounted() {
    this.id = JSON.parse(clientInfoDetailIDLocal.get())
    // console.log('id 1', this.id)
    if (this.id) {
      this.initDetail()
      this.sourceData = getCateGory()
      this.tmpSourceData = this.sourceData
    } else {
      this.$toast.error('详情数据丢失')
    }
  }
}
</script>
