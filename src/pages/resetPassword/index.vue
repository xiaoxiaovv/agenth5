<template>
  <div class="page-resetpsw">
    <div class="vm-page-header">
      <div class="vm-page-header-container">
        <div class="vm-head">
          <div class="vm-head-icon"><span class="icon iconfont iconreturn" @click="goback"></span></div>
          <div class="vm-head-title vm-ell">
            修改密码
          </div>
          <div class="vm-head-btn"><span style="display: none">编辑</span></div>
        </div>
      </div>
    </div>
    <div class="vm-height-10px vm-bg-gray"></div>
    <div class="vm-form-mu">
      <mu-form ref="form" :model="params">
        <div class="vm-bg-white">
          <mu-form-item label="" prop="password" :rules="oldPswRules">
            <mu-text-field type="Password" v-model="params.password" autocomplete="off" icon="*" underline-color="#F0F0F0"  prefix="原密码" placeholder="请输入原密码"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="" prop="newPassword" :rules="newPswRules">
            <mu-text-field type="Password" v-model="params.newPassword" autocomplete="off"  icon="*" underline-color="#F0F0F0" prefix="新密码" placeholder="请输入新密码"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="" prop="reNewPsw" :rules="reNewPswRules">
            <mu-text-field type="Password" v-model="params.reNewPsw" autocomplete="off" icon="*" underline-color="#F0F0F0"  prefix="确认新原密码" placeholder="请再次输入新密码"></mu-text-field>
          </mu-form-item>
        </div>
        <mu-form-item class="submit-btn">
          <mu-button color="primary" @click="submitNewPsw" v-if="btnTrue">提交</mu-button>
          <mu-button color="primary" v-if="!btnTrue">提交</mu-button>
        </mu-form-item>
      </mu-form>
    </div>
  </div>
</template>

<script>
import { loginApi } from '@/api'
import * as types from '@/router/types'
import { loginInfoLocal, afterLoginInfoLocal } from '@/storage'
export default {
  data() {
    return {
      oldPswRules: [
        {validate: (val) => !!val, message: ''}
      ],
      newPswRules: [
        {validate: (val) => !!val, message: ''},
        {validate: (val) => val.length >= 6 && val.length <= 20, message: ''}
      ],
      reNewPswRules: [
        {validate: (val) => !!val, message: ''},
        {validate: (val) => val.length >= 6 && val.length <= 20, message: ''}
      ],
      params: {
        password: '',
        newPassword: '',
        reNewPsw: ''
      },
      btnTrue: true
    }
  },
  created() {
  },
  methods: {
    submitNewPsw() {
      this.$refs.form.validate().then((result) => {
        if (result) {
          this.checkPsw()
        } else {
          let msg = ''
          if (!this.params.password) {
            msg = '请输入重复密码'
          } else if (!this.params.newPassword) {
            msg = '请输入新密码'
          } else if (!this.params.reNewPsw) {
            msg = '请输入原密码'
          } else if (this.params.newPassword.length < 6 || this.params.newPsw > 20) {
            msg = '新密码长度为6~20位'
          }
          this.$toast.message(msg)
        }
      })
    },
    checkPsw() {
      let loginInfo = loginInfoLocal.getJSON().password
      if (this.params.newPassword !== this.params.reNewPsw) {
        this.$toast.message('两次密码不一致，请重新输入')
        return
      }
      if (loginInfo !== this.params.password) {
        this.$toast.message('原密码不正确，请重新输入')
        return
      }
      let params = {
        password: this.params.password,
        newPassword: this.params.newPassword
      }
      this.btnTrue = false
      loginApi.resetPsw(params).then(res => {
        this.$toast.success('修改成功，请使用新密码登录')
        afterLoginInfoLocal.remove()
        loginInfoLocal.remove()
        sessionStorage.clear()
        setTimeout((loading) => {
          this.$router.push({name: types.LOGIN})
        }, 600)
      }).catch(() => {
        this.btnTrue = true
      })
    },
    /**
     * 返回上一页
     */
    goback() {
      this.$router.back(-1)
    }
  }
}
</script>
<style scoped>
</style>
