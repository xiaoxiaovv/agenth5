<template>
  <div class="frame-container page-client-type">
    <div class="page-client-header">
      <div class="agencyOrClient-header between-flex">
        <img class="header-search"
             src="@/assets/images/icons/icon_search.png"
             alt="" style="opacity: 0">
        <span>商户</span>
        <span class="header-new" @click="addAgencyClick">新增</span>
      </div>
    </div>
    <VmaTabs :active='active'
             :tabList='tabList'
             @change="changeAgentTab"
             class="va-fixed-sub vm-tab-mu"></VmaTabs>
    <mu-container ref="container"
                  class="demo-loadmore-content">
      <mu-load-more ref="container"
                    @refresh="refresh"
                    @load="load"
                    :refreshing="refreshing"
                    :loading="loading"
                    :loaded-all="loadedAll"
                    class="va-loadmore-margin">
        <ClientList :list="clientList"></ClientList>
        <VmaNoData v-if="!clientList.length"></VmaNoData>
        <div class="vm-height-49px"></div>
      </mu-load-more>
    </mu-container>
  </div>
</template>

<script>
import ClientList from './components/clientList'
import { agentOrClient } from '@/api'
import * as types from '@/router/types'
import { afterLoginInfoLocal } from '@/storage'
import VmaTabs from '@/components/common/vmaTabs'
import VmaNoData from '@/components/common/vmaNoData'
export default {
  components: { ClientList, VmaTabs, VmaNoData },
  data() {
    return {
      active: '',
      tabList: [
        { name: '全部', value: '' },
        { name: '已签约', value: 1 },
        { name: '未签约', value: 2 }
      ],
      refreshing: false,
      loading: false,
      loadedAll: false,
      // 商户
      clientParams: {
        pageNumber: 1,
        pageSize: 20,
        companyId: afterLoginInfoLocal.getJSON().companyId
        // userType: afterLoginInfoLocal.getJSON().userType,
        // channel: 1
      },
      clientTotal: 0,
      clientList: []
    }
  },
  created() {
    this.getClientList()
  },
  methods: {
    /**
     * 获取商户列表
     */
    getClientList() {
      agentOrClient.getClientListNew(this.clientParams).then(res => {
        this.clientTotal = res.obj.totalElements
        this.clientList = this.clientList.concat(res.obj.content)
        if (this.clientList.length < this.clientTotal) {
          this.loadedAll = false
        } else {
          this.loadedAll = true
        }
        // 分页组件
        this.refreshingStatus(false)
        this.loadingStatus(false)
      })
    },
    /**
     * 刷新处理
     */
    refreshingStatus(val) {
      this.refreshing = val
    },
    /**
     * 刷新处理--加载
     */
    loadingStatus(val) {
      this.loading = val
    },
    refresh() {
      this.$refs.container.scrollTop = 0
      this.loadedAll = false
      this.clientParams.pageNumber = 1
      this.clientList = []
      this.clientTotal = 0
      this.getClientList()
      this.refreshingStatus(true)
      this.$refs.container.scrollTop = 0
    },
    load() {
      this.clientParams.pageNumber += 1
      this.getClientList()
    },
    changeAgentTab(val) {
      this.clientParams.status = val
      this.refresh()
    },
    /**
     * 新增商户
     */
    addAgencyClick() {
      this.$router.push({ name: types.CLIENT_EDIT })
    }
  }
}
</script>
