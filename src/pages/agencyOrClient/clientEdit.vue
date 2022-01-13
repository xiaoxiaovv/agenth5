<template>
  <div class="vm-bg-white" v-loading="loading">
    <div class="vm-page-header">
      <div class="vm-page-header-container">
        <div class="vm-head">
          <div class="vm-head-icon"><span class="icon iconfont  iconreturn"
                  @click="goback"></span></div>
          <div class="vm-head-title vm-ell">
            <template v-if="id">{{detail.name}}</template>
            <template v-else>新增商户</template>
          </div>
          <div class="vm-head-btn"><span style="display: none">编辑</span></div>
        </div>
      </div>
    </div>
    <div class="vm-height-10px vm-bg-gray"></div>
    <div class="vm-form-mu ">
      <mu-form ref="form"
               :model="params">
        <div class="vm-bg-white">
          <mu-form-item label=""
                        prop="name"
                        :rules="nameRules">
            <mu-text-field v-model.trim="params.name"
                           autocomplete="off"
                           icon="*"
                           underline-color="#F0F0F0"
                           prefix="商户名"
                           placeholder="请输入商户名"></mu-text-field>
          </mu-form-item>
          <mu-form-item label=""
                        prop="contact"
                        :rules="contactRules">
            <mu-text-field v-model.trim="params.contact"
                           autocomplete="off"
                           icon="*"
                           underline-color="#F0F0F0"
                           prefix="联系人"
                           placeholder="请输入联系人"></mu-text-field>
          </mu-form-item>
          <mu-form-item label=""
                        prop="phone"
                        :rules="phoneRules"
                        v-if="!this.$route.query.id">
            <mu-text-field v-model.trim="params.phone"
                           autocomplete="off"
                           icon="*"
                           underline-color="#F0F0F0"
                           prefix="手机"
                           placeholder="请输入手机号"></mu-text-field>
          </mu-form-item>
          <mu-form-item label=""
                        prop="emailemailRules">
            <mu-text-field v-model.trim="params.email"
                           autocomplete="off"
                           icon="*"
                           underline-color="#F0F0F0"
                           prefix="电子邮箱"
                           placeholder="请输入邮箱"></mu-text-field>
          </mu-form-item>
          <mu-form-item label=""
                        prop="province"
                        :rules="provinceRules">
            <VmaCascaderTree v-model="cascaderArr"
                             :dataTree="cascaderTree"
                             :label="'省市'"
                             :placeholder="'请选择省市'"
                             :modalLabel="'选择省市'"
                             :required="true"
                             @change="changeCity"></VmaCascaderTree>
            <mu-text-field v-model="params.province"
                           style="display: none"></mu-text-field>
          </mu-form-item>
          <mu-form-item label=""
                        prop="address"
                        :rules="addressRules">
            <mu-text-field v-model.trim="params.address"
                           autocomplete="off"
                           icon="*"
                           underline-color="#F0F0F0"
                           prefix="详细地址"
                           placeholder="请填写地址"></mu-text-field>
          </mu-form-item>
          <mu-form-item label=""
                        prop="businessLevOne"
                        :rules="businessLevOneRules">
            <VmaCascaderTree v-model="cooperationLevArr"
                             :dataTree="cooperationLevTree"
                             :label="'经营类别'"
                             :placeholder="'请选择经营类别'"
                             :modalLabel="'选择经营类别'"
                             :required="true"></VmaCascaderTree>
            <mu-text-field v-model="params.businessLevOne"
                           style="display: none"></mu-text-field>
          </mu-form-item>

          <div class="vm-list-ul vm-bg-white vmalis-fontweight-400">
            <div class="vm-list-li">
              <div class="vma-list-li-left">定位开关</div>
              <div class="vma-list-li-right vm-ell"><mu-switch v-model="isOpenBtn" :disabled="locationDisabledFlag"></mu-switch></div>

            </div>
            <mu-form-item label=""
                          v-show="isOpenBtn">
              <mu-text-field v-model.trim="shopAddress"
                             autocomplete="off"
                             underline-color="#F0F0F0"
                             prefix="定位"
                             placeholder="请输入商铺地址"></mu-text-field>
            </mu-form-item>
            <div class="vm-list-li" v-show="isOpenBtn">
              <div class="vma-list-li-left"></div>
              <div class="vma-list-li-right vm-ell"><span @click="geolocationFn" class="vm-small-btn">自动定位</span></div>
            </div>
           <!-- <div class="vm-list-li">
              <div class="vma-list-li-left">定位</div>
              <div class="vma-list-li-right vm-ell"><span @click="showLocationModule" class="vm-small-btn">重新定位</span></div>
            </div>-->

          </div>
          <!-- <mu-form-item label="" prop="payProrata" :rules="payProrataRules">
            <mu-text-field v-model.trim="params.payProrata" type="number" autocomplete="off" icon="*" action-icon="%" underline-color="#F0F0F0"  prefix="手续费率" placeholder="请选择输入手续费率"></mu-text-field>
          </mu-form-item> -->
        </div>
        <mu-form-item class="submit-btn">
          <mu-button color="primary"
                     @click="submitView(1)">提交</mu-button>
        </mu-form-item>
      </mu-form>
      <!--
      <div class="vm-btn agent-detail-btn">
        <mu-button color="primary" @click="submitView(1)">确定</mu-button>
      </div>
      -->
    </div>
    <!--简单树-->
    <mu-bottom-sheet :open.sync="openSimpleTree">
      <div class="action-sheet box align-default">
        <div class="title box align-hor-bet plr-30">
          <div @click="simpleTreeBack">返回</div>
          <div class="vm-small-btn" @click="geolocationFn">重新定位</div>
          <!-- <div class="confirm">
            <div  @click="onActionSheetConfirm(2)">确定</div>
            <div v-else @click="onNextStep">取消</div>
          </div> -->
        </div>
      </div>
<!--      <div v-if="simpleTreeStatus === 1">-->
      <div >
<!--        该模块暂时没用-->
        <div class="action-sheet__header align-left box plr-30"><input style="width: 90%;height: 30px;font-size: 0.45rem" v-model="shopAddress" type="text" value="" placeholder="请输入商铺地址"></div>
        <!--<div class="action-sheet__content">
&lt;!&ndash;          <div><input v-model="shopAddress" type="text" value="11111111111111111" placeholder="请输入商铺地址"></div>&ndash;&gt;

          &lt;!&ndash;<div class="match-width"
               v-for="(item, index) in kdbcompanyTypeList"
               :key="index">
            <div :class="['item align-hor-bet plr-30 ptb-30', (item.value === detail.kdbCompanyType)?'active':'']"
                 @click="simpleTreeSelect(item)">
              <div>{{item.name}}</div>
              &lt;!&ndash; <div v-if="item.value === threeList[curThree]" class="icon iconfont iconcheck"></div> &ndash;&gt;
              &lt;!&ndash; <div class="pass" v-else></div> &ndash;&gt;
            </div>
          </div>&ndash;&gt;
        </div>-->
        <div class="vm-btn agent-detail-btn mb-50">
          <mu-button color="primary" @click="geoCode">保存位置</mu-button>
        </div>
      </div>

    </mu-bottom-sheet>
  </div>
</template>

<script>
import { agentOrClient, loginApi } from '@/api'
import * as types from '@/router/types'
import { afterLoginInfoLocal, fromReactNativeLocal } from '@/storage'
import VmaCascaderTree from '@/components/common/vmaCascaderTree'
import typeJson from '@/assets/merchant/merchantType.json'
import AMapLoader from '@amap/amap-jsapi-loader';
export default {
  components: { VmaCascaderTree },
  data() {
    return {
      locationDisabledFlag: true,
      loading: false,
      gdWebKey:'',
      isOpenBtn:true, //是否开启定位
      geocoder: null,
      geolocation:null,
      shopAddress:'',
      openSimpleTree:false,
      isEdit: false,
      id: '',
      from: '', // 上级父级来源
      fxUserId: '', // 上级用户id
      detail: {},
      params: {
        isOpen:false,
        companyId: afterLoginInfoLocal.getJSON().companyId,
        managerId: afterLoginInfoLocal.getJSON().userId,
        status: '1' // 正常状态
      },
      nameRules: [
        { validate: (val) => !!val, message: '' }
      ],
      contactRules: [
        { validate: (val) => !!val, message: '' }
      ],
      phoneRules: [
        { validate: (val) => !!val, message: '' },
        { validate: (val) => !!(/^1\d{10}$/.test(val)), message: '' }
      ],
      emailRules: [
        { validate: (val) => !!val, message: '' },
        { validate: (val) => !!(/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(val)), message: '' }
      ],
      businessLevOneRules: [
        { validate: (val) => !!val, message: '' }
      ],
      addressRules: [
        { validate: (val) => !!val, message: '' },
        { validate: (val) => !!(val.length >= 0 && val.length <= 50), message: '' }
      ],
      payProrataRules: [
        { validate: (val) => !!val, message: '' }
      ],
      provinceRules: [
        { validate: (val) => !!val, message: '' }
      ],
      cityRules: [
        { validate: (val) => !!val, message: '' }
      ],
      cascaderArr: [],
      cascaderArrObj: [],
      cascaderTree: [],
      cooperationLevArr: [],
      cooperationLevTree: []
    }
  },
  watch: {
    cooperationLevArr(val, oldVal) {
      val = val || []
      this.params.businessLevOne = val[0] || ''
      this.params.businessLevTwo = val[1] || ''
      this.params.businessLevThree = val[2] || ''
    },
    cascaderArr(val, oldVal) {
      val = val || []
      this.params.province = val[0] || ''
      this.params.city = val[1] || ''
    }
  },
  created() {
    let userType = afterLoginInfoLocal.getJSON().userType
    this.getGaoDeKey()
    this.id = this.$route.query.id
    this.isOpenBtn = true
    if ((userType === 1 && this.id) || (userType === 2 && this.id)) {
      this.locationDisabledFlag = false
    }  else {
      this.locationDisabledFlag = true
    }
    if (this.$route.query.token) {
      sessionStorage.token = this.$route.query.token
      setTimeout(() => {
        this.loginByTokenToGetInfo()
      })
    }
    if (this.$route.query.from) {
      this.from = this.$route.query.from
      fromReactNativeLocal.set(this.from)
      console.log('RN来源', fromReactNativeLocal.get())
      console.log('RN来源', this.from)
    }
    if (this.$route.query.fxUserId) {
      this.fxUserId = this.$route.query.fxUserId
    }
    if (!this.$route.query.id) {
      document.title = '新增商户'
    } else {
      document.title = '编辑商户'
    }
    this.intiMerchantType()
    this.getProviceAndCity()
  },
  mounted() {
    // let that = this;

  },
  methods: {
    AMapLoader(){
      AMapLoader.load({
        // "key": "ec2655d926a9b2662c416608d087fff6",              // 申请好的Web端开发者Key，首次调用 load 时必填
        "key":this.gdWebKey,
        "version": "1.4.15",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        "plugins": ['AMap.Geocoder', 'AMap.Geolocation'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        "AMapUI": {             // 是否加载 AMapUI，缺省不加载
          "version": '1.1',   // AMapUI 缺省 1.1
          "plugins":[],       // 需要加载的 AMapUI ui插件
        },
        "Loca":{                // 是否加载 Loca， 缺省不加载
          "version": '1.3.2'  // Loca 版本，缺省 1.3.2
        },
      }).then((AMap)=>{
        // map = new AMap.Map('container');
        this.geocoder = new AMap.Geocoder({
          city: "", //城市设为北京，默认：“全国”
        });
        this.geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          // position: 'RB', //定位按钮的停靠位置
          // buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          // zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
        })
      }).catch(e => {
        console.log(e);
      })
    },
    getGaoDeKey(){
      let userInfo = afterLoginInfoLocal.getJSON()
      agentOrClient.getGaoDeKey(userInfo.serviceId).then(res => {
        this.gdWebKey = res.obj.gdWebSideKey;
        this.AMapLoader();
      })
    },
    simpleTreeBack(){
      this.openSimpleTree = false;
    },
    showLocationModule(){
      this.openSimpleTree = true;
    },
    //获取坐标转为中文地址
    geolocationFn(){
      this.loading = true
      // var  that = this;
      this.geolocation.getCurrentPosition((status, result) => {
        this.loading = false
        if (status == 'complete') {
          /*this.params.autoGetlongitude = result.position.lng
          this.params.autoGetlatitude = result.position.lat*/
          // this.longitude = result.position.lng
          // this.latitude = result.position.lat
          console.log('获取坐标================',result.position.lng+','+result.position.lat)
          this.geocoder.getAddress([result.position.lng, result.position.lat], (status, result)=> {
            if (status === 'complete'&&result.regeocode) {
              let address = result.regeocode.formattedAddress;
              this.shopAddress = address

              console.log('经纬度转地址==================',address)
              // alert('经纬度转地址'+address)
            }else{
              log.error('根据经纬度查询地址失败')
            }
          });
          // 应该监听这四个数据 当全部存在时 执行
          // if(this.oilData.longitude && this.oilData.latitude && this.oilData.phone && this.startGet) {
            // this.init()
          // }

        } else {
          this.$toast.error('定位失败,'+result.message)
        }
      })
    },
    //根据中文地址转为坐标
    geoCode() {
      // let that = this;
      // let address  = document.getElementById('address').value;

      this.geocoder.getLocation(this.shopAddress, (status, result)=> {
        if (status === 'complete'&&result.geocodes.length) {
          let lngLat = result.geocodes[0].location
          this.params.longitude = lngLat.lng
          this.params.latitude = lngLat.lat
          this.addAndEditSubmit()
          // this.$toast.success('点击确定提交')
          // document.getElementById('lnglat').value = lnglat;
        }else{
          //定位失败逻辑处理
          if(this.shopAddress){
            this.$toast.error('根据地址查询位置失败,'+result)
          }else if(!this.params.longitude && !this.params.latitude && !this.shopAddress){
          //  没有填地址，也没有历史定位记录则需要抛错
            this.$toast.error('根据地址查询位置失败,'+result)
          }else if(this.params.longitude && this.params.latitude && !this.shopAddress){
          //  有历史地址，但是没写中文地址，不抛错，直接提交
            this.addAndEditSubmit()
          }else{
            this.$toast.error('定位功能异常，请联系管理员,'+result)
          }
          /*console.log('77777777777777777::'+this.isOpenBtn )
          console.log('77777777777777777::'+this.params.longitude )
          console.log('77777777777777777::'+this.params.latitude )
          console.log('77777777777777777::'+this.shopAddress )*/
          // log.error('根据地址查询位置失败');
          /*if(this.isOpenBtn && !this.params.longitude && !this.params.latitude && this.shopAddress){
            this.$toast.error('根据地址查询位置失败')
          }else if(!this.isOpenBtn){
            this.addAndEditSubmit()
          }else{
            this.$toast.error('定位功能异常')
          }*/

        }
      });
    },

    /**
     * 提交审核
     */
    submitView(status) {
      let msg = ''
      //  else if (!this.params.payProrata) {
      //   if (!this.isEdit) {
      //     msg = '请填写手续费率'
      //   }
      // }
      // this.addInfo()
      // this.sendData('发送')
      /*if(this.params.isOpen){
        this.params.isOpen = 1
      }else{
        this.params.isOpen = -1
      }*/
      if (!this.params.name) {
        msg = '商户名不能为空'
      } else if (!this.params.contact) {
        msg = '请填写联系人'
      } else if (!this.params.phone) {
        msg = '请填写手机号'
      } else if (!(/^1\d{10}$/.test(this.params.phone))) {
        msg = '请填写正确手机号'
      } else if (!this.params.businessLevOne) {
        msg = '请选择经营类目'
      } else if (!this.params.province) {
        msg = '请选择省市'
      } else if (!this.params.email) {
        msg = '请填写邮箱'
      } else if (!(/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(this.params.email))) {
        msg = '请填写正确邮箱'
      } else if (!this.params.address) {
        msg = '请填写地址'
      }
      if (msg) {
        this.$toast.message(msg)
      } else {
        if(this.isOpenBtn){
          this.addAndEditSubmit()
        }else{
          this.addAndEditSubmit()
        }

        /*let params = Object.assign({}, this.params)
        // params.payProrata = params.payProrata / 100
        if (this.isEdit) {
          delete params.phone
          // delete params.payProrata
          delete params.status
          delete params.companyId
          delete params.managerId
        }*/
        //定位修改
        /*if (this.$route.query.id) {
          this.submitInfo(params)
        } else {
          // params.status = status
          if (this.from === 'react-native') {
            params.fxUserId = this.fxUserId
          }
          this.addInfo(params)
        }*/
      }
    },
    //添加和修改提交
    addAndEditSubmit(){
      if(this.isOpenBtn){
        this.params.isOpen = 1
      }else{
        this.params.isOpen = -1
      }
      let params = Object.assign({}, this.params)
      // params.payProrata = params.payProrata / 100
      if (this.isEdit) {
        delete params.phone
        // delete params.payProrata
        delete params.status
        delete params.companyId
        delete params.managerId
      }
      if (this.$route.query.id) {
        this.submitInfo(params)
      } else {
        // params.status = status
        if (this.from === 'react-native') {
          params.fxUserId = this.fxUserId
        }
        this.addInfo(params)
      }
    },
    /**
     * 提交修改
     * */
    submitInfo(params) {
      let that = this
      if(this.isOpenBtn){
        this.params.isOpen = 1
      }else{
        this.params.isOpen = -1
      }
      agentOrClient.editClienDetail(params).then(res => {
        this.$toast.success(res.msg)
        setTimeout(() => {
          that.goback()
        }, 1000)
      })
    },



    loginByTokenToGetInfo() {
      loginApi.getUserInfoByToken().then(res => {
        afterLoginInfoLocal.setJSON(res.obj) // 存储登录后信息
        this.params.companyId = res.obj.companyId
        this.params.managerId = res.obj.userId
      })
    },
    intiMerchantType() {
      let newArr = this.loopSet(typeJson)
      this.cooperationLevTree = newArr
    },
    loopSet(arr) {
      arr.forEach(item => {
        this.$set(item, 'id', item.name)
        if (item.children && item.children.length) {
          item.children = this.loopSet(item.children)
        }
        return item
      })
      return arr
    },
    /**
     * 获取详情
     */
    async getDetail() {
      let params = {
        merchantId: this.$route.query.id
      }
      agentOrClient.getClienDetail(params).then(res => {
        this.detail = res.obj
        let params = {
          name: res.obj.name,
          contact: res.obj.contact,
          phone: res.obj.phone,
          businessLevOne: res.obj.businessLevOne,
          businessLevTwo: res.obj.businessLevTwo,
          businessLevThree: res.obj.businessLevThree,
          address: res.obj.address,
          // payProrata: res.obj.payProrata * 100,
          province: res.obj.province,
          city: res.obj.city,
          email: res.obj.email,
          id: this.$route.query.id,
          status: res.obj.email,
          longitude: res.obj.longitude, //经度
          latitude: res.obj.latitude, //纬度
          isOpen: res.obj.isOpen, // 开关
          // expirDate: res.obj.expirDate,  //有效期
          // rangeAction : res.obj.rangeAction // 有效范围
        }
        this.params = Object.assign({}, this.params, params);
        if(this.params.isOpen === 1){
          this.isOpenBtn = true
        }else{
          this.isOpenBtn = false
        }
        this.cooperationLevArr = [res.obj.businessLevOne, res.obj.businessLevTwo, res.obj.businessLevThree]
        this.cascaderArr = [res.obj.province, res.obj.city]
      })
    },
    /**
     * 获取省市区
     */
    async getProviceAndCity() {
      let that = this
      await agentOrClient.getProvice({ level: 2 }).then(res => {
        that.cascaderTree = this.sortArr(res.obj)
        if (this.$route.query.id) {
          this.isEdit = true
          this.getDetail()
        } else {
          this.isEdit = false
        }
      })
    },
    /**
     * 省市排序--排序规则
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
     * 选择省市
     */
    changeCity(val) {
      let arr = []
      for (let i = 0; i < val.length; i++) {
        arr.push(val[i].id)
      }
      this.cascaderArrObj = val
    },
    // 发送数据
    sendData(data) {
      this.$toast.message('发送数据:')
      if (window.postMessage) {
        // this.$toast.message('注入1：')
        // this.$toast.message('注入：'+data)
        // this.$toast.message('111--'+window.postMessage)
        window.postMessage(JSON.stringify(`${JSON.stringify(data)}`), '*')
        // this.$toast.message('222--'+window.postMessage)
      } else {
        this.$toast.message('postMessage接口还未注入')
        throw Error('postMessage接口还未注入')
      }
    },

    /**
     * 新增代理
     * */
    addInfo(params) {
      let that = this
      agentOrClient.addClienDetail(params).then(res => {
        this.$toast.message('操作成功')
        if (this.from === 'react-native') {
          this.$router.push({ name: types.ADD_MERCHANT, query: { id: res.obj.id, from: this.from } })
          return
        }
        setTimeout(() => {
          that.goback()
        }, 1000)
      })
    },
    /**
     * 返回上一页
     */
    goback() {
      this.$router.back(-1)
    },
    editDetail() {
      // this.$router.push({name: types.AGENCY_EDIT, query: {id: this.$route.query.id}})
    }
  }
}
</script>
<style>
.mu-switch.disabled input[type=checkbox]:checked+.mu-switch-wrapper .mu-switch-track {
  background-color: currentColor!important;
  opacity: .4;
}
.mu-switch.disabled input[type=checkbox]:checked+.mu-switch-wrapper .mu-switch-thumb {
  background-color: currentColor!important;
  opacity: .4;
}
</style>
