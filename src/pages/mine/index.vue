<template>
  <div class="frame-container mine-page">
    <div class="mime-info-first">
      <img class="vm-bg-img"
           src="@/assets/images/pages/my_bg.png"
           alt="">
      <div class="info-first-container center-flex">
        <div>
          <p><span v-if="userInfo.userType === 2">一级代理商</span><span v-if="userInfo.userType === 3">二级代理商</span><span v-if="userInfo.userType === 4">三级代理商</span></p>
          <p class="info-first-name">{{userInfo.name}}</p>
          <div class="center-flex">
            <p class="info-first-edit-password" @click="resetPsw">修改密码</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mime-info-second">
      <ul>
        <li class="clearfix">
          <p class="fl">手机</p>
          <p class="fr">{{info.phone}}</p>
        </li>
        <li class="clearfix">
          <p class="fl">加入时间</p>
          <p class="fr">{{info.createTime}}</p>
        </li>
        <!--<template v-if="userType===2 || userType===3 || userType===4 ">
          <li class="clearfix" v-if="channelList.indexOf('官方') > -1">
            <p class="fl">微信分润</p>
            <p class="fr">{{info.wxPayProrata | toPercent}}</p>
          </li>
          <li class="clearfix" v-if="channelList.indexOf('官方') > -1">
            <p class="fl">支付宝分润</p>
            <p class="fr">{{info.zfbPayProrata | toPercent}}</p>
          </li>
          <li class="clearfix" v-if="channelList.indexOf('随行付') > -1">
            <p class="fl">随行付分润</p>
            <p class="fr">{{info.sxfPayProrata | toPercent}}</p>
          </li>
          <li class="clearfix" v-if="channelList.indexOf('富友') > -1">
            <p class="fl">富友分润</p>
            <p class="fr">{{info.fyPayProrata | toPercent}}</p>
          </li>
          <li class="clearfix" v-if="channelList.indexOf('威富通') > -1">
            <p class="fl">威富通分润</p>
            <p class="fr">{{info.ysPayProrata | toPercent}}</p>
          </li>
          <li class="clearfix" v-if="channelList.indexOf('乐刷') > -1">
            <p class="fl">乐刷分润</p>
            <p class="fr">{{info.lsPayProrata | toPercent}}</p>
          </li>
          <li class="clearfix" v-if="channelList.indexOf('传化') > -1">
            <p class="fl">传化分润</p>
            <p class="fr">{{info.chPayProrata | toPercent}}</p>
          </li>
          <li class="clearfix" v-if="channelList.indexOf('天阙随行付') > -1">
            <p class="fl">天阙随行付分润</p>
            <p class="fr">{{info.tqSxfPayProrata | toPercent}}</p>
          </li>
        </template>-->
        <!-- <li v-for="(item,i) in secondInfoList"
            :key="`mine_${i}`"
            class="clearfix">
          <p class="fl">{{item.name}}</p>
          <p class="fr">{{item.value}}</p>
        </li> -->
        <li class="clearfix"  @click="toCommission">
          <p class="fl">分润提现管理</p>
          <p class="fr"></p>
        </li>
        <li class="clearfix"  @click="toPrivacy">
          <p class="fl">隐私政策</p>
          <p class="fr"></p>
        </li>
      </ul>
    </div>
    <div class="out-login center-flex">
      <p @click="loginOut">退出登录</p>
    </div>
  </div>
</template>

<script>
import { loginApi, clientInfoApi } from '@/api'
import { loginInfoLocal, afterLoginInfoLocal } from '@/storage'
import * as types from '@/router/types'
export default {
  mixins: [],
  data() {
    return {
      secondInfoList: [
        { name: '手机', value: '' },
        { name: '加入时间', value: '' },
        { name: '抽佣比例', value: '' }
      ],
      info: {},
      userInfo: {},
      userType: '',
      channelList: []
    }
  },
  created() {
    this.getUserInfo()
    this.getChannelList()
  },
  filters: {
    toPercent: function(val) {
      console.log('1')
      let percent = val || '0'
      return percent * 100 + '%'
    }
  },
  methods: {
    getChannelList() {
      clientInfoApi.getStatus().then(res => {
        console.log(res)
        this.channelList = [...res.obj]
      })
    },
    /**
     * 获取用户信息
     * */
    getUserInfo() {
      let userInfo = afterLoginInfoLocal.getJSON()
      let params = {
        companyId: userInfo.companyId
      }
      console.log('userInfo', userInfo)
      this.userType = userInfo.userType
      loginApi.getUserInfo(params).then(res => {
        this.userInfo = res.obj
        let newData = Object.assign({}, res.obj)
        this.info = newData
        this.secondInfoList.forEach(item => {
          if (item.name === '手机') {
            this.$set(item, 'value', newData.phone)
          }
          if (item.name === '加入时间') {
            this.$set(item, 'value', newData.createTime)
          }
          if (item.name === '抽佣比例') {
            this.$set(item, 'value', newData.payProrata * 100 + '%')
          }
        })
      })
    },
    /**
     * 退出登录
     */
    loginOut() {
      this.$confirm('确定退出登录', '提示').then(res => {
        if (res.result) {
          loginInfoLocal.remove()
          afterLoginInfoLocal.remove()
          sessionStorage.clear()
          this.$router.push({name: types.LOGIN})
        }
      })
    },
    /**
     * 修改密码
     */
    resetPsw() {
      this.$router.push({name: types.RESETPASSWORD})
    },
    toPrivacy() {
      this.$router.push({name: types.PRIVACY})
    },
    toCommission(){
      this.$router.push({name: types.COMMISSION})
    }
  }
}
</script>
