<template>
  <div class="vm-bg-white">
    <div class="login-body">
      <div class="login-pic">
        <img src="@/assets/images/login/login_pic.png"/>
      </div>
      <!--<div class="vm-font-48">登录</div>-->
      <mu-form ref="form" :model="params" class="mu-demo-form">
        <mu-form-item label="账号" prop="username" :rules="usernameRules">
          <div class="login-icons icon iconfont iconlogin1" style="z-index: 2;"></div>
          <mu-text-field v-model="params.username" prop="username" icon="" autocomplete="off"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" prop="password" :rules="passwordRules">
          <div class="login-icons icon iconfont iconlogin" style="z-index: 2;"></div>
          <mu-text-field type="password" v-model="params.password" prop="username" icon="" autocomplete="off"></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" @click="login">登录</mu-button>
          <div style="text-align: right;width: 100%;margin-top: 10px;padding-right: 10px"><span @click="toRegister">注册</span></div>
        </mu-form-item>
      </mu-form>
    </div>
  </div>
</template>

<script>
import { loginApi } from '@/api'
import { loginInfoLocal, afterLoginInfoLocal } from '@/storage'
import * as types from '@/router/types'

export default {
  data() {
    return {
      usernameRules: [
        {validate: (val) => !!val, message: '请输入账号'}
      ],
      passwordRules: [
        {validate: (val) => !!val, message: '请输入密码'}
      ],
      params: {
        username: '',
        password: ''
      }
    }
  },
  created() {
    let loginInfo = loginInfoLocal.getJSON()
    if (loginInfo.username) {
      this.turnToLogin(loginInfo)
    }
  },
  methods: {
    toRegister() {
      this.$router.push({name: types.REGISTER})
    },
    login() {
      this.$refs.form.validate().then((result) => {
        if (result) {
          let params = Object.assign({}, this.params)
          this.turnToLogin(params)
        }
      })
    },
    turnToLogin(params) {
      loginApi.login(params).then(res => {
        if (res.obj.userType === 1 || res.obj.userType === 2 || res.obj.userType === 3 || res.obj.userType === 4) {
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
        }
      })
    }
  }
}
</script>
