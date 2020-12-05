<template>
  <div class="vm-bg-white">
    <div class="login-body">
      <div class="login-pic">
        <img src="@/assets/images/login/login_pic.png"/>
      </div>
      <!--<div class="vm-font-48">登录</div>-->
      <mu-form ref="form" :model="params" class="mu-demo-form">
        <mu-form-item label="手机号" prop="phone" :rules="usernameRules">
          <div class="login-icons icon iconfont iconlogin1" style="z-index: 2;"></div>
          <mu-text-field v-model="params.phone" prop="phone" icon="" autocomplete="off"></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" @click="register">注册</mu-button>
          <mu-button color="primary" @click="back">返回</mu-button>
        </mu-form-item>
      </mu-form>
    </div>
  </div>
</template>

<script>
import { registerApi } from '@/api'
import { loginInfoLocal, afterLoginInfoLocal } from '@/storage'
import * as types from '@/router/types'
import Toast from "muse-ui-toast";
import MessageBox from "muse-ui-message";


export default {
  data() {
    return {
      usernameRules: [
        {validate: (val) => !!val, message: '请输入手机号'}
      ],
      params: {
        phone: ''
      }
    }
  },
  created() {
    /*let loginInfo = loginInfoLocal.getJSON()
    if (loginInfo.phone) {
      this.turnToLogin(loginInfo)
    }*/
  },
  methods: {
    back() {
      this.$router.back(-1)
    },
    register() {
      this.$refs.form.validate().then((result) => {
        if (result) {
          let params = Object.assign({}, this.params)
          this.turnToRegister(params)
        }
      })
    },
    turnToRegister(params) {
      registerApi.register(params).then(res => {
        MessageBox.alert('注册中……服务专员将会在24小时内联系您')
       /* if (res.obj.userType === 1 || res.obj.userType === 2 || res.obj.userType === 3 || res.obj.userType === 4) {
          loginInfoLocal.setJSON(params) // 存储账号和密码
          let levelAlias = Object.assign({}, res.obj.levelAlias)
          if (levelAlias.status) {
            levelAlias.oemName = levelAlias.oemName || '服务商'
            levelAlias.firstName = levelAlias.firstName || '一级代理商'
            levelAlias.secondName = levelAlias.secondName || '二级代理商'
            levelAlias.thirdName = levelAlias.thirdName || '三级代理商'
          } else {
            levelAlias.oemName = '服务商'
            levelAlias.firstName = '一级代理商'
            levelAlias.secondName = '二级代理商'
            levelAlias.thirdName = '三级代理商'
          }
          res.obj.levelAlias = levelAlias
          afterLoginInfoLocal.setJSON(res.obj) // 存储登录后信息
          sessionStorage.token = res.obj.token // 存储token
          this.$router.push({name: types.HOME})
        } else {
          this.$toast.error('该代理商用户不存在')
        }*/
      })
    }
  }
}
</script>
