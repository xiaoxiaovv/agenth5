import { close } from 'muse-ui-toast';
import { isProd } from '../../config';
<template>
  <div class="commission-index frame-container box align-default">

    <!-- 补白 -->
<!--    <div class="commission-index__padding"></div>-->

    <!-- 导航栏 -->
    <!--<div class="commission-index__nav align-hor-bet box plr-40 ">

      <div class="icon iconfont iconreturn" @click="$router.back(-1)"></div>
      <div class="title">提现管理</div>
      <div class="search"
           @click="onSearch">
        &lt;!&ndash; <img
          class="match-parent iconfont iconsearch"/> &ndash;&gt;
      </div>
    </div>-->

    <ul class="pandect-data align-hor-bet">
      <li class="">
        <div>
          <p class="pandect-data-price vm-ell">{{ allCommissionTotal || 0 }}</p>
          <p class="pandect-data-name">总分润额（元）</p>
        </div>
      </li>
      <!--<li class="fl" >
        <div>
          <p class="pandect-data-price vm-ell">1.5</p>
          <p class="pandect-data-name">已提现（元）</p>
        </div>
      </li>-->
      <li class="" >
        <div>
          <p class="pandect-data-price vm-ell">{{ canCommission || 0 }}</p>
          <p class="pandect-data-name">未提现（元）</p>
        </div>
      </li>
    </ul>


    <!-- 选项卡 -->
    <div class="commission-index__tabs box align-bottom ">
      <div v-for="(item, index) in tabList"
           :key="index"
           :class="['item', 'box', 'match-left-space', 'align-ver-bottom', index == current ? 'active' : '' ]"
           @click="onTabItemClick(index, item.status)">
        <div>{{item.name}}</div>
        <div class="bar mt-20"></div>
      </div>
    </div>

    <!-- 数据列表 -->
    <div class="commission-index__content match-left-space " >
      <mu-paper class="match-parent box pl-30 pr-20"
                :z-depth="1">
        <mu-container ref="container"
                      v-loading="isLoading">
          <mu-load-more v-if="dataList && dataList.length"
                        :refreshing="refreshing"
                        @refresh="refresh"
                        :loading="loading"
                        :loaded-all="isLoadedAll"
                        :loading-text="loadingText"
                        @load="load">
            <mu-list>
              <div v-for="(item, index) in dataList"
                   :key="index"
                   :class="['commission-index__item box align-hor-bet', (index == dataList.length - 1) ? '' : '']"
                  >
                <div class="align-ver-left flex-1">
                  <div class="title">
                    {{item.updateTime}}
                  </div>
                  <div class="subtile mt-6">
                    {{item.status | statusFilter}}
                  </div>
                </div>
                <div class="match-left-space box align-left">
                  <div class="flex-1 text-right">

                    <div class="btn match-left-space align-right text-right ">
                      <!-- <br /> -->
                      ￥{{item.applyAmount}}
                    </div>
                  </div>
<!--                  <div class="icon iconfont iconenter ml-20"></div>-->
                </div>
              </div>

            </mu-list>
          </mu-load-more>
          <div class="match-width align-center"
               v-else>
            <VmaNoData></VmaNoData>
            <!--
            <div class="no-data">
              <img
                src="../../assets/images/common/no-data.png"/>
              <div>暂无数据</div>
            </div>
            -->
          </div>
        </mu-container>
      </mu-paper>
    </div>
    <div class="commission-index__out-login center-flex" >
      <p @click="toApply">申请提现</p>
    </div>
    <div class="commission-index__out-login center-flex  clearfix clear" >
      <p @click="toApply"></p>
    </div>

    <!-- 补脚 -->
<!--    <div class="commission-index__footer"></div>-->
    <mu-dialog title="提示"
               width="600"
               max-width="80%"
               :esc-press-close="false"
               :overlay-close="false"
               :open.sync="openAlert">
      请您先绑定提现银行卡
      <mu-button slot="actions"
                 flat
                 color="primary"
                 @click="closeAlertDialog">取消</mu-button>
      <mu-button slot="actions"
                 flat
                 color="primary"
                 @click="toAddBankCard">去绑卡</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
// clientInfoDetailIDLocal
import { afterLoginInfoLocal } from '@/storage'
import { clientInfoApi, commissionApi } from '@/api'
import { isProd } from '@/config'
// CLIENT_INFO_DETAIL
import { COMMISSIONAPPLY,COMMISSION_ADD_BANK_CARD } from '@/router/types'
import VmaNoData from '@/components/common/vmaNoData'
export default {
  components: { VmaNoData },
  data() {
    return {
      hasCommissionAuth: false, //是否拥有提现权限
      // isEdit: false,
      // tabList: ['全部', '签约', '未签约', '待审核', '驳回'],
      tabList: [
        /*{
          name: '全部',
          status: ''
        },*/
        {
          name: '申请记录',
          status: 0
        },
        {
          name: '提现记录',
          status: 1
        },
       /* {
          name: '签约成功',
          status: 3
        },
        {
          name: '签约失败',
          status: 4
        }*/
      ],
      openAlert:false,
      current: 0,
      dataList: [],
      refreshing: false,
      loading: false,
      isLoadedAll: false,
      loadingText: '加载中',
      lodingDone: '-- END --',
      lodingMore: '下拉加载更多',
      pageNumber: 1,
      pageSize: 10,
      isLoading: false,
      status: '', // 签约状态
      allCommissionTotal: '', //佣金总额
      canCommission: '', //未提现佣金
    }
  },
  /*beforeRouteEnter(to, from, next) {
    next(vm => {
      // vm.refresh()
    })
  },*/
  mounted() {
    // TODO
    // console.log('============================111')
    let userInfo = afterLoginInfoLocal.getJSON()
    this.companyId = userInfo.companyId
    this.commissionGetBankCard();

    // this.commissionApplyAllList()
    // this.getMerchantList()
  },
  methods: {
    closeAlertDialog() {
      this.openAlert = false
    },
    // 获取佣金提现卡
    commissionGetBankCard() {
      commissionApi.commissionGetBankCard(this.companyId).then(res => {
          this.hasCommissionAuth = true //该接口成功则证明有分佣提现权限
          //需要权限的逻辑--开始
          this.refresh()  //该方法只可以手动调用一次！！！！！
          this.findCommissionCurrentMonth()
        //需要权限的逻辑--结束
        if(res.obj && res.obj.cardNo === null){
          this.cardNotExit = true

        }else{

        }

      },
      errRes => {
        if(errRes.code === 403){
          this.hasCommissionAuth = false
        }
      }
      )
    },
    toAddBankCard(){
      this.$router.push({
        name: COMMISSION_ADD_BANK_CARD
      })
    },
    toApply(){
      if(this.hasCommissionAuth){

      }else{
        this.$toast.error('您尚未拥有该权限')
        return
      }

      if(this.cardNotExit){
        this.openAlert = true
        return
      }
      this.$router.push({
        name: COMMISSIONAPPLY
      })

    },

    commissionApplySuccessList(){
      let params = {
        pageNumber:1,
        pageSize:10
      }
      commissionApi.commissionApplySuccessList(params).then(
        res => {
          this.loading = false
          this.isLoading = false
          if (res.code === 200) {
           /* for(let i=0;i<10;i++){
              this.dataList.push({
                "accountNum": "",
                "accountType": 0,
                "actPayAmount": 0,
                "actPayUser": "",
                "allCommissionTotal": 0,
                "applyAmount": 60,
                "canCommission":6,
                "cashOutAmount": 0,
                "cashOutWay": "",
                "company": "",
                "companyId": "",
                "createTime": "",
                "delFlag": 0,
                "id": "",
                "name": "",
                "payDate": "",
                "payWay": "",
                "rateCash": 0,
                "remark": "",
                "serviceProviderId": "",
                "status": 2,
                "updateTime": "2021-03-25 11:27:29",
                "validCode": ""
              })
            }*/

            this.dataList = [...this.dataList, ...res.obj.content]
            console.log('this.dataList', this.dataList)
            if (this.dataList.length < res.obj.totalElements) {
              this.isLoadedAll = false
            } else {
              this.isLoadedAll = true
            }
          } else {
            this.loading = false
            this.isLoading = false
            if (res && res.msg) {
              this.$toast.error(res.msg)
            }
          }
        },
        err => {
          this.loading = false
          if (err && err.msg) {
            this.$toast.error(err.msg)
          }
        }
      )
    },
    commissionApplyAllList(){

      commissionApi.commissionApplyAllList(this.pageNumber,this.pageSize).then(
        res => {
          this.loading = false
          this.isLoading = false
          if (res.code === 200) {
            /*for(let i=0;i<10;i++){
              this.dataList.push({
                "accountNum": "",
                "accountType": 0,
                "actPayAmount": 0,
                "actPayUser": "",
                "allCommissionTotal": 0,
                "applyAmount": 50,
                "canCommission":5,
                "cashOutAmount": 0,
                "cashOutWay": "",
                "company": "",
                "companyId": "",
                "createTime": "",
                "delFlag": 0,
                "id": "",
                "name": "",
                "payDate": "",
                "payWay": "",
                "rateCash": 0,
                "remark": "",
                "serviceProviderId": "",
                "status": 2,
                "updateTime": "2021-03-25 11:27:29",
                "validCode": ""
              })
            }*/
            this.dataList = [...this.dataList, ...res.obj.content]
            console.log('this.dataList', this.dataList)
            if (this.dataList.length < res.obj.totalElements) {
              this.isLoadedAll = false
            } else {
              this.isLoadedAll = true
            }
          } else {
            if (res && res.msg) {
              this.$toast.error(res.msg)
            }
          }
        },
        err => {
          this.loading = false
          this.isLoading = false
          if (err && err.msg) {
            this.$toast.error(err.msg)
          }
        }
      )
    },
    findCommissionCurrentMonth(){
      commissionApi.findCommissionCurrentMonth().then(
        res => {
          this.loading = false
          if (res.code === 200) {
            this.allCommissionTotal = res.obj.allCommissionTotal
            this.canCommission = res.obj.canCommission
          } else {
            if (res && res.msg) {
              this.$toast.error(res.msg)
            }
          }
        },
        err => {
          if (err && err.msg) {
            this.$toast.error(err.msg)
          }
        }
      )
    },
    // 选项卡切换
    onTabItemClick(index, status) {
      console.log('选项卡切换')
      this.status = status
      this.current = +index
      this.pageNumber = 1
      this.dataList = []
      // 获取商户数据
      if(status == 0){
        this.commissionApplyAllList()
      }else if(status == 1){
        this.commissionApplySuccessList()
      }
      // this.getMerchantList()
    },
    // 下拉刷新
    refresh() {
      console.log('下拉刷新')
      // this.refreshing = true
      this.isLoading = true
      this.$refs.container.scrollTop = 0
      this.pageNumber = 1
      this.dataList = []
      if(this.status == 0){
        this.commissionApplyAllList()
      }else if(this.status == 1){
        this.commissionApplySuccessList()
      }
      // 获取商户数据
      // this.getMerchantList()
    },
    // 上拉加载更多
    load() {
      console.log('加载更多')
      this.pageNumber++
      if(this.status == 0){
        this.commissionApplyAllList()
      }else if(this.status == 1){
        this.commissionApplySuccessList()
      }
      // 获取商户数据
      // this.getMerchantList()
    },

   /* // 获取商户数据
    getMerchantList() {
      let loginInfo = afterLoginInfoLocal.get()
      if (loginInfo) {
        loginInfo = JSON.parse(loginInfo)
        if (loginInfo && loginInfo.companyId) {
          this.loading = true
          this.refreshing = false
          clientInfoApi.getMerchantList(this.pageNumber, this.pageSize, this.status).then(
            res => {
              this.loading = false
              if (res.code === 200) {
                this.dataList = [...this.dataList, ...res.obj.content]
                console.log('this.dataList', this.dataList)
                if (this.dataList.length < res.obj.totalElements) {
                  this.isLoadedAll = false
                } else {
                  this.isLoadedAll = true
                }
              } else {
                if (res && res.msg) {
                  this.$toast.error(res.msg)
                }
              }
            },
            err => {
              if (err && err.msg) {
                this.$toast.error(err.msg)
              }
            }
          )
        } else {
          this.$toast.error('公司信息有误')
        }
      } else {
        this.$toast.error('登录失败')
      }
    },*/
    // 搜索
    onSearch() {
      // TODO
      console.log('search')
    },
  },

  filters: {
    statusFilter(status) {
      let obj = {
        1: '待审核',
        2: '审核通过',
        3: '提现成功',
        "-1": '审核未通过'
      }
      return obj[status]
    }
  }
}
</script>
