<template>
  <div class="frame-container page-flex">
    <div class="page-head">
      <div class="vm-page-head-fixed vm-height-90px">
        <div class="vm-page-head--body vm-height-90px">
          <!--<div class="client-agency-btn-box">
            <span :class="agencyAddBtnDisable===1?'agency-add-btn-disable':''" class="agency-add-btn addBtns"
                  @click="addAgencyClick">新增代理</span>
            <span class="client-add-btn addBtns"
                  @click="addClientClick">新增商户</span>
          </div>-->
          <div class="vm-page-head--body-title pt-2 agency-mb--10">
            <div>
              <span class="icon iconfont iconsearch" style="opacity: 0; display:none;"></span>
            </div>

            <div class="vm-tabs">
              <div>
                <div class="vm-tab-btns">
                  <div class="vm-tab-btn" v-for="(item,i) in btnList" :key="`btnList_${i}`" :class="active===item.name?'active': ''" @click="btnTabClick(item)">{{item.aliasName || item.name}}</div>
                </div>
              </div>
            </div>
           <!-- <span class="agency-add-btn"
                  @click="addAgencyClick">{{ addBtnName }}</span>-->
          </div>
          <div class="client-agency-btn-box">
            <span :class="agencyAddBtnDisable===1?'agency-add-btn-disable':''" class="agency-add-btn addBtns"
                  @click="addAgencyClick">新增代理</span>
            <span class="client-add-btn addBtns"
                  @click="addClientClick">新增商户</span>
          </div>

          <VmaTabs :active='active'
                   :tabList='tabList'
                   @change="changeAgentTab"></VmaTabs>
        </div>
      </div>
    </div>
    <div class="page-body">
      <mu-container ref="container"
                    class="demo-loadmore-content">
        <mu-load-more ref="container"
                      @refresh="refresh"
                      @load="load"
                      :refreshing="refreshing"
                      :loading="loading"
                      :loaded-all="loadedAll">
          <AgencyList v-if="active==='一级代理'||active==='二级代理'||active==='三级代理'"
                      :list="agetList" :tabType="tabType"></AgencyList>
          <ClientList v-if="active==='商户'"
                      :list="clientList"></ClientList>
          <VmaNoData v-if="(active==='一级代理'||active==='二级代理' || active==='三级代理') && !agetList.length"></VmaNoData>
          <VmaNoData v-else-if="active==='商户' && !clientList.length"></VmaNoData>
          <div class="vm-height-49px" style="margin-top: 10px;"></div>
        </mu-load-more>
      </mu-container>
    </div>
    <!--<div class="page-foot">foot</div>-->
  </div>

</template>

<script>
import { agentOrClient } from '@/api'
import * as types from '@/router/types'
import VmaTabs from '@/components/common/vmaTabs'
import VmaNoData from '@/components/common/vmaNoData'
import AgencyList from './components/agencyList'
import ClientList from './components/clientList'
import { afterLoginInfoLocal } from '@/storage'

export default {
  // mixins: [isShowFooterMixin],
  components: { AgencyList, ClientList, VmaTabs, VmaNoData },
  data() {
    return {
      // addBtnName:'新增代理',
      agencyAddBtnDisable: 1,
      active: '一级代理',
      tabList: [
        { name: '全部', value: '' },
        { name: '未签约', value: 1 },
        { name: '待审核', value: 2 },
        { name: '已签约', value: 3 },
        // { name: '驳回', value: 6 },
        { name: '禁用', value: 5 },
        { name: '过期', value: 4 }
        // { name: '未启用', value: 1 },

      ],
      agentTabList: [
        { name: '全部', value: '' },
        { name: '未签约', value: 1 },
        { name: '待审核', value: 2 },
        { name: '已签约', value: 3 },
        { name: '驳回', value: 6 },
        { name: '禁用', value: 5 },
        { name: '过期', value: 4 }
      ],
      clientTabList: [
        { name: '全部', value: '' },
        { name: '已签约', value: 1 },
        { name: '未签约', value: 2 }
      ],
      btnList: [
        { name: '代理', color: 'primary', textColor: 'white' },
        { name: '商户', color: 'white', textColor: 'primary' }
      ],
      refreshing: false,
      loading: false,
      loadedAll: false,
      // 代理商
      agentParams: {
        pageNumber: 1,
        pageSize: 10,
        status: ''
      },
      agentTotal: 0,
      agetList: [],
      // 商户
      clientParams: {
        pageNumber: 1,
        pageSize: 20,
        companyId: afterLoginInfoLocal.getJSON().companyId,
        userType: afterLoginInfoLocal.getJSON().userType
      },
      clientTotal: 0,
      clientList: [],
      levelAlias: {
        oemName: '',
        firstName: '',
        secondName: '',
        thirdName: ''
      }
    }
  },
  computed: {
    tabType() {
      let type
      switch (this.active) {
        case '一级代理':
          type = 1
          break
        case '二级代理':
          type = 2
          break
        case '三级代理':
          type = 3
          break
      }
      return type
    }
  },
  watch: {
    active(val) {
      if (val === '一级代理' || val === '商户') {
        this.tabList = this.tabList.filter(res => res.name !== '驳回')
      } else {
        let flag = this.tabList.every(res => res.name !== '驳回')
        if (flag) {
          let obj = { name: '驳回', value: 6 }
          this.tabList.splice(4, 0, obj)
        }
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    // console.log('beforrouterenter======================================')
    next(vm => {
      // vm.$route.meta.keepAlive
      vm.clientParams = {
        pageNumber: 1,
        pageSize: 20,
        companyId: afterLoginInfoLocal.getJSON().companyId,
        userType: afterLoginInfoLocal.getJSON().userType
      }
      vm.setBtnList()
      vm.refresh()
      vm.agencyAddBtnDisable = 1
      // vm.setBtnList()
    })
  },
  created() {
    console.log('afterLoginInfoLocal.getJSON()', afterLoginInfoLocal.getJSON())
    this.levelAlias = afterLoginInfoLocal.getJSON().levelAlias
    console.log('this.levelalias======================',this.levelAlias)
    this.setBtnList()
    this.tabList = this.clientTabList
    // this.getListApi()
  },
  methods: {
    setBtnList() {
      if (this.clientParams.userType === 1) { // 服务商
        this.active = '商户'
        this.btnList = [
          { name: '一级代理', color: 'primary', textColor: 'white', aliasName: this.levelAlias.firstName },
          { name: '二级代理', color: 'white', textColor: 'primary', aliasName: this.levelAlias.secondName },
          { name: '三级代理', color: 'white', textColor: 'primary', aliasName: this.levelAlias.thirdName },
          { name: '商户', color: 'white', textColor: 'primary' }
        ]
      } else if (this.clientParams.userType === 2) { // 一级代理商
        this.active = '商户'
        this.btnList = [
          { name: '二级代理', color: 'primary', textColor: 'white', aliasName: this.levelAlias.secondName },
          { name: '三级代理', color: 'white', textColor: 'primary', aliasName: this.levelAlias.thirdName },
          { name: '商户', color: 'white', textColor: 'primary' }
        ]
      } else if (this.clientParams.userType === 3) { // 二级代理商
        this.active = '商户'
        this.btnList = [
          { name: '三级代理', color: 'primary', textColor: 'white', aliasName: this.levelAlias.thirdName },
          { name: '商户', color: 'white', textColor: 'primary' }
        ]
      } else if (this.clientParams.userType === 4) { // 三级代理商
        this.active = '商户'
        this.btnList = [
          { name: '商户', color: 'primary', textColor: 'white' }
        ]
        this.getClientList()
      }
    },
    /**
     * 获取代理商列表
     */
    getListApi() {
      var getApi = ''
      if (this.active === '一级代理') {
        getApi = agentOrClient.getOneAgentList(this.agentParams)
      } else if (this.active === '二级代理') {
        getApi = agentOrClient.getAgentList(this.agentParams)
      } else if (this.active === '三级代理') {
        getApi = agentOrClient.getTreeAgentList(this.agentParams)
      }
      if (!getApi) return
      getApi.then(res => {
        this.agentTotal = res.obj.totalElements
        this.agetList = this.agetList.concat(res.obj.content)
        if (this.agetList.length < this.agentTotal) {
          this.loadedAll = false
        } else {
          this.loadedAll = true
        }
        // 分页组件
        this.refreshingStatus(false)
        this.loadingStatus(false)
      })

      // agentOrClient.getAgentList(this.agentParams).then(res => {
      //   this.agentTotal = res.obj.totalElements
      //   this.agetList = this.agetList.concat(res.obj.content)
      //   if (this.agetList.length < this.agentTotal) {
      //     this.loadedAll = false
      //   } else {
      //     this.loadedAll = true
      //   }
      //   // 分页组件
      //   this.refreshingStatus(false)
      //   this.loadingStatus(false)
      // })
    },
    /**
     * 获取商户列表
     */
    getClientList() {
      this.refreshingStatus(false)
      let companyId = afterLoginInfoLocal.getJSON().companyId
      let params = {
        pageNumber: this.clientParams.pageNumber,
        pageSize: this.clientParams.pageSize,
        status: this.clientParams.status,
        companyId: companyId
      }
      agentOrClient.getClientListNew(params).then(res => {
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
    btnTabClick(item) {
      if (this.active === item.name) {
        return
      }

      this.btnList.forEach(o => {
        o.color = 'white'
        o.textColor = 'primary'
      })
      item.color = 'primary'
      item.textColor = 'white'
      this.active = item.name
      if (this.active.indexOf('代理') !== -1) {
        this.agentParams.status = ''
        this.tabList = this.agentTabList
        // this.addBtnName = '新增代理'
        this.agencyAddBtnDisable = 0
      } else {
        this.clientParams.status = ''
        this.tabList = this.clientTabList
        // this.addBtnName = '新增商户'
        this.agencyAddBtnDisable = 1
      }
      this.refresh()
    },
    refresh() {
      this.$refs.container.scrollTop = 0
      this.loadedAll = false
      if (this.active.indexOf('代理') !== -1) {
        this.agentParams.pageNumber = 1
        this.agetList = []
        this.agentTotal = 0
        this.getListApi()
      } else {
        this.clientParams.pageNumber = 1
        this.clientList = []
        this.clientTotal = 0
        this.getClientList()
      }
      // this.refreshingStatus(true)
      this.$refs.container.scrollTop = 0
    },
    load() {
      this.loadingStatus(true)
      if (this.active.indexOf('代理') !== -1) {
        this.agentParams.pageNumber += 1
        this.getListApi()
      } else {
        console.log('加载更多')
        this.clientParams.pageNumber += 1
        this.getClientList()
      }
    },
    changeAgentTab(val) {
      this.agentParams.status = val
      this.clientParams.status = val
      this.refresh()
    },
    /**
     * 新增代理商
     */
    addAgencyClick() {
      if (this.active.indexOf('代理') !== -1) {
        if(this.agencyAddBtnDisable===1){
          return
        }else{
          this.$router.push({ name: types.AGENCY_EDIT, query: {name: this.active} })
        }
        // this.$router.push({ name: types.AGENCY_EDIT, query: {name: this.active} })
      } /*else {
        this.$router.push({ name: types.CLIENT_EDIT })
      }*/
    },
    /**
     *新增商户按钮
     */
    addClientClick() {
        this.$router.push({ name: types.CLIENT_EDIT })
    }
  }
}
</script>

<style lang="scss">
//
.agency-mb--10{
  margin-bottom: -0.1rem;
}

.client-agency-btn-box{
  //text-align: left;
  display: flex;
  justify-content:space-between;
  margin-top: 0.15rem;
  padding: 0 0.75rem 0 0.5rem;
  .addBtns{
    background-color: #4BA8FF;
    height: 22px;
    font-size: 0.3rem;
    padding: 2px 8px;
    color: #fff;
    border-radius: 3px;
  }
  .agency-add-btn {
    position: relative;
    top: 0rem;
    left: 0rem;
  }
  .agency-add-btn-disable {
   background-color: #c8c9cc;
   color:#fff;
  }
  .client-add-btn {
    position: relative;
    top: 0rem;
    left: 0.3rem;
    //background-color: ;
  }
}
  .page-flex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    height: 100%;
    overflow: hidden;
    background-color: #fff;
  }
  .page-head {
    width: 100%;
    height: 120px;
    .vm-page-head--body {
      position: inherit !important;
      top: inherit !important;
      left: inherit !important;
    }
  }
  .page-body {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
    flex: 1;
    .demo-loadmore-content.container {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
  .page-foot {
    height: 50px;
  }
</style>
