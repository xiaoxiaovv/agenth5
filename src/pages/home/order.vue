import router from '../../router';
import { homeApi } from '../../api';
<template>
  <div class="client-info frame-container box align-default page-order-list">
    <!-- 补白 -->
    <!--<div class="client-info__padding"></div>-->

    <!-- 导航栏 -->
    <!-- 补白 -->
    <div class="client-info-detail__padding"></div>

    <!-- 导航栏 -->
    <div class="client-info-detail__nav box plr-30 align-hor-bet">
      <div class="icon iconfont iconreturn" @click="$router.back(-1)"></div>
      <div class="title">交易流水</div>
      <div class="pass"></div>
    </div>

    <!-- 数据列表 -->
    <div class="client-info__content match-left-space mt-20">
      <mu-paper class="match-parent box" :z-depth="1">
        <mu-container ref="container" v-loading="isLoading" class="plr-0">
          <mu-load-more
            v-if="dataList && dataList.length"
            :refreshing="refreshing"
            @refresh="refresh"
            :loading="loading"
            :loaded-all="isLoadedAll"
            :loading-text="loadingText"
            @load="load"
          >
            <mu-list>
              <div class="flex plr-30 border-bottom list ptb-20" v-for="(item, index) in dataList" :key="index">
                <div class="flex-1 black-label text-left">
                  {{item.merchantName}}
                  <p class="gray-label">{{item.presentAgentName}}</p>
                </div>
                <div class="flex-1 black-label text-center">
                  ￥{{item.actPayPrice || 0}}
                  <p class="gray-label">{{payWay[item.payWay]}}</p>
                </div>
                <div class="flex-1 black-label text-right">
                 ￥{{item.presentCommissionAmount || 0}}
                 <p class="gray-label">{{item.payTime |date}}</p>
                </div>
              </div>
            </mu-list>
          </mu-load-more>
          <div class="match-width align-center" v-else>
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

    <!-- 补脚 -->
    <div class="client-info__footer"></div>
  </div>
</template>

<script>
// clientInfoDetailIDLocal
import { afterLoginInfoLocal } from '@/storage'
import { homeApi } from '@/api'
import VmaNoData from '@/components/common/vmaNoData'
export default {
  components: { VmaNoData },
  data() {
    return {
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
      payWay: {
        1: '微信',
        2: '支付宝',
        3: '银行卡',
        4: '会员卡',
        5: '现金',
        6: '会员+微信',
        7: '会员+支付宝',
        8: '手机pos',
        9:'银联',
        10:'刷脸',
        99: '未知'
      }
    }
  },

  methods: {
    // 下拉刷新
    refresh() {
      console.log('下拉刷新')
      this.refreshing = true
      this.$refs.container.scrollTop = 0
      this.pageNumber = 1
      this.dataList = []
      // 获取商户数据
      this.getOrderList()
    },
    // 加载更多
    load() {
      console.log('加载更多')
      this.pageNumber++
      // 获取商户数据
      this.getOrderList()
    },
    // 获取商户数据
    getOrderList() {
      let loginInfo = afterLoginInfoLocal.get()
      if (loginInfo) {
        loginInfo = JSON.parse(loginInfo)
        if (loginInfo && loginInfo.companyId) {
          this.loading = true
          this.refreshing = false
          let params = {
            pageNum: this.pageNumber,
            pageSize: this.pageSize,
            status: this.status
          }
          homeApi.getOrderList(params).then(
            res => {
              this.loading = false
              if (res.code === 200) {
                this.dataList = [...this.dataList, ...res.obj.listData]
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
    }
  },

  mounted() {
    // TODO
    this.getOrderList()
  }
}
</script>
