<template>
  <div>
    <div class="vm-page-header">
      <div class="vm-page-header-container">
        <div class="vm-head">
          <div class="vm-head-icon"><span class="icon iconfont  iconreturn" @click="goback"></span></div>
          <div class="vm-head-title vm-ell">{{detail.name}}</div>
          <div class="vm-head-btn" @click="editDetail">编辑</div>
        </div>
      </div>
    </div>
    <div class="vm-height-10px vm-bg-gray"></div>
    <div class="vm-list-ul vm-bg-white vmalis-fontweight-400">
      <div class="vm-list-li">
        <div class="vma-list-li-left">上级代理</div>
        <div class="vma-list-li-right vm-ell">{{detail.companyName}}</div>
      </div>
      <div class="vm-list-li">
        <div class="vma-list-li-left">联系人</div>
        <div class="vma-list-li-right vm-ell">{{detail.contact}}</div>
      </div>
      <div class="vm-list-li">
        <div class="vma-list-li-left">到期时间</div>
        <div class="vma-list-li-right vm-ell">{{detail.endCooperaTime}}</div>
      </div>
      <div class="vm-list-li">
        <div class="vma-list-li-left">归属业务员</div>
        <div class="vma-list-li-right vm-ell">{{detail.managerName}}</div>
      </div>
      <div class="vm-list-li">
        <div class="vma-list-li-left">手机号</div>
        <div class="vma-list-li-right vm-ell">{{detail.phone}}</div>
      </div>
      <div class="vm-list-li">
        <div class="vma-list-li-left">创建时间</div>
        <div class="vma-list-li-right vm-ell">{{detail.createTime}}</div>
      </div>
      <div class="vm-list-li">
        <div class="vma-list-li-left">经营类别</div>
        <div class="vma-list-li-right vm-ell">{{detail.businessLevOne}}→{{detail.businessLevTwo}}→{{detail.businessLevThree}}</div>
      </div>
      <div class="vm-list-li">
        <div class="vma-list-li-left">联系地址</div>
        <div class="vma-list-li-right vm-ell">{{detail.provinceName}}→{{detail.cityName}}→{{detail.address}}</div>
      </div>
      <div class="vm-list-li">
        <div class="vma-list-li-left">定位开关</div>
        <div class="vma-list-li-right vm-ell">{{detail.isOpen}}</div>
      </div>
    </div>
    <div class="vm-btn agent-detail-btn">
      <mu-button color="primary" @click="submitView">重置密码</mu-button>
    </div>
  </div>
</template>

<script>
import { agentOrClient } from '@/api'
import * as types from '@/router/types'
import { afterLoginInfoLocal } from '@/storage'
export default {
  data() {
    return {
      detail: {},
      levelAlias: {
        firstName: afterLoginInfoLocal.getJSON().levelAlias.firstName
      }
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    /**
     * 获取详情
     */
    getDetail() {
      let params = {
        merchantId: this.$route.query.id
      }
      agentOrClient.getClienDetail(params).then(res => {
        this.detail = res.obj
        if(this.detail.isOpen === 1){
          this.detail.isOpen = '已开启'
        }else if(this.detail.isOpen === -1){
          this.detail.isOpen = '已关闭'
        }else{
          this.detail.isOpen = '未知状态'
        }
      })
    },
    /**
     * 提交审核
     */
    submitView() {
      this.$confirm('确定重置密码?', '重置密码').then(res => {
        if (res.result) {
          let params = {
            username: this.detail.phone
          }
          agentOrClient.resetPswClienDetail(params).then(res => {
            this.$toast.message(res.msg)
            // this.getDetail()
          })
        }
      })
    },
    goback() {
      this.$router.back(-1)
    },
    editDetail() {
      this.$router.push({ name: types.CLIENT_EDIT, query: {id: this.$route.query.id} })
    }
  }
}
</script>
<style scoped>
</style>
