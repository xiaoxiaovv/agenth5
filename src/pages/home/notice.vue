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
      <div class="title">通知详情</div>
      <div class="pass"></div>
    </div>
    <div class="match-width ptb-20 text-left pl-30 bg-white" style="font-size: 15px;">标题：{{info.title}}</div>
    <mu-divider></mu-divider>
    <div class="match-width ptb-20 text-left pl-30 bg-white vm-font-color-9" v-html="'内容:' + info.content"></div>
    <mu-divider></mu-divider>
    <!-- <mu-button color="secondary" class="mu-ripple-file" @click="download">下载文件</mu-button> -->
  </div>
</template>

<script>

export default {
  data() {
    return {
        info: {},
    }
  },

  methods: {
    download() {
      if(this.info.filePath) {
        let echoPrefix = window.serverUrl + '/fms/upload/resource/';
        let fileNames = this.info.filePath.split('-');
        let echoPath = echoPrefix + fileNames[0];
        let ele = document.createElement('a')
        ele.download = '下载.jpg'
        ele.style.display = 'none'
        ele.href = echoPath
        document.body.appendChild(ele)
        ele.click()
        document.body.removeChild(ele)
      } else {
        this.$toast.error('无文件')
      }
    }
  },

  mounted() {
      this.info = this.$route.params
  }
}
</script>
<style lang="scss">
.demo-divider-form {
  padding: 0 16px;
}
.mu-ripple-file {
  position: relative;
  width: 90px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  background-color: #2196f3;
  color: #fff;
  margin-top: 1.066666rem;
}
</style>
