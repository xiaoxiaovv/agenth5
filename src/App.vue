<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <div class="vm-page-foot" v-if="isShowFooter">
      <div class="vm-page-foot-container">
        <div class="vm-page-foot-ul">
          <div class="vm-page-foot-li" v-for="(item,i) in list"
                                       :class="isCurrentPage(item.router)?'active':''"
                                       :key="`footList_${i}`"
                                       @click="tabClick(item)">
            <div class="vm-foot-icon">
              <span :class="item.icon"></span>
            </div>
            <div class="vm-foot-title vm-ell">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { footTablistApi } from '@/api'
import { mapGetters } from 'vuex'
import { afterLoginInfoLocal } from '@/storage'
export default {
  name: 'App',
  data() {
    return {
      // list: footTablistApi.footerList,
      isShowFooter: false
    }
  },
  watch: {
    '$route' (to, from) {
      document.title = to.meta.title
      let isShowFooter = to.meta.isShowFooter
      this.isShowFooter = isShowFooter
      if (from.name === 'LOGIN') {
        this.getFootTabList()
      }
    }
  },
  computed: {
    ...mapGetters([
      // 'isShowFooter'
    ])
  },
  created() {
    this.getFootTabList()
  },
  methods: {
    isCurrentPage (name) {
      let routeName = this.$route.name
      if (routeName === name) {
        return true
      } else {
        return false
      }
    },
    tabClick(item) {
      this.$router.push({ name: item.router })
    },
    getFootTabList() {
      let tabMenu = [...footTablistApi.footerList]
      let userType = afterLoginInfoLocal.getJSON().userType
      if (userType === 1 || userType === 2 || userType === 3) {
        tabMenu.splice(3, 1)
      } else if (userType === 4) {
        tabMenu.splice(2, 1)
      } else {
        tabMenu.splice(3, 1)
      }
      this.list = tabMenu
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
