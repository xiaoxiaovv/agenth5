<template>
  <div class="vm-bg-white" v-loading="loading">
    <div class="vm-page-header">
      <div class="vm-page-header-container">
        <div class="vm-head">
          <div class="vm-head-icon"><span class="icon iconfont  iconreturn"
                                          @click="goback"></span></div>
          <div class="vm-head-title vm-ell">
            <template v-if="id">{{detail.name}}</template>
            <template v-else>注册</template>
          </div>
          <div class="vm-head-btn"><span style="display: none">编辑</span></div>
        </div>
      </div>
    </div>
    <div class="vm-height-10px vm-bg-gray"></div>
    <div class="vm-form-mu register-body">
      <mu-form ref="form"
               :model="params">
        <div class="vm-bg-white">

          <mu-form-item label=""
                        prop="contact"
                        :rules="realNameRules">
            <mu-text-field v-model.trim="params.realName"
                           autocomplete="off"
                           underline-color="#F0F0F0"
                           placeholder="请输入姓名(与身份证一致)"></mu-text-field>
          </mu-form-item>
          <mu-form-item label=""
                        prop="mobile"
                        :rules="mobileRules"
                        v-if="!this.$route.query.id">
            <mu-text-field v-model.trim="params.mobile"
                           autocomplete="off"
                           underline-color="#F0F0F0"
                           placeholder="请输入手机号"></mu-text-field>
          </mu-form-item>
          <div class="auth-code-box">
          <mu-form-item label=""
                        :rules="msgCaptchaRules"
                        prop="msgCaptchaRules">

            <mu-text-field class="auth-code-input"  v-model.trim="params.msgCaptcha"
                           autocomplete="off"

                           underline-color="#F0F0F0"

                           placeholder="请输入短信验证码"></mu-text-field>

          </mu-form-item>

            <mu-button class="auth-code-btn" color="primary"
                       :disabled="getAuthCodeBtnDisabled"
                       @click="getAuthCode">
              {{authCodeBtnText}}
            </mu-button>
          </div>
          <mu-form-item label=""
                        :rules="passwordRules"
                        prop="password">
            <mu-text-field v-model.trim="params.password"
                           :action-icon="visibility ? 'visibility_off' : 'visibility'"
                           :action-click="() => (visibility = !visibility)"
                           placeholder="请输入密码"
                           :type="visibility ? 'text' : 'password'">
            </mu-text-field>
          </mu-form-item>
          <mu-form-item label=""
                        :rules="passwordSureRules"
                        prop="passwordSure">
            <mu-text-field v-model.trim="params.passwordSure"
                           :action-icon="visibility ? 'visibility_off' : 'visibility'"
                           :action-click="() => (visibility = !visibility)"
                           placeholder="确认密码"
                           :type="visibility ? 'text' : 'password'">
            </mu-text-field>
          </mu-form-item>
          <mu-form-item label=""
                        prop="inviteCode"
                        :rules="inviteCodeRules">
            <mu-text-field v-model.trim="params.inviteCode"
                           autocomplete="off"
                           underline-color="#F0F0F0"
                           placeholder="请输入邀请码"></mu-text-field>
          </mu-form-item>
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
      <!--<div class="action-sheet box align-default">
        <div class="title box align-hor-bet plr-30">
          <div @click="simpleTreeBack">返回</div>

        </div>
      </div>
      &lt;!&ndash;      <div v-if="simpleTreeStatus === 1">&ndash;&gt;
      <div >
        <div class="vm-btn agent-detail-btn mb-50">
          <mu-button color="primary" @click="geoCode">保存位置</mu-button>
        </div>
      </div>-->

    </mu-bottom-sheet>
  </div>
</template>

<script>
import { registerApi } from '@/api'
import { afterLoginInfoLocal, fromReactNativeLocal } from '@/storage'
import VmaCascaderTree from '@/components/common/vmaCascaderTree'
import typeJson from '@/assets/merchant/merchantType.json'

export default {
  components: { VmaCascaderTree },
  data() {
    return {
      getAuthCodeBtnDisabled: false,
      timeCount: 60,
      authCodeBtnText:'获取验证码',
      visibility:false,
      loading: false,


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

       /* passwordSure:'',
        inviteCode: '',
        password:'',
        isOpen:false,
        companyId: afterLoginInfoLocal.getJSON().companyId,
        managerId: afterLoginInfoLocal.getJSON().userId,
        status: '1' // 正常状态*/
      },
      contactRules: [
        { validate: (val) => !!val, message: '' }
      ],
      mobileRules: [
        { validate: (val) => !!val, message: '' },
        { validate: (val) => !!(/^1\d{10}$/.test(val)), message: '' }
      ],
      msgCaptchaRules: [
        { validate: (val) => !!val, message: '' }
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '' }
      ],
      passwordSureRules: [
        { validate: (val) => !!val, message: '' },
      ],
      inviteCodeRules: [
        { validate: (val) => !!val, message: '' },
      ]
    }
  },
  watch: {

  },
  created() {

    // this.id = this.$route.query.id

    if (this.$route.query.userInfoJsonStr) {
      this.fxUserInfo = JSON.parse(decodeURI(this.$route.query.userInfoJsonStr));
      //    todo 手动赋值
      sessionStorage.token = this.fxUserInfo.token || ''
      this.params.inviteCode = this.fxUserInfo.inviteCode
      /*setTimeout(() => {
        this.loginByTokenToGetInfo()
      })*/
    }
    if (this.$route.query.from) {
      this.from = this.$route.query.from
      fromReactNativeLocal.set(this.from)
      console.log('RN来源', fromReactNativeLocal.get())
      console.log('RN来源', this.from)
    }
    /*if (this.$route.query.fxUserId) {
      this.fxUserId = this.$route.query.fxUserId
    }*/

  },
  mounted() {
    // let that = this;

  },
  methods: {
    getAuthCode(){
      this.getAuthCodeBtnDisabled = true
      let timer = null
      if(timer){
        clearInterval(timer)
      }
      let that = this;
      this.authCodeBtnText = '已发送'+this.timeCount+'s'
      // this.timeCount = 59
      timer = setInterval(function (){
        if(that.timeCount == 1){
          clearInterval(timer)
          that.getAuthCodeBtnDisabled = false
          that.authCodeBtnText = '获取验证码'
          that.timeCount = 60
          // console.log('that.timeCount1==================',that.timeCount)
        }else {
          that.timeCount--
          that.authCodeBtnText = '已发送'+that.timeCount+'s'
          console.log('that.timeCount2==================',that.timeCount)
        }

      },1000)
      registerApi.getAuthCode(this.params.mobile)
    },
    simpleTreeBack(){
      this.openSimpleTree = false;
    },
    showLocationModule(){
      this.openSimpleTree = true;
    },



    /**
     * 提交审核
     */
    submitView(status) {

      let msg = ''
     if (!this.params.realName) {
        msg = '请填写姓名(与身份证一致)'
      } else if (!this.params.mobile) {
        msg = '请填写手机号'
      } else if (!(/^1\d{10}$/.test(this.params.mobile))) {
        msg = '请填写正确手机号'
      } else if (!this.params.msgCaptcha) {
        msg = '请填写验证码'
      } else if (!this.params.password) {
        msg = '请填写密码'
      } else if (!this.params.passwordSure) {
       msg = '请填写确认密码'
     } else if (this.params.password !== this.params.passwordSure) {
        msg = '两次密码不一致'
      } else if (!this.params.inviteCode) {
       msg = '请填写邀请码'
     }
      if (msg) {
        this.$toast.message(msg)
      } else {
          this.registerSubmit()
      }
    },
    //提交
    registerSubmit(){

      /*let params = {
        "inviteCode": "A7A7A7A",
        "inviterId": "1186094988932800513",
        "mobile": "14122345678",
        "msgCaptcha": "A7A7A7A",
        "password": "string",
        "serviceId": "1186094988932800555"
      }*/
      let params = Object.assign({}, this.params)
      //    todo 手动赋值
      params.inviterId = this.fxUserInfo.id || '1186094988932800513';
      params.serviceId = this.fxUserInfo.serviceId || '1186094988932800555';
      registerApi.register(params).then(
        res=>{
          this.$toast.message('注册成功')
        }
      );
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
<style scoped>

</style>
