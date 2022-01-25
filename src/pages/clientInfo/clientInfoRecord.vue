<template>
  <div class="client-info-detail client-info-record frame-container box align-default">

    <!-- 补白 -->
    <div class="client-info-detail__padding"
         v-if="!outside"></div>

    <!-- 导航栏 -->
    <div class="client-info-detail__nav box plr-30 align-hor-bet">
      <div class="icon iconfont iconreturn"
           @click="onBack"
           v-if="!outside"></div>
      <div v-else></div>
      <div class="title">{{detail.merchantName}}</div>
      <div class="pass"></div>
    </div>
    <!-- 信息主体 -->
    <div class="client-info-detail__content box match-left-space">
      <div class="flex header-radio">
        <mu-radio :value="1" v-model="accountType" label="小微"></mu-radio>
        <mu-radio :value="2" v-model="accountType" label="企业或个体工商户"></mu-radio>
      </div>
      <div class="match-width box align-default">
        <div class="title">可上传照片进行资料识别</div>
        <div class="item"
             style="border:0;">
          <div class="subtitle">
            <span class="star">*</span>上传身份证照片
          </div>
        </div>
        <div class="item id_img_wp">
          <div class="img_wp img_wp_width">
            <!-- <vmaUploadImg ref="face"
                          @change="onFileChange($event, 'face')"></vmaUploadImg> -->
            <h5-cropper :option="option" @getbase64Data="onFileChange($event, 'face')"></h5-cropper>
            <div>
              <i v-if="detail.epresentativePhotoId"
                 class="icon iconfont iconshanchu"
                 @click="deleteImg('face')"></i>
              <div class="icon iconfont iconzhaoxiangji ml-10"
                   style="font-size:30px;"></div>
              <img v-if="detail.epresentativePhotoId"
                    class="img_show"
                   :src="detail.epresentativePhotoId | previewLoadImage"
                   @click="previewImage(detail.epresentativePhotoId)" />
            </div>
            <p class="img_intro">身份证正面照</p>
          </div>

          <div class="img_wp img_wp_width">
            <!-- <vmaUploadImg ref="back"
                          @change="onFileChange($event, 'back')"></vmaUploadImg> -->
              <h5-cropper :option="option" @getbase64Data="onFileChange($event, 'back')"></h5-cropper>
            <div>
              <i v-if="detail.epresentativePhotoId2"
                 class="icon iconfont iconshanchu"
                 @click="deleteImg('back')"></i>
              <div class="icon iconfont iconzhaoxiangji ml-10"
                   style="font-size:30px;"></div>
              <img v-if="detail.epresentativePhotoId2"
                    class="img_show"
                   :src="detail.epresentativePhotoId2 | previewLoadImage"
                   @click="previewImage(detail.epresentativePhotoId2)" />
            </div>
            <p class="img_intro">身份证反面照</p>
          </div>

          <div class="img_wp img_wp_width mt-10">
            <!-- <vmaUploadImg ref="inHand"
                          @change="onFileChange($event, 'inHand')"></vmaUploadImg> -->
            <h5-cropper :option="option" @getbase64Data="onFileChange($event, 'inHand')"></h5-cropper>
            <div>
              <i v-if="detail.holdingCardId"
                 class="icon iconfont iconshanchu"
                 @click="deleteImg('inHand')"></i>
              <div class="icon iconfont iconzhaoxiangji ml-10"
                   style="font-size:30px;"></div>
              <img v-if="detail.holdingCardId"
                    class="img_show"
                   :src="detail.holdingCardId | previewLoadImage"
                   @click="previewImage(detail.holdingCardId)" />
            </div>
            <p class="img_intro">手持身份证半身照</p>
          </div>

          <div class="img_wp img_wp_width mt-10">
            <div>
              <div @click="showSign" class="showSignBtn" :class="{signBackgroundColor:signBackgroundColor}"></div>
              <i v-if="detail.signId"
                 class="icon iconfont iconshanchu"
                 @click="deleteImg('sign')"></i>
              <i v-if="detail.sign"
                 class="icon iconfont iconshanchu"
                 @click="deleteImg('sign')"></i>
              <div class="icon iconfont iconzhaoxiangji ml-10"
                   style="font-size:30px;"></div>
              <img v-if="detail.signId"
                    class="img_show"
                    style="background-color: transparent;"
                   :src="detail.signId | previewLoadImage"
                   @click="previewImage(detail.signId,true)" />
              <img v-if="detail.sign"
                    class="img_show"
                    style="background-color: transparent;"
                   :src="detail.sign"
                   @click="previewImage(detail.sign,true)"
                   />
            </div>
            <p class="img_intro">进件签名</p>
          </div>

        </div>




        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>姓名
          </div>
          <div class="match-left-space align-right">
            <input placeholder="请输入姓名"
                   v-model="detail.representativeName" />
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>性别
          </div>
          <div class="match-left-space box align-right"
               @click="callActionSheet(4)">
            <div class="input ellipsis"
                 style="text-align: right">
              {{['男','女'][Number(detail.sex)-1]}}
            </div>
            <div class="icon iconfont iconenter ml-10"></div>
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>身份证号码
          </div>
          <div class="match-left-space align-right">
            <input placeholder="请输入身份证号码"
                   v-model="detail.certificateNum" />
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>有效期
          </div>
          <div class="match-left-space align-right">
            <div class="input align-default time-range">
              <mu-date-input @change="onDateTimeChange(1, 1, $event)"
                             v-model="detail.startCertificateTime"
                             label="开始时间"
                             container="bottomSheet"
                             label-float
                             full-width></mu-date-input>
              <span>~</span>
              <div @click="selectEndTime(1)">
                <template v-if="detail.endCertificateTime==='2099-12-31'">长期</template>
                <template v-else-if="detail.endCertificateTime">{{detail.endCertificateTime}}</template>
                <template v-else><span style="color:#ccc">结束时间</span></template>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>法人手机号
          </div>
          <div class="match-left-space align-right">
            <input placeholder="请输入手机号"
                   v-model="detail.legalPersonPhone"
                   maxlength="11" />
          </div>
        </div>
        <div v-if="accountType == 2">
          <div class="item"
               style="border:0;margin-top:15px;">
            <div class="subtitle">营业执照（小微商户请忽略）</div>
          </div>
          <div class="item">
            <div class="img_wp img_wp_width"
                 style="flex:none;">
              <!-- <vmaUploadImg ref="storePhoto"
                            @change="onFileChange($event, 'storePhoto')"></vmaUploadImg> -->
              <h5-cropper :option="option" @getbase64Data="onFileChange($event, 'storePhoto')"></h5-cropper>
              <div>
                <i v-if="detail.businessLicensePhotoId"
                   class="icon iconfont iconshanchu"
                   @click="deleteImg('license')"></i>
                <div class="icon iconfont iconzhaoxiangji ml-10"
                     style="font-size:30px;"></div>
                <img v-if="detail.businessLicensePhotoId"
                class="img_show"
                     :src="detail.businessLicensePhotoId | previewLoadImage"
                     @click="previewImage(detail.businessLicensePhotoId)" />
              </div>
              <p class="img_intro">上传店铺营业执照</p>
            </div>
          </div>
          <div class="item">
            <div class="subtitle">
              <span class="star"
                    v-show="detail.businessLicensePhotoId">*</span>注册号
            </div>
            <div class="match-left-space align-right">
              <input placeholder="请输入注册号"
                     v-model="detail.license" />
            </div>
          </div>
          <div class="item">
            <div class="subtitle">
              <span class="star"
                    v-show="detail.businessLicensePhotoId">*</span>名称
            </div>
            <div class="match-left-space align-right">
              <input placeholder="请输入名称"
                     v-model="detail.businessLicenseName" />
            </div>
          </div>
          <div class="item">
            <div class="subtitle">
              <span class="star"
                    v-show="detail.businessLicensePhotoId">*</span>类型
            </div>
            <div class="match-left-space box align-right"
                 @click="callActionSheet(2)">
              <div class="input ellipsis"
                   style="text-align: right">
                {{['企业','个体工商户'][Number(detail.businessType)-1]}}
              </div>
              <div class="icon iconfont iconenter ml-10"></div>
            </div>
          </div>
          <div class="item">
            <div class="subtitle">
              <span class="star"
                    v-show="detail.businessLicensePhotoId">*</span>地址
            </div>
            <div class="match-left-space align-right">
              <input style=""
                     placeholder="请输入地址"
                     v-model="detail.registerAddress" />
            </div>
          </div>
          <div class="item">
            <div class="subtitle">
              <span class="star"
                    v-show="detail.businessLicensePhotoId">*</span>法定代表人/经营者
            </div>
            <div class="match-left-space align-right">
              <input style="width4rem;"
                     placeholder="请输入法定代表人"
                     v-model="detail.person" />
            </div>
          </div>
          <div class="item">
            <div class="subtitle">
              <span class="star"
                    v-show="detail.businessLicensePhotoId">*</span>营业期限
            </div>
            <div class="match-left-space align-right">
              <div class="input align-default time-range">
                <mu-date-input @change="onDateTimeChange(2, 1, $event)"
                               v-model="detail.startBusinessTime"
                               label="开始时间"
                               container="bottomSheet"
                               label-float
                               full-width></mu-date-input>
                <span>~</span>
                <div @click="selectEndTime(2)">
                  <template v-if="detail.endBusinessTime==='2099-12-31'">长期</template>
                  <template v-else-if="detail.endBusinessTime">{{detail.endBusinessTime}}</template>
                  <template v-else><span style="color:#ccc">结束时间</span></template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="match-width box align-center">
        <div class="next box align-center"
             @click="openAlertDialog">下一步</div>
      </div>


      <!-- action-sheet -->
      <mu-bottom-sheet :open.sync="open">
        <div class="action-sheet box align-default">
          <div class="title box align-hor-bet plr-30">
            <div @click="onActionSheetClose">返回</div>
            <div class="confirm"
                 @click="onActionSheetConfirm">确定</div>
          </div>

          <!-- 销售商品场景 -->
          <div class="match-width"
               v-for="(item, index) in scenes"
               :key="index"
               v-if="status == 1">
            <div :class="['item align-hor-bet plr-30 ptb-30', item.checked?'active':'']"
                 @click="changeItem(index)">
              <div>{{item.name}}</div>
              <div v-if="item.checked"
                   class="icon iconfont iconcheck"></div>
              <div class="pass"
                   v-else></div>
            </div>
          </div>

          <!-- APP上线状态 -->
          <div class="match-width"
               v-for="(item, index) in appStates"
               :key="index"
               v-if="status == 3">
            <div :class="['item align-hor-bet plr-30 ptb-30', (curAppState == index)?'active':'']"
                 @click="changeItem(index)">
              <div>{{item}}</div>
              <div v-if="(curAppState == index)"
                   class="icon iconfont iconcheck"></div>
              <div class="pass"
                   v-else></div>
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
               @click="onTakePhoto(1)">拍照</div>

          <div class="item align-center"
               @click="onTakePhoto(2)">从手机相册选择</div>

          <div class="item align-center cancel"
               @click="onActionMenuShow(2)">取消</div>

          <!-- 补脚 -->
          <div class="action-sheet__padding"></div>
        </div>
      </mu-bottom-sheet>

      <mu-bottom-sheet :open.sync="openThree">
        <div class="action-sheet box align-default">
          <div class="title box align-hor-bet plr-30">
            <div @click="onNextStep">返回</div>
            <!-- <div class="confirm">
              <div  @click="onActionSheetConfirm(2)">确定</div>
              <div v-else @click="onNextStep">取消</div>
            </div> -->
          </div>
        </div>
        <div class="action-sheet__header align-left box plr-30">请选择企业类型</div>
        <div class="action-sheet__content">
          <div class="match-width"
               v-for="(item, index) in licenseList"
               :key="index">
            <div :class="['item align-hor-bet plr-30 ptb-30', (item.value === detail.businessType)?'active':'']"
                 @click="getLicenseType(item)">
              <div>{{item.label}}</div>
              <!-- <div v-if="item.value === threeList[curThree]" class="icon iconfont iconcheck"></div> -->
              <!-- <div class="pass" v-else></div> -->
            </div>
          </div>
        </div>
      </mu-bottom-sheet>
      <mu-bottom-sheet :open.sync="openSex">
        <div class="action-sheet box align-default">
          <div class="title box align-hor-bet plr-30">
            <div @click="onNextStep">返回</div>
            <!-- <div class="confirm">
              <div  @click="onActionSheetConfirm(2)">确定</div>
              <div v-else @click="onNextStep">取消</div>
            </div> -->
          </div>
        </div>
        <div class="action-sheet__header align-left box plr-30">请选择性别</div>
        <div class="action-sheet__content">
          <div class="match-width"
               v-for="(item, index) in sexList"
               :key="index">
            <div :class="['item align-hor-bet plr-30 ptb-30', (item.value === detail.sex)?'active':'']"
                 @click="getSexType(item)">
              <div>{{item.label}}</div>
              <!-- <div v-if="item.value === threeList[curThree]" class="icon iconfont iconcheck"></div> -->
              <!-- <div class="pass" v-else></div> -->
            </div>
          </div>
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
    <!-- 签名 -->
    <mu-dialog title=""
               class="sign-dialog"
               :overlay="false"
               width="600"
               max-width="100%"
               :fullscreen="true"
               :esc-press-close="false"
               :overlay-close="false"
               :open.sync="openSignDialog">
      <!--签名-->
      <sign @signStr="getSignStr"></sign>

    </mu-dialog>
    <!-- 选择日期 -->
    <mu-dialog class="time-dialog"
               title="选择时间"
               width="600"
               max-width="80%"
               :esc-press-close="false"
               :overlay-close="false"
               :open.sync="timeDialog.open">
      <div v-if="timeDialog.open">
        <mu-radio v-model="timeType"
                  style="margin-right: 16px;"
                  :value="0"
                  label="长期"></mu-radio>
        <div class="flex">
          <mu-radio v-model="timeType"
                    style="margin-right: 14px;margin-top:6px;"
                    :value="1">
          </mu-radio>
          <mu-date-input @change="onDateTimeChange(type, 2, $event)"
                         v-model="endTime"
                         label="结束时间"
                         container="bottomSheet"
                         label-float
                         full-width
                         slot="label"
                         :disabled="!timeType"></mu-date-input>
          <span class="icon iconfont iconenter"
                style="margin-top: 4px;"></span>
        </div>
      </div>
      <mu-button slot="actions"
                 flat
                 color="primary"
                 @click="closeTime">取消</mu-button>
      <mu-button slot="actions"
                 flat
                 color="primary"
                 @click="confirmTime">确定</mu-button>
    </mu-dialog>
   <!-- <div style="position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;"
    v-if="cropper">
      <vueCropper
        ref="cropper"
        :img="fileCropper"
        :autoCrop="true"
        :centerBox="true"
      ></vueCropper>
    </div> -->
  </div>
</template>

<script>
import { url } from '@/utils/src/request'
import { CLIENT_INFO_RECORD_NEXT, CLIENT_INFO } from '@/router/types'
import {
  clientInfoDetailIDLocal,
  clientInfoDetailLocal,
  clientInfoDetailMerchantNameLocal,
  fromReactNativeLocal
} from '@/storage'
import { clientInfoApi } from '@/api'
import { validID } from '@/utils'
import vmaUploadImg from '@/components/common/vmaUploadImg'
import sign from '@/components/common/sign'
import vmaImagePreview from '@/components/common/vmaImagePreview'
import indexMixins from './src/mixins'
import H5Cropper from 'vue-cropper-h5'
export default {
  components: { vmaUploadImg, vmaImagePreview, sign, H5Cropper },
  mixins: [indexMixins],
  data() {
    return {
      accountType: 1,
      option: {
          autoCrop: true,
          autoCropWidth: 350,
          autoCropHeight: 220,
          fixed: false,
          outputSize: 1,
          fixedBox: false,
          canMoveBox: true,
          centerBox: true,
          canMove: true,
      },
      requiredData:[],
      signBackgroundColor:false,
      type: '', // 1-身份证有效期
      endTime: '',
      timeType: 0, // 0-长期
      timeDialog: {
        open: false
      },
      openAlert: false,
      openSignDialog:false,
      detail: {
        sign:'', //签名
        signId:'', //签名照片id
        // isCommit: 0,
        epresentativePhotoId: '', // 身份正面
        epresentativePhotoId2: '',
        holdingCardId: '',
        representativeName: '',
        certificateNum: '',
        startCertificateTime: '',
        endCertificateTime: '',
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
        businessType: '2',  //1企业  2个体
        sex: '',
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
      openThree: false,
      openSex: false,
      threeList: [],
      curThree: 0,
      sourceData: [],
      tmpSourceData: [],
      licenseList: [
        {
          value: 1,
          label: '企业'
        },
        {
          value: 2,
          label: '个体工商户'
        }
      ],
      sexList: [
        {
          value: '1',
          label: '男'
        },
        {
          value: '2',
          label: '女'
        }
      ],
      isEnd: false,
      merchantName: '',
      // iframe: false,
      from: '', // 上级页面来源:'react-native'-分销定制app,'iframe'-后台内嵌h5, 'share'-h5分享（只能填写进件，没有填写费率的权限）
      outside: false // 是否从外部链接进来
    }
  },

  created() {
    console.log('进来', location.href)
    if (this.$route.query.token) {
      sessionStorage.token = this.$route.query.token
      // sessionStorage.companyId = this.$route.query.companyId
      sessionStorage.link = location.href
      // sessionStorage.iframe = this.$route.query.iframe || false
    }
    // if (sessionStorage.iframe) {
    //   this.iframe = sessionStorage.iframe
    // }
    if (this.$route.query.from) {
      this.from = this.$route.query.from
      sessionStorage.from = this.from
      this.outside = true
      fromReactNativeLocal.set(this.from)
    }
  },
  methods: {
    getSignStr(signStr){
      // this.$set(this.detail,signStr)
      this.detail.sign = signStr
      this.signBackgroundColor = true
      console.log('12222222222222222',this.sign)
      this.openSignDialog = false
    },
    //签名
    showSign(){
      this.openSignDialog = true
    },
    // 选择时间
    selectEndTime(type) {
      this.type = type
      if (type === 1) {
        if (this.detail.endCertificateTime === '2099-12-31' || !this.detail.endCertificateTime) { // 长期
          this.timeType = 0
          this.endTime = ''
        } else {
          this.timeType = 1
          this.endTime = this.detail.endCertificateTime
        }
      } else {
        if (this.detail.endBusinessTime === '2099-12-31' || !this.detail.endBusinessTime) { // 长期
          this.timeType = 0
          this.endTime = ''
        } else {
          this.timeType = 1
          this.endTime = this.detail.endBusinessTime
        }
      }
      this.timeDialog.open = true
    },
    /**
     * type-删除目标
     * 删除图片，清空相关的所有数据
     */
    deleteImg(type) {
      console.log('删除图片，清空相关的所有数据')
      // 身份证（正面）
      if (type === 'face') {
        console.log('身份证（正面）')
        this.detail.epresentativePhotoId = ''
        this.detail.representativeName = ''
        this.detail.certificateNum = ''
        this.detail.sex = ''
      }
      // 身份证（背面）
      if (type === 'back') {
        this.detail.epresentativePhotoId2 = ''
        this.detail.startCertificateTime = ''
        this.detail.endCertificateTime = ''
      }
      // 身份证（手持）
      if (type === 'inHand') {
        this.detail.holdingCardId = ''
      }
      // 营业执照
      if (type === 'license') {
        this.detail.businessLicensePhotoId = ''
        this.detail.license = ''
        this.detail.businessLicenseName = ''
        this.detail.businessType = '2'
        this.detail.registerAddress = ''
        this.detail.person = ''
        this.detail.startBusinessTime = ''
        this.detail.endBusinessTime = ''
      }
      // 营业执照
      if (type === 'license') {
        this.detail.businessLicensePhotoId = ''
        this.detail.license = ''
        this.detail.businessLicenseName = ''
        this.detail.businessType = '2'
        this.detail.registerAddress = ''
        this.detail.person = ''
        this.detail.startBusinessTime = ''
        this.detail.endBusinessTime = ''
      }
      // 签名
      if (type === 'sign') {
        this.signBackgroundColor = false
        this.detail.sign = ''
        this.detail.signId = ''
      }
    },
    openAlertDialog() {
      this.openAlert = true
    },
    closeAlertDialog() {
      this.openAlert = false
    },
    closeTime() {
      this.timeDialog.open = false
      this.endTime = ''
      this.timeType = 0
    },
    confirmTime() {
      if (this.timeType && !this.endTime) {
        this.$toast.error('请选择时间')
        return
      }
      if (this.type === 1) {
        if (!this.timeType) {
          this.endTime = '2099-12-31'
        }
        this.detail.endCertificateTime = this.endTime
      } else {
        if (!this.timeType) {
          this.endTime = '2099-12-31'
        }
        this.detail.endBusinessTime = this.endTime
      }
      this.closeTime()
    },
    // 返回
    onBack() {
      if (this.from === 'react-native') {
        this.$router.back(-1)
        return
      }

      // 分享或者内嵌的h5不能返回
      if (this.from === 'share' || this.from === 'iframe') {
        return
      }
      this.$router.push({
        name: CLIENT_INFO
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
      } else if (this.status === 4) {
        this.openSex = true
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
        if (Array.isArray(this.sellCheck)) {
          if (this.sellCheck.length) {
            this.detail.sellCheck = JSON.stringify(this.sellCheck)
          } else {
            this.detail.sellCheck = ''
          }
        }
        this.open = false
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
    getLicenseType(item) {
      this.detail.businessType = String(item.value)
      this.openThree = false
    },
    getSexType(item) {
      this.detail.sex = String(item.value)
      this.openSex = false
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
        this.$set(this.threeList, this.curThree, value)
        let tmp = this.tmpSourceData.filter(item => {
          return item.value === value
        })[0].children
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
      if (this.accountType == 1) {
        this.detail.businessType = '1'
      }
      if (this.detail.businessLicensePhotoId) {
        this.requiredData = [
          'epresentativePhotoId',
          'epresentativePhotoId2',
          'holdingCardId',
          'representativeName',
          'certificateNum',
          'sex',
          'startCertificateTime',
          'endCertificateTime',
          'legalPersonPhone',
          'license',
          'businessLicenseName',
          'businessType',
          'registerAddress',
          'person',
          'startBusinessTime',
          'endBusinessTime'

        ]
      } else {
        this.requiredData = [
          'epresentativePhotoId',
          'epresentativePhotoId2',
          'holdingCardId',
          'representativeName',
          'certificateNum',
          'sex',
          'startCertificateTime',
          'endCertificateTime',
          'legalPersonPhone'
        ]
      }
      let flag = true
      for (let i in this.detail) {
        if (this.detail.hasOwnProperty(i) && this.requiredData.indexOf(i) !== -1) {
          if (!this.detail[i]) {
            flag = false
            break
          }
        }
      }
      if (flag) {
        if (!validID(this.detail.certificateNum)) {
          this.$toast.error('请填写正确的身份证号')
          return
        }
        clientInfoApi.submitMchIfo(this.detail).then(res => {
          this.$router.push({
            name: CLIENT_INFO_RECORD_NEXT,
            query: {
              id: this.detail.id
            }
          })
        })
      } else {
        this.$toast.error('有内容未填入')
      }
    },
    onDateTimeChange(status, index, e) {
      // status          index
      // 1  身份证有效期
      // 2  营业执照有效期
      if (+status === 1) {
        console.log('进来', this.endTime, index)
        let startTime = this.detail.startCertificateTime
        let endTime = this.detail.endCertificateTime
        if (index === 2) {
          endTime = this.endTime
        }
        if (startTime && endTime) {
          startTime = this.getTimestamp(startTime)
          endTime = this.getTimestamp(endTime)
          if (index === 2 && startTime >= endTime) {
            // endTime = this.getTimestamp(this.detail.startCertificateTime)
            this.$toast.error('开始时间必须早于结束时间')
            this.endTime = ''
            return
          }
          if (index === 1 && startTime >= endTime) {
            this.$toast.error('开始时间必须早于结束时间')
            this.endTime = ''
            this.detail.startCertificateTime = ''
            this.detail.endCertificateTime = ''
            return
          }
          this.detail.startCertificateTime = this.getTime(this.detail.startCertificateTime)
          this.endTime = this.getTime(this.endTime)
        }

        // let startTime = this.detail.startCertificateTime
        // let endTime = this.detail.endCertificateTime
        // if (startTime && endTime) {
        //   startTime = this.getTimestamp(startTime)
        //   endTime = this.getTimestamp(endTime)
        //   if (startTime >= endTime) {
        //     this.$toast.error('开始时间必须早于结束时间')
        //     this.detail.startCertificateTime = ''
        //     this.detail.endCertificateTime = ''
        //   } else {
        //     this.detail.startCertificateTime = this.getTime(this.detail.startCertificateTime)
        //     this.detail.endCertificateTime = this.getTime(this.detail.endCertificateTime)
        //   }
        // }
      }
      if (+status === 2) {
        let startTime = this.detail.startBusinessTime
        let endTime = this.detail.endBusinessTime
        if (index === 2) {
          endTime = this.endTime
        }
        console.log('endTime', endTime)
        console.log('startTime', startTime)

        if (startTime && endTime) {
          startTime = this.getTimestamp(startTime)
          endTime = this.getTimestamp(endTime)
          console.log('进来-1', startTime, endTime)
          if (index === 2 && startTime >= endTime) {
            // endTime = this.getTimestamp(this.detail.startCertificateTime)
            this.$toast.error('开始时间必须早于结束时间')
            this.endTime = ''
            return
          }
          if (index === 1 && startTime >= endTime) {
            this.$toast.error('开始时间必须早于结束时间')
            this.endTime = ''
            this.detail.startBusinessTime = ''
            this.detail.endBusinessTime = ''
            return
          }
          this.detail.startBusinessTime = this.getTime(this.detail.startBusinessTime)
          this.endTime = this.getTime(this.endTime)
        }
        // console.log('营业执照有效期')
        // let startTime = this.detail.startBusinessTime
        // let endTime = this.detail.endBusinessTime
        // if (startTime && endTime) {
        //   startTime = this.getTimestamp(startTime)
        //   endTime = this.getTimestamp(endTime)
        //   if (startTime >= endTime) {
        //     this.$toast.error('开始时间必须早于结束时间')
        //     this.detail.startBusinessTime = ''
        //     this.detail.endBusinessTime = ''
        //   } else {
        //     this.detail.startBusinessTime = this.getTime(this.detail.startBusinessTime)
        //     this.detail.endBusinessTime = this.getTime(this.detail.endBusinessTime)
        //   }
        // }
      }
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
    // 将裁剪base64的图片转换为file文件
    dataURLtoFile (dataurl, filename) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    // 压缩图片
    onImgCompression (img) {
      let canvas = document.createElement("canvas")
      let ctx = canvas.getContext("2d")
      let initSize = img.src.length
      let width = img.width
      let height = img.height
      canvas.width = width
      canvas.height = height
      // 铺底色
      ctx.fillStyle = "#fff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, width, height)
      //进行压缩
      let compress = 0.4  //压缩率
      return canvas.toDataURL("image/jpeg", compress)
    },
    // 文件改变
    onFileChange(file, type) {
      // if (!e.target.files) {
      //   return
      // }
      // let file = e.target.files[0]
      // if (file.size / 1024 / 1024 > 2) {
      //   this.$toast.error('图片不能大于2M')
      //   return
      // }
      console.log(file)
      let imgfile = null
      let img = new Image()
      img.src = file
      img.onload = () => {
        let _data = this.onImgCompression(img)
        console.log(_data)
        var arr = _data.split(','), mime = arr[0].match(/:(.*?);/)[1],
        fileName = new Date().getTime() + '.' + mime.split('/')[1]
        imgfile = this.dataURLtoFile(_data, fileName)
        console.log('图片大小-压缩过:', (imgfile.size / 1024).toFixed(2), 'kb，', '压缩率：', 0.4)
        console.log(imgfile)
        if (imgfile) {
          clientInfoApi.uploadImage(imgfile).then(
            res => {
              if (res.code === 200) {
                this.$toast.success('图片上传成功')
                // this.$refs[type].$refs.file = ''
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
                  this.getIdCard({
                    pathId: photoId,
                    type
                  })
                } else if (type === 'storePhoto') {
                  this.detail.businessLicensePhotoId = photoId
                  this.getLicense({
                    pathId: photoId
                  })
                }else if(type === 'inHand'){
                  this.$set(this.detail, 'holdingCardId', photoId)
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
          let obj = {}
          obj.representativeName = res.obj.name
          obj.certificateNum = res.obj.idNum
          obj.sex = res.obj.sex == '男'? '1': '2'
          this.detail = Object.assign({}, this.detail, obj)
        } else if (params.type === 'back') {
          let obj = {}
          // obj.startCertificateTime = res.obj.startDate
          // obj.endCertificateTime = res.obj.endDate

          if (res.obj.startDate && res.obj.startDate.indexOf('-') !== -1) {
            obj.startCertificateTime = res.obj.startDate
          } else {
            obj.startCertificateTime = ''
          }
          if (res.obj.endDate && res.obj.endDate.indexOf('-') !== -1) {
            obj.endCertificateTime = res.obj.endDate
          } else {
            obj.endCertificateTime = ''
          }
          this.detail = Object.assign({}, this.detail, obj)
        }
      })
    },
    // 营业执照

    getLicense(params) {
      clientInfoApi.getLicense(params).then(res => {
        let obj = {}
        obj.registerAddress = res.obj.address
        obj.businessType = res.obj.type === '企业' ? '1' : '2'
        obj.businessLicenseName = res.obj.name
        obj.license = res.obj.regNum
        obj.person = res.obj.person
        if (res.obj.establishDate && res.obj.establishDate.indexOf('-') !== -1) {
          obj.startBusinessTime = res.obj.establishDate
        } else {
          obj.startBusinessTime = ''
        }
        if (res.obj.validPeriod && res.obj.validPeriod.indexOf('-') !== -1) {
          obj.endBusinessTime = res.obj.validPeriod
        } else {
          obj.endBusinessTime = ''
        }
        obj.businessType = res.obj.businessType
        this.detail = Object.assign({}, this.detail, obj)
      })
    },
    // 获取列表详情
    getMchInfo(id) {
      clientInfoApi.getMchInfo({ id }).then(res => {
        res.obj.businessType = String(res.obj.businessType) || '2'
        this.detail = Object.assign({}, this.detail, res.obj)
        if (!this.detail.businessLicensePhotoId) {
          this.accountType = 1
        } else {
          this.accountType = 2
        }
        if(this.detail.signId){
          this.signBackgroundColor = true;
        }else{
          this.signBackgroundColor = false;
          this.requiredData.push('sign')
        }
        console.log('this.detail', this.detail)
      })
    },

    // 初始化detail对象
    initDetail() {
      this.detail = JSON.parse(clientInfoDetailLocal.get())
      this.merchantName = JSON.parse(clientInfoDetailMerchantNameLocal.get())
      this.merchantName = this.merchantName.merchantName
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
      this.openSex = false
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
    },
  },

  filters: {
    // 获取图片
    loadImage(id) {
      return id ? url + `/fms/upload/resource/thumbnail/${id}` : ''
    },
    previewLoadImage(id) {

      // console.log(888888,id)
      return id ? url + `/fms/upload/resource/${id}` : ''
      /*if(id.indexOf('data:image/png;base64')===0){
        //兼容签名的
        return id
      }else{
        return id ? url + `/fms/upload/resource/${id}` : ''
      }
*/
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
    console.log('---11', this.$route)
    this.detail.id = this.$route.query.id

    console.log('id 1', JSON.parse(clientInfoDetailIDLocal.get()))
    if (this.detail.id) {
      this.getMchInfo(this.detail.id)
      // this.sourceData = getCateGory()
      // this.tmpSourceData = this.sourceData
    } else {
      this.$toast.error('详情数据丢失')
    }
  }
}
</script>
