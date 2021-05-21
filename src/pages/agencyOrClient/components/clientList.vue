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
          <div class="item-right center-flex">
            <p>
              {{showSignStatus(item.signStatus)}}
              <!--
              <template v-if="item.status===1">已签约</template>
              <template v-else-if="item.status===2">未签约</template>
              -->
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
    }
  },
  components: {},
  data() {
    return {
      userType: afterLoginInfoLocal.getJSON().userType
    }
  },
  created() {
    this.getList()
  },
  methods: {
    showSignStatus(val) {
      let stauts = ''
      switch (val) {
        case 1:
          stauts = '未开通'
          break
        case 2:
          stauts = '待审核'
          break
        case 3:
          stauts = '签约成功'
          break
        case 4:
          stauts = '签约失败'
          break
        case 5:
          stauts = '材料已审核'
          break
      }
      return stauts
    },
    detailClick(data) {
      this.$router.push({ name: types.CLIENT_DETAIL, query: {id: data.id} })
    },
    getList() {}
  }
}
</script>
