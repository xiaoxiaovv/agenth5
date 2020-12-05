<template>
  <div class="vm-bg-white">
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
          <!-- <mu-form-item label="" prop="payProrata" :rules="payProrataRules">
            <mu-text-field v-model.trim="params.payProrata" type="number" autocomplete="off" icon="*" action-icon="%" underline-color="#F0F0F0"  prefix="手续费率" placeholder="请选择输入手续费率"></mu-text-field>
          </mu-form-item> -->
        </div>
        <mu-form-item class="submit-btn">
          <mu-button color="primary"
                     @click="submitView(1)">确定</mu-button>
        </mu-form-item>
      </mu-form>
      <!--
      <div class="vm-btn agent-detail-btn">
        <mu-button color="primary" @click="submitView(1)">确定</mu-button>
      </div>
      -->
    </div>
  </div>
</template>

<script>
import { agentOrClient, loginApi } from '@/api'
import * as types from '@/router/types'
import { afterLoginInfoLocal, fromReactNativeLocal } from '@/storage'
import VmaCascaderTree from '@/components/common/vmaCascaderTree'
import typeJson from '@/assets/merchant/merchantType.json'

export default {
  components: { VmaCascaderTree },
  data() {
    return {
      isEdit: false,
      id: '',
      from: '', // 上级父级来源
      fxUserId: '', // 上级用户id
      detail: {},
      params: {
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
    this.id = this.$route.query.id
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
  },
  methods: {
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
          status: res.obj.email
        }
        this.params = Object.assign({}, this.params, params)
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
      }
    },
    /**
     * 提交修改
     * */
    submitInfo(params) {
      let that = this
      agentOrClient.editClienDetail(params).then(res => {
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
<style scoped>
</style>
