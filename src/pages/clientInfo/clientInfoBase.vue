<template>
  <div class="client-info-detail frame-container box align-default short">

    <!-- 补白 -->
    <div class="client-info-detail__padding"></div>

    <!-- 导航栏 -->
    <div class="client-info-detail__nav box plr-30 align-hor-bet">
      <div class="icon iconfont  iconreturn"
           @click="onBack">
      </div>
      <div class="title">
        基本信息
      </div>
      <div class="text"
           @click="onBack">
        上一步
      </div>
    </div>

    <!-- 信息主体 -->
    <div class="client-info-detail__content box match-left-space">
      <div class="item"
           style="border:0;">
        <div class="subtitle">
          <span class="star">*</span>店铺门头照
        </div>
      </div>
      <div class="item id_img_wp">
        <div class="img_wp img_wp_width">
          <!-- <input class="file"
                 type="file"
                 ref="out"
                 accept="image/*"
                 @change="onFileChange($event, 'out')" /> -->
          <!-- <vmaUploadImg ref="out"
                        @change="onFileChange($event, 'out')"></vmaUploadImg> -->
          <h5-cropper :option="option" @getbase64Data="onFileChange($event, 'out')"></h5-cropper>
          <div>
            <i v-if="detail.storeEntrancePicId"
               class="icon iconfont iconshanchu"
               @click="deleteImg('store')"></i>
            <div class="icon iconfont iconzhaoxiangji ml-10"
                 style="font-size:30px;"></div>
            <img v-if="detail.storeEntrancePicId"
            class="img_show"
                 :src="detail.storeEntrancePicId | previewLoadImage"
                 @click="previewImage(detail.storeEntrancePicId)" />
          </div>
          <p class="img_intro">店内门头照</p>
        </div>

        <div class="img_wp img_wp_width">
          <!-- <input class="file"
                 type="file"
                 ref="indoor"
                 accept="image/*"
                 @change="onFileChange($event, 'indoor')" /> -->
          <!-- <vmaUploadImg ref="indoor"
                        @change="onFileChange($event, 'indoor')"></vmaUploadImg> -->
           <h5-cropper :option="option" @getbase64Data="onFileChange($event, 'indoor')"></h5-cropper>
          <div>
            <i v-if="detail.indoorPicId"
               class="icon iconfont iconshanchu"
               @click="deleteImg('indoor')"></i>
            <div class="icon iconfont iconzhaoxiangji ml-10"
                 style="font-size:30px;"></div>
            <img v-if="detail.indoorPicId"
            class="img_show"
                 :src="detail.indoorPicId | previewLoadImage"
                 @click="previewImage(detail.indoorPicId)" />
          </div>
          <p class="img_intro">店内环境照片</p>
        </div>

        <div class="img_wp img_wp_width">
          <!-- <input class="file"
                 type="file"
                 ref="indoor"
                 accept="image/*"
                 @change="onFileChange($event, 'indoor')" /> -->
          <div>
            <!-- <vmaUploadImg ref="cashierDeskPicId"
                          @change="onFileChange($event, 'cashierDeskPicId')"></vmaUploadImg> -->
            <h5-cropper :option="option" @getbase64Data="onFileChange($event, 'cashierDeskPicId')"></h5-cropper>
            <i v-if="detail.cashierDeskPicId"
               class="icon iconfont iconshanchu"
               @click="deleteImg('cashierDeskPicId')"></i>
            <div class="icon iconfont iconzhaoxiangji ml-10"
                 style="font-size:30px;"></div>
            <img v-if="detail.cashierDeskPicId"
            class="img_show"
                 :src="detail.cashierDeskPicId | previewLoadImage"
                 @click="previewImage(detail.cashierDeskPicId)" />
          </div>
          <p class="img_intro">收银台照片</p>
        </div>
      </div>
      <div class="item">
        <VmaCascaderTree class="client-info"
                         v-model="cascaderArr"
                         :dataTree="cascaderTree"
                         :label="'经营省市区'"
                         :placeholder="'请选择省市'"
                         :modalLabel="'选择省市'"
                         :required="true"
                         @change="changeCity"></VmaCascaderTree>
      </div>

      <div class="item">
        <div class="subtitle">
          <span class="star">*</span>经营地址
        </div>
        <div class="match-left-space align-right">
          <input v-model="detail.address"
                 placeholder="请填写(具体到门牌号)" />
        </div>
      </div>
      <div class="item">
        <div class="subtitle">
          <span class="star">*</span>联系人
        </div>
        <div class="match-left-space align-right">
          <input v-model="detail.contact"
                 placeholder="请填写" />
        </div>
      </div>
      <div class="item">
        <div class="subtitle">
          <span class="star">*</span>手机号码
        </div>
        <div class="match-left-space align-right">
          <input type="text"
                 v-model="detail.phone"
                 placeholder="请填写" />
        </div>
      </div>
      <div class="item">
        <div class="subtitle">
          <span class="star">*</span>常用邮箱
        </div>
        <div class="match-left-space align-right">
          <input v-model="detail.email"
                 placeholder="请填写" />
        </div>
      </div>
      <div class="item">
        <div class="subtitle">
          <span class="star">*</span>客服电话
        </div>
        <div class="match-left-space align-right">
          <input type="text"
                 v-model="detail.cusServiceTel"
                 placeholder="请填写" />
        </div>
      </div>
      <div class="item">
        <div class="subtitle">
          <span class="star">*</span>商户简称
        </div>
        <div class="match-left-space align-right">
          <input v-model="detail.shortName"
                 placeholder="请填写" />
        </div>
      </div>
      <div class="match-width box align-center">
        <div class="next box align-center"
             @click="openAlertDialog">
          下一步
        </div>
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
import { CLIENT_INFO_RECORD_NEXT, CLIENT_INFO_RECORD_LAST } from '@/router/types'
import { clientInfoApi, agentOrClient } from '@/api'
import VmaCascaderTree from '@/components/common/vmaCascaderTree'
import { validPhone, emailValid } from '@/utils'
import vmaUploadImg from '@/components/common/vmaUploadImg'
import vmaImagePreview from '@/components/common/vmaImagePreview'
import indexMixins from './src/mixins'
import H5Cropper from 'vue-cropper-h5'
export default {
  components: { VmaCascaderTree, vmaUploadImg, vmaImagePreview, H5Cropper },
  mixins: [indexMixins],
  data() {
    return {
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
        // isCommit: 0,
        regProvCd: '',
        regCityCd: '',
        regDistCd: '',
        cashierDeskPicId:'',
        phone:'' //
      },
      openAlert: false,
      cascaderTree: [], // 省市区树
      cascaderArr: [], // 省市区的值
      open: false
    }
  },
  methods: {
    // 返回
    onBack() {
      // TODO
      this.$router.push({
        name: CLIENT_INFO_RECORD_NEXT,
        query: {
          id: this.detail.id
        }
      })
    },
    deleteImg(type) {
      if (type === 'store') {
        this.detail.storeEntrancePicId = ''
      }
      if (type === 'indoor') {
        this.detail.indoorPicId = ''
      }
      if (type === 'cashierDeskPicId') {
        this.detail.cashierDeskPicId = ''
      }
    },
    openAlertDialog() {
      this.openAlert = true
    },
    closeAlertDialog() {
      this.openAlert = false
    },
    /**
     * 省市排序--排序规则（估计是为了让每次获取到的数据位置不变用的）
     */
    sortCompare(a, b) {
      a = parseInt(a.id)
      b = parseInt(b.id)
      return a - b
    },
    /**
     * 省市排序
     */
    sortArr(arr) {
      arr.sort(this.sortCompare)
      return arr
    },
    /**
     * 获取省市区
     */
    async getProviceAndCity() {
      let that = this
      await agentOrClient.getProviceNew({ level: 3 }).then(res => {
        that.cascaderTree = this.sortArr(res.obj)
      })
    },
    /**
     * 选择省市区
     */
    changeCity(val) {
      // id
      this.detail.regProvCd = val[0].id
      this.detail.regCityCd = val[1].id
      this.detail.regDistCd = ''

      // 名称
      this.detail.regProvCdName = val[0].name
      this.detail.regCityCdName = val[1].name
      this.detail.regDistCdName = ''

      if (val.length === 3) {
        this.detail.regDistCd = val[2].id
        this.detail.regDistCdName = val[2].name
      }
    },
    // 获取列表详情（提交过的数据）
    getMchInfo(id) {
      clientInfoApi.getMchInfo({ id }).then(res => {
        this.cascaderArr = [res.obj.regProvCd, res.obj.regCityCd, res.obj.regDistCd]
        this.detail = Object.assign({}, this.detail, res.obj);
        /*this.detail.address = this.detail.address || this.detail.registerAddress;
        this.detail.contact = this.detail.contact || this.detail.representativeName;
        this.detail.phone = this.detail.phone || this.detail.legalPersonPhone;
        this.detail.cusServiceTel = this.detail.cusServiceTel || this.detail.legalPersonPhone;
        this.detail.shortName = this.detail.shortName || this.detail.merchantName;*/
      })
    },
    onActionSheetClose() {
      this.open = false
    },
    onActionSheetConfirm() {
      this.onActionSheetClose()
      if (this.status === 1) {
        // 账户类型
        this.detail.accountType = this.accountTypes[this.curAccount]
      }
    },
    // 下一步
    onNext() {
      let requiredData = ['storeEntrancePicId', 'indoorPicId', 'cashierDeskPicId', 'address', 'contact', 'phone', 'email', 'cusServiceTel', 'shortName', 'regProvCd', 'regCityCd']
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
        if (!validPhone(this.detail.phone)) {
          this.$toast.error('手机号码格式错误')
          return
        }
        if (!emailValid(this.detail.email)) {
          this.$toast.error('邮箱格式错误')
          return
        }
        if (!this.detail.cusServiceTel || !Number(this.detail.cusServiceTel)) {
          this.$toast.error('客服电话格式错误')
          return
        }

        this.closeAlertDialog()
        // 跳转到详情
        clientInfoApi.submitMchIfo(this.detail).then(res => {
          if (res.code === 200) {
            this.$router.push({
              name: CLIENT_INFO_RECORD_LAST,
              query: {
                id: this.detail.id
              }
            })
          } else {
            this.$toast.error(res.msg)
          }
        }, (err) => {
          this.$toast.error(err.msg)
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
        console.log(_data)
        var arr = _data.split(','), mime = arr[0].match(/:(.*?);/)[1],
        fileName = new Date().getTime() + '.' + mime.split('/')[1]
        imgfile = this.dataURLtoFile(_data, fileName)
        console.log('图片大小-压缩过:', (imgfile.size / 1024).toFixed(2), 'kb，', '压缩率：', 0.4)
        console.log(imgfile)
        if (imgfile) {
          clientInfoApi.uploadImage(imgfile).then(res => {
            if (res.code === 200) {
              this.$toast.success('图片上传成功')
              let photoId = res.obj
              if (type === 'out') { // 店内门头照
                this.$set(this.detail, 'storeEntrancePicId', photoId)
              } else if (type === 'indoor') { // 店内环境照片
                this.$set(this.detail, 'indoorPicId', photoId)
              }else if (type === 'cashierDeskPicId') { // 店内环境照片
                this.$set(this.detail, 'cashierDeskPicId', photoId)
              }
            } else {
              this.$toast.error(res.msg)
            }
          }, (err) => {
            this.$toast.error(err.msg)
          })
        }
      }
    },
    // 预览图片
    // previewImage(id) {
    //   // console.log(id)
    //   if (id) {
    //     this.imgUrl = id
    //     this.isImagePreview = true
    //   }
    // },
    createImgUrl(id) {
      return id ? url + `/fms/upload/resource/${id}` : ''
    }
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
    this.detail.id = this.$route.query.id
    this.getProviceAndCity()
    if (this.detail.id) {
      this.getMchInfo(this.detail.id)
    } else {
      this.$toast.error('详情数据丢失')
    }
  }
}
</script>
