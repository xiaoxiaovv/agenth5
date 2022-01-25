<template>
  <div class="frame-container-home">
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
    <vue-seamless-scroll :data="listData" :class-option="defaultOption" class="warp">
        <ul class="item">
          <li v-for="(item, index) in listData" :key="index" @click="goNotice(item)">
            <div>
              <img src="../../assets/images/icons/icon_notice.png" />
              <span class="title" v-text="item.title"></span>
            </div>
            <div class="reight-time-go">
              <span class="date" v-text="item.createTime.substring(0,10)"></span>
              <img src="../../assets/images/icons/icon_enter.png" />
            </div>
          </li>
        </ul>
    </vue-seamless-scroll>
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
      <div class="vm-padding-height echat-paddings" :style="{paddingTop: paddingTopVal}" style="height: 380px;">
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
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  mixins: [isShowFooterMixin, echartResizeMixin, indexMixins],
  components: {
      vueSeamlessScroll
  },
  data() {
    return {
      listData: [],
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
  computed: {
      defaultOption () {
          return {
              step: 0.5, // 数值越大速度滚动越快
              limitMoveNum: this.listData.length, // 开始无缝滚动的数据量 this.dataList.length
              hoverStop: true, // 是否开启鼠标悬停stop
              openWatch: true, // 开启数据实时监控刷新dom
              direction: 1, // 0向下 1向上 2向左 3向右
              singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
              singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
              waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
          }
      }

  },
  methods: {
    changeStatus(val) {
      this.isActive = val
      this.getRunAccountNewDataView()
    },
    noticeBar() {
      // userType 1服务商,2一级,3二级,4三级5商户
      const params = {
        type: this.userType,
        createType: this.userType == 1 ? 1 : 3,//userType 1 服务商传1否则传3
        pageNumber: 1,
        pageSize: 100
      }
      homeApi.noticeBar(params).then(res => {
          if(res.code === 200) {
            this.listData = res.obj.content
          }
      })
    },
    goNotice(val) {
      console.log(val)
      this.$router.push({name: types.NOTICE,params:val})
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
        this.dataViews.transactionMoney = this.dataViews.transactionMoney.toFixed(2)
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
    this.levelAlias = userInfo.levelAlias
    this.companyId = userInfo.companyId
    this.userType = userInfo.userType
    this.noticeBar()
    this.getDataViews()
    this.getRunAccountNewDataView()
    this.getDataTransaction()
    this.commissionMoney();
  }
}
</script>
<style lang="scss">
  .warp {
    position: relative;
    z-index: 99;
    height: 1rem;
    width: 92%;
    margin: 0 auto 0.826666rem;
    padding: 0 0.4rem;
    box-shadow: 0px 10px 20px 0px rgba(175, 191, 207, 0.2);
    border-radius: 0.13rem;
    overflow: hidden;
    ul {
      list-style: none;
      padding: 0;
      margin: 0 auto;
      li {
        display: block;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 15px;
        img {
          width: 20px;
          height: 20px;
        }
        .reight-time-go {
          display: flex;
          align-items: center;
          img {
            width: 9px;
            height: 15px;
          }
        }
        .date {
          font-size: 13px;
          color: #999;
          margin-right: 0.16rem;
        }
      }
    }
  }
</style>
