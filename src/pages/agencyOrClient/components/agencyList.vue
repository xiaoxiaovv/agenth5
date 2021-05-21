<template>
  <div>
    <div class="agencyOrClient-container">
      <ul class="vm-list">
        <li v-for="(item, key) in list"
            :key="`list_${key}`"
            @click="detailClick(item)"
            class="vm-item between-flex">
          <div class="item-left">
            <p class="item-left-1">{{item.name}}</p>
            <p class="item-left-2" v-if="userType && userType==1">{{item.phone}}</p>
          </div>
          <div class="item-right center-flex vm-font-color-9">
            <p>
              <template v-if="item.status===1">未签约</template>
              <template v-else-if="item.status===2"><span class="vm-font-color-yellow">待审核</span></template>
              <template v-else-if="item.status===3"><span class="vm-font-color-blue">已签约</span></template>
              <template v-else-if="item.status===4">过期</template>
              <template v-else-if="item.status===5">禁用</template>
              <template v-else-if="item.status===6">驳回</template>
            </p>
            <img src="@/assets/images/icons/icon_enter.png"
                 alt="">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as types from '@/router/types'
// import { isShowFooterMixin, scrollerMixin } from '@/mixins'
// import { backgroundImg } from '@/utils'
// import homeBgStyle from '@/assets/images/pages/home_bg.png'
import { afterLoginInfoLocal } from '@/storage'
export default {
  props: {
    list: {
      type: Array,
      defaul: function() {
        return []
      }
    },
    tabType: {
      type: [Number, String],
      default: null
    }
  },
  components: {},
  data() {
    return {
      userType: 0,//1是服务商 2是一级代理
    }
  },
  created() {
    this.userType = afterLoginInfoLocal.getJSON().userType
    this.getList()
  },
  methods: {
    detailClick(data) {
      this.$router.push({ name: types.AGENCY_DETAIL, query: {id: data.id, isDirect: data.isDirect, tabType: this.tabType} })
    },
    getList() {}
  }
}
</script>
