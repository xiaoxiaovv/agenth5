import { close } from 'muse-ui-toast';
import { isProd } from '../../config';
<template>
  <div class="client-info frame-container box align-default">

    <!-- 补白 -->
    <!--<div class="client-info__padding"></div>-->

    <!-- 导航栏 -->
    <div class="client-info__nav align-hor-bet box plr-40">
      <div class="pass"></div>
      <div class="title">进件</div>
      <div class="search"
           @click="onSearch">
        <!-- <img
          class="match-parent iconfont iconsearch"/> -->
      </div>
    </div>
    <mu-container >
      <mu-text-field label="" class="fl ml-10" style="width: 20%" v-model="agentName" placeholder="代理名称"></mu-text-field>
      <mu-text-field label="" class="fl ml-10"  style="width: 20%" v-model="merchantShopName" placeholder="商户名"></mu-text-field>
      <mu-select label="" class="fl ml-10" style="width: 28%"   v-model="selectStatusValue" placeholder="进件状态" @change="selectStatusChange">
        <mu-option v-for="option in statusOptions" :key="option" :label="option"  :value="option"></mu-option>
      </mu-select>
      <div class="client-info__searchBox">
        <span class="mu-info-text-color mt-40" @click="onSearch">查询</span>
        <span class="mu-info-text-color ml-20" @click="resetSearch">重置</span>
      </div>


    </mu-container>
    <!-- 选项卡 -->
   <!-- <div class="client-info__tabs box align-bottom">

      &lt;!&ndash;<div v-for="(item, index) in tabList"
           :key="index"
           :class="['item', 'box', 'match-left-space', 'align-ver-bottom', index == current ? 'active' : '' ]"
           @click="onTabItemClick(index, item.status)">
        <div>{{item.name}}</div>
        <div class="bar mt-20"></div>
      </div>&ndash;&gt;
    </div>-->

    <!-- 数据列表 -->
    <div class="client-info__content match-left-space " style="margin-top: -20px">
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
                   :class="['client-info__item box align-hor-bet', (index == dataList.length - 1) ? '' : '']"
                   @click="onDataListItemClick(item)">
                <div class="align-ver-left flex-1">
                  <div class="title">
                    {{item.merchantName}}
                  </div>
                  <div class="subtile mt-6">
                    {{item.phone}}
                  </div>
                </div>
                <div class="match-left-space box align-left">
                  <div class="flex-1 text-right">
                    <span @click.prevent.stop="copyClientLink(item.id)"
                          style="color: #4BA8FF;"
                          v-if="item.isDirect">复制进件链接</span>
                    <div :class="['btn', 'match-left-space', 'align-right', 'text-right', (item.status == 3) ? 'active' : '',(item.status == 2) ?'wait-statue':'']">
                      <!-- <br /> -->
                      {{item.status | statusFilter}}
                    </div>
                  </div>
                  <div class="icon iconfont iconenter ml-20"></div>
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

    <!-- 补脚 -->
    <div class="client-info__footer"></div>

  </div>
</template>

<script>
// clientInfoDetailIDLocal
import { afterLoginInfoLocal } from '@/storage'
import { clientInfoApi } from '@/api'
import { isProd } from '@/config'
// CLIENT_INFO_DETAIL
import { CLIENT_INFO_DETAIL, CLIENT_INFO_RECORD } from '@/router/types'
import VmaNoData from '@/components/common/vmaNoData'
export default {
  components: { VmaNoData },
  data() {
    return {
      merchantShopName:'',
      agentName:'',
      statusOptions:[
        '全部', '未开通', '待审核', '签约成功', '签约失败'
      ],
      selectStatusValue:'',

      isEdit: false,
      // tabList: ['全部', '签约', '未签约', '待审核', '驳回'],
      tabList: [
        {
          name: '全部',
          status: ''
        },
        {
          name: '未开通',
          status: 1
        },
        {
          name: '待审核',
          status: 2
        },
        {
          name: '签约成功',
          status: 3
        },
        {
          name: '签约失败',
          status: 4
        }
      ],
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
      status: '' // 签约状态
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.refresh()
    })
  },
  methods: {

    // 选项卡切换
    onTabItemClick(index, status) {
      console.log('选项卡切换')
      this.status = status
      this.current = +index
      this.pageNumber = 1
      this.dataList = []
      // 获取商户数据
      this.getMerchantList()
    },
    // 下拉刷新
    refresh() {
      console.log('下拉刷新')
      this.refreshing = true
      this.$refs.container.scrollTop = 0
      this.pageNumber = 1
      this.dataList = []
      // 获取商户数据
      this.getMerchantList()
    },
    // 加载更多 上滑
    load() {
      console.log('加载更多')
      this.pageNumber++
      // 获取商户数据
      this.getMerchantList()
    },
    copyClientLink(id) {
      let link = `${location.origin}/${
        isProd ? 'web/h5/index.html' : ''}#/client_info_record?from=share&id=${id}&token=${sessionStorage.token}`
      let dummy = document.createElement('input')
      dummy.style.opacity = '0'
      dummy.readOnly = 'readOnly'
      document.body.appendChild(dummy)
      dummy.value = link
      // dummy.select() // 选择对象
      dummy.setSelectionRange(0, link.length)
      dummy.focus()
      document.execCommand('copy') // 执行浏览器复制命令
      document.body.removeChild(dummy)
      this.$toast.message({
        position: 'top-end',
        message: '复制成功',
        close: false,
        time: 2000
      })

      // console.log(link)
      // let params = {
      //   id
      // }
    },
    // 搜索
    onSearch() {
      // TODO
      this.pageNumber = 1
      this.dataList = [];
      this.getMerchantList()
      console.log('search')
    },
    resetSearch(){
      this.merchantShopName = '';
      this.agentName = '';
      this.selectStatusValue = '';
      this.selectStatus = '';
      this.pageNumber = 1
      this.dataList = [];
      this.getMerchantList()
    },
    selectStatusChange(val){
      let that = this;
      console.log(val)
      switch (val){
        case '全部':
          that.selectStatus = '';
          break;
        case '未开通':
          that.selectStatus = '1';
          break;
        case '待审核':
          that.selectStatus = '2';
          break;
        case '签约成功':
          that.selectStatus = '3';
          break;
        case '签约失败':
          that.selectStatus = '4';
          break;
        default:
          break
      }
      this.dataList = []
      this.pageNumber = 1
      this.getMerchantList()
    },
    // 获取商户数据
    getMerchantList() {
      let loginInfo = afterLoginInfoLocal.get()
      if (loginInfo) {
        loginInfo = JSON.parse(loginInfo)
        if (loginInfo && loginInfo.companyId) {
          this.loading = true
          this.refreshing = false
          clientInfoApi.getMerchantList(this.pageNumber, this.pageSize, this.agentName, this.merchantShopName , this.selectStatus).then(
            res => {
              this.loading = false
              if (res.code === 200) {
                // res.obj.content.forEach(node => {
                //   node.isEdit = false

                //   if (node.list && node.list.length) {
                //     node.list.forEach(item => {
                //       // 只要有一个通道的状态不是审核中或者审核通过，即进入编辑界面
                //       if (item.status !== 2 && item.status !== 3) {
                //         node.isEdit = true
                //       }
                //     })
                //     return false
                //   }

                //   if (node.status === 1 || node.status === 2 || node.status === 4) {
                //     node.isEdit = true
                //   } else {
                //     node.isEdit = false
                //   }
                // })
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
    },

    // 数据项
    onDataListItemClick(data) {
      console.log('数据项', data)
      if (!data.id) {
        this.$toast.error('商户信息有误')
        return
      }
      // 不是自己开通的商户只能进入详情
      if (!data.isDirect) {
        this.$router.push({
          name: CLIENT_INFO_DETAIL,
          query: {
            id: data.id,
            list: (data.list && data.list.length) ? JSON.stringify(data.list) : [],
            isEdit: false
          }
        })
        return
      }
      var isEdit = true
      if (data.list && data.list.length) {
        // data.list.forEach(res => {
        //   // 只要有一个通道的状态不是审核中或者审核通过，即进入编辑界面
        //   if (res.status !== 2 && res.status !== 3) {
        //     isEdit = true
        //   }
        // })
        this.$router.push({
          name: CLIENT_INFO_DETAIL,
          query: {
            id: data.id,
            list: JSON.stringify(data.list),
            isEdit: isEdit
          }
        })
        return
      }
      if (data.status === 1 || data.status === 4) {
        this.$router.push({
          name: CLIENT_INFO_RECORD,
          query: {
            id: data.id,
            list: JSON.stringify(data.list)
          }
        })
      } else {
        this.$router.push({
          name: CLIENT_INFO_DETAIL,
          query: {
            id: data.id,
            list: JSON.stringify(data.list),
            isEdit: true
          }
        })
      }
    }
  },

  filters: {
    statusFilter(status) {
      let obj = {
        0: '未签约',
        1: '未开通',
        2: '待审核',
        3: '签约成功',
        4: '签约失败',
        5: '等待服务商审核',
        null: '未签约'
      }
      return obj[status]
    }
  },

  mounted() {
    // TODO
    console.log('mounted')
    // this.getMerchantList()
  }
}
</script>
