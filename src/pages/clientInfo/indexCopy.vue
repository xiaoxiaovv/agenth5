<template>
  <div class="frame-container">
    <img class="vm-bg-img"
         src="@/assets/images/pages/home_bg.png"
         alt="">
    <div class="home-container">
      <!-- 数据总览 -->
      <div class="home-container-pandect">
        <div class="pandect-title">
          数据总览
        </div>
        <ul class="pandect-data">
          <li v-for="(n,i) in 6"
              :key="i"
              class="fl">
            <div>
              <p class="pandect-data-price">￥382.11</p>
              <p class="pandect-data-name">月交易额</p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 业务员发展商户占比 -->
      <div class="home-container-echart">
        <div class="echart-title">业务员发展商户占比</div>
        <div class="echart-data">echart</div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginApi } from '@/api'
import { isShowFooterMixin, scrollerMixin } from '@/mixins'
// import { backgroundImg } from '@/utils'
// import homeBgStyle from '@/assets/images/pages/home_bg.png'

export default {
  mixins: [isShowFooterMixin, scrollerMixin],
  data() {
    return {
      // pandectList: [
      //   { name: money }
      // ]
    }
  },
  methods: {
    async list() {
      let params = {
        username: '13950379345',
        password: 123456
      }
      const data = await loginApi.login(params)
      console.log(data)
      // 调用后端api获取数据 demo
      // const data=await demoApi.list(this.params)
      // this.dataList = [...this.dataList, data.dataList]
      // return data.dataList
      this.dataList = [...Array(100).keys()]
    }
  },
  created() {
    this.list()
  }
}
</script>
