<template>
  <div class="frame-container">
    <div class="vm-padding-height page-home-head">
      <div class="vm-postion-box">
        <div class="vm-padding-height page-home-head-bg">
          <img class="vm-postion-box-img" src="@/assets/images/pages/home_bg.png" alt />
        </div>
        <div class="vm-padding-height page-home-head-data">
          <div class="vm-postion-box">
            <div class="home-container">
              <!-- 数据总览 -->
              <div class="home-container-pandect">
                <div class="pandect-title">数据总览</div>
                <ul class="pandect-data">
                  <div class="order-more" @click="toOrder">查看流水</div>
                  <li
                    class="fl"
                    v-if="userType=='1' || userType=='2' || userType=='3' || userType=='4'"
                  >
                    <div>
                      <p class="pandect-data-price vm-ell">￥{{dataViews.transactionMoney || 0}}</p>
                      <p class="pandect-data-name flex
                      ">本月交易额 <i class="icon iconfont iconeye order-eye" @click="toOrder"></i></p>
                    </div>
                  </li>
<!--                  v-if="userType=='2' || userType=='3' || userType=='4'"-->
                  <li class="fl" v-if="userType=='2' || userType=='3' || userType=='4'">
                    <div>
                      <p class="pandect-data-price vm-ell">￥{{commissionMoneyData.allCommissionTotal || 0}}</p>
                      <p class="pandect-data-name">佣金总额</p>
                    </div>
                  </li>
                  <li class="fl" v-if="userType=='1'">
                    <div>
                      <p class="pandect-data-price vm-ell">{{dataViews.firstAgentNum || 0}}</p>
                      <p class="pandect-data-name">{{levelAlias.firstName}}总数</p>
                    </div>
                  </li>
                  <li class="fl" v-if="userType=='1'||userType=='2'">
                    <div>
                      <p class="pandect-data-price vm-ell">{{dataViews.secondAgentNum || 0}}</p>
                      <p class="pandect-data-name">{{levelAlias.secondName}}总数</p>
                    </div>
                  </li>
                  <li class="fl" v-if="userType!='4'">
                    <div>
                      <p class="pandect-data-price vm-ell">{{dataViews.thirdAgentNum || 0}}</p>
                      <p class="pandect-data-name">{{levelAlias.thirdName}}总数</p>
                    </div>
                  </li>
                  <li class="fl">
                    <div>
                      <p class="pandect-data-price vm-ell">{{dataViews.merchantNum || 0}}</p>
                      <p class="pandect-data-name">商户总数</p>
                    </div>
                  </li>
                  <li class="fl">
                    <div>
                      <p class="pandect-data-price vm-ell">{{dataViews.transactiontNum || 0}}</p>
                      <p class="pandect-data-name">本月交易笔数</p>
                    </div>
                  </li>
                  <li class="fl" v-if="userType=='3'">
                    <div>
                      <p class="pandect-data-price vm-ell">{{cardData.refundCount || 0}}</p>
                      <p class="pandect-data-name">总退款笔数</p>
                    </div>
                  </li>
                  <li class="fl" v-if="userType=='4'">
                    <div>
                      <p class="pandect-data-price vm-ell">￥{{cardData.refundMoney || 0}}</p>
                      <p class="pandect-data-name">总退款金额</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 业务员发展商户占比 -->
    <div class="home-container-echart">
      <div class="echart-title">
        <div>{{this.userType == '1' ? '支付通道占比' :'业务员发展商户占比'}}</div>
        <div class="home-echat-btn" v-if="this.userType == '1'">
          <div class="vm-flex">
            <div @click="changeStatus(1)" :class="{active: isActive==1}">交易金额</div>
            <div @click="changeStatus(2)" :class="{active: isActive==2}">交易笔数</div>
          </div>
        </div>
      </div>
      <div class="vm-padding-height echat-paddings" :style="{paddingTop: paddingTopVal}">
        <div class="vm-postion-box">
          <div class="echart-data" id="payPercent">
            <div style="padding-top: 80px;">暂无数据</div>
          </div>
        </div>
      </div>
    </div>
    <div class="vm-height-49px"></div>
  </div>
</template>

<script>
import { homeApi } from '@/api'
import { isShowFooterMixin } from '@/mixins'
import { afterLoginInfoLocal } from '@/storage'
import echartResizeMixin from './mixin/echartResizeMixin.js'
import indexMixins from './mixin/indexMixins.js'
import * as types from '@/router/types'

export default {
  mixins: [isShowFooterMixin, echartResizeMixin, indexMixins],
  data() {
    return {
      commissionMoneyData:{},
      isActive: 1,
      companyId: '',
      userType: '',
      dataViews: {},
      levelAlias: {},
      paddingTopVal: '67.82%',
      cardData: {
        commissionAmount: '1',
        customerPaidAmount: '0',
        discountAmount: '0',
        orderAmount: '0',
        orderNum: '0',
        refundAmount: '0',
        refundNum: '0',
        validDealAmount: '0'
      } // 交易数据
    }
  },
  methods: {
    changeStatus(val) {
      this.isActive = val
      this.getRunAccountNewDataView()
    },
    /**
     * 数据概览
     * @param {*} params
     */
    getDataViews() {
      let params = {
        companyId: this.companyId
      }
      homeApi.dataView(params).then(res => {
        this.dataViews = res.obj
      })
    },
    /**
     * 业务员发展商户占比
     * @param {*} params
     */
    getRunAccountNewDataView() {
      let params = {
        companyId: this.companyId
      }
      if (this.userType === 1) {
        params.type = this.isActive
      }
      homeApi.runAccountNewDataView(params).then(
        res => {
          let data = res.obj
          let step = 16
          let num = Math.round(data.length / 4)
          this.paddingTopVal = num * step + 67.82 + '%'
          this.$nextTick(() => {
            this.drawPayPercent(data, 1)
          })
        },
        res => {}
      )
    },
    /**
     * 交易数据
     * @param {*} params
     */
    commissionMoney() {
      let params = {
        companyId: this.companyId
      }
      homeApi.commissionMoney(params).then(res => {
        this.commissionMoneyData = res.obj
        console.log(this.commissionMoneyData)
      })
    },
    /**
     * 交易数据
     * @param {*} params
     */
    getDataTransaction() {
      let params = {
        companyId: this.companyId
      }
      homeApi.dataTransaction(params).then(res => {
        this.cardData = res.obj
      })
    },
    toOrder() {
      this.$router.push({name: types.ORDER_LIST})
    }
  },
  created() {
    let userInfo = afterLoginInfoLocal.getJSON()
    // console.log('conpanyid111111111111111:',userInfo)
    this.levelAlias = userInfo.levelAlias
    this.companyId = userInfo.companyId
    this.userType = userInfo.userType
    this.getDataViews()
    this.getRunAccountNewDataView()
    this.getDataTransaction()
    this.commissionMoney();
  }
}
</script>
