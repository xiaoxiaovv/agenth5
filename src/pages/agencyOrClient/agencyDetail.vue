<template>
  <div>
    <div class="vm-page-header">
      <div class="vm-page-header-container">
        <div class="vm-head">
          <div class="vm-head-icon"><span class="icon iconfont  iconreturn" @click="goback"></span></div>
          <div class="vm-head-title vm-ell">{{detail.name}}</div>
          <div class="vm-head-btn" @click="editDetail" v-if="(detail.status===1 || detail.status===3 || detail.status===6)&& (isDirect === 1)">编辑</div>
        </div>
      </div>
    </div>
    <div class="vm-height-10px vm-bg-gray"></div>
    <div class="vm-list-ul vm-bg-white vmalis-fontweight-400">
      <div class="vm-list-li">
        <div class="vma-list-li-left">联系人</div>
        <div class="vma-list-li-right vm-ell">{{detail.contact}}</div>
      </div>
      <div class="vm-list-li" v-if="userType && userType==1">
        <div class="vma-list-li-left">联系电话</div>
        <div class="vma-list-li-right vm-ell">{{detail.phone}}</div>
      </div>
      <div class="vm-list-li">
        <div class="vma-list-li-left">到期时间</div>
        <div class="vma-list-li-right vm-ell">{{detail.endCooperaTime}}</div>
      </div>
      <div class="vm-list-li">
        <div class="vma-list-li-left">公司</div>
        <div class="vma-list-li-right vm-ell">{{detail.name}}</div>
      </div>
      <div class="vm-list-li">
        <div class="vma-list-li-left">归属业务员</div>
        <div class="vma-list-li-right vm-ell">{{detail.saleName}}</div>
      </div>
      <div class="vm-list-li">
        <div class="vma-list-li-left">加盟时间</div>
        <div class="vma-list-li-right vm-ell">{{detail.createTime}}</div>
      </div>
      <div class="vm-list-li">
        <div class="vma-list-li-left">状态</div>
        <div class="vma-list-li-right vm-ell">
          <template v-if='detail.status==1'>未签约</template>
          <template v-else-if="detail.status===2">待审核</template>
          <template v-else-if="detail.status===3">已签约</template>
          <template v-else-if="detail.status===4">过期</template>
          <template v-else-if="detail.status===5">禁用</template>
          <template v-else-if="detail.status===6">驳回</template>
        </div>
      </div>
      <!-- <div class="vm-list-li">
        <div class="vma-list-li-left">合作级别</div>
        <div class="vma-list-li-right vm-ell">
          <template v-if="detail.cooperationLev===1">顶级一级代理</template>
          <template v-else-if="detail.cooperationLev===2">普通一级代理</template>
        </div>
      </div> -->
      <div class="vm-list-li">
        <div class="vma-list-li-left">联系地址</div>
        <div class="vma-list-li-right vm-ell">{{detail.provinceName}}→{{detail.cityName}}→{{detail.address}}</div>
      </div>
    </div>
    <div class="vm-btn agent-detail-btn" v-if="detail.status === 1 || detail.status === 6">
      <mu-button color="primary" @click="submitView">提交审核</mu-button>
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
      userType: afterLoginInfoLocal.getJSON().userType,
      detail: {},
      isDirect: 0,
      tabType: null
    }
  },
  created() {
    this.isDirect = parseInt(this.$route.query.isDirect)
    this.tabType = parseInt(this.$route.query.tabType)
    this.getDetail()
  },
  methods: {
    /**
     * 获取详情
     */
    getDetail() {
      let params = {
        id: this.$route.query.id
      }
      switch (this.tabType) {
        case 1:
          agentOrClient.getAgentOperaDetail(params).then(res => {
            this.detail = res.obj
          })
          break
        case 2:
          agentOrClient.getAgentDistributeDetail(params).then(res => {
            this.detail = res.obj
          })
          break
        case 3:
          agentOrClient.getAgentThirdAgentDetail(params).then(res => {
            this.detail = res.obj
          })
          break
      }
    },
    /**
     * 提交审核
     */
    submitView() {
      this.$confirm('确定提交审核?', '提交审核').then(res => {
        if (res.result) {
          this.submitViewChange()
        }
      })
    },
    submitViewChange() {
      let params = {
        id: this.$route.query.id,
        status: 2
      }
      let api = ''
      if (this.tabType === 1) {
        api = agentOrClient.submitAgentViewOpera(params)
      } else if (this.tabType === 2) {
        api = agentOrClient.submitAgentViewDistribute(params)
      } else if (this.tabType === 3) {
        api = agentOrClient.submitAgentViewThirdAgent(params)
      }
      api.then(res => {
        this.$toast.message(res.msg)
        this.getDetail()
      })
    },
    goback() {
      this.$router.back(-1)
    },
    editDetail() {
      this.$router.push({ name: types.AGENCY_EDIT, query: {id: this.$route.query.id, tabType: this.tabType} })
    }
  }
}
</script>
<style scoped>
</style>
