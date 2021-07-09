<template>
  <div class="vm-bg-white">
    <div class="vm-page-header">
      <div class="vm-page-header-container">
        <div class="vm-head">
          <div class="vm-head-icon"><span class="icon iconfont  iconreturn" @click="goback"></span></div>
          <div class="vm-head-title vm-ell">
            <template v-if="id">{{detail.name}}</template>
            <template v-else>新增代理</template>
          </div>
          <div class="vm-head-btn"><span style="display: none">编辑</span></div>
        </div>
      </div>
    </div>
    <div class="vm-height-10px vm-bg-gray"></div>
    <div class="vm-form-mu ">
      <mu-form ref="form" :model="params">
        <div class="vm-bg-white">
          <mu-form-item label="" prop="name">
            <mu-text-field v-model.trim="params.name" autocomplete="off" icon="*" underline-color="#F0F0F0"  prefix="公司/个人" placeholder="请输入公司/个人"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="" prop="contact">
            <mu-text-field v-model.trim="params.contact" autocomplete="off"  icon="*" underline-color="#F0F0F0" prefix="联系人" placeholder="请输入联系人"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="" prop="phone" v-if="!$route.query.id">
            <mu-text-field v-model.trim="params.phone" autocomplete="off"  icon="*" underline-color="#F0F0F0" prefix="手机" placeholder="请输入手机号"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="" prop="password" v-if="!$route.query.id">
            <mu-text-field v-model.trim="params.password" type="password" autocomplete="off"  icon="" underline-color="#F0F0F0" prefix="密码" placeholder="请输入密码"></mu-text-field>
            <mu-text-field v-model.trim="params.password" type="password" autocomplete="new-password"  icon="*" underline-color="#F0F0F0" prefix="密码" placeholder="请输入密码" style="display: none;"></mu-text-field>
          </mu-form-item>
          <!--
          <mu-form-item label="" prop="cooperationLev">
            <VmaCascaderTree v-model="cooperationLevArr" :dataTree="cooperationLevTree" :label="'合作级别'" :placeholder="'请选择合作级别'" :modalLabel="'选择合作级别'" :required="true" @change="changeCity"></VmaCascaderTree>
            <mu-text-field v-model="params.cooperationLev" style="display: none"></mu-text-field>
          </mu-form-item>
          -->
          <mu-form-item label="" prop="province">
            <VmaCascaderTree v-model="cascaderArr" :dataTree="cascaderTree" :label="'省市'" :placeholder="'请选择省市'" :modalLabel="'选择省市'" :required="true" @change="changeCity"></VmaCascaderTree>
            <mu-text-field v-model="params.province" style="display: none"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="" prop="address">
            <mu-text-field v-model.trim="params.address" autocomplete="off" icon="*" underline-color="#F0F0F0"  prefix="联系地址" placeholder="请填写联系地址"></mu-text-field>
          </mu-form-item>
          <!--
          <mu-form-item label="" prop="payProrata">
            <mu-text-field v-model.trim="params.payProrata" type="number" autocomplete="off" icon="*" action-icon="%" underline-color="#F0F0F0"  prefix="抽佣比例" placeholder="请选择输入抽佣比例"></mu-text-field>
          </mu-form-item>
          -->
        </div>
        <mu-form-item class="submit-btn">
          <mu-button color="primary" @click="submitView(1)">确定</mu-button>
          <div class=" vm-margin-top-20px btn-sec">
            <mu-button color="primary" @click="submitView(2)"  v-if="!$route.query.id">确定并提交审核</mu-button>
          </div>
        </mu-form-item>
      </mu-form>
    </div>
  </div>
</template>

<script>
import { agentOrClient } from '@/api'
// import * as types from '@/router/types'
import { afterLoginInfoLocal } from '@/storage'
import VmaCascaderTree from '@/components/common/vmaCascaderTree'
import {passwordValid} from '@/utils/src/validator'
export default {
  components: { VmaCascaderTree },
  data() {
    return {
      id: '',
      detail: {},
      params: {
        companyId: afterLoginInfoLocal.getJSON().companyId
      },
      nameRules: [
        {validate: (val) => !!val, message: ''}
      ],
      contactRules: [
        {validate: (val) => !!val, message: ''}
      ],
      phoneRules: [
        {validate: (val) => !!val, message: ''},
        {validate: (val) => !!(/^1\d{10}$/.test(val)), message: ''}
      ],
      addressRules: [
        {validate: (val) => !!val, message: ''},
        {validate: (val) => val.length >= 0 && val.length <= 50, message: ''}
      ],
      provinceRules: [
        {validate: (val) => !!val, message: ''}
      ],
      cityRules: [
        {validate: (val) => !!val, message: ''}
      ],
      cascaderArr: [],
      cascaderArrObj: [],
      cascaderTree: [],
      tabType: '',
      addName: '' // 新增的类型
    }
  },
  watch: {
    cascaderArr (val, oldVal) {
      val = val || []
      this.params.province = val[0] || ''
      this.params.city = val[1] || ''
    }
  },
  created() {
    this.tabType = parseInt(this.$route.query.tabType)
    this.id = this.$route.query.id
    if (!this.$route.query.id) {
      document.title = '新增代理'
      this.addName = this.$route.query.name
    } else {
      document.title = '编辑代理'
      this.getDetail()
    }
    this.getProviceAndCity()
  },
  mounted() {
  },
  methods: {
    /**
     * 获取详情
     */
    async getDetail() {
      let params = {
        id: this.$route.query.id
      }
      let api = ''
      switch (this.tabType) {
        case 1:
          api = agentOrClient.getAgentOperaDetail(params)
          break
        case 2:
          api = agentOrClient.getAgentDistributeDetail(params)
          break
        case 3:
          api = agentOrClient.getAgentThirdAgentDetail(params)
          break
      }
      api.then(res => {
        this.detail = res.obj
        let params = {
          name: res.obj.name,
          contact: res.obj.contact,
          phone: res.obj.phone,
          address: res.obj.address,
          province: res.obj.province,
          city: res.obj.city,
          id: this.$route.query.id
        }
        this.params = Object.assign({}, this.params, params)
        this.cascaderArr = [res.obj.province, res.obj.city]
      })
    },
    /**
     * 获取省市区
     */
    async getProviceAndCity() {
      let that = this
      await agentOrClient.getProvice({level: 2}).then(res => {
        that.cascaderTree = this.sortArr(res.obj)
        if (this.$route.query.id) {
          this.getDetail()
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
    /**
     * 提交审核
     */
    submitView(status) {
      let msg = ''
      if (!this.params.name) {
        msg = '公司/个人不能为空'
      } else if (!this.params.contact) {
        msg = '请填写联系人'
      } else if (!this.params.phone) {
        msg = '请填结算类型'
      } else if (!this.params.kdbAccountType) {
        msg = '请填写手机号'
      } else if (!(/^1\d{10}$/.test(this.params.phone))) {
        msg = '请填写正确手机号'
      } else if (!this.params.province) {
        msg = '请选择省市'
      } else if (!this.params.address) {
        msg = '请填写地址'
      } else if (this.params.password && !this.id) {
        let isValid = passwordValid.valid(this.params.password)
        if (!isValid) {
          msg = passwordValid.msg
        }
      }
      if (msg) {
        this.$toast.message(msg)
      } else {
        let params = Object.assign({}, this.params)
        if (this.$route.query.id) {
          this.submitInfo(params)
        } else {
          params.status = status
          this.addInfo(params)
        }
      }
    },
    /**
     * 提交审核
     * */
    submitInfo(params) {
      let that = this
      let getApi = ''
      if (this.tabType === 1) {
        getApi = agentOrClient.editAgentViewOpera(params)
      } else if (this.tabType === 2) {
        getApi = agentOrClient.editAgentViewDistribute(params)
      } else if (this.tabType === 3) {
        getApi = agentOrClient.editAgentViewThirdAgent(params)
      }
      getApi.then(res => {
        this.$toast.message(res.msg)
        setTimeout(() => {
          that.goback()
        }, 1000)
      })
    },
    /**
     * 新增代理
     * */
    addInfo(params) {
      let that = this
      let getApi = ''
      if (this.addName === '一级代理') {
        getApi = agentOrClient.addAgentViewOne(params)
      } else if (this.addName === '二级代理') {
        getApi = agentOrClient.addAgentViewTwo(params)
      } else if (this.addName === '三级代理') {
        getApi = agentOrClient.addAgentViewThree(params)
      }
      if (!getApi) return
      getApi.then(res => {
        this.$toast.message(res.msg)
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
<style scoped>
</style>
