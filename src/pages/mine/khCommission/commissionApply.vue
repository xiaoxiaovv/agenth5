import { close } from 'muse-ui-toast';
import { isProd } from '../../config';
<template>
  <div class="commission-apply frame-container box align-default">

    <!-- 补白 -->
    <!--    <div class="commission-apply__padding"></div>-->

    <!-- 导航栏 -->
    <div class="commission-apply__nav align-hor-bet box plr-40 ">
      <!--      <div class="pass"></div>-->
      <div class="icon iconfont iconreturn" @click="$router.back(-1)"></div>
      <div class="title">奖励提现管理</div>
      <div class="search"
           @click="">
        <!-- <img
          class="match-parent iconfont iconsearch"/> -->
      </div>
    </div>

    <div class="pandect-data">
      <div class="text-left pl-30 ptb-20 commission-apply__title">
        <p class="title-text">未提现奖励</p>
        <p class="money mt-6"><span>¥ </span><span>{{canCommission}}</span></p>
      </div>
      <div class="client-info-detail__content box match-left-space">
      <div class="match-width box align-default">
      <div class="item">
        <div class="subtitle">
          <span class="star">*</span>提现金额
        </div>
        <div class="match-left-space align-right">
          <div class="input align-right">
            <input
              type="number"
              placeholder="请输入内容"
                   v-model="applyAmount" />
          </div>
        </div>

      </div>
      </div>
      </div>

    </div>
    <!-- 数据列表 -->
    <div class="commission-apply__content   align-default">
      <div class="mt-20 bank-info-box">
      <div class="vm-list-ul vm-bg-gray vmalis-fontweight-400  ">
        <div class="vm-list-li">
          <div class="vma-list-li-left">开户人</div>
          <div class="vma-list-li-right vm-ell">{{bankCarkInfo.bankAccount}}</div>
        </div>
      </div>
      <div class="vm-list-ul vm-bg-gray vmalis-fontweight-400  ">
        <div class="vm-list-li">
          <div class="vma-list-li-left">开户行</div>
          <div class="vma-list-li-right vm-ell">{{bankCarkInfo.bankName}}</div>
        </div>
      </div>
      <div class="vm-list-ul vm-bg-gray vmalis-fontweight-400  ">
        <div class="vm-list-li">
          <div class="vma-list-li-left">账号</div>
          <div class="vma-list-li-right vm-ell">{{bankCarkInfo.cardNo}}</div>
        </div>
      </div>
        <div class="bank-cark-btn-box mt-20">
          <span @click="toCommissionAddBankCardPage" class="bank-cark-btn">修改卡信息</span>
        </div>
      </div>
      <div class="mt-50 explain">
        <p class="title">温馨提示：</p>
        <div class="align-hor-bet">
          <p class="explain_ml">分润税点</p>
          <p>{{commissionConfigData.rateCash}}%</p>
        </div>
        <div class="align-hor-bet">
          <p class="explain_ml">到账时间</p>
          <p>T+1</p>
        </div>
        <div class="align-hor-bet">
          <p class="explain_ml">提现金额不得低于</p>
          <p>{{commissionConfigData.minCashAmount}} (元)</p>
        </div>
        <div class="align-hor-bet">
          <p class="explain_ml">提现时间</p>
          <p>{{commissionConfigData.cashOutStartTime}} - {{commissionConfigData.cashOutEndTime}}</p>
        </div>
      </div>
    </div>
    <div class="commission-apply__out-login center-flex">
      <p @click="commissionApplyAuth">提交申请</p>
    </div>

  </div>
</template>

<script>
import { afterLoginInfoLocal } from '@/storage'
import { commissionApi } from '@/api'
import { COMMISSION_ADD_BANK_CARD } from '@/router/types'
import { cxby } from '@/utils'
let cardFilter = cxby.cardFilter
export default {

  data() {
    return {
      commissionConfigData:{
        "cashOutStartTime": "",
        "cashOutEndTime": "",
        "rateCash": "",
        "minCashAmount": "",
        "bankName": "",
        "cardNo": "",
        "openBank": ""
      },
      applyAmount:'',
      openAlert:false,
      password:'',
      canCommission:'',
      bankCarkInfo:{
        "bankAccount": "",
        "bankName": "",
        "cardNo": "",
        "openBank": ""
      }
    }
  },
  /*beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.refresh()
    })
  },*/
  created() {
    this.getCommissionConfig()
  },
  mounted() {
    // TODO
    let userInfo = afterLoginInfoLocal.getJSON()
    this.companyId = userInfo.companyId
    this.commissionGetBankCard()
    this.findCommissionCurrentMonth()
    console.log('============================111')


    // this.getMerchantList()
  },
  methods: {
    getCommissionConfig(){
      commissionApi.getCommissionConfig().then(
        res => {
          // this.loading = false
          if (res.code === 200) {
            this.commissionConfigData = {...res.obj}
            this.commissionConfigData.cashOutStartTime = this.commissionConfigData.cashOutStartTime.substring(0,5)
            this.commissionConfigData.cashOutEndTime = this.commissionConfigData.cashOutEndTime.substring(0,5)
            this.commissionConfigData.rateCash = this.commissionConfigData.rateCash*100
          }
        }
      )
    },
    findCommissionCurrentMonth(){
      commissionApi.getCollect().then(
        res => {
          this.loading = false
          if (res.code === 200) {
            this.canCommission = res.obj.canAmount.toFixed(2)
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
    // 获取佣金提现卡
    commissionGetBankCard() {
      commissionApi.commissionGetBankCard(this.companyId).then(res => {
        this.bankCarkInfo = res.obj
      })
    },
    toCommissionAddBankCardPage(){
      this.$router.push({
        name: COMMISSION_ADD_BANK_CARD,
      })
    },
    commissionApplyAuth() {
      let requiredData = ['cardFront','cardBack','idCardNo','cidAddress','bankAccount','bankName','cardNo','companyId','bankPhone']
      let flag = true
      for (let i in this.bankCarkInfo) {
        if (this.bankCarkInfo.hasOwnProperty(i) && requiredData.indexOf(i) !== -1) {
          if (!this.bankCarkInfo[i]) {
            flag = false
            break
          }
        }
      }
      if(flag) {
        commissionApi.khcommissionApplyCommit(this.companyId, this.applyAmount).then(res=>{
          if(res.code === 200){
            this.$toast.success('提交成功')
          }else {
            if (res && res.msg) {
              this.$toast.error(res.msg)
            }
          }
        })
      } else {
        this.$toast.error('请更新银行卡信息~')
      }  
    },

  },

  filters: {
     //cardFilter
  }
}
</script>
