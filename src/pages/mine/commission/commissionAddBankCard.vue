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
        添加/编辑提现卡
      </div>
      <div class="text"
           @click="$router.back(-1)">
      </div>
    </div>

    <!-- 信息主体 -->
    <div class="client-info-detail__content box match-left-space">

      <div class="match-width box align-default">
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>开户总行银行
          </div>
          <div class="match-left-space align-right">
            <div class="input align-right">
              <input placeholder="请与卡面名称保持一致"
                     v-model="detail.bankName" />
            </div>
          </div>
        </div>
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
              <i v-if="detail.cardFront"
                 class="icon iconfont iconshanchu"
                 @click="deleteImg('face')"></i>
              <div class="icon iconfont iconzhaoxiangji ml-10"
                   style="font-size:30px;"></div>
              <img v-if="detail.cardFront"
                    class="img_show"
                   :src="detail.cardFront | previewLoadImage"
                   @click="previewImage(detail.cardFront)" />
            </div>
            <p class="img_intro">身份证正面照</p>
          </div>

          <div class="img_wp img_wp_width">
            <!-- <vmaUploadImg ref="back"
                          @change="onFileChange($event, 'back')"></vmaUploadImg> -->
              <h5-cropper :option="option" @getbase64Data="onFileChange($event, 'back')"></h5-cropper>
            <div>
              <i v-if="detail.cardBack"
                 class="icon iconfont iconshanchu"
                 @click="deleteImg('back')"></i>
              <div class="icon iconfont iconzhaoxiangji ml-10"
                   style="font-size:30px;"></div>
              <img v-if="detail.cardBack"
                    class="img_show"
                   :src="detail.cardBack | previewLoadImage"
                   @click="previewImage(detail.cardBack)" />
            </div>
            <p class="img_intro">身份证反面照</p>
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>身份证号
          </div>
          <div class="match-left-space align-right">
            <div class="input align-right">
              <input placeholder="请输入身份证号"
                     v-model="detail.idCardNo" />
            </div>
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>地址
          </div>
          <div class="match-left-space align-right">
            <div class="input align-right">
              <input placeholder="请输入地址"
                     v-model="detail.cidAddress" />
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
                     v-model="detail.bankAccount" />
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
                     v-model="detail.cardNo" />
            </div>
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>银行预留手机号
          </div>
          <div class="match-left-space align-right">
            <div class="input align-right">
              <input placeholder="请输入预留手机号"
                     v-model="detail.bankPhone" />
            </div>
          </div>
        </div>
      </div>
      <div class="match-width box align-center">
        <div class="next box align-center"
             @click="commissionAddBankCard">
          提交
        </div>
      </div>
    </div>
    <vmaImagePreview :dialog="previewDialog"></vmaImagePreview>
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
import { COMMISSIONAPPLY, MINE } from '@/router/types'
import { commissionApi, clientInfoApi } from '@/api'
import { afterLoginInfoLocal } from '@/storage'
import H5Cropper from 'vue-cropper-h5'
import vmaUploadImg from '@/components/common/vmaUploadImg'
import vmaImagePreview from '@/components/common/vmaImagePreview'
import indexMixins from '../../clientInfo/src/mixins.js'
export default {
  components: { vmaUploadImg, vmaImagePreview, H5Cropper },
  mixins: [indexMixins],
  data() {
    return {
      openAlert: false,
      loading: false,
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
      detail: {
        cardFront: '',
        cardBack: '',
        idCardNo: '',
        cidAddress: '',
        bankAccount: '', //户名
        bankName: '',
        cardNo: '',
        companyId: '',
        bankPhone: ''
      },
    }
  },

  filters: {
    previewLoadImage(id) {
      return id ? url + `/fms/upload/resource/${id}` : ''
    },
  },

  mounted() {
    let userInfo = afterLoginInfoLocal.getJSON()
    this.detail.companyId = userInfo.companyId
    this.commissionGetBankCard()
  },

  methods: {

    closeAlertDialog() {
      this.openAlert = false
    },
    commissionGetBankCard() {
      commissionApi.commissionGetBankCard(this.detail.companyId).then(res => {
          this.detail = res.obj
      })
    },
    toApplyPage(){
      this.$router.push({
        name: MINE,
      })
    },
    // 提交
    commissionAddBankCard() {
      let requiredData = ['cardFront','cardBack','idCardNo','cidAddress','bankAccount','bankName','cardNo','companyId','bankPhone']
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
        this.detail.cityCode = this.detail.commissionCityCode
        this.detail.cityName = this.detail.commissionCityName
        commissionApi.commissionAddBankCard(this.detail).then(res => {
          if(res.code === 200){
            this.openAlert = true

          }else{
            if(res.msg)
            this.$toast.error(res.msg)
          }
          /*this.$router.push({
            name: CLIENT_INFO_BASE,
            query: {
              id: this.detail.id
            }
          })*/
        })
      } else {
        this.$toast.error('有内容未填入')
      }
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
      let imgfile = null
      let img = new Image()
      img.src = file
      img.onload = () => {
        let _data = this.onImgCompression(img)
        var arr = _data.split(','), mime = arr[0].match(/:(.*?);/)[1],
        fileName = new Date().getTime() + '.' + mime.split('/')[1]
        imgfile = this.dataURLtoFile(_data, fileName)
        console.log('图片大小-压缩过:', (imgfile.size / 1024).toFixed(2), 'kb，', '压缩率：', 0.4)
        if (imgfile) {
          clientInfoApi.uploadImage(imgfile).then(
            res => {
              if (res.code === 200) {
                this.$toast.success('图片上传成功')
                let photoId = res.obj
                if (type === 'face') {
                  this.detail.cardFront = photoId
                  this.getIdCard({
                    pathId: photoId,
                    type
                  })
                } else if (type === 'back') {
                  this.$set(this.detail, 'cardBack', photoId)
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
    // 身份证识别
    getIdCard(params) {
      clientInfoApi.getIdCard(params).then(res => {
        if (params.type === 'face') {
          let obj = {}
          obj.idCardNo = res.obj.idNum
          obj.cidAddress = res.obj.address
          this.detail = Object.assign({}, this.detail, obj)
        }
      })
    },
    /**
     * type-删除目标
     * 删除图片，清空相关的所有数据
     */
    deleteImg(type) {
      // 身份证（正面）
      if (type === 'face') {
        this.detail.cardFront = ''
        this.detail.idCardNo = ''
        this.detail.cidAddress = ''
      }
      // 身份证（背面）
      if (type === 'back') {
        this.detail.cardBack = ''
      }
    },
  },
}
</script>
